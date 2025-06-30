/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)", // #0D9488
        secondary: "var(--color-secondary)", // #F472B6
        background: "var(--color-background)", // #F8F9FA
        text: "var(--color-text)", // #212529
        'dm-bg': "var(--color-dm-bg)", // #1A1A1A
        'dm-text': "var(--color-dm-text)", // #E9ECEF
        'sale-badge': "#F472B6",
        'cta-gradient-from': "#0D9488",
        'cta-gradient-to': "#2DD4BF",
      },
      fontFamily: {
        heading: ['"Neue Haas Grotesk"', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px 0 #18181b33',
        btn: '0 2px 8px 0 rgba(0,0,0,0.10)',
        'btn-hover': '0 6px 24px 0 #2DD4BF66',
        'neon-teal': '0 0 16px 2px #0D9488cc, 0 2px 24px 0 #2DD4BF88',
        'neon-pink': '0 0 16px 2px #F472B6cc, 0 2px 24px 0 #F472B688',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
      },
      backgroundImage: {
        'cta-gradient': 'linear-gradient(90deg, #0D9488 0%, #2DD4BF 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(13,148,136,0.12) 100%)',
        'hero-gradient': 'radial-gradient(circle at 60% 40%, #2DD4BF33 0%, #F472B622 100%)',
        'border-gradient': 'linear-gradient(90deg, #0D9488 0%, #F472B6 100%)',
      },
      blur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
      },
      borderRadius: {
        '4xl': '2.5rem',
        '5xl': '3rem',
      },
      spacing: {
        '4.5': '1.125rem',
        '18': '4.5rem',
        '22': '5.5rem',
      },
      opacity: {
        15: '0.15',
        35: '0.35',
      },
      transitionProperty: {
        btn: 'background, box-shadow, transform, color, border',
      },
    },
  },
  plugins: [],
}
