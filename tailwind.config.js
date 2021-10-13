module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {},
  variants: {
    extend: {
      backgroundColor: ['active'],
      boxShadow: ['active'],
      gradientColorStops: ['active', 'group-hover'],
      
      borderColor: ['focus-visible', 'first'],
      animation: ['motion-safe','hover'],
      textColor: ['visited'],
    },
  },
  plugins: [],
}
