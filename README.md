# JFPF Solutions — website

Modern, bilingual (EN/PT) static site for JFPF Solutions — a digital studio for web & mobile
development. No WordPress, no build step. Just open `index.html`.

## Structure
```
jfpfsolutions-site/
├── index.html          One-page site: Hero, Services, Process, About, Contact
├── css/styles.css      Styling (dark, green accent, monospace labels; system fonts only)
├── js/main.js          Language toggle, mobile nav, contact form
└── assets/favicon.svg  JF monogram favicon
```

## Bilingual (EN / PT)
- Every translatable string has `data-en` and `data-pt` attributes; `js/main.js` swaps them via the
  header toggle and remembers the choice (localStorage). First visit auto-detects browser language.
- To edit copy, change **both** attributes on the element.

## Contact form
Ships in **mailto fallback** mode (opens the visitor's email app to `jfpfsolutions@gmail.com`).
To receive submissions directly in the inbox with no server:
1. Create a free access key at https://web3forms.com using `jfpfsolutions@gmail.com`.
2. Paste it into `CONFIG.WEB3FORMS_ACCESS_KEY` at the top of `js/main.js`.
3. First submission triggers a one-time activation email — click it (check spam).
A hidden honeypot field blocks basic spam bots.

## Fill in later
- **Portfolio:** removed until there are a few projects to show. The TMPortugal entry is in git
  history (commit f4831d1) if you want to bring the section back.
- **Logo:** currently a monospace ">_ jfpf/solutions" wordmark (and a matching favicon). Swap for a real logo image if you get one.
- **Social links / phone:** add to the contact section and footer when ready.

## Deploy
Any static host: Netlify, Vercel, Cloudflare Pages, GitHub Pages, or standard web hosting via FTP.
Point the `jfpfsolutions.com` domain at it (the domain currently doesn't resolve — renew/re-point DNS).
