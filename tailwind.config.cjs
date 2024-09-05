/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './*.html'],
  darkMode: 'media',
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        consolas: ['Consolas', 'monospace'],
        'segoe-ui': ['Segoe UI', 'sans-serif'],
        ubuntu: ['Ubuntu Mono', 'monospace'],
      },
    },
  },
};
