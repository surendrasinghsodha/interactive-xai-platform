/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Core animations
        "sparkle-fall": {
          "0%": {
            transform: "translateY(-100vh) rotate(0deg)",
            opacity: "0",
          },
          "10%": {
            opacity: "1",
          },
          "90%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateY(100vh) rotate(360deg)",
            opacity: "0",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "float-slow": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        "float-reverse": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(20px)",
          },
        },
        gradient: {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        "bounce-gentle": {
          "0%, 20%, 50%, 80%, 100%": {
            transform: "translateY(0)",
          },
          "40%": {
            transform: "translateY(-8px)",
          },
          "60%": {
            transform: "translateY(-4px)",
          },
        },
        wiggle: {
          "0%, 7%": {
            transform: "rotateZ(0)",
          },
          "15%": {
            transform: "rotateZ(-15deg)",
          },
          "20%": {
            transform: "rotateZ(10deg)",
          },
          "25%": {
            transform: "rotateZ(-10deg)",
          },
          "30%": {
            transform: "rotateZ(6deg)",
          },
          "35%": {
            transform: "rotateZ(-4deg)",
          },
          "40%, 100%": {
            transform: "rotateZ(0)",
          },
        },
        "spin-slow": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        "spin-very-slow": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        // Button animations
        "bounce-crazy": {
          "0%, 20%, 50%, 80%, 100%": {
            transform: "translateY(0) rotate(0deg)",
          },
          "40%": {
            transform: "translateY(-30px) rotate(10deg)",
          },
          "60%": {
            transform: "translateY(-15px) rotate(-5deg)",
          },
        },
        "wiggle-crazy": {
          "0%, 7%": {
            transform: "rotateZ(0)",
          },
          "15%": {
            transform: "rotateZ(-25deg)",
          },
          "20%": {
            transform: "rotateZ(20deg)",
          },
          "25%": {
            transform: "rotateZ(-20deg)",
          },
          "30%": {
            transform: "rotateZ(15deg)",
          },
          "35%": {
            transform: "rotateZ(-10deg)",
          },
          "40%, 100%": {
            transform: "rotateZ(0)",
          },
        },
        "shake-crazy": {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateX(-10px)",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translateX(10px)",
          },
        },
        "party-time": {
          "0%, 100%": {
            transform: "scale(1) rotate(0deg)",
          },
          "25%": {
            transform: "scale(1.1) rotate(5deg)",
          },
          "50%": {
            transform: "scale(0.9) rotate(-5deg)",
          },
          "75%": {
            transform: "scale(1.05) rotate(3deg)",
          },
        },
        "fortress-mode": {
          "0%, 100%": {
            transform: "scale(1)",
            filter: "drop-shadow(0 0 10px currentColor)",
          },
          "50%": {
            transform: "scale(1.1)",
            filter: "drop-shadow(0 0 20px currentColor) drop-shadow(0 0 30px #fff)",
          },
        },
        transform: {
          "0%": {
            transform: "scale(1) rotate(0deg)",
          },
          "25%": {
            transform: "scale(0.8) rotate(90deg)",
          },
          "50%": {
            transform: "scale(1.2) rotate(180deg)",
          },
          "75%": {
            transform: "scale(0.9) rotate(270deg)",
          },
          "100%": {
            transform: "scale(1) rotate(360deg)",
          },
        },
        // Character animations
        "brain-think": {
          "0%, 100%": {
            transform: "scale(1)",
            filter: "hue-rotate(0deg)",
          },
          "50%": {
            transform: "scale(1.1)",
            filter: "hue-rotate(180deg)",
          },
        },
        "electric-dance": {
          "0%, 100%": {
            transform: "translateY(0) rotate(0deg)",
          },
          "25%": {
            transform: "translateY(-5px) rotate(5deg)",
          },
          "50%": {
            transform: "translateY(0) rotate(0deg)",
          },
          "75%": {
            transform: "translateY(5px) rotate(-5deg)",
          },
        },
        "group-cheer": {
          "0%, 100%": {
            transform: "scale(1) translateY(0)",
          },
          "50%": {
            transform: "scale(1.05) translateY(-5px)",
          },
        },
        "shield-protect": {
          "0%, 100%": {
            transform: "scale(1)",
            filter: "drop-shadow(0 0 5px currentColor)",
          },
          "50%": {
            transform: "scale(1.05)",
            filter: "drop-shadow(0 0 15px currentColor)",
          },
        },
        "robot-dance": {
          "0%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(-10deg)",
          },
          "50%": {
            transform: "rotate(0deg)",
          },
          "75%": {
            transform: "rotate(10deg)",
          },
        },
        "rocket-launch": {
          "0%": {
            transform: "translateY(0) rotate(0deg)",
          },
          "25%": {
            transform: "translateY(-10px) rotate(-5deg)",
          },
          "50%": {
            transform: "translateY(-20px) rotate(5deg)",
          },
          "75%": {
            transform: "translateY(-15px) rotate(-3deg)",
          },
          "100%": {
            transform: "translateY(-25px) rotate(0deg)",
          },
        },
        // Glow effects
        "pulse-neon": {
          "0%, 100%": {
            "box-shadow": "0 0 5px currentColor",
          },
          "50%": {
            "box-shadow": "0 0 20px currentColor, 0 0 30px currentColor",
          },
        },
        "text-glow": {
          "0%, 100%": {
            "text-shadow": "0 0 5px currentColor",
          },
          "50%": {
            "text-shadow": "0 0 20px currentColor, 0 0 30px currentColor",
          },
        },
        "button-glow": {
          "0%, 100%": {
            "box-shadow": "0 0 5px currentColor",
          },
          "50%": {
            "box-shadow": "0 0 20px currentColor, 0 0 30px currentColor",
          },
        },
        "particle-float": {
          "0%": {
            transform: "translateY(0px) translateX(0px)",
            opacity: "0",
          },
          "10%": {
            opacity: "1",
          },
          "90%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-100px) translateX(20px)",
            opacity: "0",
          },
        },
        "corner-glow": {
          "0%, 100%": {
            "border-color": "currentColor",
            filter: "drop-shadow(0 0 2px currentColor)",
          },
          "50%": {
            "border-color": "currentColor",
            filter: "drop-shadow(0 0 8px currentColor)",
          },
        },
        // Demo specific animations
        "portal-pulse-strong": {
          "0%, 100%": {
            transform: "scale(1)",
            "box-shadow": "0 0 25px #a855f7, 0 0 50px #06b6d4, 0 0 10px #ec4899 inset",
          },
          "50%": {
            transform: "scale(1.15)",
            "box-shadow": "0 0 40px #a855f7, 0 0 70px #06b6d4, 0 0 20px #ec4899 inset, 0 0 5px #fff",
          },
        },
        "vortex-swirl-fast": {
          from: {
            transform: "rotate(0deg) scale(1.3)",
          },
          to: {
            transform: "rotate(360deg) scale(1)",
          },
        },
        "data-packet-float": {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-15px) rotate(5deg)",
          },
        },
        "data-bit-orbit": {
          "0%": {
            transform: "rotate(0deg) translateX(35px) rotate(0deg) scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "rotate(180deg) translateX(40px) rotate(-180deg) scale(0.8)",
            opacity: "0.7",
          },
          "100%": {
            transform: "rotate(360deg) translateX(35px) rotate(-360deg) scale(1)",
            opacity: "1",
          },
        },
        "success-pulse-emit": {
          "0%": {
            transform: "scale(0.8)",
            opacity: "0",
          },
          "50%": {
            opacity: "0.6",
          },
          "100%": {
            transform: "scale(1.8)",
            opacity: "0",
          },
        },
        "comic-text-pop": {
          "0%": {
            transform: "translate(-50%, -50%) scale(0) rotate(-15deg)",
            opacity: "0",
          },
          "60%": {
            transform: "translate(-50%, -50%) scale(1.2) rotate(5deg)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(-50%, -50%) scale(1) rotate(0deg)",
            opacity: "1",
          },
        },
        "scale-wobble": {
          "0%, 100%": {
            transform: "rotateZ(0deg)",
          },
          "25%": {
            transform: "rotateZ(3deg)",
          },
          "75%": {
            transform: "rotateZ(-3deg)",
          },
        },
        "brain-scan": {
          "0%, 100%": {
            filter: "drop-shadow(0 0 10px #ec4899) hue-rotate(0deg)",
            transform: "scale(1)",
          },
          "50%": {
            filter: "drop-shadow(0 0 25px #ec4899) hue-rotate(90deg)",
            transform: "scale(1.05)",
          },
        },
        "impact-burst": {
          "0%": {
            transform: "scale(0)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(2)",
            opacity: "0",
          },
        },
        "meter-glow": {
          "0%, 100%": {
            "box-shadow": "0 0 5px rgba(252, 211, 77, 0.5)",
          },
          "50%": {
            "box-shadow": "0 0 15px rgba(252, 211, 77, 0.8)",
          },
        },
        "detective-float": {
          "0%, 100%": {
            transform: "translateY(0) rotate(5deg)",
          },
          "50%": {
            transform: "translateY(-10px) rotate(-5deg)",
          },
        },
        "detective-think": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-5px)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Core animations
        "sparkle-fall": "sparkle-fall 4s linear infinite",
        float: "float 3s ease-in-out infinite",
        "float-slow": "float-slow 4s ease-in-out infinite",
        "float-reverse": "float-reverse 3s ease-in-out infinite",
        gradient: "gradient 3s ease infinite",
        "gradient-x": "gradient-x 3s ease infinite",
        "bounce-gentle": "bounce-gentle 2s infinite",
        wiggle: "wiggle 2s ease-in-out infinite",
        "spin-slow": "spin-slow 3s linear infinite",
        "spin-very-slow": "spin-very-slow 8s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        // Button animations
        "bounce-crazy": "bounce-crazy 0.6s ease-in-out",
        "wiggle-crazy": "wiggle-crazy 0.8s ease-in-out",
        "shake-crazy": "shake-crazy 0.8s ease-in-out",
        "party-time": "party-time 0.6s ease-in-out",
        "fortress-mode": "fortress-mode 1s ease-in-out",
        transform: "transform 1s ease-in-out",
        // Character animations
        "brain-think": "brain-think 2s ease-in-out infinite",
        "electric-dance": "electric-dance 0.5s ease-in-out infinite",
        "group-cheer": "group-cheer 1s ease-in-out infinite",
        "shield-protect": "shield-protect 1.5s ease-in-out infinite",
        "robot-dance": "robot-dance 1s ease-in-out infinite",
        "rocket-launch": "rocket-launch 2s ease-in-out infinite",
        // Glow effects
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        "text-glow": "text-glow 2s ease-in-out infinite",
        "button-glow": "button-glow 2s ease-in-out infinite",
        "particle-float": "particle-float 4s ease-in-out infinite",
        "corner-glow": "corner-glow 2s ease-in-out infinite",
        // Demo specific animations
        "portal-pulse-strong": "portal-pulse-strong 2.5s ease-in-out infinite",
        "vortex-swirl-fast": "vortex-swirl-fast 3s linear infinite",
        "data-packet-float": "data-packet-float 2.5s ease-in-out infinite",
        "data-bit-orbit": "data-bit-orbit 3s linear infinite",
        "success-pulse-emit": "success-pulse-emit 0.8s ease-out forwards",
        "comic-text-pop": "comic-text-pop 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards",
        "scale-wobble": "scale-wobble 1.5s ease-in-out infinite",
        "brain-scan": "brain-scan 3s ease-in-out infinite",
        "impact-burst": "impact-burst 0.3s ease-out forwards",
        "meter-glow": "meter-glow 1s ease-in-out infinite alternate",
        "detective-float": "detective-float 3s ease-in-out infinite",
        "detective-think": "detective-think 1.5s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
