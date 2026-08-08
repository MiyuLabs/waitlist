# MiyuLabs — Design System
### Codename: **AFTERGLOW**

---

> **For LLM Agents:** This document is the single source of truth for all MiyuLabs frontend work. Every UI decision — color, font, spacing, motion, tone — must trace back to a principle here. Do not deviate for convenience. The goal is not "good-looking" generic; it is *unmistakably MiyuLabs*.

---

## 1. Brand Essence

### The Core Feeling
MiyuLabs exists in the **3AM sweet spot** — that specific hour when the world is asleep, your desk lamp is the only sun, lo-fi is barely audible, and time feels soft and suspended. This is not a dark, edgy brand. It is warm, intimate, and slightly surreal — like being in a snow globe of your own making.

The product, Miyu, is a *companion first, gadget second*. The brand visual language must always carry this emotional truth: **technology that feels handcrafted, warm, and alive**.

### The Aesthetic Tension (What Makes It Unique)
MiyuLabs lives in the intersection of four worlds that don't usually share a room:

| World A | World B |
|---|---|
| Analog warmth (grain, glow, handcraft) | Digital precision (circuits, grids, specs) |
| Kawaii / soft (cat, pixels, play) | Serious craft (engineering, electronics) |
| Bedroom intimacy (dim light, personal) | Product launch (excitement, aspiration) |
| Lo-fi / slow (contemplative, gentle) | Productivity (focused, purposeful) |

Every design decision should exist *at the intersection* of these pairs, never collapsing into just one side.

### What This Is NOT
- ❌ A cold SaaS dashboard (Vercel/Linear dark mode)
- ❌ A purple-gradient AI startup splash page
- ❌ A glassmorphism blur-everything product
- ❌ A flat, happy-illustration B2C app
- ❌ An RGB gamer aesthetic
- ❌ Minimalist Apple-clone

### What This IS
- ✅ The Pinterest board of someone who builds beautiful electronics at 3am
- ✅ Where Studio Ghibli's art direction meets a hand-soldered PCB
- ✅ A zine that happens to also be a product website
- ✅ Lofi music made visual

---

## 2. Color System

### Palette Name: **3AM Palette**

The palette is built around the color temperature of a warm desk lamp bleeding into a dark room. Backgrounds are deep, **warm-tinted** darks (purple-indigo undertones, never cold blue-black). Accents are amber (lamp light), rose (warmth), and mint-teal (electronics signal).

```css
:root {
  /* ── Backgrounds ─────────────────────────────────── */
  --color-void:       #080611;  /* Deepest BG. Almost black, but warm violet. */
  --color-midnight:   #0F0C1E;  /* Primary page background. */
  --color-dusk:       #17132D;  /* Cards, panels, elevated surfaces. */
  --color-twilight:   #241D42;  /* Hover states, borders, dividers. */
  --color-haze:       #352C58;  /* Active states, selected. */

  /* ── Warm Accents ────────────────────────────────── */
  --color-amber:      #F2A93B;  /* PRIMARY accent. Desk lamp glow. CTAs, links, highlights. */
  --color-amber-soft: #F7C46A;  /* Lighter amber for hover states on amber. */
  --color-amber-dim:  #A06B15;  /* Muted amber for subtle backgrounds. */
  --color-amber-glow: rgba(242, 169, 59, 0.12); /* Glow bloom — use as radial BG. */

  /* ── Rose / Blush ────────────────────────────────── */
  --color-rose:       #E8736A;  /* Secondary accent. Warmth, hearts, secondary CTA. */
  --color-blush:      #FFD4C8;  /* Very soft highlight. Tags, chips, whisper elements. */
  --color-blush-dim:  rgba(232, 115, 106, 0.10);

  /* ── Mint / Teal (Electronics Signal) ───────────── */
  --color-mint:       #5ECFAE;  /* Tertiary. Tech hint. Online status, success, connection. */
  --color-mint-dim:   rgba(94, 207, 174, 0.12);

  /* ── Pixel Purple ────────────────────────────────── */
  --color-pixel:      #8B6FD4;  /* Decorative. Pixel art tones, 8-bit elements only. */

  /* ── Text ────────────────────────────────────────── */
  --color-text-primary:   #EDEAF5;  /* Headlines. Off-white, warm tint (not pure white). */
  --color-text-secondary: #A49FBE;  /* Body. Muted, readable. */
  --color-text-muted:     #5E5878;  /* Captions, metadata, placeholders. */
  --color-text-on-amber:  #1A0F00;  /* Text on amber-colored buttons. Deep warm black. */

  /* ── Utility ─────────────────────────────────────── */
  --color-border:     rgba(255, 255, 255, 0.06); /* Default border. Barely there. */
  --color-border-warm: rgba(242, 169, 59, 0.20); /* Amber-tinted border, for focused elements. */
  --color-overlay:    rgba(8, 6, 17, 0.75);      /* Modal/drawer scrim. */
}
```

