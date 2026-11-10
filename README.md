# Mayura Looms — "Woven in Peacock Light"
### Award-Level Editorial Scroll Experience for Premium Indian Saree Couture

---

## ✦ Overview

**Mayura Looms** is a bespoke, cinematic e-commerce boutique website showcasing India’s most revered handwoven silk saree traditions (Banarasi, Kanjivaram, Patola, Organza, Chanderi, and Kasavu). Every section is choreographed with 60fps GPU-accelerated scroll animations, responsive layouts, rich micro-interactions, and accessible semantics.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Custom Design System tokens
- **Smooth Scrolling**: Lenis synced directly with GSAP ScrollTrigger ticker
- **Scroll Orchestration**: GSAP 3 + ScrollTrigger (pinning, scrubs, clip-path reveals, parallax)
- **Component Motion**: Framer Motion (drawers, tabs, draggable carousels, custom cursor, modals, toasts)
- **Shader / Canvas**: Three.js GLSL noise cloth shader with CSS fallback and prefers-reduced-motion support
- **Typography**: Next/Font with *Cormorant Garamond*, *Anton*, and *Inter*
- **Icons**: Lucide React

---

## 🎨 Design System & Colour Tokens

Defined in `src/app/globals.css` and `tailwind.config.ts`:

| Token | Hex / Value | Usage |
|---|---|---|
| `--ink` | `#062C30` | Deep peacock ink; primary dark sections, footer, typography on light |
| `--teal` | `#0E6B6B` | Primary heritage peacock teal |
| `--teal-soft` | `#1F8A86` | Secondary / hover teal |
| `--marigold` | `#E8A317` | CTAs, active highlights, accent script words, progress bars |
| `--marigold-lt` | `#F6C65B` | Soft golden shimmer accents |
| `--clay` | `#C8553D` | Sale tags, badges, notifications, secondary accents |
| `--ivory` | `#FBF6EC` | Main opulent background |
| `--blush` | `#F3DCD2` | Soft card panels, capsule backgrounds |
| `--charcoal` | `#1C1917` | High-contrast body copy |

### How to Change Colour Tokens
1. Open `src/app/globals.css` and modify the CSS variables under `:root`:
   ```css
   :root {
     --ink: #062C30;
     --marigold: #E8A317;
     /* update values here */
   }
   ```
2. Open `tailwind.config.ts` and modify the corresponding color values if customized further.

---

## 🎬 How to Replace `hero.mp4`

The Hero section is designed with a plug-and-play `<video>` component with poster fallback:
1. Place your video file at:
   ```
   public/media/hero.mp4
   ```
2. The `<video>` tag in `src/components/sections/HeroSection.tsx` automatically detects and streams `/media/hero.mp4` with `autoplay`, `muted`, `loop`, `playsInline`, and uses `/media/hero-poster.jpg` as the fallback poster if the video is absent or buffering. No code edits required!

---

## 🚀 How to Deploy on Vercel

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository.
4. Framework Preset will auto-detect **Next.js**.
5. Build Command: `npm run build`
6. Output Directory: `.next`
7. Click **Deploy**. The site will deploy instantly with edge caching and static generation.

---

## 🏛 Section Breakdown (Architecture & Animations)

- **[0] Splash Screen (`SplashScreen.tsx`)**:
  Locks scroll for ~2.8s. A delicate marigold thread draws across the screen (`stroke-dashoffset`), while "MAYURA LOOMS" reveals letter-by-letter with an overflow mask. A corner counter increments `00 → 100`, after which the background splits into two vertical curtains that slide apart with `expo.inOut` easing to reveal the hero.

- **[1] Hero Section (`HeroSection.tsx`)**:
  Pinned for ~120vh. The video container scales down from full viewport to an 85% rounded frame (radius 32px) while the Anton headline moves up with parallax. The background cross-fades into a model-in-saree portrait with a blur transition. Includes 3 live animated counters (12,000+ Drapes, 40+ Clusters, 4.9★ Rating) and a continuous spinning badge.

- **[2] Trust Marquee (`TrustMarquee.tsx`)**:
  Velocity-reactive marigold-on-ink band featuring verified authenticity assurances. Speeds up when scrolling fast and flips direction when scrolling up.

