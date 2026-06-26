import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base` must match your GitHub repo name so asset paths resolve on
// GitHub Pages (served from https://<user>.github.io/<repo>/).
// If you rename the repo, update this string to match.
export default defineConfig({
  plugins: [react()],
  base: '/chicago-street-trainer/',
})
