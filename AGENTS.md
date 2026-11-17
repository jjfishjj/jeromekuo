## AI learning strategies
- Keep model calls and prompts in a public, input-validated Cloud Edge Function using the server-only gateway helpers; visitors do not need an account.
- Stream strategy output as newline-delimited events to the browser, propagate explicit cancellation, and never retry automatically to avoid duplicated billing.
- Persist terminal provider-access failures in a service-only table; do not store visitor challenges or generated plans in application tables.
- Localize learning-strategy interface copy in a typed six-language data module and let the server select the response language from a validated language code.