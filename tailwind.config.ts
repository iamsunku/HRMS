import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                "primary-hover": "var(--primary-hover)",
                secondary: "var(--secondary)",
                "secondary-hover": "var(--secondary-hover)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                card: "var(--card)",
                "card-foreground": "var(--card-foreground)",
                border: "var(--border)",
                input: "var(--input)",
            },
            fontFamily: {
                sans: ["var(--font-outfit)", "sans-serif"],
            },
            borderRadius: {
                lg: "0.75rem",
                xl: "1rem",
                "2xl": "1.5rem",
                "3xl": "2rem",
            },
            boxShadow: {
                premium: "0 10px 40px -10px rgba(0, 0, 0, 0.05), 0 2px 10px -5px rgba(0, 0, 0, 0.02)",
                strong: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }
        },
    },
    plugins: [],
    // Force rebuild
};
export default config;
