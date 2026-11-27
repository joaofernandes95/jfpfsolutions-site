# JFPF Solutions — website

Modern, bilingual (EN/PT) static site for JFPF Solutions — a digital studio for web & mobile
development. No WordPress, no build step. Just open `index.html`.

## Structure
```
jfpfsolutions-site/
├── index.html               Home: Hero, Services, Casa 3D, Apps, Process, About, Contact
├── casa-3d/index.html       Casa 3D: the 3D smart-home dashboard we install on Home Assistant
├── indigo-iptv/index.html   Indigo IPTV app page
├── luar/index.html          Luar app page
├── luar/privacy/index.html  Luar privacy policy
├── cuco/index.html          Cuco app page (also the App Store support and marketing URL)
├── cuco/privacy/index.html  Cuco privacy policy
├── privacy/index.html       Indigo IPTV + website privacy policy
├── css/styles.css           Styling (dark, green accent, monospace labels; system fonts only)
├── js/main.js               Language toggle, mobile nav, Apps menu, contact form
└── assets/                  Favicon, plus one folder of icons/screenshots per app (and casa-3d/)
```

## URLs: don't move these
The App Store / Google Play listings point at these addresses, so the folders must keep their names:
`/`, `/casa-3d/`, `/privacy/`, `/indigo-iptv/`, `/luar/`, `/luar/privacy/`, `/cuco/`, `/cuco/privacy/`.

## Language links
Every page follows the visitor's choice, then their browser's language. A link can choose it:
`https://jfpfsolutions.com/casa-3d/?lang=pt` always opens in Portuguese (handy for sharing).

## Casa 3D screenshots
`assets/casa-3d/` shows the example apartment ("Apartamento T3 (exemplo)", house-control's
`demo-t3` plan), never a client's home. They were taken from house-control's `embed.html` with
that plan, in the evening, with every light on.

## Store links
- Luar (Apple TV): https://apps.apple.com/app/id6832809360. It's on `luar/index.html` (hero badge and footer) and the Luar card in `index.html`.
  The link has no country in it, so Apple opens the visitor's own store.

## Adding an app
The header has a single **Apps** menu, so it stays the same size however many apps there are.
For a new app, add it in four places (copy an existing entry):
1. The Apps menu in the header of `index.html` (`<li class="nav-menu">`).
2. The same menu in `privacy/index.html` (links start with `../`).
3. The **Apps** column of the footer in `index.html`.
4. A `.product` card in the `#apps` section of `index.html`.

Below 1040px wide the header links fold behind the menu button. The widest header today (an app
page in Portuguese) needs about 1010px, so if you add links to a page's header, check it in PT
at around 1050px.

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