### Color Usage Rules

1. **Backgrounds are layered, never flat.** `--color-midnight` as page BG, always with a subtle radial `--color-amber-glow` somewhere on the canvas (off to one side, like a lamp). Cards use `--color-dusk`.
2. **Amber is the only bold accent.** Use it for primary CTAs, key highlights, and hover states. Overusing it kills the glow effect.
3. **Rose/blush is emotional.** Use for the companion/connection aspects of Miyu — heartbeats, messages, partner module references.
4. **Mint is technical.** Use it sparingly: status indicators, electronic/IoT references, success states.
5. **Never use pure `#000000` or `#FFFFFF`.** Always use palette extremes (`--color-void` and `--color-text-primary`).
6. **Opacity over solid colors** for layering. Semi-transparent washes (`rgba`) create depth without mud.

### The Glow Rule
Almost every page section should have **one dominant glow point** — a large, soft radial gradient in `--color-amber-glow` (or occasionally `--color-blush-dim`) positioned off-center, like a light source in the scene. This is what makes the UI feel lit, not just colored.

```css
/* Example: section with lamp glow in top-left */
.section-hero {
  background:
    radial-gradient(ellipse 60% 50% at 20% 30%, var(--color-amber-glow), transparent),
    var(--color-midnight);
}
```

---

## 3. Typography

### Typeface Stack

#### Display Font: **Fraunces** (Variable)
- Source: Google Fonts (`Fraunces`)
- Use for: Hero headlines, section titles, any type that needs *character*
- Why: Fraunces is an optical-size variable font with a melancholy, poetic quality. Its italics are especially distinctive — slightly old-fashioned but in a cozy, literary way. It feels like a handwritten note that grew up.
- Weights in use: 300 (thin italic for whisper text), 600 (headings), 900 (hero impact)
- Always use italic variant for emotional/brand statements
- CSS: `font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto;`

#### Interface Font: **Syne** (Variable)
- Source: Google Fonts (`Syne`)
- Use for: Navigation, labels, UI elements, sub-headings, button text
- Why: Syne has a geometric confidence that reads "craft + tech" without being cold. Its slightly unusual proportions give it personality. Bridges the gap between Fraunces warmth and screen readability.
- Weights: 400, 600, 800
- CSS: `font-family: 'Syne', system-ui, sans-serif;`

#### Body Font: **Plus Jakarta Sans**
- Source: Google Fonts (`Plus Jakarta Sans`)
- Use for: Body copy, form labels, descriptions, longer reads
- Why: Warm, humanist proportions. More personality than Inter without sacrificing readability.
- Weights: 400, 500
- CSS: `font-family: 'Plus Jakarta Sans', system-ui, sans-serif;`

#### Pixel Accent Font: **Press Start 2P**
- Source: Google Fonts (`Press Start 2P`)
- Use for: **Decorative only.** Tiny labels (8–10px), 8-bit UI details, pixel art captions, small "flavor text" elements.
- Why: Ties directly to Miyu's 8-bit music player and pixel aesthetic.
- ⚠️ Never use for body text. Never above 12px unless deliberately stylized. 
- CSS: `font-family: 'Press Start 2P', monospace;`

### Type Scale

