const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
    "./styles/**/*.{js,jsx,ts,tsx}",
    
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "primary": "#1DB954",
        "background": "#121212",
        "light-grey": "#EFEFEF",
        "grey-text": "#EFEFEF80",
        "muted": "#B3B3B333",
        "foreground": "#FFFFFF",
        "border": "#EFEFEF33",
        popover: {
          DEFAULT: '#131313',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        accent: {
          DEFAULT: '#B3B3B31A',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      }
    },
  },
  plugins: [],
  borderWidth: {
    hairline: hairlineWidth(),
  },
}