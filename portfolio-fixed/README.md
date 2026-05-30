# Khalex Portfolio — Redesign Drop-in Files

## What's here

These files are **drop-in replacements** for your existing portfolio.  
Copy each file to the matching path in your project — nothing else needs to change.

---

## File map

| This file                          | Replace / Add at                                     |
|------------------------------------|------------------------------------------------------|
| `src/App.tsx`                      | `src/App.tsx`                                        |
| `src/index.css`                    | `src/index.css`                                      |
| `src/components/ParticleCanvas.tsx`| `src/components/ParticleCanvas.tsx` ← **new file**   |
| `src/components/CustomCursor.tsx`  | `src/components/CustomCursor.tsx`  ← **new file**    |
| `src/components/Navbar.tsx`        | `src/components/Navbar.tsx`                          |
| `src/pages/Home.tsx`               | `src/pages/Home.tsx`                                 |
| `src/pages/About.tsx`              | `src/pages/About.tsx`                                |
| `src/pages/Contact.tsx`            | `src/pages/Contact.tsx`                              |

All other files (Projects.tsx, ProjectDetail.tsx, Footer.tsx, CloudinaryVideo.tsx, etc.) are **unchanged**.

---

## What's new

### ParticleCanvas
- Mouse repulsion, connection lines, floating geometric shapes
- Dashed tracer lines from cursor to nearest 5 particles (hot orange)
- Ripple ring pulsing around cursor, ambient dot grid
- intensity prop: low / medium / high

### CustomCursor
- Hot-orange dot + lagging ring, expands on hover
- mix-blend-mode: difference for contrast over any bg

### Home
- Parallax hero + particles, vertical rule lines
- Services / Feature Highlights 4-cell grid
- Testimonials with rotating quotes + auto progress bar
- Ghost background text in CTA section
- Scroll-triggered fade-up on all sections

### Navbar
- Auto-hide on scroll-down, reappear on scroll-up
- Scroll progress bar at bottom edge

### index.css
- Custom cursor styles, cursor: none globally
- noise-overlay, scanlines, scroll-line animations
- All original tokens preserved

---

## No new dependencies — uses packages already in package.json.
