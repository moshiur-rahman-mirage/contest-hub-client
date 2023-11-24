/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],

  theme: {
    extend: {},
  },
  daisyui: {
    themes: [{
      dark: {
        // header footer
        "primary":"#0024f2",
        // button color , highlight color 
        "secondary": "#F9DC5C",
        // "secondary":"#E09409",
        // background color
        "base-100":"#F2F3F5",
        // text color
        "neutral": "#FFFFFF",

        "neutral-content": "#000000",
        "accent": "#5A6EED",

      },

      light: {

        "primary": "#004C3F",

        "secondary": "#008C71",

        "accent": "#008C71",

        "neutral": "#000000",
  
        "neutral-content": "#FFFFFF",


        "info": "#333333",

        "success": "#FFD700",
      },
    },],
  },
  plugins: [require("daisyui")],
}

