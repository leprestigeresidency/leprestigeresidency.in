# Le Prestige Boutique Hotel

React + Vite + Tailwind CSS v4 luxury hotel website.

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Framer Motion + GSAP + Lenis
- Lucide React icons

## Project Structure

- `src/main.tsx` — React entrypoint
- `src/App.tsx` — App shell (Lenis, Loader, Navbar, Pages, Footer)
- `src/app/Home.tsx` — Landing page composition
- `src/components/` — All UI components (layout, hero, sections, cards, animations, ui, common)
- `src/constants/hotel.ts` — Single source of truth for hotel information
- `src/data/` — Static data (rooms, amenities, reviews, branches)
- `src/types/` — TypeScript type definitions
- `src/styles/` — CSS design system (variables, typography, animations, globals)
- `src/hooks/` — Custom React hooks
- `src/utils/` — Utility functions

## Code Quality

- Use double quotes for strings containing apostrophes
- Ensure JSX tags are closed and braces are balanced
- Export components as default exports
