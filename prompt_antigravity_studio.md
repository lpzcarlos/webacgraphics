# PROMPT ANTIGRAVITY — MUSIC DESIGN AGENCY WEBSITE

Build a full Next.js website for a graphic design agency focused on music artists. The site must be visually extraordinary — dark, cinematic, and editorial in style. Every section should feel like a high-end music industry experience.

---

## TECH STACK
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion for animations
- Custom font: Mont (import from Google Fonts fallback: "Montserrat" with weights 400, 600, 700, 800, 900 — but define it as --font-mont in CSS variables for easy swap)

---

## COLOR PALETTE & DESIGN TOKENS

```css
:root {
  --bg: #000000;
  --bg-elevated: #0a0a0a;
  --bg-surface: #111111;
  --text-primary: #FFFFFF;
  --text-secondary: #999999;
  --text-muted: #444444;
  --accent: #FFFFFF;
  --accent-hover: #E0E0E0;
  --border: rgba(255,255,255,0.08);
  --border-hover: rgba(255,255,255,0.2);
  --glow: rgba(255,255,255,0.04);
  --nav-bg: rgba(0,0,0,0.75);
  --nav-border: rgba(255,255,255,0.1);
}
```

---

## NAVBAR

Floating pill-shaped navbar, frosted glass effect (`backdrop-blur: 20px`, `background: rgba(0,0,0,0.7)`, border: 1px solid `var(--border)`), fixed at top, centered horizontally with auto left/right margins (NOT full width).

Layout: `[Links left]` `[LOGO CENTER]` `[Links right]`

- Links left: "Work" | "Artists"
- Logo center: SVG placeholder logo text "STUDIO" in Mont font, bold, white
- Links right: "Clients" | "Contact"

Active link highlighted in white, others in `var(--text-secondary)`. Subtle hover underline animation. On mobile: hamburger menu.

---

## HERO SECTION (WOW effect)

Full viewport height. Background: pure black with a subtle animated grain texture overlay (CSS noise filter or SVG feTurbulence).

Center content:
- Small label text above: "CREATIVE AGENCY · MUSIC INDUSTRY" in uppercase, letter-spacing: 0.4em, color: `var(--text-muted)`, fade-in delay 0.2s
- Main headline: Two lines — "WE DESIGN" then "THE SOUND" — massive typography (clamp 5rem–12vw), Mont font weight 900, staggered word-by-word reveal animation (each word slides up from below with opacity 0→1, staggered 0.1s delays)
- Subline below: "Visual identity, campaigns & art direction for artists that lead." — Mont Regular, 1.1rem, color: `var(--text-secondary)`, fade in after headline
- CTA button: "See Our Work" — outlined white pill button, hover fills white with black text, subtle glow pulse animation on hover
- Bottom scroll indicator: small animated chevron

After 1.5s, a very subtle horizontal scanline sweep animation plays across the hero (CSS keyframe, 1px white line at 2% opacity sweeping top to bottom, infinite loop every 8s).

---

## SECTION: "WHAT WE DO" (Who We Are)

Below hero, padding 120px vertical.

Left: large number "01" in Mont 900, color `var(--text-muted)`, 6rem.

Right:
- H2: "Crafting Identities That Move Culture" — Mont 700, 2.5rem
- Paragraph text about the agency (placeholder): "We are a design studio specialized in the music industry. We create visual identities, album artwork, tour branding, social content, and campaigns for artists who define their era."
- 3 service pills horizontally: "Visual Identity" · "Campaign Design" · "Art Direction" — outlined white pills

Scroll-triggered fade+slide-up animation on this section.

---

## SECTION: "WORK" — Design Gallery

Title: "SELECTED WORK" — centered, Mont 900, with a thin horizontal rule line on each side.

Grid layout: Masonry-style asymmetric grid (CSS Grid with varied row spans). Images come from `/media/disenoslanding/` folder — use Next.js `<Image>` with placeholder blur.

On hover each item:
- Scale up slightly (1.03)
- Overlay appears with dark semi-transparent background
- Project name and category label fade in (centered on image)
- Subtle white border appears around card

Entry animation: items stagger-fade in as user scrolls into view using Intersection Observer.

---

## SECTION: "CLIENTS" — Logo Ticker (Right to Left)

Title: "TRUSTED BY" — small, uppercase, centered, `var(--text-muted)`.

Infinite horizontal marquee scrolling **RIGHT TO LEFT**, no pause. Logos from `/media/logosempresas/`.

Each logo:
- Default state: show the `_1` (white/monochrome) version — `filter: brightness(1)`, opacity 0.5
- On hover or click: swap to `_2` (full color) version with a smooth crossfade transition (0.3s ease), opacity 1, slight scale-up (1.05)
- Implement swap using CSS `position: relative` with both images stacked, toggle opacity via React state

