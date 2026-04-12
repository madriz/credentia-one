import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#00ACED',
          hover: '#0090C4',
        },
        text: {
          primary: '#1A1A1A',
          body: '#444444',
          muted: '#9CA3AF',
        },
        bg: {
          DEFAULT: '#FAF9F6',
          card: '#FFFFFF',
          warm: '#F3F1EE',
        },
        border: {
          DEFAULT: '#E5E7EB',
        },
        success: '#16A34A',
        error: '#DC2626',
      },
      fontFamily: {
        serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1080px',
      },
    },
  },
  plugins: [],
};

export default config;
