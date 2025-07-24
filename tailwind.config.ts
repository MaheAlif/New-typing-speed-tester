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
        'primary-dark': '#18122B',
        'primary': '#393053',
        'accent': '#7F6AFF',
        'neon-blue': '#38bdf8',
        'neon-purple': '#a78bfa',
        'neon-pink': '#f472b6',
        'glass': 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        modern: ['Inter', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        neon: '0 0 16px 2px #7F6AFF',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at 50% 50%, #393053 0%, #18122B 100%)',
        'gradient-neon': 'linear-gradient(90deg, #7F6AFF 0%, #38bdf8 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
