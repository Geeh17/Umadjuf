import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brandTop: "#e67f42",
        brandMid: "#d1683a",
        brandBg: "#c48e6c"
      }
    }
  },
  plugins: [],
}
export default config
