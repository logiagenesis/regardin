# Marketing activation and account handover

Beta: https://logiagenesis.github.io/REgardin_GPT/ . Production remains the separately approved cPanel deployment. The beta is deliberately noindex; do not run paid traffic to an unfinished beta.

## Formspree

Provide the public `https://formspree.io/f/FORM_ID` endpoint. Set `FORMSPREE_ENDPOINT` as a GitHub repository variable for Pages, or in local build configuration for cPanel; alternatively edit `src/data/integrations.json`. This is an identifier, not a secret. Verify the recipient mailbox inside Formspree, configure spam/allowed-origin controls and review provider retention before enabling.

The configured form works through native HTML POST and progressive JavaScript. Success is displayed only after an accepted response; failures preserve inputs, and ambiguous timeout asks the visitor to check before resending. The Formspree adapter excludes file attachments; confirm a paid upload plan separately before introducing uploads. Synthetic tests verify the adapter; actual inbox delivery is still unverified. Complete one authorised test and verify both Formspree receipt and the monitored mailbox. Until then the beta offers email-brief preparation, call and WhatsApp.

## Analytics and Google Ads

Supply either `VITE_GA4_ID` (G-…) or `VITE_GTM_ID` (GTM-…). Set `VITE_ANALYTICS_ENABLED=true` and `VITE_MEASUREMENT_MODE=production` only for approved measurement. GTM takes precedence if both identifiers are supplied. Default preview configuration loads neither. The consent control starts denied and loads analytics after acceptance; advertising storage, user data and personalisation remain denied.

Events: `generate_lead` after accepted enquiry; `click_call`, `click_whatsapp`, `click_email`; limited service/count context. No form contents, names, phone numbers, email addresses, uploaded files or query-string values are sent. Direct GA4 page views use origin/path only. In the account disable automatic form interaction capture and query-bearing page-view duplication. If using GTM, configure only approved tags and override page_location to origin/path; this site's allowlist cannot constrain arbitrary container code.

Use one accepted-enquiry conversion as the primary Ads conversion, imported from GA4 or implemented through the chosen approved container. Call/WhatsApp clicks are secondary intent events, not proof of an actual conversation. Check Tag Assistant/DebugView and Google Ads diagnostics on the authorised deployment before enabling campaigns. `ads/google-ads-plan.md` contains paused draft copy, keywords and landing pages. Geographic targeting, budgets, negatives, account billing and spend require owner decisions; none are assumed or activated.

## Search Console and SEO

Set `GOOGLE_SITE_VERIFICATION` to the public HTML token, or use `searchConsoleVerification` in integrations.json. Build supports the verification meta tag; ownership is not established by code alone. Domain verification through DNS is a separate account step and no DNS is changed here. On approved production, check canonical URLs, remove preview noindex through the production build gate, submit the production sitemap, inspect representative pages and monitor indexing. The beta sitemap stays empty to prevent accidental preview indexing.

24 routes have unique titles/descriptions, canonical URLs, Open Graph and Twitter metadata. Source-grounded business/service data and visible-FAQ schema are checked. Service/portfolio/contact internal links, semantic headings, responsive images and performance checks are implemented. Ranking and rich-result eligibility remain Google's decisions.

## Social and group marketing

Concrete artwork exports and captions are in `social/exports` and `social/launch-pack.md`. Originals, client/project context and publication rights must be confirmed before public photo campaigns. Share controls use native sharing or a copied portfolio URL, with a WhatsApp option. No tracking query or private project brief is copied into shared links.

Use campaign URLs with public campaign labels only, for example `?utm_source=facebook&utm_medium=social&utm_campaign=site_beta` during owner review. Replace the beta origin with the approved production URL for launch. Group posts should explain the relevant service, show one permitted photograph and give one clear contact route; follow group rules and avoid unsolicited messages. No social accounts or groups have been contacted.

## External evidence still required

Formspree endpoint and actual recipient delivery; GA4/GTM property and diagnostic event receipt; Search Console ownership and indexing; WhatsApp account/message delivery; approved production host and legal/privacy review. These cannot be honestly claimed from local tests or unavailable account access.
