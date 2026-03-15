/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './content/**/*.json'
  ],
  theme: {
    extend: {
      colors: {
        // Emergency red
        emergency: {
          DEFAULT: '#DC2626',
          light: '#FEE2E2',
          dark: '#991B1B'
        },
        // Acute orange
        acute: {
          DEFAULT: '#EA580C',
          light: '#FFEDD5',
          dark: '#9A3412'
        },
        // Common blue
        common: {
          DEFAULT: '#2563EB',
          light: '#DBEAFE',
          dark: '#1E40AF'
        },
        // Women's health purple
        womens: {
          DEFAULT: '#7C3AED',
          light: '#EDE9FE',
          dark: '#5B21B6'
        },
        // Chronic teal
        chronic: {
          DEFAULT: '#0D9488',
          light: '#CCFBF1',
          dark: '#0F766E'
        },
        // Maternal green
        maternal: {
          DEFAULT: '#16A34A',
          light: '#DCFCE7',
          dark: '#15803D'
        }
      },
      fontSize: {
        // Larger base for readability in stress
        'base': '1.0625rem',
      },
      minHeight: {
        'tap': '48px'
      }
    }
  },
  plugins: []
}
