import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { routes, render } from '../src/render.js';
import services from '../src/data/services.json' with { type: 'json' };

test('every route has unique metadata and FAQ markup matches its visible questions', () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const route of routes) {
    const html = render(route);
    assert.ok(!titles.has(route.title), route.path + ': repeated title');
    assert.ok(!descriptions.has(route.description), route.path + ': repeated description');
    titles.add(route.title);
    descriptions.add(route.description);
    const schema = JSON.parse(
      html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
    );
    const faq = schema['@graph'].find((entity) => entity['@type'] === 'FAQPage');
    if (faq) {
      assert.equal(faq.mainEntity.length, (html.match(/<summary>/g) || []).length);
      for (const item of faq.mainEntity) assert.ok(html.includes(item.name));
    }
    if (route.kind === 'service') assert.equal(faq, undefined);
    assert.ok(html.includes('og:image:width'));
    assert.ok(html.includes('twitter:image'));
  }
});

test('all nine service categories are accepted by the PHP enquiry service', () => {
  const allowed = JSON.parse(readFileSync('hosting/cpanel/private/services.json', 'utf8'));
  assert.equal(services.length, 9);
  assert.deepEqual(allowed, [...services.map((service) => service.slug), 'not-sure']);
});

test('Formspree native form and verification token render only with valid configuration', () => {
  const contact = routes.find((route) => route.kind === 'contact');
  const original = process.env.FORMSPREE_ENDPOINT;
  try {
    process.env.FORMSPREE_ENDPOINT = 'https://formspree.io/f/synthetic123';
    const html = render(contact);
    assert.ok(html.includes('action="https://formspree.io/f/synthetic123"'));
    assert.ok(html.includes('data-formspree="https://formspree.io/f/synthetic123"'));
    assert.ok(html.includes('name="_gotcha"'));
    assert.ok(!html.includes('class="button" hidden>Request a project quote'));
    process.env.FORMSPREE_ENDPOINT = 'https://unapproved.example/f/123';
    assert.throws(() => render(contact), /Invalid Formspree endpoint/);
  } finally {
    if (original === undefined) delete process.env.FORMSPREE_ENDPOINT;
    else process.env.FORMSPREE_ENDPOINT = original;
  }
});

test('generated service illustrations remain separate from actual portfolio photographs', () => {
  const assets = JSON.parse(readFileSync('src/data/assets.json', 'utf8'));
  const illustrations = assets.filter((asset) => asset.kind === 'illustration');
  assert.equal(illustrations.length, 10);
  for (const asset of illustrations) {
    assert.match(asset.alt, /^AI-generated illustration/);
    assert.match(asset.originalSha256, /^[a-f0-9]{64}$/);
  }
  const home = render(routes.find((route) => route.kind === 'home'));
  assert.ok(home.includes('data-photo="illustration-hero-outdoor-living"'));
  assert.ok(home.includes('AI-generated design illustration'));
  const hub = render(routes.find((route) => route.kind === 'services'));
  assert.equal((hub.match(/data-image-kind="illustration"/g) || []).length, 9);
  assert.ok(hub.includes('Service images are AI-generated illustrations.'));
  for (const route of routes.filter((route) => route.kind === 'service')) {
    const html = render(route);
    assert.equal((html.match(/data-image-kind="illustration"/g) || []).length, 1);
    assert.equal((html.match(/data-image-kind="photograph"/g) || []).length, 3);
    assert.match(html, /<figcaption>AI-generated illustration/);
  }
  const portfolio = render(routes.find((route) => route.path === '/projects/'));
  assert.equal((portfolio.match(/data-image-kind="photograph"/g) || []).length, 16);
  assert.ok(!portfolio.includes('data-image-kind="illustration"'));
});
