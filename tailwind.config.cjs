
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  presets: [require('./tailwind-preset/gds-preset.cjs')],

  theme: {
    fontSize: {
      xs: ["12px", "18px"], // Caption
      sm: ["14px", "20px"], // Paragraph 03
      base: ["16px", "26px"], //Paragraph 02
      lg: ["18px", "26px"], // Paragraph 01
      xl: ["20px", "29px"], // Sub-heading
      "2xl": ["24px", "28px"], // Heading 04
      "3xl": ["32px", "38px"], // Heading 03
      "4xl": ["40px", "48px"], // Heading 02
      "5xl": ["48px", "50px"], //Heading 01
      "6xl": ["64px", "76px"], // Display 02
      "7xl": ["72px", "86px"], // Display 01
    },
    container: {
      center: true,
      screens: {
        sm: "540px",
        // => @media (min-width: 576px) { ... }
        md: "720px",
        // => @media (min-width: 960px) { ... }
        lg: "960px",
        // => @media (min-width: 992px) { ... }
        xl: "1140px",
        // => @media (min-width: 1200px) { ... }
        xxl: "1320px",
        // => @media (min-width: 1400px) { ... }
      },
    },
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }
      md: "768px",
      // => @media (min-width: 960px) { ... }
      mdc: "950px",
      lg: "992px",
      // => @media (min-width: 992px) { ... }
      xl: "1200px",
      // => @media (min-width: 1200px) { ... }
      xxl: "1400px",
      // => @media (min-width: 1400px) { ... }
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
        lato: ["Lato"],
      },
      transitionDelay: {
        0: "0ms",
      },
    },
    data: {
      active: 'ui~="active"',
    },
  },
  plugins: [forms, typography],
};
