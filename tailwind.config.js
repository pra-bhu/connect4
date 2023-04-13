/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        flipLeft: {
          '0%': {'transform': 'rotateY(0);'},
          '100%': {'transform': 'rotateY(-180deg);'}
        },
        flipRight: {
          '0%': {'transform': 'rotateY(0);'},
          '100%': {'transform': 'rotateY(180deg);'}
        },
        heartBeat: {
          '0%' : {'transform': 'scale(1);'},
          '14%' : {'transform': 'scale(1.3);'},
          '28%' : {'transform': 'scale(1);'},
          '42%' : {'transform': 'scale(1.3);'},
          '70%' : {'transform': 'scale(1);'},
        },
      },
      animation: {
        flipLeft: 'flipLeft 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
        flipRight: 'flipRight 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
        heartBeat: 'heartBeat 2s 1',
        heartBeatInfinite: 'heartBeat 1s infinite',
      }
    },
  },
  plugins: [],
}