/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        murakali: {
          primary: "#3b82f6",
          "primary-content": "#ffffff",
          secondary: "#2545CA",
          "secondary-content": "#ffffff",
          accent: "#FACC15",
          "accent-focus": "#EEC10C",
          neutral: "#3D4451",
          "neutral-focus": "#303640",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#F2F2F2",
          "base-300": "#E6E6E6",
          "base-content": "#303640",
          info: "#3b82f6",
          success: "#4ade80",
          warning: "#fde047",
          error: "#ef4444",

          "--rounded-box": "0.375rem",
          "--rounded-btn": "0.375rem",
          "--rounded-badge": "2rem",
          "--animation-btn": "0",
          "--animation-input": "0.2s",
          "--btn-text-case": "",
          "--btn-focus-scale": "1",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
    ],
  },
};
