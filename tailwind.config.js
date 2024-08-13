/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral1:'#FFFFFF',
        neutral2:'#94979A',
        neutral3:'#393D41',
        neutral4:'#2C2F33',
        neutral5:'#222528',
        primary1:'#F4CCC8',
        primary2:'#EBA59E',
        primary3:'#E27D73',
        primary4:'#DA584B',
        secondary1:'#C8E1BC',
        secondary2:'#AAD199',
        secondary3:'#8DC275',
        secondary4:'#70B252',
        tertiary1:'#F9EED7',
        tertiary2:'#F2DAAB',
        tertiary3:'#EBC77F',
        tertiary4:'#E5B454',
      },
    },
    
  },
  plugins: [],
}
