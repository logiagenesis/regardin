# Handover — 05/10/2026

The consolidated project is regardin, on main. Both supplied repositories and Drive documents are reconciled in docs/project-integration.md. The source scaffold's Node pin, banned-copy checker and command aliases are integrated into the fuller application without rewriting repository history.

## Website and design

24 routes include nine source-grounded services. The homepage has nine complete service tiles and six selected photographs; the 16-photo portfolio uses complete rows. Geometry is checked across every marked grid on every route at six widths. Subtle Liquid Glass appears in navigation and controls, with solid accessibility fallbacks. Original logo, photographs, +27 79 454 9780 and regardbothma@icloud.com are retained. WhatsApp, phone, email, quote links and native/copy/WhatsApp portfolio sharing are implemented.

SEO metadata, source-grounded business/service schema, visible-FAQ schema, social cards and canonical/base handling are checked. The beta deliberately remains noindex with an empty sitemap. Six concrete social artwork exports and captions accompany paused Google Ads and group-marketing plans. No campaigns, social posts or group messages are sent.

## Contact and Google integrations

Formspree is supported through native HTML POST and progressive AJAX. No endpoint has been provided, so email-brief/call/WhatsApp fallback remains active. Synthetic tests cover accepted response, rejection, preserved inputs and duplicate prevention; no actual Formspree mailbox delivery is claimed. Attachments are excluded from the Formspree adapter until its upload plan is confirmed.

Consent-gated direct GA4 or GTM and Search Console HTML verification configuration are implemented. Real identifiers, approvals and account access remain unavailable; tracking defaults off. Build variable instructions and required recipient/property checks are in docs/marketing-activation.md. No passwords or secret keys are needed for these public identifiers.

## Hosting

Shareable beta: https://logiagenesis.github.io/regardin/ . Pushes to main trigger GitHub Pages. The current remote SHA and workflow/public checks are reported after publishing; an earlier deployed beta was reachable during this audit. Full production hosting remains user-confirmed cPanel. releases/regardin-cpanel-preview.zip and its checksum package root-path static pages, Apache configuration and the private PHP/SQLite enquiry backend. When Formspree is configured, it takes precedence for contact submission.

No live WordPress, DNS, mail or domain cutover occurs. Real cPanel PHP/session/Apache/HTTPS and mailbox acceptance require staging access; private configuration, storage and retry cron must be set up using docs/cpanel-deployment.md. No secrets, original private photos or enquiry records are committed.

## Audit and verification

The current read-only audit fetched 44 original-site URLs (44 HTTP 200) and 20 competitor homepages (19 HTTP 200, one 503). Individual measurements and limitations are in docs/live-audit-04-10-2026.csv and docs/website-audit-04-10-2026.md. Nine Drive audits and the connected Google Docs prompt were read; the original attachment remains unchanged.

49 browser checks and 25 unit/PHP checks pass for the current image release; results are recorded in docs/qa-log.md. Build, HTML, metadata/links, banned-copy and lint gates pass. Representative mobile Lighthouse performance is 96–100, accessibility 100, best practices 96–100; deliberate beta noindex produces SEO 69. Complete final packaging, repository-base verification and release results are recorded in docs/qa-log.md and the publishing receipt.

Outstanding external items: Formspree endpoint/recipient receipt, Google identifiers and property verification, active WhatsApp account delivery, cPanel staging, source-photo public campaign permissions, business/legal/privacy review and later authorised production indexing. These do not prevent viewing the beta.

## Photo presentation correction — 05/10/2026

The user rejected the mismatched visible photo areas and blurred padding. The earlier equal-frame tests did not catch this aesthetic defect. Ten square source exports contain baked-in blurred padding; the previous portfolio also letterboxed portrait photos. A shared CSS crop frame now displays only each real photograph area at 4:3 throughout hero, service, selected-work and portfolio pages. Source images are neither edited nor stretched. The homepage service section is now a nine-tile text index to reduce photographic clutter. Complete rows remain mandatory. Added crop-coverage assertions to the six-width route tests and refreshed loaded screenshots. Contact integrations and outstanding account identifiers remain as documented above.

The requested one-batch image specification is in docs/IMAGE_GENERATION_BRIEF.md: ten named 2048 × 1536 PNGs with shared art direction and individual prompts. Returned generated images will be reviewed as service/brand illustrations, with provenance distinct from actual portfolio photographs. The returned batch is now integrated as described below.

## Supplied illustration batch — 05/10/2026

All ten supplied Drive PNGs have been received and visually reviewed: one hero and nine service illustrations, each 2400 × 1792. The homepage hero, service hub and individual service lead images use this batch in uniform 4:3 frames. Visible labels and alt text identify generated illustrations; the original 16 portfolio photographs and six homepage work photographs remain actual source-site evidence. The homepage retains its nine text service tiles. Responsive AVIF/WebP derivatives include 2048-pixel versions, with hero variants constrained to 200 KB. Source filenames, dimensions, Drive provenance and SHA-256 checksums are recorded in docs/illustration-manifest.csv; source PNGs remain in the private raw archive.

## Repository rename — 05/10/2026

The user renamed the existing repository to logiagenesis/regardin. Git origin now uses https://github.com/logiagenesis/regardin.git, and the beta URL is https://logiagenesis.github.io/regardin/. The Pages build/check base is derived from the GitHub repository name so future renames do not retain obsolete asset paths. Repository history and main remain intact. Current client-facing links and build instructions use the new address; historical source references retain their original names.

## Full control verification — 05/10/2026

The user's request to test every button is recorded in docs/functional-audit-05-10-2026.md. Live desktop/mobile verification covers 1,034 rendered link clicks and all 29 distinct navigation destinations at both widths, menus, FAQ panels, privacy dialogs, contact validation, brief copying and portfolio sharing. Added persistent interaction tests for these controls plus email composition and permission failures. The expanded browser checks (55 full-suite plus one targeted), 25 unit/PHP checks and required build/HTML/link/lint gates pass. No application or styling fix was needed. Live form delivery and Google accounts remain unconfigured as described above; tests do not claim message or mailbox receipt.

## Flagged homepage photos — 05/10/2026

Browser comments marked selected-work cards five and six as poor quality. Replaced pool-work and boundary-wall homepage selections with custom-braai and building-exterior, updating headings/captions to describe those genuine source-site photos. Sources are 1440 × 1800 and 1206 × 898, respectively. Both select 800-pixel AVIF at the user's 968-pixel viewport with device scale factor 2. The six-card grid still has two complete desktop rows of three. Loaded 968/mobile/desktop captures were visually reviewed; updated screenshots and cPanel package/checksum accompany the release. QA results are recorded in docs/qa-log.md.
