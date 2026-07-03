import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1F4D3D",
          50: "#EAF2EC",
          100: "#CFE3D5",
          200: "#A3C7AF",
          300: "#77AB89",
          400: "#4B8F63",
          500: "#2E6B48",
          600: "#1F4D3D",
          700: "#173A2E",
          800: "#10281F",
          900: "#0A1810"
        },
        moss: {
          DEFAULT: "#6B9071",
          light: "#9DBBA0",
          dark: "#4B6B52"
        },
        turmeric: {
          DEFAULT: "#E3A857",
          light: "#F0C888",
          dark: "#C8873A"
        },
        clay: {
          DEFAULT: "#B85C32",
          light: "#D68159",
          dark: "#8F441F"
        },
        paper: {
          DEFAULT: "#FBF8F1",
          dim: "#F2EDE1"
        },
        ink: {
          DEFAULT: "#23261F",
          soft: "#4A4E42"
        },
        nightforest: {
          bg: "#0E1913",
          surface: "#152820",
          surface2: "#1C332A",
          text: "#F3EFE4"
        }
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      backgroundImage: {
        "contour-lines": "url('/patterns/contour.svg')"
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(23, 58, 46, 0.18)",
        "soft-lg": "0 12px 40px -12px rgba(23, 58, 46, 0.28)",
        glass: "0 8px 32px 0 rgba(15, 40, 30, 0.15)",
        "glow-turmeric": "0 0 0 1px rgba(227,168,87,0.35), 0 8px 24px -8px rgba(227,168,87,0.45)"
      },
      backdropBlur: {
        glass: "20px"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-18px) translateX(10px)" }
        },
        floatSlower: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(14px) translateX(-14px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        scrollHint: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(10px)", opacity: "1" }
        }
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-out forwards",
        slideUp: "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        floatSlow: "floatSlow 9s ease-in-out infinite",
        floatSlower: "floatSlower 13s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        scrollHint: "scrollHint 2s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