```css
:root {
  /* Display — Fraunces */
  --text-display-xl: clamp(3.5rem, 8vw, 7rem);    /* Hero. Single-line impact. */
  --text-display-lg: clamp(2.5rem, 5vw, 4.5rem);  /* Section heroes. */
  --text-display-md: clamp(1.8rem, 3vw, 2.8rem);  /* Sub-section titles. */

  /* Interface — Syne */
  --text-ui-lg:  1.25rem;   /* Large labels, nav items. */
  --text-ui-md:  1rem;      /* Standard UI. */
  --text-ui-sm:  0.875rem;  /* Small labels, tags. */
  --text-ui-xs:  0.75rem;   /* Captions, metadata. */

  /* Body — Plus Jakarta Sans */
  --text-body-lg: 1.125rem; /* Lead paragraph. */
  --text-body-md: 1rem;     /* Standard body. */
  --text-body-sm: 0.875rem; /* Fine print. */

  /* Pixel — Press Start 2P */
  --text-pixel:   0.6rem;   /* Decorative pixel labels. */
  --text-pixel-sm: 0.5rem;  /* Tiny 8-bit accents. */
}
```

### Typography Rules

1. **Fraunces italic is a mood setter.** Use the italic cut for emotionally resonant phrases — taglines, pull quotes, brand voice moments. Never for UI text.
2. **Line-height is generous.** Body text: `1.75`. Display: `1.1`. Interface: `1.4`. Let the text breathe.
3. **Letter-spacing on display:** Slight negative tracking (`-0.02em` to `-0.04em`) on large Fraunces headlines.
4. **ALL CAPS with Syne only.** When using uppercase letters (labels, category tags), use Syne with `letter-spacing: 0.12em`. Never uppercase Fraunces or Jakarta.
5. **Max line-length for body:** `65ch`. Constrain columns.
6. **Pixel font size limit:** If it's above 14px, rethink whether Syne should be used instead.

### Type Pairings (Examples)

```
HERO HEADLINE:
  "something is waking up"
  → Fraunces 900, italic, --text-display-xl, --color-text-primary

SUBHEADLINE / TAGLINE:
  "for the ones still up at 3am"
  → Fraunces 300, italic, --text-display-md, --color-text-secondary

SECTION LABEL:
  "COMING SOON"
  → Syne 800, uppercase, --text-ui-xs, letter-spacing: 0.15em, --color-amber

BODY TEXT:
  "We build desk accessories that..."
  → Plus Jakarta Sans 400, --text-body-md, --color-text-secondary

PIXEL DECORATION:
  "v0.1.0" or "[ STANDBY ]"
  → Press Start 2P, --text-pixel, --color-text-muted
```

---

## 4. Visual Texture & Atmosphere

This section is critical. The difference between a generic dark website and an *Afterglow* website is **atmosphere** — the sense that the canvas has physical texture, depth, and light. Achieve this with these layered effects.

### 4.1 Grain Overlay (Always On)

Every page section gets a subtle noise grain overlay. This is the single most effective tool for making the UI feel analog and warm rather than cold/digital.

```css
/* Apply to the root or body */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  background-image: url("data:image/svg+xml,..."); /* SVG noise pattern */
  opacity: 0.035; /* Very subtle. Increase to 0.05 for more texture. */
  mix-blend-mode: overlay;
}

/* Generate with: https://grainy-gradients.vercel.app/
   Or use CSS filter on a pseudo-element:
   filter: url(#noise); with an SVG feTurbulence filter */
```

**Grain intensity guidelines:**
- Hero sections: `opacity: 0.04`
- Cards/panels: `opacity: 0.06` (grain more visible on smaller surfaces)
- Never exceed `opacity: 0.08`

### 4.2 The Lamp Glow (Per Section)

Each major section should have a single, large, soft radial glow — off-center, like a light source in the scene. Vary its position to create a sense of movement down the page.

```css
/* Alternate these across sections for visual rhythm */
.glow-top-left    { background: radial-gradient(ellipse 55% 45% at 15% 20%, var(--color-amber-glow), transparent); }
.glow-top-right   { background: radial-gradient(ellipse 55% 45% at 85% 15%, var(--color-amber-glow), transparent); }
.glow-center      { background: radial-gradient(ellipse 60% 50% at 50% 40%, var(--color-amber-glow), transparent); }
.glow-rose-right  { background: radial-gradient(ellipse 40% 50% at 90% 50%, var(--color-blush-dim), transparent); }
```

### 4.3 Dithered Dividers

