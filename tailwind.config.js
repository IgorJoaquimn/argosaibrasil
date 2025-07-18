/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: ['border-red-500'],
  theme: {
    extend: {
      colors: {
      primary: '#426859',
      secondary: '#757575',
      header: '#F3F5F4',
      light: '#f8f9fa',
      muted: '#f3f4f6',
      'border-light': '#e5e7eb',
      'border-medium': '#d1d5db',
      'border-dark': '#9ca3af',
      'custom-red': '#ef4444',
    },
    },
  },
  plugins: [],
}

