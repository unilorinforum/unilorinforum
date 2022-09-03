/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['nunito', 'sans-serif'],
        MontserratBold: ['Montserrat-Bold'],
        MEB: ['Montserrat'],
        MSB: ['Montserrat-semibold'],
      },
    },
    colors: {
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      'gray-dark': '#273444',
      gray: '#8492a6',
      'gray-light': '#d3dce6',
      except: '#133F82D4',
      title: '#355A92',
      border: '#707070',
      iconslight: '#FFAD40AB',
      icondark: '#FF9912',
      homehead: '#CED5E0',
      textlight: '#002D72',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [],
};
