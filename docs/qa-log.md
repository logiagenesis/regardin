# QA log — 01/10/2026

## First site draft

- Preview build: passed, 21 routes, Vite 8.3.1 / Node 24.19.0; no build errors or warnings.
- ESLint, Stylelint and Prettier: passed.
- html-validate: passed across all 21 built pages.
- Internal-link and content gate: passed; 21 routes, valid metadata lengths, one H1 each, no dead hash CTAs or banned content.
- Playwright: 30 tests passed; all 21 routes checked with axe (zero violations), six responsive screenshots, keyboard menu, clipboard brief and privacy/status behaviour.
- Screenshots at 360, 390, 768, 1024, 1440 and 1920 px: generated; desktop, tablet and mobile views inspected. No horizontal overflow in the checks.
- Lighthouse mobile: home 93 performance / 100 accessibility / 100 best practices / 66 SEO; contact 99 / 100 / 96 / 66; renovation service 100 / 100 / 100 / 66. The sole failing SEO audit is crawlability: preview robots.txt and noindex deliberately block indexing. Production SEO is not claimed.
- Fault classes fixed before push: overlong description, raw ampersands, invalid service-row nesting, figcaption ordering, implicit control types, phone wrapping, missing preview landmark, skipped heading levels. Initial browser configuration was corrected to use installed system Chromium after download was blocked.
- Source checks: supplied document only; fresh live-site and Drive retrieval blocked by proxy 403. No fresh scrape or unavailable audit claimed.

## Remaining checks

Live preview, production deployment and delivered-mail verification are unrun; they require account configuration. Online submission is disabled in this draft. The production approval gate remains active.

## Enquiry backend

- 13 tests passed against real SQLite tables using the shipped migration. External Turnstile/R2/mail boundary failures are simulated; no live delivery claim.
- Cloudflare Functions build passed in Wrangler 4.145.0.
- Local Pages runtime: GET /api/enquiries reports disabled without credentials; POST returns 503; /our-team/ returns 301; /portfolios/ returns 410.
- Browser recheck: 30 passed after receipt/upload-status handling.
- Live-site and Drive HTTP access now works after the earlier proxy denial. Nine prior-audit files retrieved into ignored research storage. Archive and detailed reconciliation are in progress.

- Backend push audit: build, lint, HTML, internal links, 30 browser checks and 13 SQL/API checks pass. Lighthouse rerun passes required performance/accessibility/best-practice thresholds; preview crawlability remains the expected SEO warning.
- A direct Lighthouse CLI attempt failed because Chromium was launched without headless mode; the configured Lighthouse CI runner was rerun successfully. No result from the failed run is used.

## Source, project and integration release

- 22-route build, lint, HTML and metadata/internal-link/content checks pass. All 33 browser tests passed before the font change. A subsequent run hit a Vite reload during axe evaluation while generated files were being updated: 32 passed, one execution-context interruption. A clean rerun is required and recorded below; no accessibility assertion was bypassed.
- 18 unit checks include real SQLite schema, signed-link expiry/tampering, operator authorisation, safe downloads, approved-only responsive image processing, notification/upload race and interrupted-upload recovery. External providers are test doubles; account delivery remains unverified.
- Final Lighthouse scores: home 100/100/100/66, contact 100/100/96/66, renovations 100/100/100/66, project layout 99/100/100/66. Order: performance/accessibility/best practices/SEO. Required local thresholds pass; preview crawlability warning remains intentionally visible.
- Performance defect: homepage late font load caused CLS 0.225 and performance 88. Self-hosted critical-font preload reduces CLS to 0 and performance rises to 100. Project template CLS 0.071 remains below 0.1.
- Backend defects corrected: undersized signing/operator keys no longer count as configured; notification waits for uploads and marks interrupted uploads incomplete after five minutes instead of prematurely emailing without links.
- Cloudflare Functions bundle compiled successfully. Production build correctly fails on missing contact/photo/legal approvals. Wrangler identity operation reports unauthenticated. No public-host, mailbox, Google account or production result claimed.
- Setup script npm ci --ignore-scripts/build/check executed successfully. Dependency installation reports upstream dev-tool deprecations; Vite build has no warnings. Saved setup/start configuration and credential requirements confirmed by configuration tool.
- Sources: 44 old URLs archived/rendered (one rendered 503), 100 original media downloads reviewed, nine audits read, 20 raw competitor homepage responses checked (one 403, two JS shells). Source certificate handling used verified curl mediation; TLS was not disabled.
- GitHub Actions added; its actual remote result remains to be inspected after push. Launch blockers and unmet JS-free form/photo-led/share-preview requirements are explicit in HANDOVER.md.

