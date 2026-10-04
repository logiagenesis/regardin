import { chromium } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const output = resolve('social/exports');
await mkdir(output, { recursive: true });
const logo = (await readFile('public/images/regardin-logo.webp')).toString('base64');
const regular = (await readFile('public/fonts/dm-sans-latin-400-normal.woff2')).toString('base64');
const cards = [
  {
    slug: 'decking-pergolas',
    title: 'Make room outdoors.',
    label: 'Decking & timber pergolas',
    photo: 'decking-pergola',
  },
  {
    slug: 'renovations',
    title: 'A new chapter for your space.',
    label: 'Renovations & alterations',
    photo: 'interior-painting',
  },
  {
    slug: 'project-brief',
    title: 'Start with a clear brief.',
    label: 'Planning construction work?',
    steps: ['Your location', 'What you want to change', 'Any plans or photographs'],
  },
];
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/chromium',
  args: ['--no-sandbox'],
});
const manifest = [];
try {
  for (const card of cards) {
    const photograph = card.photo
      ? (await readFile(`public/images/${card.photo}-og.jpg`)).toString('base64')
      : null;
    for (const height of [1350, 1920]) {
      const page = await browser.newPage({
        viewport: { width: 1080, height },
        deviceScaleFactor: 1,
      });
      const visual = photograph
        ? `<img class="work" src="data:image/jpeg;base64,${photograph}" alt="Source-site construction photograph">`
        : `<ol>${card.steps.map((step) => `<li>${step}</li>`).join('')}</ol>`;
      const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${card.label}</title><style>
      @font-face{font-family:DM;src:url(data:font/woff2;base64,${regular})}*{box-sizing:border-box}body{margin:0;background:#f8f7f3;color:#242824;font:32px/1.45 DM,Arial,sans-serif}main{height:${height}px;padding:72px;display:flex;flex-direction:column;gap:42px}header img{width:290px;height:110px;object-fit:contain;object-position:left}.label{font-size:27px;color:#0b6244;margin:0}h1{font:84px/1.05 Georgia,serif;letter-spacing:-3px;margin:22px 0 0;max-width:880px}.work{width:100%;flex:1;min-height:0;object-fit:cover;border-radius:30px}ol{flex:1;padding-left:64px;display:flex;flex-direction:column;justify-content:center;gap:65px;font-size:47px}li::marker{color:#0b6244}footer{border-top:2px solid #d8ded5;padding-top:30px}.phone{font-size:44px;color:#0b6244;margin:0}.contact{font-size:26px;margin:10px 0 0}.cta{font-size:27px;margin:0 0 14px}</style></head><body><main><header><img src="data:image/webp;base64,${logo}" alt="Regardin Construction"></header><section><p class="label">${card.label}</p><h1>${card.title}</h1></section>${visual}<footer><p class="cta">Discuss your project in Cape Town.</p><p class="phone">+27 79 454 9780</p><p class="contact">regardbothma@icloud.com</p></footer></main></body></html>`;
      await page.setContent(html);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.images].map((img) => img.decode()));
      });
      const filename = `${card.slug}-1080x${height}.png`;
      await page.screenshot({ path: resolve(output, filename) });
      manifest.push({
        file: filename,
        width: 1080,
        height,
        sourcePhoto: card.photo || null,
        status: 'Owner-review artwork; not published',
      });
      await page.close();
    }
  }
} finally {
  await browser.close();
}
await writeFile(resolve(output, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Exported ${manifest.length} source-grounded social graphics.`);
