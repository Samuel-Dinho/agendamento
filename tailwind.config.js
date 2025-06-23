/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Isso garante que ele leia todos os arquivos dentro da pasta src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}