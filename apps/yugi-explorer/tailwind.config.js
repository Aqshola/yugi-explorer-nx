const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily:{
        grenze:['Grenze', 'serif']
      },
      colors:{
        blue:{
          primary:"#11007E",
          dark:"#0E0068",
          light:"#003287"
        },
        yellow:{
          primary:"#FFC100"
        }

      }
    },
  },
  plugins: [],
};
