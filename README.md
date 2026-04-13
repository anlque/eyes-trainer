# Eye Training (React SPA)

Eye-friendly “eye training” single-page app with guided exercises and smooth animations.

## Features

- **Landing page** (`/`) introducing the app
- **Exercises grid** (`/exercises`) with animated previews (runs on hover/focus)
- **Exercise player** (`/exercise/:exerciseId`) with:
  - **Start / Pause / Reset**
  - **Timer + progress bar**
  - Smooth animations using `requestAnimationFrame` without per-frame React re-renders
- **Theme toggle** (dark + light). Light theme uses a **soft green accent**.

## Tech stack

- React + TypeScript
- Vite
- React Router
- ESLint + Prettier
- No UI frameworks

## Getting started

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Scripts

- `npm run dev`: start dev server
- `npm run build`: typecheck + production build
- `npm run preview`: preview production build
- `npm run lint` / `npm run lint:fix`: lint codebase
- `npm run format` / `npm run format:write`: prettier check / write

## Project structure (high level)

```text
src/
  app/                 # router + layout
  exercises/           # registry + stages + renderers + previews
  features/            # screens/pages grouped by feature
  hooks/               # reusable hooks (timer, animation frame, theme)
  styles/              # global CSS variables + components styles
  utils/               # small utilities (time formatting, etc.)
```

## Exercises architecture (registry-driven)

Exercises are defined in one place: `src/exercises/registry.tsx`.

Each exercise definition includes:

- `id`, `title`, `description`, `defaultDurationMs`
- `Stage`: what renders inside the player
- `Preview` (optional): tiny animated preview for cards

This registry drives:

- the Exercises page grid
- the Landing preview grid
- the Player rendering

## Adding a new exercise

1. Create a renderer in `src/exercises/renderers/` (DOM updates via refs + `useAnimationFrame`)
2. Wrap it with a stage in `src/exercises/stages/` (just maps `ExerciseStageProps`)
3. (Optional) Add a preview in `src/exercises/previews/` (prefer CSS animation)
4. Register it in `src/exercises/registry.tsx`

## Theme

Theme is stored in `localStorage` and applied as `html[data-theme="dark"|"light"]`.

- Hook: `src/hooks/useTheme.ts`
- Tokens: `src/styles/global.css` (`--accent-rgb`, `--stage-bg`, etc.)
