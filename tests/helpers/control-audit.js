import assert from 'node:assert/strict';

export async function auditControls(page, { origin, base = '', routes }) {
  const totals = {
    routes: 0,
    linksClicked: 0,
    destinations: 0,
    faqToggles: 0,
    dialogs: 0,
    menus: 0,
  };
  const destinations = new Map();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const route of routes) {
    await page.goto(origin + base + route.path);
    await page.evaluate(() => document.fonts.ready);
    const menu = page.locator('.menu-toggle');
    if (await menu.isVisible()) {
      await menu.click();
      assert.equal(await menu.getAttribute('aria-expanded'), 'true');
      totals.menus++;
    }
    const links = page.locator('a');
    for (let index = 0; index < (await links.count()); index++) {
      const link = links.nth(index);
      if (
        (await menu.isVisible()) &&
        (await menu.getAttribute('aria-expanded')) === 'true' &&
        !(await link.evaluate((element) => Boolean(element.closest('#navigation, .brand'))))
      )
        await menu.click();
      if (!(await link.isVisible()) || (await link.getAttribute('class')) === 'skip-link') continue;
      const href = await link.getAttribute('href');
      assert(href && href !== '#', route.path + ': empty destination');
      if (href.startsWith('tel:')) assert.equal(href, 'tel:+27794549780');
      else if (href.startsWith('mailto:')) assert.equal(href, 'mailto:regardbothma@icloud.com');
      else if (href.startsWith('https://wa.me/')) {
        const url = new URL(href);
        if (url.pathname !== '/27794549780') {
          assert.equal(url.pathname, '/');
          const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
          assert(
            url.searchParams.get('text').includes(new URL(base + '/projects/', canonical).href),
          );
        }
        assert(url.searchParams.get('text'));
      } else {
        const url = new URL(href, page.url());
        assert.equal(url.origin, origin);
        assert(url.pathname.startsWith(base + '/'));
        assert(routes.some((candidate) => base + candidate.path === url.pathname));
        if (!destinations.has(url.href)) destinations.set(url.href, { path: route.path, index });
      }
      // Exercise each rendered link without launching apps, sending messages or leaving the page.
      await link.evaluate((element) => {
        window.auditClick = null;
        element.addEventListener(
          'click',
          (event) => {
            event.preventDefault();
            window.auditClick = element.getAttribute('href');
          },
          { once: true },
        );
      });
      await link.click({ timeout: 5000 });
      assert.equal(await page.evaluate(() => window.auditClick), href);
      totals.linksClicked++;
    }
    const summaries = page.locator('summary');
    for (let index = 0; index < (await summaries.count()); index++) {
      const summary = summaries.nth(index);
      const before = await summary.evaluate((element) => element.parentElement.open);
      await summary.click();
      assert.equal(await summary.evaluate((element) => element.parentElement.open), !before);
      await summary.click();
      assert.equal(await summary.evaluate((element) => element.parentElement.open), before);
      totals.faqToggles += 2;
    }
    if (await menu.isVisible()) {
      await page.keyboard.press('Escape');
      assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    }
    await page.getByRole('button', { name: 'Privacy choices' }).click();
    assert(await page.getByRole('dialog').isVisible());
    await page.getByRole('button', { name: 'Close privacy choices' }).click();
    assert(!(await page.getByRole('dialog').isVisible()));
    await page.getByRole('button', { name: 'Privacy choices' }).click();
    await page.keyboard.press('Escape');
    assert(!(await page.getByRole('dialog').isVisible()));
    totals.dialogs += 2;
    totals.routes++;
  }
  // Follow each distinct internal destination through an actual user click.
  for (const [destination, source] of destinations) {
    await page.goto(origin + base + source.path);
    const menu = page.locator('.menu-toggle');
    if (
      (await menu.isVisible()) &&
      (await page
        .locator('a')
        .nth(source.index)
        .evaluate((element) => Boolean(element.closest('#navigation'))))
    )
      await menu.click();
    await page.locator('a').nth(source.index).click();
    await page.waitForURL(destination);
    assert.equal(await page.locator('h1').count(), 1);
    const service = new URL(destination).searchParams.get('service');
    if (service) assert.equal(await page.locator('#service').inputValue(), service);
    totals.destinations++;
  }
  assert.deepEqual(errors, []);
  return totals;
}
