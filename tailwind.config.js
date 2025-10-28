module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
       modern: ['Inter', 'sans-serif'],
      },
      colors: {
        customGreen: 'rgb(255, 255, 255)',
        customGreen2: 'rgb(13, 241, 82)',
        customBlack: 'rgba(255, 255, 255, 0.41)',
        customBlack2: 'rgba(229, 229, 229, 0.62)',
        customRGB: 'rgb(33, 222, 89)',
      },
    },
  },
  plugins: [],
};
