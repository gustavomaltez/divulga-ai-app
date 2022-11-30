/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        'primary': {
          '100': '#CCF9FF',
          '200': '#9AEDFF',
          '300': '#67DBFF',
          '400': '#41C6FF',
          '500': '#03A4FF',
          '600': '#027FDB',
          '700': '#015FB7',
          '800': '#004393',
          '900': '#00307A',
        },
        'secondary': {
          '100': '#D4FCDD',
          '200': '#ABF9C4',
          '300': '#7EEDAD',
          '400': '#5BDB9E',
          '500': '#2BC48A',
          '600': '#2da87b',
          '700': '#158D77',
          '800': '#0D7169',
          '900': '#085C5E',
        },
        'gray': {
          '100': '#F2F3F5',
          '200': '#EDEDED',
          '300': '#DCDDDE',
          '400': '#AAB0B6',
          '500': '#72767D',
          '600': '#4F545C',
          '700': '#40444B',
          '800': '#36393F',
          '900': '#2F3136',
        },
        'red': {
          '100': '#FFE8D7',
          '200': '#FFCBB0',
          '300': '#FFA788',
          '400': '#FF866B',
          '500': '#FF4E3A',
          '600': '#DB2E2A',
          '700': '#B71D26',
          '800': '#931224',
          '900': '#7A0B23'
        }
      }
    },
  },
  plugins: [],
};