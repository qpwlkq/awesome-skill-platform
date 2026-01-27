import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          page: '#050505',
          card: '#121212',
          surface: '#1A1A1A',
          hover: '#242424',
        },
        terminal: {
          green: '#22C55E',
          blue: '#3B82F6',
          amber: '#F59E0B',
          red: '#EF4444',
        },
        text: {
          primary: '#E5E5E5',
          secondary: '#8A8A8A',
          tertiary: '#525252',
          muted: '#4A4A4A',
        },
        border: {
          subtle: '#1F1F1F',
          divider: '#252525',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '4px',
      },
    },
  },
};

export default config;
