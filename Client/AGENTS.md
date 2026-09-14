# Client Agent Guidelines

- **Framework**: TanStack Start with Vite and SSR enabled.
- **Routing**: File-based routes located in `src/routes/`. The entry root layout is `src/routes/__root.tsx`.
- **Components**: Section components are organized under `src/pages/<SectionName>/` with paired `.tsx` and `.scss` files.
- **Styling**: Global styles and Tailwind tokens are managed in `src/styles.css`.
- **Server Separation**: The client connects to the independent backend API server configured via `VITE_API_BASE_URL`.
