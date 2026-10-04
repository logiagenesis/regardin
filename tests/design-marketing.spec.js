import { test, expect } from '@playwright/test';
import { routes, render } from '../src/render.js';

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`every route has complete card rows and no overflow at ${width}px`, async ({ page }) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      await page.goto(route.path);
      await page.evaluate(() => document.fonts.ready);
      const result = await page.evaluate(() => {
        const grids = [...document.querySelectorAll('[data-balanced-grid]')].map((grid) => {
          const rows = [];
          for (const child of grid.children) {
            const box = child.getBoundingClientRect();
            const row = rows.find((item) => Math.abs(item.top - box.top) < 1);
            if (row) row.boxes.push({ width: box.width, height: box.height });
            else rows.push({ top: box.top, boxes: [{ width: box.width, height: box.height }] });
          }
          return { name: grid.className, rows };
        });
        return { overflow: document.documentElement.scrollWidth - innerWidth, grids };
      });
      expect(result.overflow, route.path).toBeLessThanOrEqual(0);
      for (const grid of result.grids) {
        const count = grid.rows[0].boxes.length;
        for (const row of grid.rows) {
          expect(row.boxes.length, `${route.path}: ${grid.name}`).toBe(count);
          expect(
            Math.max(...row.boxes.map((box) => box.width)) -
              Math.min(...row.boxes.map((box) => box.width)),
          ).toBeLessThan(1);
          expect(
            Math.max(...row.boxes.map((box) => box.height)) -
              Math.min(...row.boxes.map((box) => box.height)),
          ).toBeLessThan(1);
        }
      }
    }
  });
}

async function configuredForm(page) {
  const previous = process.env.FORMSPREE_ENDPOINT;
  process.env.FORMSPREE_ENDPOINT = 'https://formspree.io/f/synthetic123';
  const html = render(routes.find((route) => route.kind === 'contact'));
  if (previous === undefined) delete process.env.FORMSPREE_ENDPOINT;
  else process.env.FORMSPREE_ENDPOINT = previous;
  await page.route('**/contact/', (route) =>
    route.fulfill({ body: html, contentType: 'text/html' }),
  );
  await page.goto('/contact/');
  await page.getByLabel('Your name').fill('Synthetic Test');
  await page.getByLabel('Phone number').fill('0000000000');
  await page.getByLabel('Email address').fill('synthetic@example.com');
  await page.getByLabel('Project suburb').fill('Test location');
  await page.getByLabel('Type of work').selectOption('decking-pergolas');
  await page
    .getByLabel('Tell us about the project')
    .fill('Synthetic project brief for an intercepted test only.');
}

test('Formspree shows acceptance only after success and blocks duplicate submission', async ({
  page,
}) => {
  let requests = 0;
  await page.route('https://formspree.io/f/synthetic123', async (route) => {
    requests += 1;
    expect(route.request().postData()).toContain('Synthetic project brief');
    expect(route.request().postData()).not.toContain('idempotencyKey');
    await route.fulfill({ body: JSON.stringify({ ok: true }), contentType: 'application/json' });
  });
  await configuredForm(page);
  await page.getByRole('button', { name: 'Request a project quote' }).click();
  await expect(page.getByRole('status')).toContainText('accepted by the form service');
  await expect(page.getByRole('button', { name: 'Enquiry sent' })).toBeDisabled();
  await page.locator('form').evaluate((form) => form.requestSubmit());
  expect(requests).toBe(1);
  await expect(page.locator('#upload-field')).toBeHidden();
});

test('Formspree rejection preserves the brief and permits a deliberate retry', async ({ page }) => {
  await page.route('https://formspree.io/f/synthetic123', (route) =>
    route.fulfill({
      status: 422,
      contentType: 'application/json',
      body: JSON.stringify({ errors: [{ message: 'Synthetic validation failure.' }] }),
    }),
  );
  await configuredForm(page);
  await page.getByRole('button', { name: 'Request a project quote' }).click();
  await expect(page.getByRole('status')).toContainText('Synthetic validation failure');
  await expect(page.getByLabel('Your name')).toHaveValue('Synthetic Test');
  await expect(page.getByRole('button', { name: 'Request a project quote' })).toBeEnabled();
});

test('direct GA4 consent excludes query parameters and personal event fields', async ({ page }) => {
  await page.route('https://www.googletagmanager.com/**', (route) =>
    route.fulfill({ body: '', contentType: 'application/javascript' }),
  );
  await page.goto('/?email=synthetic-private-value');
  await page.evaluate(async () => {
    const { initialiseTracking } = await import('/src/tracking.js');
    window.syntheticTracking = initialiseTracking({
      approved: true,
      mode: 'production',
      ga4Id: 'G-SYNTHETIC',
    });
  });
  expect(await page.locator('script[src*="gtag/js"]').count()).toBe(0);
  await page.getByRole('button', { name: 'Allow analytics', exact: true }).first().click();
  await page.evaluate(() =>
    window.syntheticTracking.track('click_whatsapp', { email: 'private', brief: 'private' }),
  );
  const events = await page.evaluate(() =>
    window.dataLayer.filter((event) => event[0] === 'event').map((event) => [event[1], event[2]]),
  );
  expect(events.find((event) => event[0] === 'page_view')[1].page_location).not.toContain('?');
  expect(events.find((event) => event[0] === 'click_whatsapp')[1]).toEqual({});
  await page.getByRole('button', { name: 'Privacy choices' }).click();
  await page.getByRole('button', { name: 'Withdraw analytics permission' }).click();
  expect(await page.evaluate(() => window.syntheticTracking.accepted)).toBe(false);
});

test('contact links use original details and landing pages preselect the service', async ({
  page,
}) => {
  await page.goto('/contact/?service=pool-structures-finishes');
  await expect(page.getByLabel('Type of work')).toHaveValue('pool-structures-finishes');
  await expect(page.locator('.contact-details a[href="tel:+27794549780"]')).toBeVisible();
  await expect(
    page.locator('.contact-details a[href="mailto:regardbothma@icloud.com"]'),
  ).toBeVisible();
  await expect(page.locator('.contact-details a[href^="https://wa.me/27794549780"]')).toBeVisible();
});

test('portfolio link can be shared to a project group without customer details', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/projects/?email=synthetic-private-value');
  await page.evaluate(() =>
    Object.defineProperty(navigator, 'share', { value: undefined, configurable: true }),
  );
  await page.getByRole('button', { name: 'Share the portfolio' }).click();
  await expect(page.getByRole('status')).toContainText('Portfolio link copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'http://127.0.0.1:5173/projects/',
  );
});
