/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F7F5F0',
          50: '#FDFCFB',
          100: '#FAF8F5',
          200: '#F7F5F0',
          300: '#EFECE4',
        },
        beige: {
          DEFAULT: '#E9E3D9',
          50: '#F5F2EC',
          100: '#EFEBE3',
          200: '#E9E3D9',
          300: '#DDD5C7',
          400: '#CFC3B0',
        },
        charcoal: {
          DEFAULT: '#121110',
          50: '#8A8782',
          100: '#64625E',
          200: '#464441',
          300: '#2A2826',
          400: '#1C1B1A',
          900: '#0A0A09',
        },
        taupe: {
          DEFAULT: '#827B72',
          light: '#A39C93',
          dark: '#676159',
        },
        earth: {
          DEFAULT: '#A58A70',
          light: '#BAA28B',
          dark: '#8B7158',
          subtle: '#E8E0D7',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Inter"', 'Manrope', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-luxury': '0.25em',
        'loose-luxury': '0.15em',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
      },
    },
  },
  plugins: [],
}
