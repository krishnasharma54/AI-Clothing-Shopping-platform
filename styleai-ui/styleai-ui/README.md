# StyleAI Frontend (React + Vite + Tailwind v4)

1. Start the Spring Boot backend on port 8080.
2. `npm install`
3. `npm run dev`  ->  http://localhost:5173

Vite proxies every `/api/...` call to `http://localhost:8080` (see `vite.config.js`),
so no CORS setup or API URL is needed.

Theme: colors and fonts from the Stitch "Atelier Digital" design system live in `src/index.css`.
