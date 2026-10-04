import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import integrations from '../src/data/integrations.json' with { type: 'json' };
import services from '../src/data/services.json' with { type: 'json' };
const result = spawnSync('npm', ['run', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, SITE_MODE: 'preview', SITE_BASE: '/', VITE_STATIC_PREVIEW: 'false' },
});
if (result.status !== 0) process.exit(result.status || 1);
await rm('.cpanel', { recursive: true, force: true });
await mkdir('.cpanel', { recursive: true });
await cp('dist', '.cpanel/public_html', { recursive: true });
await cp('hosting/cpanel/public', '.cpanel/public_html', { recursive: true });
await cp('hosting/cpanel/private', '.cpanel/private', {
  recursive: true,
  filter: (path) => !path.endsWith('/config.php') && !path.includes('/storage'),
});
await writeFile(
  '.cpanel/private/services.json',
  JSON.stringify([...services.map((s) => s.slug), 'not-sure']),
);
const formspree = process.env.FORMSPREE_ENDPOINT || integrations.formspreeEndpoint;
for (const page of formspree ? [] : ['contact', 'thank-you']) {
  await cp(`.cpanel/public_html/${page}/index.html`, `.cpanel/private/${page}.html`);
  await rm(`.cpanel/public_html/${page}/index.html`);
  await writeFile(
    `.cpanel/public_html/${page}/index.php`,
    `<?php\n$page = '${page}';\nrequire dirname(__DIR__, 2).'/private/page.php';\n`,
  );
}
const builtHeaders = await readFile('dist/_headers', 'utf8');
const csp = builtHeaders.match(/Content-Security-Policy: (.*)/)?.[1];
const apachePath = '.cpanel/public_html/.htaccess';
const apache = await readFile(apachePath, 'utf8');
await writeFile(
  apachePath,
  apache.replace(
    /Header always set Content-Security-Policy ".*"/,
    `Header always set Content-Security-Policy "${csp}"`,
  ),
);
for (const file of ['_headers', '_redirects'])
  await rm(`.cpanel/public_html/${file}`, { force: true });
await writeFile('.cpanel/public_html/.nojekyll', '');
await cp('docs/cpanel-deployment.md', '.cpanel/DEPLOYMENT.md');
await mkdir('releases', { recursive: true });
await rm('releases/regardin-cpanel-preview.zip', { force: true });
const archive = spawnSync('zip', ['-qr', '../releases/regardin-cpanel-preview.zip', '.'], {
  cwd: '.cpanel',
  stdio: 'inherit',
});
if (archive.status !== 0) process.exit(archive.status || 1);
const bytes = await readFile('releases/regardin-cpanel-preview.zip');
await writeFile(
  'releases/regardin-cpanel-preview.sha256',
  `${createHash('sha256').update(bytes).digest('hex')}  regardin-cpanel-preview.zip\n`,
);
console.log(
  `cPanel preview package: ${bytes.length} bytes; private server data stays outside public_html.`,
);
