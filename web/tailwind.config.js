/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        quantum: {
          bra: '#2B6CB0',    // darker blue for better contrast
          ket: '#2F855A',    // darker green for better contrast
          operator: '#B83280' // darker pink for better contrast
        },
        background: {
          primary: '#ffffff',
          secondary: '#f3f4f6',
          tertiary: '#e5e7eb'
        },
        content: {
          primary: '#111827',
          secondary: '#374151',
          tertiary: '#6B7280'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        math: ['KaTeX_Math', 'serif']
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem'
      }
    }
  },
  plugins: [],
  darkMode: 'class'
};

