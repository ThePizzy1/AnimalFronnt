module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        friendly: ['Poppins', 'sans-serif'], // dodajemo alias
      },
      colors: {
        customGreen: '#FFFFFF',
        customGreen2: '#72E859',
        customBlack: 'rgba(255, 255, 255, 0.41)',
        customBlack2: 'rgba(1, 12, 1, 0.62)',
      },
    },
  },
  plugins: [],
};
