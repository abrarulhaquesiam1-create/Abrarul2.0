# Abrarul Haque Siam — Portfolio

A single-page, responsive creative portfolio.

## Files
- `index.html` — page structure and metadata
- `style.css` — visual design and responsive layout
- `script.js` — Three.js particle field and GSAP motion
- `assets/siam-portrait.png` — the single portrait used on the website

## Run locally
Open `index.html` in a modern browser. For best results, use a local static server or deploy the folder to Vercel / Netlify / GitHub Pages.

## Deploy to Vercel
1. Upload the complete `siam-portfolio` folder to a GitHub repository.
2. Import that repository in Vercel.
3. Keep the framework preset as **Other**.
4. Leave the build command empty and set the output directory to `.`.
5. Deploy.

The Three.js and GSAP libraries and Google Fonts load from CDNs, so those effects and fonts need an internet connection. The page still has a CSS-based visual fallback if the animation libraries fail to load.

## Personalization
The site currently uses the supplied first portrait only, following the one-photo direction. Edit the text in `index.html` if you want to change the biography or tagline.