- Clean browser rerun after generated-file writes completed: 33 passed, zero axe violations. Final unit suite: 18 passed. Font-face spacing lint corrections are formatting only; no assertion settings were relaxed.

- Linkinator 8.1.0 scanned the built preview with recursion, CSS URLs and fragment validation: 34 links, zero broken. External origins excluded from this local scan; external/account checks retain their separate status.

## cPanel correction — 01/10/2026

- Explicit user cPanel instruction supersedes the attached master prompt's default host. No GitHub Pages/Cloudflare deployment was performed.
- Built 22-route cPanel ZIP with Apache 301/410/404/security/noindex configuration. Private database/uploads/config stay outside public_html. Zip omits legacy Cloudflare runtime and secrets.
- PHP 8.4.24 extracted from official Debian packages after SHA-256 verification. All eight PHP source files pass syntax validation. Three PHP regression checks pass: syntax; actual SQLite/private configuration/idempotency/rate limits/link expiry/retry; actual HTTP session/multipart upload, duplicate receipts, native HTML POST and escaped error restoration.
- Initial HTTP verification failed because the local PHP runtime's compiled session directory was unwritable. Configured a private temporary session directory for local tests; host session permissions must be checked on staging. Receipt callback used preg_replace with a closure; corrected to preg_replace_callback, then the HTTP receipt test passed. A Vite development pre-transform error was also corrected by emitting its absolute allowed module path.
- Native mail handoff is controlled in unit tests; local HTTP tests retain queued notifications when the test machine has no sendmail. No recipient mailbox delivery claimed. Interrupted native-mail handoffs require operator review rather than automatic resend.
- Browser regression before the Vite-path correction: 33 passed. Clean rerun and final mobile Lighthouse results follow. Actual Apache/cPanel/HTTPS/mail acceptance remains blocked by missing staging access, not by Cloudflare authentication.

- Final cPanel correction retest: lint, 22-route build/HTML/content gates, all 33 browser checks and all 21 unit/integration checks pass. No Vite pre-transform errors remain. Linkinator: 34 local links, zero broken. Archive inspection confirms no runtime config, customer storage or Cloudflare deployment files. SHA-256 is committed beside the ZIP.
- Latest mobile Lighthouse: home 100/100/100/66; contact 99/100/96/66; renovations 100/100/100/66; project template 99/100/100/66 (performance/accessibility/best practices/SEO). Preview noindex warning remains visible. No real cPanel server, public-host or mailbox result is claimed.
- Cloud environment install/start draft was saved with cPanel/PHP packaging instructions. Local PHP bootstrap and packaging commands were executed successfully. Existing Cloudflare credential declarations are obsolete and unused; the available configuration API cannot delete declarations.

## GitHub Pages preview correction

- User screenshot showed Pages set to GitHub Actions but no deployment. Added a real build/upload/deploy workflow; cPanel remains the full PHP host.
- Repository-base build, HTML validation and link/content gate pass for all 22 routes. Chromium checked every prefixed route with axe, local asset responses and navigation prefixes: zero violations, page errors or HTTP failures. Static contact fallback is visible and online submission stays hidden. The first local axe harness required an explicit browser context; corrected the harness and reran successfully.
- Backend fetch is compiled out of the static preview. cPanel package explicitly builds with root base and PHP-enabled configuration. No production domain/cPanel cutover is performed.
- Direct Actions API and public-preview HTTP inspection remain denied by the network proxy (CONNECT 403). Workflow and deployment status will not be described as successful without evidence.

## Photographic construction rebuild — 01/10/2026

