import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Caribbean-rooted, modern editorial palette.
        ink: "#0E120F",
        bone: "#F6F1E7",
        cream: "#FBF6EB",
        moss: "#1F3D2A",
        palm: "#2E5D3D",
        sun: "#F4B53F",
        flame: "#D9402C",
        sea: "#3A7CA5",
        clay: "#B86A4B",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: { widest2: "0.22em" },
      boxShadow: {
        soft: "0 1px 2px rgba(14,18,15,0.04), 0 4px 16px rgba(14,18,15,0.06)",
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "fade-up": { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "fade-up": "fade-up 700ms cubic-bezier(0.2, 0.7, 0.2, 1) both",
      },
    },
  },
  plugins: [],
}
export default config