Logos have generous horizontal padding between them. Two identical rows of logos for seamless loop.

---

## SECTION: "ARTISTS" — Artist Showcase (Left to Right)

Separate from clients section — add a full-width section break with a thin white rule.

Title: "OUR ARTISTS" — centered, Mont 900, large.

Infinite horizontal marquee scrolling **LEFT TO RIGHT** (opposite to clients), slightly faster speed.

Artist items from `/media/iconosartistas/`:
- Circular image crop, diameter ~140px, grayscale filter by default
- On hover:
  - Remove grayscale (full color)
  - Scale up to 1.1
  - Artist name label slides up from bottom of circle with a semi-transparent dark background
  - Smooth transition all 0.4s ease
- On click: navigate to `/artists/[slug]` page

Artist page (`/artists/[slug]`):
- Hero with artist name large, artist image behind
- Below: grid of all related design works filtered for this artist

---

## CONTACT SECTION

Dark elevated background (`var(--bg-surface)`), generous padding.

Left side:
- H2: "Let's Build Something Iconic"
- Subtext: "Tell us about your project. We'll respond within 24 hours."
- Social links row (Instagram, Behance, LinkedIn) as small outlined icon pills

Right side — Contact form (no `<form>` HTML tag, use div + React state + onSubmit handler):
- Input: Name (full width)
- Input: Email
- Input: "Tell us about your project" — textarea, min 4 rows
- Submit button: "Send Message" — filled white button, black text, hover inverse

All inputs: transparent background, white bottom border only (no box border), white text, placeholder in `var(--text-muted)`. Focus state: bottom border glows white.

---

## FOOTER

Minimal. Logo left, nav links center, copyright right. Border-top: `var(--border)`. Background: pure black.

---

## ANIMATIONS SUMMARY

| Element | Animation |
|---|---|
| Hero text | Staggered word reveal (Framer Motion) |
| Sections | Scroll-triggered fade+slide-up (Framer Motion `whileInView`) |
| Gallery items | Staggered grid entrance |
| Marquees | Pure CSS infinite scroll (`@keyframes scroll`) |
| Logo color swap | React state + CSS opacity transition |
| Artist hover | CSS transition + label reveal from bottom |
| Grain texture | CSS animation on SVG feTurbulence filter |
| Scanline sweep | CSS keyframes, repeats every 8s |

---

## FILE STRUCTURE EXPECTED

```
/media/disenoslanding/     → design gallery images
/media/logosempresas/      → client logos (_1 = white, _2 = color)
/media/iconosartistas/     → artist circle images

/data/artists.json         → { slug, name, image, works[] }
/data/clients.json         → { name, logo_white, logo_color }
/data/works.json           → { id, title, category, image, artistSlug }
```

---

## IMPORTANT NOTES

- **NO generic aesthetics.** This must feel like a premium, editorial, music-industry site.
- Font is Mont (use Montserrat as web fallback until custom font `.woff2` files are added via `next/font/local`).
- Background is `#000000` on **EVERY** section — no gray, no off-black except `var(--bg-surface)` for contrast cards.
- All text is `#FFFFFF` primary. Secondary in `#999999`. Never use color for decoration.
- Accent color is **WHITE**. No neon, no gradients unless it's a very subtle noise texture.
- The site must be fully responsive (mobile-first).
- Use Next.js `<Image>` component for all images with proper `width`, `height`, and `alt`.
- Deploy-ready: include `.env.example` if needed, and a basic `README.md`.
- Do NOT use `<form>` HTML tags — use `div` wrappers with React `onClick`/`onChange` handlers.

---

## POST-GENERACIÓN: NOTAS DE IMPLEMENTACIÓN

1. **Fuente Mont**: Descarga los archivos `.woff2` desde [fernava.com](https://fernava.com/mont-font-family-free-download-recursos-para-disenadores-graficos-gratis/), colócalos en `public/fonts/` y reemplaza Montserrat usando `next/font/local` en `app/layout.tsx`.

2. **Imágenes de artistas**: Prepara `data/artists.json` con campos `slug`, `name` e `image` antes de correr el proyecto para que el routing dinámico `/artists/[slug]` funcione desde el primer momento.

3. **Logos**: Asegúrate de que los archivos de logos sigan el naming convention `nombre_1.png` (blanco) y `nombre_2.png` (color) antes de subir el repositorio.

4. **Ajuste marquee**: Si el swap de logos no funciona correctamente, haz un follow-up prompt: *"Fix the logo color swap so both images are stacked using CSS opacity transition, position absolute, not a JS src swap"*.

5. **Sección order recomendado en la landing**:
   - Hero
   - Who We Are
   - Selected Work (gallery)
   - Our Artists (marquee)
   - Trusted By (logo ticker)
   - Contact
   - Footer
