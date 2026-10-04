# Website audit — 04/10/2026

## Evidence and scope

Both supplied repositories, the preserved master prompt, nine supplied Drive audits, the connected Google Docs prompt, existing source/media inventories, current website HTML and rebuilt pages were reviewed. The new live pass requested all 44 original-site inventory URLs and all 20 competitor homepages. Results are recorded individually in `live-audit-04-10-2026.csv`; fetched HTML remains in ignored research storage.

44 original URLs returned HTTP 200. All 44 returned HTML without a meta description or JSON-LD script; 15 had other than one H1; 118 empty fragment links were counted. These are raw-document measurements, not proof that every fragment link is defective or that a JavaScript-rendered page cannot contain additional content. The earlier rendered archive and source media inventory remain complementary evidence.

19 competitor homepages returned HTTP 200 and one returned 503. Among successful responses, eight lacked a description, six had other than one H1 and six lacked JSON-LD. A server challenge or transient status is not a permanent website defect. No rankings, traffic, conversion rates, credentials or ad spending are inferred from HTML.

## Findings and implementation

| Finding                                                     | Resulting change                                                                               | Verification                                                              |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Seven service cards could leave an incomplete final row     | Nine source-supported categories; decking/pergolas and pool work separated from broader groups | Every marked grid on 24 routes checked at six widths                      |
| Staggered work and masonry conflicted with required balance | Six selected photographs; 16-photo portfolio uses complete equal-height rows                   | Browser geometry assertions and loaded screenshots                        |
| User requested restrained Liquid Glass                      | Translucent navigation and controls, solid readable content, accessibility fallbacks           | Keyboard/axe tests and visual inspection                                  |
| Contact paths lacked WhatsApp                               | Original-number WhatsApp links, floating control and three-action phone bar                    | Exact tel, mail and WhatsApp URL assertions                               |
| Service structured data included invisible FAQ content      | Removed FAQPage from service pages; actual FAQ schema matches visible questions                | Metadata unit checks                                                      |
| Static preview could not execute cPanel PHP                 | Honest email/call/WhatsApp fallback; optional native and AJAX Formspree adapter                | Simulated acceptance, rejection, preserved input and duplicate prevention |
| Analytics supported only a future container                 | Consent-gated GTM or direct GA4, sanitised page URLs, explicit event allowlist                 | Synthetic tracking tests; no real Google traffic                          |
| Preview indexing/canonical handling needed separation       | Empty beta sitemap, noindex, beta canonical/share URLs; production indexing gate retained      | Build and metadata checks                                                 |
| Social templates were empty placeholders                    | Concrete source-photo/guidance exports with original contacts                                  | Local export dimensions and photo decoding                                |

The nine categories are grounded in published scope, not invented service claims. No invented capabilities, warranty, turnaround or accreditation claims are introduced. Existing source statements about wider work are retained without creating unsupported specialist landing pages. Contact details are copied from the original site; active mailbox and WhatsApp delivery still need external confirmation.

## Competition and design decisions

The 20-site matrix and previous findings remain in `competitor-matrix.csv` and `competitor-findings.md`. R+N and Cape Town Timber Decking were additionally read in detail during this revision: clear service categorisation, genuine work imagery and direct enquiry routes inform our hierarchy. Their numerical or performance claims are not copied. The rebuild combines photographic proof, restrained typography and a consistent construction-green identity rather than imitating another business.

Apple materials guidance supports glass on navigation/controls, high contrast and reduced transparency. NN/g supports alignment, hierarchy and meaningful images. Web.dev/Google guidance informs image sizing, explicit dimensions, self-hosted fonts and measurable Core Web Vitals. No aesthetic or search ranking claim substitutes for testing.

## Readiness boundaries

Code readiness is distinct from account activation. Formspree endpoint and recipient verification, GA4/GTM identifier and approval, Search Console ownership token, WhatsApp account confirmation and real cPanel/mail acceptance remain outstanding. The beta remains noindex. See `marketing-activation.md` for exact configuration and account checks; `qa-log.md` records local evidence. No live advertising, social posting, group messaging, budget or domain cutover is performed.
