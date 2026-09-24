import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3f9ff',
          100: '#dfeeff',
          500: '#0f766e',
          600: '#0f5f5a',
          700: '#0d4d4d'
        }
      }
    }
  },
  plugins: []
};

export default config;
