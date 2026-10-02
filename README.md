# Brand Mark website

Website for Brand Mark, Spectrum Center, Old Bus Stand, Berhampur. Built with Astro, GSAP and Lenis. Hosted on Vercel; every push to `main` goes live automatically.

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
```

## Updating content

| What | Where |
| --- | --- |
| Phone, WhatsApp, address, hours | `src/data/site.ts` |
| Brands and logos | `src/data/brands.ts` + logo files in `public/logos/` |
| Departments | `src/data/departments.ts` |
| New arrivals | `src/data/arrivals.ts` + photos in `src/assets/photos/` |
| MITTY products | `src/data/mitty.ts` + photos in `src/assets/mitty/` |

To swap a photo, replace the file in `src/assets/photos/` with one of the same name (portrait photos work best), then push.

Stock photography is from Unsplash (free licence); sources are listed in `src/data/photo-credits.json`. Replace with real store photos whenever possible.
