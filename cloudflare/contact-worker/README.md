# Contact form via Cloudflare Email Routing

The form on `/contact/` posts to `https://contact.marynakuzmenko.com/`, a
Cloudflare Worker (`src/index.js`) that emails each submission to
**maryna@petioleapp.com**, sent from **maryna@marynakuzmenko.com**, with the
visitor's address as Reply-To. Formspree is no longer used.

Everything below happens once, in the Cloudflare account.

## 1. Put marynakuzmenko.com on Cloudflare

Email Routing and the Worker's custom domain both need the zone on Cloudflare.
DNS currently lives at Google Cloud DNS.

1. Cloudflare dashboard → **Add a domain** → `marynakuzmenko.com` → Free plan.
2. Check the records Cloudflare imports. Firebase Hosting needs the two `A`
   records for `@` (199.36.158.100 and whatever Firebase lists under
   Hosting → Custom domains) and the `TXT` verification record. Set the
   `A` records to **DNS only** (grey cloud), not proxied, or Firebase's SSL
   certificate stops validating.
3. Change the nameservers at the registrar (Google Domains / Squarespace) to
   the two Cloudflare gives you. Propagation takes up to 24 h; the site keeps
   working throughout because the records are the same.

## 2. Turn on Email Routing

1. Cloudflare dashboard → the zone → **Email** → **Email Routing** → Get started.
2. Let it add the `MX` and `TXT` (SPF) records. There are no existing MX
   records, so nothing conflicts.
3. **Destination addresses** → add `maryna@petioleapp.com` and click the
   verification link that arrives there.
4. **Routing rules** → Custom address `maryna` → Send to `maryna@petioleapp.com`.
   Optionally set the catch-all to the same destination.

After this, anyone emailing maryna@marynakuzmenko.com reaches the Petiole inbox.

## 3. Deploy the Worker

```bash
cd cloudflare/contact-worker
npm install
npx wrangler login
npm run deploy
```

`wrangler.toml` binds the Worker to `contact.marynakuzmenko.com` and to the
verified destination address. Cloudflare creates the DNS record for the
subdomain automatically.

## 4. Deploy the site

Set `contactEndpoint` in `src/_data/site.json` to
`https://contact.marynakuzmenko.com/` (it stays on Formspree until then), and
from the repo root:

```bash
npm run deploy:hosting
```

## Checks

- `curl -X POST https://contact.marynakuzmenko.com/ -F name=Test -F email=you@example.com -F subject=Other -F message=Hello -H "Accept: application/json"` → `{"ok":true}` and an email in the Petiole inbox.
- Submit the real form at https://marynakuzmenko.com/contact/ → lands on `/success/`.
- `npx wrangler tail` in this folder streams live logs if anything fails.

## Notes

- Replying from Gmail will come from maryna@petioleapp.com unless you add
  maryna@marynakuzmenko.com as a "Send mail as" identity; Email Routing is
  receive-only, so that identity needs an SMTP sender (Gmail's own, or a
  service such as Resend) if you want outgoing mail from the new address.
- To add bot protection beyond the honeypot, add Cloudflare Turnstile to the
  form and verify the token in the Worker before sending.