Instead of plain `<hr>` lines, section dividers use **pixel dithering patterns** — a 2-4px tall strip of dithered pixel art that blends the sections together. This is a unique visual signature for MiyuLabs.

```css
.divider-dither {
  width: 100%;
  height: 4px;
  background-image: repeating-linear-gradient(
    90deg,
    var(--color-twilight) 0px,
    var(--color-twilight) 2px,
    transparent 2px,
    transparent 4px
  );
  /* Creates a dotted/dashed rhythm that reads as "pixel" */
  opacity: 0.4;
}
```

For more elaborate versions, use an inline SVG with a checkerboard or Bayer-matrix dither pattern in `--color-twilight`.

### 4.4 Pixel Art Decorative Elements

Small 8-bit pixel art sprites appear throughout the UI as **flavor** — never functional, always delightful. These are rendered as inline SVG or CSS pixel art (box-shadow technique).

Standard decorative sprites:
- ⭐ **Pixel star** (4×4px) — scatter in hero sections
- 💫 **Pixel sparkle** (8×8px) — near CTA elements
- ♪ **Pixel music note** (6×8px) — near music-related content  
- ✦ **Pixel diamond** (4×4px) — bullet-point alternative
- 🐾 **Pixel paw print** — signature element, use sparingly

These should use `--color-pixel` (#8B6FD4), `--color-amber-soft`, or `--color-text-muted`.

### 4.5 Thin Illustrative Lines

Scattered through layouts: ultra-thin (`stroke-width: 0.5px`) illustrative SVG line drawings in the style of:
- Circuit traces / PCB paths
- Constellation lines connecting pixel stars
- Delicate botanical/organic lines (contrast with the tech)

These use `--color-twilight` at `opacity: 0.5–0.8` and appear as background layer decorations, never foreground content.

### 4.6 The "Sticker" Treatment

Some UI elements — tags, badges, small callouts — are styled to look like physical **stickers placed on a surface**:

```css
.sticker {
  display: inline-block;
  background: var(--color-amber);
  color: var(--color-text-on-amber);
  font-family: var(--font-syne);
  font-weight: 800;
  font-size: var(--text-ui-xs);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 3px;
  transform: rotate(-1.5deg); /* Slightly crooked — placed, not printed */
  box-shadow:
    2px 2px 0px rgba(0,0,0,0.4),  /* Hard offset shadow */
    0 0 0 1.5px rgba(0,0,0,0.2);  /* Subtle border */
}
```

### 4.7 Scanline Effect (Hero Only)

For the hero section, an optional **scanline overlay** at very low opacity creates a CRT/monitor feel:

```css
.scanline-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
  pointer-events: none;
  z-index: 2;
}
```

---

## 5. Layout & Spacing

### Spatial Philosophy: **"The Desk"**

Think of the page as looking down at a beautifully arranged desk. Objects are placed *intentionally* — some perfectly aligned, some slightly rotated, some overlapping. This is not a rigid grid. It is a *curated surface*.

### Spacing Scale

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  24px;
  --space-6:  32px;
  --space-7:  48px;
  --space-8:  64px;
  --space-9:  96px;
  --space-10: 128px;
  --space-11: 192px;
}
```

### Grid System

```css
.container {
  width: min(1200px, 90vw);
  margin-inline: auto;
}

.container-narrow {
  width: min(760px, 90vw); /* Body copy, form fields */
  margin-inline: auto;
}

.container-wide {
  width: min(1440px, 95vw); /* Full-width hero sections */
  margin-inline: auto;
}
```

### The Slight Rotation Rule

Certain UI elements are deliberately rotated slightly (`-2deg` to `+2deg`) to feel *placed* rather than *aligned*:
- Sticker badges: `-1.5deg` to `-2.5deg`
- Image frames/mockups: `-1deg` to `+1deg`
- Pull quotes: `+0.5deg`
- Decorative labels: random between `-2deg` and `+2deg`

Never rotate body text, navigation, or primary content.

### Section Spacing

```css
/* Vertical rhythm between sections */
section + section { margin-top: var(--space-11); } /* 192px desktop */
section + section { margin-top: var(--space-9); }  /* 96px mobile */

