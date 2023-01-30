/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    "./src/**/*.{html,ts}"
  ],

  theme: {

    fontFamily: {
      Montserrat: ["Montserrat", "sans-serif"],
    },

    backgroundColor: theme =>({

      ...theme('colors'),
      'primaryRed': '#CC2D4A',
      'secondaryGreen': '#8FA206',
      'tertiaryBlue': '#61AEC9',
      'darkGray':'#1F2937',
      'lightGray':'#374151',
      'grayFooter':'#D1D5DB',
      'whites':'#FFFFFF'
      }),

      textColor:{
      'primaryRed': '#CC2D4A',
      'secondaryGreen': '#8FA206',
      'tertiaryBlue': '#61AEC9',
      'darkGray':'#1F2937',
      'lightGray':'#374151',
      'grayFooter':'#D1D5DB',
      'whites':'#FFFFFF'
      },

    extend: {
      backgroundImage: {
        'hero': "url('https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2620118_960_720.jpg')",
        'photo':"url('https://media.licdn.com/dms/image/C4D03AQGYtlczsNRCJg/profile-displayphoto-shrink_200_200/0/1647275698778?e=1680739200&v=beta&t=gjlZGBfT9LY9Ve-bogXPAghzzdQwdlgUyZjtUecZg8U')"
      }
    },
  },

  plugins: [],
}
