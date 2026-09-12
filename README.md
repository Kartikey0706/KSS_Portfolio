# Portfolio-Clean
**Kartikey Singh Suryavanshi — Frontend Developer Portfolio**

A clean, plain HTML/CSS/JS portfolio. No frameworks, no build tools, no dependencies to install.
Just open `index.html` in any browser and it works.
---

## Quick Start

```bash
# Simply double-click index.html  —OR—
# Serve locally (optional, for live-reload):
npx serve .          # Node.js
python -m http.server # Python 3
```

---

## File Structure

```
Portfolio-Clean/
│
├── index.html          ← MAIN FILE — all sections live here
│
├── css/
│   ├── style.css       ← Core styles: variables, layout, components
│   ├── animations.css  ← Keyframes + reveal/entrance animations
│   └── responsive.css  ← All media queries (tablet + mobile)
│
├── js/
│   ├── script.js       ← Navbar, typed text, counters, cursor, form
│   ├── animations.js   ← Scroll reveals, spotlight cards, magnetic btns
│   └── particles.js    ← Background orb parallax (+ optional canvas dots)
│
├── assets/
│   ├── images/         ← Drop project screenshots here
│   ├── icons/          ← Custom icons (if not using devicons CDN)
│   ├── logos/          ← Company/cert logos
│   └── fonts/          ← Self-hosted fonts (if not using Google Fonts)
│
├── data/
│   └── projects.json   ← Project metadata reference
│
└── README.md           ← This file
```

---

## Where to Edit What

| What you want to change | Where to go |
|---|---|
| Your name, bio, email | `index.html` — search for "Kartikey" |
| Hero typed words | `js/script.js` → `TYPED_WORDS` array (line ~100) |
| Color scheme | `css/style.css` → `:root {}` CSS variables at the top |
| Add a project | `index.html` → Projects section — copy a `.project-card` block |
| Add a skill icon | `index.html` → Skills section — copy a `.tech-card` block |
| Add a certification | `index.html` → Certifications section — copy a `.cert-card` block |
| Add a job / internship | `index.html` → Experience section — copy a `.timeline-item` block |
| Change animation speed | `css/animations.css` → edit the relevant `@keyframes` or `transition` |
| Disable orb parallax | `js/particles.js` → set `ENABLE_ORB_PARALLAX = false` |
| Enable canvas dots | `js/particles.js` → set `ENABLE_CANVAS_PARTICLES = true` |
| Fix layout on mobile | `css/responsive.css` → find the right breakpoint |
| Contact form behavior | `js/script.js` → mailto action opens the visitor's email client |

---

## External Dependencies (CDN — no install needed)

| Library | Purpose | URL |
|---|---|---|
| Google Fonts (Poppins) | Typography | `fonts.googleapis.com` |
| Devicons v2.15.1 | Tech stack icons | `cdn.jsdelivr.net/gh/devicons/devicon` |

Both load from `<link>` tags in `index.html`. No npm, no build step.

---

## Customization Guide

### 1. Change Your Name / Info
Search for "Kartikey" in `index.html` and replace every occurrence with your name.
Also update:
- `<title>` in `<head>`
- `<meta name="description">` and `<meta property="og:*">`
- Email address (`prjartikey09@gmail.com`)
- GitHub and LinkedIn URLs (`Kartikey0706` / `kartikey-suryavanshi-a1a424357`)

### 2. Change Colors
Open `css/style.css` and edit the `:root {}` block at the top:
```css
:root {
  --primary:   #5EEAD4;  /* Teal — main accent */
  --secondary: #8B5CF6;  /* Purple */
  --accent:    #60A5FA;  /* Blue */
  --bg:        #030712;  /* Background */
}
```

### 3. Add a Project
In `index.html`, find the Projects section and copy-paste a `.project-card` div.
Edit the title, description, tags, and button URLs.
Also update `data/projects.json` to keep your data organized.

### 4. Contact Form
The contact form opens the visitor's email client with the message prefilled using a `mailto:` action.

### 5. Deploy
Drop the entire `Portfolio-Clean/` folder onto any static host:
- **GitHub Pages**: push to a `gh-pages` branch
- **Netlify**: drag & drop the folder at app.netlify.com
- **Vercel**: `vercel --prod`
- **Cloudflare Pages**: connect your GitHub repo

---

## Browser Support
Chrome 90+, Firefox 88+, Safari 14+, Edge 90+.
(Uses CSS custom properties, backdrop-filter, IntersectionObserver — all widely supported.)

---

*Built by Kartikey Singh Suryavanshi · Frontend Developer*