/* Inner section padding */
.section-pad { padding-block: var(--space-10); } /* 128px */
```

### Breakpoints

```css
/* Mobile-first */
@media (min-width: 480px)  { /* xs: large phones */ }
@media (min-width: 768px)  { /* sm: tablets */     }
@media (min-width: 1024px) { /* md: laptops */     }
@media (min-width: 1280px) { /* lg: desktop */     }
@media (min-width: 1536px) { /* xl: wide */        }
```

---

## 6. Component Specifications

### 6.1 Primary CTA Button (Email Submit / Join Waitlist)

This is the most important component on the lead-gen page. It must feel special — not a generic button.

```css
.btn-primary {
  /* Layout */
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 14px 32px;

  /* Visual */
  background: var(--color-amber);
  color: var(--color-text-on-amber);
  border: none;
  border-radius: 6px;

  /* Typography */
  font-family: var(--font-syne);
  font-weight: 700;
  font-size: var(--text-ui-md);
  letter-spacing: 0.04em;

  /* Depth */
  box-shadow:
    0 0 0 1px var(--color-amber-dim),          /* Definition border */
    0 4px 20px rgba(242, 169, 59, 0.30),        /* Glow bloom */
    inset 0 1px 0 rgba(255,255,255,0.15);       /* Top highlight */

  /* Transitions */
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-primary:hover {
  background: var(--color-amber-soft);
  box-shadow:
    0 0 0 1px var(--color-amber),
    0 6px 30px rgba(242, 169, 59, 0.50),        /* More glow on hover */
    inset 0 1px 0 rgba(255,255,255,0.20);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0px);
  box-shadow:
    0 0 0 1px var(--color-amber-dim),
    0 2px 10px rgba(242, 169, 59, 0.20);
}
```

### 6.2 Email Input Field

```css
.input-email {
  width: 100%;
  padding: 14px 18px;
  background: var(--color-dusk);
  border: 1.5px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-text-primary);
  font-family: var(--font-jakarta);
  font-size: var(--text-body-md);
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}

.input-email::placeholder {
  color: var(--color-text-muted);
  font-style: italic;
}

.input-email:focus {
  border-color: var(--color-amber);
  box-shadow: 0 0 0 3px var(--color-amber-glow);
  /* The glow around the focused input is the lamp illuminating it */
}
```

### 6.3 Cards / Panels

```css
.card {
  background: var(--color-dusk);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: var(--space-6);

  /* Subtle inner glow on top edge (like lit from above) */
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.04),
    0 4px 24px rgba(0, 0, 0, 0.30);
}

.card:hover {
  border-color: var(--color-border-warm);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.06),
    0 8px 32px rgba(0, 0, 0, 0.40),
    0 0 0 1px rgba(242, 169, 59, 0.08);
}
```

### 6.4 Navigation

```css
/* The nav is minimal. Almost invisible until needed. */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5) var(--space-7);

  /* Glass effect — barely there */
  background: rgba(8, 6, 17, 0.60);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

/* Logo: Fraunces italic */
.nav-logo {
  font-family: var(--font-fraunces);
  font-style: italic;
  font-weight: 600;
  font-size: 1.3rem;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

/* The "labs" part of MiyuLabs is smaller + amber */
.nav-logo span.accent {
  color: var(--color-amber);
  font-size: 0.9em;
}
```

### 6.5 Waitlist Counter (Social Proof)

A small, live-feeling counter showing people who have signed up. Styled like a pixel readout:

```css
.waitlist-counter {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--color-dusk);
  border: 1px solid var(--color-border);
  border-radius: 100px;
  padding: 6px 14px;
  font-family: var(--font-press-start);
  font-size: var(--text-pixel);
  color: var(--color-mint);
}