- Replaced concept artwork and the empty portfolio with 16 selected source-site photographs and the original logo. A dedicated copywriter rewrote home/about/service/portfolio/process/contact content using archived source facts; testimonial wording is preserved.
- Root-path cPanel package: 22-route build, HTML validation, metadata/internal-link/content gates and lint pass. All 21 unit/PHP/integration checks pass. The image test proves that a fresh build can reuse committed derivatives after the private original is removed.
- All 34 browser checks pass with zero axe violations and page errors. Photographs decode successfully on every photographed route; the portfolio contains all 16. Full-page screenshot checks now explicitly load every lazy image at 360, 390, 768, 1024, 1440 and 1920 widths. Committed screenshots show actual loaded images.
- First mobile Lighthouse run passed category thresholds but revealed CLS 0.144 on service/gallery pages. The JS-free mobile menu initially appeared before module startup. Added a same-origin blocking boot script to set the enhancement class before first paint while preserving real no-JS navigation; reran the browser suite and Lighthouse.
- Final mobile scores (performance/accessibility/best practices/SEO): home 100/100/100/69; contact 100/100/96/69; renovations 100/100/100/69; construction gallery 100/100/100/69. CLS is 0 on all four. Preview noindex remains deliberate; production SEO is not claimed.
- Repository-prefixed Chromium checks passed for all 22 routes and 70 image derivatives/OG assets, with every srcset correctly prefixed and zero axe violations, page errors or HTTP failures. Static contact submission remains disabled. The latest Pages deploy is inspected independently after push; direct public-preview HTTP remains blocked by the environment proxy. cPanel host/mail verification still requires staging access.

## Editorial construction redesign — 01/10/2026

- Replaced the rejected overlay/card-grid homepage with a split opening, clear photographs, warm mineral palette, Bodoni Moda headings, a compact service/photo index and staggered selected work. Rebuilt shared styling across all 22 routes; portfolio photographs retain natural proportions.
- Inspected loaded desktop/mobile screenshots for home, services, renovations, about, portfolio and contact. Corrected orphaned service-heading location text and the footer’s email wrapping. All six homepage viewports pass overflow checks. Mobile/desktop inner-page checks report no horizontal overflow.
- All 35 browser checks pass, including route accessibility, no-JavaScript content/navigation, menu keyboard behaviour, form brief handling, consent, photo decoding and the new keyboard/pointer service preview. All 21 unit/PHP/integration checks pass. Lint, 22-route build, metadata/internal-link/content checks and HTML validation pass.
- Final mobile Lighthouse performance/accessibility/best practices/SEO: home 100/100/100/69; contact 100/100/96/69; renovations 100/100/100/69; construction gallery 99/100/100/69. CLS is 0.00033 on home and 0 on the other three. Preview SEO remains intentionally blocked by noindex. These scores verify technical behaviour, not aesthetic acceptance.
- The cPanel ZIP has been rebuilt for root paths and its checksum is verified. Repository-prefixed Chromium checks pass for all 22 routes and 70 image/OG exports, with correct srcsets, no mobile overflow, zero axe violations and no page/HTTP errors. The resulting GitHub Pages deployment is checked independently after push. Actual cPanel staging/Apache/HTTPS/mail delivery remains pending host access.

## Consolidated Liquid Glass beta — 04/10/2026

- 48 browser checks pass, including all 24 routes, keyboard/no-JS behaviour, axe, loaded photographs, six-width complete-row geometry, exact original contact URLs, service preselection, query-free sharing, simulated Formspree acceptance/rejection and consent-gated direct GA4. No real enquiry or analytics event is sent.
- 24 unit/PHP checks pass, including native PHP/SQLite receipt/storage paths, nine-service whitelist, visible FAQ schema, unique metadata and Formspree configuration.
- First browser run identified the floating WhatsApp control outside a landmark and a Vite environment loader assigning the string undefined. Fixed the landmark and conditional assignment, restarted the server and reran all 48 successfully. Lint found three duplicate selectors; removed them and reran successfully.
- Mobile Lighthouse: home 99/100/100/69; contact 100/100/96/69; renovations 99/100/100/69; construction gallery 100/100/100/69 (performance/accessibility/best practices/SEO). CLS is 0.00033 on home and zero on the other three. Beta noindex explains SEO warnings.
- The live raw-document audit initially hit gzip decoding; enabled compressed response decoding and completed all 64 requests. Raw HTML results do not establish rendered UX, ranking or business credentials.
- Six social PNG exports render at their declared dimensions with decoded source photographs and original contacts. No publication occurs.

