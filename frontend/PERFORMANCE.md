# Performance Notes

- **LCP Optimization:** Use `loading="lazy"` for product images. Use modern image formats (WebP/AVIF) and proper sizing.
- **Navbar:** Use `position: sticky` for fast paint and avoid layout shifts.
- **Animations:** Framer Motion respects `prefers-reduced-motion` automatically.
- **Dark Mode:** Uses CSS variables for instant theme switch, no repaint.
- **Accessibility:** All interactive elements are keyboard navigable and have visible focus states.
- **Contrast:** Colors meet WCAG AA+ for text/background and UI elements.
