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
      'Blues': '#06b6d4',
      'Gray4':'#1F2937',
      'Gray3':'#374151',
      'Gray1':'#D1D5DB',
      'Gray2':'#9ca3af',
      'whites':'#FFFFFF',
      'blacks':'#000000',
      'purples':'#9333ea',
      }),

      textColor:{
      'primaryRed': '#CC2D4A',
      'Blues': '#06b6d4',
      'Gray4':'#1F2937',
      'Gray2':'#9ca3af',
      'Gray3':'#374151',
      'Gray1':'#D1D5DB',
      'whites':'#FFFFFF',
      'blacks':'#000000',
      'purples':'#9333ea',
      },

    extend: {
      backgroundImage: {
        'hero': "url('https://img.freepik.com/foto-gratis/imagen-primer-plano-programador-trabajando-su-escritorio-oficina_1098-18707.jpg?w=900&t=st=1675108848~exp=1675109448~hmac=2a6557bd9febfa7b4583f13abf87e1fb2208b5666542ded03b85201d34adb68c')",
        'photo':"url('https://media.licdn.com/dms/image/C4D03AQGYtlczsNRCJg/profile-displayphoto-shrink_200_200/0/1647275698778?e=1680739200&v=beta&t=gjlZGBfT9LY9Ve-bogXPAghzzdQwdlgUyZjtUecZg8U')"
      }
    },
  },

  plugins: [],
}