- Final cPanel rebuild and checksum, 24-route HTML/metadata/link/banned-copy gates and lint pass. Compiled repository-base Chromium verification checks all 24 routes and 70 responsive image/OG exports with zero axe violations, page errors or HTTP failures. Contact fallback is visible; no unconfigured online submission is offered.

## Photo consistency correction — 05/10/2026

- User screenshot exposed letterboxing and baked-in blurred borders despite equal card frames. Inspected all selected source images; ten exports contain padding. The old test verified boxes, not the photograph inside each box.
- Shared no-JavaScript CSS crops exclude verified padding areas and use a consistent 4:3 frame on all photographed routes. Homepage services are nine text-only tiles; full service and portfolio photographs remain available. Source files are unchanged.
- Strengthened the existing six-width, all-route browser check: each photograph frame must be 4:3 and its visible content rectangle must cover every frame edge. Existing complete-row, accessibility and contact regression checks remain.
- Initial lint caught excessive numeric precision; changed the aspect ratio to exact CSS arithmetic. A second opening capture immediately after a full-page screenshot showed incomplete raster painting; checked the independently decoded opening and captured it before the full-page shot. This capture artefact is not presented as a published-page failure.

- Final retest: all 48 browser checks and 24 unit/PHP checks pass; build, 24-route metadata/links, HTML, banned-content and lint gates pass. Loaded desktop/mobile home, service and portfolio screenshots inspected, alongside homepage captures at all six widths. No partial rows or uncovered photograph edges occur.
- Mobile Lighthouse results (performance/accessibility/best practices/SEO): /services/renovations-alterations/ 100/100/100/69; /projects/ 100/100/100/69; / 91/100/96/69; /contact/ 99/100/96/69; /projects/project-preview/ 99/100/100/69. Preview noindex warnings remain deliberate.

- Final repository-prefix check: all 24 compiled routes and 70 image/OG exports pass with zero axe violations, page errors or HTTP failures. cPanel archive checksum verifies. The ten-image generation brief uses consistent 2048 × 1536 PNG sizing and records generated-image provenance requirements.

## Supplied image batch — 05/10/2026

- Received and visually inspected all ten supplied PNGs, each 2400 × 1792. Recorded canonical Drive provenance, descriptive filenames and SHA-256 hashes. No filler borders or embedded text appear in this batch.
- Integrated one labelled hero illustration and nine matching service illustrations. Actual portfolio photographs remain separate. Added rendered-page and browser provenance checks.
- All 49 browser checks and 25 unit/PHP checks pass. All 24 routes have complete rows and no horizontal overflow at 360, 390, 768, 1024, 1440 and 1920 pixels. Loaded desktop/mobile opening and service screenshots inspected and updated.
- Build, metadata/links, HTML, banned-copy and lint gates pass. Five-route mobile Lighthouse scores (performance/accessibility/best practices/SEO): home 99/100/96/69, contact 99/100/96/69, renovations 96/100/100/69, project preview 98/100/100/69, portfolio 100/100/100/69. SEO 69 reflects deliberate beta noindex, not production indexing verification.
- The initial 2048-pixel hero WebP exceeded the 200 KB budget. Retained a 2048 AVIF and capped the WebP fallback at 1600; all final hero variants meet the budget. Source PNG quality remains unchanged. cPanel ZIP rebuilt and checksum verified.
- Public account activation and real recipient delivery remain outstanding as documented in HANDOVER.md. Repository-prefixed and published-beta verification are checked separately before the final publishing receipt.
- GitHub Pages build verification passed for all 24 repository-prefixed routes and all 179 image/OG files, with correct responsive srcsets, zero axe violations, page errors or HTTP failures.

## Repository URL change — 05/10/2026

The user renamed the existing repository to logiagenesis/regardin. Updated Git origin and current beta documentation. Pages build/check now derive SITE_BASE from the repository name rather than the old hard-coded path. The /regardin/ build passes 24-route metadata/link, HTML, banned-copy and lint gates; all 49 browser checks and 25 unit/PHP checks pass. Homepage canonical/social URLs use the new address with no obsolete path. The first local prefix verification used a preview server with the root base; corrected the server base before rerunning. Published deployment and remote commit verification are reported in the push receipt.

The corrected /regardin/ preview passes all 24 repository-prefixed routes and 179 image/OG asset requests, with zero axe violations, page errors or HTTP failures.
