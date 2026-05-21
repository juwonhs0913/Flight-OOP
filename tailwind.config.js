/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bebas Neue'", "cursive"],
        mono: ["'JetBrains Mono'", "monospace"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        sky: {
          950: "#050d1a",
          900: "#0a1628",
          800: "#0f2040",
          700: "#1a3a6e",
        },
        amber: {
          glow: "#f59e0b",
        },
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        runway: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-200%)" },
        },
        liftoff: {
          "0%": { transform: "translateX(0) translateY(0) rotate(0deg)" },
          "50%": { transform: "translateX(60px) translateY(-20px) rotate(-10deg)" },
          "100%": { transform: "translateX(120px) translateY(-60px) rotate(-15deg)" },
        },
        boardingWalk: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(40px)" },
        },
        cargoLift: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        pulse_glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(245,158,11,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(245,158,11,0.8)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        taxiMove: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(80px)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        runway: "runway 2s linear infinite",
        liftoff: "liftoff 2s ease-in forwards",
        boardingWalk: "boardingWalk 0.8s ease-in-out infinite alternate",
        cargoLift: "cargoLift 0.6s ease-out forwards",
        pulse_glow: "pulse_glow 2s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        taxiMove: "taxiMove 1.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
