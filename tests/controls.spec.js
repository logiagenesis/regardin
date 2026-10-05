import { test, expect } from '@playwright/test';
import { routes } from '../src/render.js';
import { auditControls } from './helpers/control-audit.js';

for (const width of [390, 1440]) {
  test(`all visible links, CTAs, FAQ and privacy controls work at ${width}px`, async ({ page }) => {
    test.setTimeout(300000);
    await page.setViewportSize({ width, height: 1000 });
    const totals = await auditControls(page, { origin: 'http://127.0.0.1:5173', routes });
    expect(totals.routes).toBe(24);
    expect(totals.destinations).toBeGreaterThan(20);
    console.log(width, totals);
  });
}

test('invalid briefs are blocked and prepared email contains the complete enquiry', async ({
  page,
}) => {
  await page.goto('/contact/');
  await page.getByRole('button', { name: 'Prepare an email' }).click();
  await expect(page.getByLabel('Your name')).toBeFocused();
  await page.getByRole('button', { name: 'Copy project brief' }).click();
  await expect(page.getByRole('status')).toBeEmpty();
  await page.getByLabel('Your name').fill('Synthetic Test');
  await page.getByLabel('Phone number').fill('0000000000');
  await page.getByLabel('Email address').fill('synthetic@example.com');
  await page.getByLabel('Project suburb').fill('Test & verification');
  await page.getByLabel('Type of work').selectOption('painting');
  await page
    .getByLabel('Tell us about the project')
    .fill('Synthetic test only. Paint walls & trim.');
  await page.getByLabel('Preferred timing').fill('Flexible');
  const session = await page.context().newCDPSession(page);
  await session.send('Page.enable');
  const requested = new Promise((resolve) =>
    session.once('Page.frameRequestedNavigation', resolve),
  );
  await page.getByRole('button', { name: 'Prepare an email' }).click();
  const event = await Promise.race([
    requested,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('No email navigation requested')), 5000),
    ),
  ]);
  const email = new URL(event.url);
  expect(email.protocol).toBe('mailto:');
  expect(email.pathname).toBe('regardbothma@icloud.com');
  expect(email.searchParams.get('subject')).toContain('Test & verification');
  expect(email.searchParams.get('body')).toContain('Synthetic test only. Paint walls & trim.');
  expect(email.searchParams.get('body')).toContain('Interior & exterior painting');
  expect(email.searchParams.get('body')).toContain('Flexible');
  await session.detach();
});

test('clipboard failure has a usable fallback and native sharing excludes query details', async ({
  page,
}) => {
  await page.goto('/projects/?email=private-test');
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: async (data) => {
        window.sharedPortfolio = data;
      },
    });
  });
  await page.getByRole('button', { name: 'Share the portfolio' }).click();
  expect(await page.evaluate(() => window.sharedPortfolio.url)).toBe(
    'http://127.0.0.1:5173/projects/',
  );
  await expect(page.getByRole('status')).toContainText('Portfolio shared');
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
    Object.defineProperty(navigator.clipboard, 'writeText', {
      configurable: true,
      value: async () => {
        throw new Error('Unavailable');
      },
    });
  });
  await page.getByRole('button', { name: 'Share the portfolio' }).click();
  await expect(page.getByRole('status')).toContainText('Copy the page address');
});

test('contact clipboard refusal preserves the brief and explains the email alternative', async ({
  page,
}) => {
  await page.goto('/contact/');
  await page.getByLabel('Your name').fill('Synthetic Test');
  await page.getByLabel('Phone number').fill('0000000000');
  await page.getByLabel('Email address').fill('synthetic@example.com');
  await page.getByLabel('Project suburb').fill('Test only');
  await page.getByLabel('Type of work').selectOption('painting');
  await page
    .getByLabel('Tell us about the project')
    .fill('Synthetic test only for clipboard failure.');
  await page.evaluate(() =>
    Object.defineProperty(navigator.clipboard, 'writeText', {
      configurable: true,
      value: async () => {
        throw new Error('Permission denied');
      },
    }),
  );
  await page.getByRole('button', { name: 'Copy project brief' }).click();
  await expect(page.getByRole('status')).toContainText('Use Prepare an email');
  await expect(page.getByLabel('Tell us about the project')).toHaveValue(
    'Synthetic test only for clipboard failure.',
  );
  await expect(page.getByRole('button', { name: 'Prepare an email' })).toBeEnabled();
});

test('optional tracking rejection and privacy-dialog permission controls respond', async ({
  page,
}) => {
  await page.route('https://www.googletagmanager.com/**', (route) =>
    route.fulfill({ body: '', contentType: 'application/javascript' }),
  );
  await page.goto('/');
  await page.evaluate(async () => {
    const { initialiseTracking } = await import('/src/tracking.js');
    window.controlTracking = initialiseTracking({
      approved: true,
      mode: 'production',
      ga4Id: 'G-SYNTHETIC',
    });
  });
  await page.getByRole('button', { name: 'Reject optional tracking' }).click();
  expect(await page.evaluate(() => window.controlTracking.accepted)).toBe(false);
  await expect(page.locator('script[src*="gtag/js"]')).toHaveCount(0);
  await page.getByRole('button', { name: 'Privacy choices' }).click();
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Allow analytics', exact: true })
    .click();
  expect(await page.evaluate(() => window.controlTracking.accepted)).toBe(true);
  await expect(page.getByRole('dialog')).toBeHidden();
  await page.getByRole('button', { name: 'Privacy choices' }).click();
  await page.getByRole('button', { name: 'Withdraw analytics permission' }).click();
  expect(await page.evaluate(() => window.controlTracking.accepted)).toBe(false);
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('skip navigation, privacy policy link and outside-dialog dismissal work', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/#main$/);
  await page.getByRole('button', { name: 'Privacy choices' }).click();
  await page.getByRole('dialog').getByRole('link', { name: 'Read the privacy notice' }).click();
  await expect(page).toHaveURL(/\/privacy-policy\/$/);
  await page.getByRole('button', { name: 'Privacy choices' }).click();
  await page.mouse.click(5, 5);
  await expect(page.getByRole('dialog')).toBeHidden();
});
