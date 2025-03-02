import { nextui } from "@nextui-org/react";
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/button.js",
    './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js',
    "https://unpkg.com/flowbite@1.3.3/dist/flowbite.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Montserrat', ...defaultTheme.fontFamily.sans],
        grotesk: ['Grotesk', 'sans-serif'],
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        'pulse-x': {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '50%': {
            transform: 'translateX(10px)',
          },
        },
        'pulse-x-reverse': {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '50%': {
            transform: 'translateX(-10px)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(0.9)',
            opacity: '0.1',
          },
          '33%': {
            transform: 'translate(-70px, -30px) scale(1.10)',
            opacity: '0.12',

          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.85)',
            opacity: '0.11',

          },
          '100%': {
            transform: 'translate(0px, 0px) scale(0.9)',
            opacity: '0.1',

          },
        },
        blobmove: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          }
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        floatSlow: {
          "0%": {
            transform: "translateX(0) translateY(0)",
            opacity: "0.9",
          },
          "25%": {
            transform: "translateX(30px) translateY(-20px)",
            opacity: "1",
          },
          "50%": {
            transform: "translateX(60px) translateY(0)",
            opacity: "0.9",
          },
          "75%": {
            transform: "translateX(30px) translateY(20px)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(0) translateY(0)",
            opacity: "0.9",
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        blob: 'blob 10s infinite',
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        'float-slow': "floatSlow 8s ease-in-out infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/forms'),
    nextui(),
  ],
} satisfies Config;