- **[3] Six Moods Horizontal Scroll (`SixMoodsSection.tsx`)**:
  Ivory background with subtle 5% paisley texture. The heading "SIX MOODS. Woven to be Remembered" fills with marigold through a scrubbed clip-path. Vertical scroll is pinned to scrub a horizontal track of 6 Arch Cards with inner 0.85x parallax and bottom progress line.

- **[4] New Arrivals & Best Sellers (`NewArrivalsSection.tsx`)**:
  Wavy ivory top divider. Interactive tabs with Framer Motion `layoutId` pill. 4-column responsive grid of Product Cards with 3D cursor tilt (±6°), secondary image crossfade, wishlist particle burst, quick-add sliding pill, and color swatch selectors.

- **[5] The Bridal Collection (`BridalSection.tsx`)**:
  Dark ink theme. Pinned left column with a bride model scaling 1.0 → 1.1 inside a dynamically drawn gold SVG border. Right column contains a draggable horizontal carousel with Framer Motion inertia physics and custom "DRAG" cursor. Floating marigold particles drift at varying parallax speeds.

- **[6] Trend of the Day / Seasonal Special (`TrendsSection.tsx`)**:
  Dual numbered editorial lists (01–05). Rows expand on hover while border lines draw in marigold. A floating thumbnail preview follows the cursor in real time via `gsap.quickTo` with velocity-based tilt rotation.

- **[7] Autumn/Winter Edit (`AutumnWinterSection.tsx`)**:
  Blush background. Three arch-framed model images rise at staggered parallax speeds (y: 120 / 0 / 80) and fan out at -4°, 0°, +4°. Includes an "Ivory Organza" sliding feature card and a giant faded outline text ("AW 2026") scrolling across the background.

- **[8] Pinned Product Spotlight (`SpotlightSection.tsx`)**:
  Pinned for ~260vh. High-resolution model image wiping between 3 colorways (Ivory, Rose-Pink, Emerald) using vertical clip-path masks, syncing specs, fabrics, and pricing. Features a spinning clay circular badge ("ADD TO CART •") that accelerates with scroll velocity and adds items directly to the shopping bag.

- **[9] Edits for Every Occasion (`OccasionSection.tsx`)**:
  Photo strips sliding horizontally in opposite directions on scroll scrub. Images are desaturated and transition to full vibrant color with a vertical lift on hover.

- **[10] Heritage Tabs & Accordion Gallery (`HeritageSection.tsx`)**:
  Dark ink theme with 4 tabs. Features a Ken Burns documentary card on the left and 5 tall vertical image slivers on the right that expand dynamically on hover (`flex-grow`) with grayscale-to-color reveals and captions.

- **[11] First Light — Cinematic Story (`FirstLightSection.tsx`)**:
  Pinned full-bleed portrait stories across Indian dawn settings. Stepped thumbnail navigation with slow Ken Burns pan and quote overlays.

- **[12] Latest Trends (`LatestTrendsSection.tsx`)**:
  Large Anton display heading scaling 0.8 → 1.0 on enter. Tilted photo card (-6°) that straightens to 0° as the section enters viewport, backed by a soft blush parallax circle.

- **[13] Testimonials + Instagram Grid (`TestimonialsInstagramSection.tsx`)**:
  Draggable customer review cards with star ratings and arch customer portraits, followed by a 6-tile `@mayuraloomsofficial` grid with hover zoom and like counts.

- **[14] Footer (`FooterSection.tsx`)**:
  Ink background with a wavy top divider. Giant "MAYURA" wordmark outlined in ivory that fills with golden marigold on hover and follows cursor position with subtle parallax. Backed by a silk-cloth shader, newsletter subscription with animated underline, 4 link columns, social links, and a Lenis-integrated "Back to top" button.

---

## ♿ Accessibility & Performance

- **Reduced Motion**: All GSAP pins, parallax scrolls, and Three.js shaders automatically disable when `prefers-reduced-motion` is active.
- **Keyboard & Screen Reader Support**: Explicit ARIA labels on all interactive controls, visible marigold focus rings, and modal escape key listeners.
- **Images**: Loaded with responsive `sizes`, WebP/JPEG formatting, and `unoptimized` bypass for static export flexibility.