/* Blinking cursor/dot to suggest live */
.waitlist-counter::before {
  content: '●';
  color: var(--color-mint);
  animation: blink 1.2s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
```

---

## 7. Motion & Animation

### Philosophy: **"Breathing, Not Bouncing"**

MiyuLabs motion is gentle and alive — like watching something breathe, not watching something perform. Think: the slow float of a cursor trail, the soft pulse of a light, the barely-there shimmer of dust in lamplight.

**Avoid:**
- Spring/bounce animations (too playful, off-brand)
- Aggressive slide-ins or pop-ups
- Parallax so strong it induces motion sickness
- Anything that competes with the content

### Easing Functions

```css
:root {
  --ease-soft:    cubic-bezier(0.25, 0.46, 0.45, 0.94);  /* Default. Gentle deceleration. */
  --ease-appear:  cubic-bezier(0.16, 1, 0.3, 1);          /* Reveal animations. Overshoots slightly, then settles. */
  --ease-glow:    cubic-bezier(0.4, 0, 0.6, 1);           /* Glow pulses. Smooth sine-like. */
  --ease-pixel:   steps(8, end);                           /* For pixel art / 8-bit style movements. */
}
```

### Core Animations

#### Float (Idle Animation)
For the Miyu avatar/silhouette and decorative elements:
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}
.float { animation: float 4s var(--ease-glow) infinite; }
.float-slow { animation: float 6s var(--ease-glow) infinite; }
.float-fast { animation: float 2.5s var(--ease-glow) infinite; }
```

#### Scroll Reveal
Elements fade + rise into view as user scrolls:
```css
@keyframes reveal-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0);    }
}
.reveal {
  animation: reveal-up 0.7s var(--ease-appear) both;
}
/* Use animation-delay in staggered increments: 0s, 0.1s, 0.2s, etc. */
```

#### Glow Pulse
For the amber glow bloom behind the hero element:
```css
@keyframes glow-pulse {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.05); }
}
```

#### Pixel Step Walk
For any Miyu sprite that "walks" or blinks — use `steps()` timing:
```css
@keyframes sprite-walk {
  from { background-position: 0px; }
  to   { background-position: -240px; } /* 6 frames × 40px */
}
.miyu-sprite {
  animation: sprite-walk 0.6s var(--ease-pixel) infinite;
}
```

#### Cursor Sparkle Trail
A JS-driven effect where pixel sparkle elements follow the cursor and fade out. Implemented with:
- `mousemove` listener creating small `<span>` elements
- Styled as `--color-amber-soft` 4×4px squares (pixel art stars)
- Fade out over 600ms, then removed from DOM
- This is **signature** — MiyuLabs cursor behavior

### Transition Defaults

```css
/* Apply these to interactive elements */
.interactive {
  transition:
    color 0.2s var(--ease-soft),
    background-color 0.2s var(--ease-soft),
    border-color 0.2s var(--ease-soft),
    box-shadow 0.3s var(--ease-soft),
    transform 0.2s var(--ease-soft),
    opacity 0.2s var(--ease-soft);
}
```

### Reduced Motion

Always respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Lead-Generation Page Structure

### Page Architecture (Single Page)

The lead-gen page is **one continuous canvas** — not separate "sections" stitched together, but a single atmosphere the user scrolls through. There should be no jarring visual shifts.

---

### Section 01: Hero (Above the Fold)

**Goal:** Atmospheric arrival. Intrigue before explanation.

**Layout:**
```
[ FULL VIEWPORT HEIGHT ]

      ┌─ Centered composition ─────────────────────────────┐
      │                                                      │
      │   [ pixel star ]    [ pixel sparkle ]               │
      │                                                      │
      │         ╔══════════════════════════════╗            │
      │         ║   [ MIYU SILHOUETTE ]        ║            │
      │         ║   barely visible, glowing    ║            │
      │         ╚══════════════════════════════╝            │
      │                                                      │
      │       "something is waking up"                      │ ← Fraunces italic, huge
      │                                                      │
      │    "for the ones still up at 3am"                   │ ← Fraunces 300, italic, smaller
      │                                                      │
      │   ┌──────────────────────┐  ┌──────────────┐        │
      │   │  your@email.com      │  │  notify me → │        │ ← Email capture
      │   └──────────────────────┘  └──────────────┘        │
      │                                                      │
      │         [ ● 1,247 people waiting ]                  │ ← Counter
      │                                                      │
      │                  ↓ scroll                           │
      └──────────────────────────────────────────────────────┘
```

**Visual Treatment:**
- Deep midnight background with amber glow centered-left (where Miyu is)
- Miyu cat silhouette at low opacity (`0.3`), slowly floating. Deliberately obscured. Mystery.
- Grain overlay
- Pixel stars scattered asymmetrically
- Thin dashed circuit lines trailing from Miyu downward

**Copy:**
- H1: *"something is waking up"* (lowercase, Fraunces 900 italic)
- Subtext: *"for the ones still up at 3am"* (Fraunces 300 italic)
- Email placeholder: *"leave your email, we'll find you"* (subtle, personal)
- Button text: *"I'm curious →"* (not "Submit", not "Join" — matches brand voice)
- Post-submit message: *"we see you. we'll be in touch."*

---

### Section 02: The Hint (Mystery/Intrigue)

**Goal:** One tiny reveal of product intent — but cryptic. No product name. No category reveal. Just vibes.

**Layout:** Narrow, centered, editorial. Like reading a handwritten note.

```
      "a little companion. 
       for your desk. 
       for your late nights."

              — more soon
```

- Fraunces italic throughout
- Very generous padding
- A single dithered divider above and below
- Pixel "[ CLASSIFIED ]" sticker in the corner (rotated, amber)

---

### Section 03: Atmosphere / Social Proof (Optional)

**Goal:** Show the feeling, not the product. Connect people emotionally.

**Three micro-cards** in a slight asymmetric row:

```
 ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
 │ ♪               │   │   ⭑ 3:47 AM     │   │  connect.       │
 │ "the vibes,     │   │   "still up.    │   │  "not just a    │
 │  without the    │   │    still here." │   │   gadget."      │
 │  distraction"   │   │                 │   │                 │
 └─────────────────┘   └─────────────────┘   └─────────────────┘
```

Cards use a **slight rotation**: `-1.5deg`, `+0.5deg`, `-0.8deg`.

---

### Section 04: Footer

Minimal. Just:
- `MiyuLabs` in Fraunces italic
- Year
- Social links (icons only, pixel-style)
- `[ STANDBY ]` in Press Start 2P as a status label

---

## 9. Iconography

### Style: Pixel + Thin Line Hybrid

Two icon styles coexist:

1. **Pixel icons** (8×8 to 16×16 pixel grid) — for decorative, game-like elements. Cats, stars, sparkles, hearts. Use `--color-pixel` and `--color-amber-soft`.

2. **Thin line icons** (1.5px stroke, rounded caps) — for UI actions. Email, arrow, close, check. Use `--color-text-secondary`. When active/hover, use `--color-amber`.

No filled/solid icons in the UI. No icon libraries that feel generic (no Heroicons default style). Consider a custom set or use Lucide with reduced weight.

---

## 10. Photography & Imagery

*(For when the product is revealed — this is a forward-looking guide)*

### Image Aesthetic

All photography for MiyuLabs follows these guidelines:
- **Warm color grading**: Pull shadows toward purple-indigo, highlights toward amber. Avoid cool white/blue tones.
- **Depth of field**: Bokeh backgrounds. The subject is intimate, close.
- **Context**: Desk setups, low ambient light, warm point-source lighting (lamp, LED strip).
- **Mood**: 3am energy. Not "bright studio product shot." More "someone's actual desk."
- **Film grain**: Add grain in post. Match the UI grain aesthetic.

### Illustration Style (If Used)

- Pixel art: 16-color palette drawn from the 3AM Palette. Clean, intentional.
- Line illustration: Very fine stroke, slightly imperfect/organic. Japanese manga influence but minimal.

---

## 11. Copy Voice & Tone

### Personality: **"Quiet Confidence meets Cozy Weirdness"**

MiyuLabs doesn't shout. It whispers and you lean in. The brand voice has:

| Quality | How it shows |
|---|---|
| **Intimate** | "we see you" not "thank you for signing up" |
| **Slightly cryptic** | Incomplete sentences. Ellipses. Mystery. |
| **Lowercase preference** | Headlines often lowercase. Feels handwritten. |
| **No filler marketing speak** | Never "revolutionary", "cutting-edge", "next-gen" |
| **Warm directness** | Short sentences. No padding. Says exactly what it means. |
| **Poetic but not pretentious** | Simple words, unexpected combinations. |

### Copy Examples

| Context | ❌ Generic | ✅ MiyuLabs Voice |
|---|---|---|
| Hero headline | "Meet your new desk companion" | *"something is waking up"* |
| Email CTA | "Join our waitlist" | *"I'm curious →"* |
| Post-signup | "You've been added!" | *"we see you. we'll be in touch."* |
| Loading/wait | "Please wait" | *"[ loading... ]"* in pixel font |
| 404 page | "Page not found" | *"you wandered too far from the desk"* |
| Footer | "© 2025 MiyuLabs Inc." | *"MiyuLabs — 2025"* |

### Punctuation Rules
- Em dashes (`—`) instead of parentheses for asides
- Ellipses (`...`) for trailing mystery
- `→` arrow for directional CTAs (not ">")
- Lowercase headlines unless using Syne all-caps labels
- Oxford comma always

---

## 12. Accessibility

### Minimum Requirements (Never Compromise)

1. **Color contrast:** All body text must meet WCAG AA (4.5:1). `--color-text-secondary` on `--color-midnight` = check before deploying.
2. **Focus states:** Never remove outlines. Override with custom focus style:
   ```css
   :focus-visible {
     outline: 2px solid var(--color-amber);
     outline-offset: 3px;
   }
   ```
3. **Alt text:** All images and pixel art sprites must have descriptive alt text.
4. **Form labels:** Email input must have a visible or screen-reader-accessible label.
5. **Reduced motion:** All animations must respect `prefers-reduced-motion`.
6. **Semantic HTML:** Use `<main>`, `<nav>`, `<section>`, `<h1>`–`<h6>` correctly.

---

## 13. Implementation Notes for LLM Agents

**Critical directives for any agent building MiyuLabs pages:**

1. **Import order for fonts** (add to `<head>`):
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,900;1,9..144,300;1,9..144,600;1,9..144,900&family=Syne:wght@400;600;800&family=Plus+Jakarta+Sans:wght@400;500&family=Press+Start+2P&display=swap" rel="stylesheet">
   ```

2. **CSS variable names are canonical.** Do not use hex values directly in component code. Always reference `var(--color-*)` and `var(--text-*)`.

3. **The grain overlay must be on every page.** It is not optional.

4. **At least one amber radial glow per section.** Use `.glow-top-left`, `.glow-center`, etc.

5. **Button text is never "Submit", "Sign Up", or "Join".** Refer to Section 11 for voice.

6. **Rotation on sticker elements.** Cards, badges, decorative elements must have slight `transform: rotate()` as specified.

7. **Miyu is never fully revealed on the lead-gen page.** Show only silhouette, shadow, glow — no clear face/features. Opacity `0.2` to `0.4` max on any representative artwork.

8. **Pixel elements use `Press Start 2P` at max `12px`.** No exceptions.

9. **`letter-spacing: 0.15em` on all uppercase Syne labels.** Always.

10. **No light mode on lead-gen pages.** The 3AM aesthetic is dark. Respect this until a light mode variant is designed separately.

11. **Every interactive element must have a `transition` with `var(--ease-soft)`.** No snappy/instant state changes.

12. **Section padding minimum is `var(--space-10)` (128px) on desktop.** The page breathes.

---

## 14. Design Decisions Log

*Running log of intentional choices — update as the system evolves.*

| Decision | Rationale |
|---|---|
| Warm purple-black (not blue-black) for BG | Warmer, more intimate. Less "tech startup", more "3am room" |
| Fraunces for display | Editorial, slightly melancholy, human. Unique for a tech brand. |
| Press Start 2P only for decoration | 8-bit connection to product — but not a "retro gaming brand" |
| Amber as primary accent (not blue/purple) | Warm light = desk lamp. Avoids every other tech brand's accent choice. |
| Lowercase headlines | Intimate, like someone wrote it to you — not shouted at you. |
| Slight rotation on sticker elements | Makes the UI feel placed/physical, not printed/generated |
| Grain texture | Analog warmth — the #1 differentiator from generic dark UIs |
| Miyu silhouette only on lead-gen | Mystery fuels curiosity. The hint is more powerful than the reveal. |
| Dithered dividers | Pixel aesthetic that ties to the product's 8-bit soul |
| Mint/teal only for tech/IoT references | Keeps "electronic signal" feeling intentional, not decorative noise |

---

*MiyuLabs DESIGN.md — Afterglow System v1.0*
*Maintained by the MiyuLabs design team.*
*Last updated: 2026*
