/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'slate-950': '#020617',
        'slate-900': '#0f172a',
        'slate-100': '#f1f5f9',
        'slate-400': '#94a3b8',
        'slate-700': '#334155',
        'emerald-400': '#34d399',
        'emerald-500': '#10b981',
        'emerald-600': '#059669',
      }
    },
  },
  plugins: [],
}
