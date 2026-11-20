# Orbit Stopwatch — Implementation Plan

## Implementation approach

Build a single-page React 18 + Vite application with a no-backend architecture. `App.jsx` owns session-level state and composes focused components; timing lives in `useStopwatch`, which uses `performance.now()` and `requestAnimationFrame` with an accumulated-time model so inactivity does not create drift. LocalStorage stores theme, display mode, sound preference, laps, session history, and the last running snapshot for refresh recovery.

The display is a responsive instrument stage: an SVG orbit dial is the default, with flip digits and analog hand modes sharing the same timer value. Framer Motion handles entrance, panel, list, and state transitions; CSS animations handle low-cost ambient effects. Web Audio provides short generated tones only when enabled. CSV export is generated entirely in the browser. The static route manifest declares `/`.

## Design

- **Design movement:** Cinematic glassmorphism meets observatory instrumentation.
- **Core principles:** The dial is the hero; motion should communicate time; controls should feel tactile; utility panels should recede until needed.
- **Color philosophy:** Deep ink and blue-black surfaces create a quiet room for luminous cyan, violet, and amber state colors. Each theme shifts the atmosphere rather than replacing the instrument language.
- **Layout paradigm:** A split instrument console: the large dial occupies the visual center-left while a compact telemetry rail carries session metadata, laps, and controls. On mobile the rail stacks beneath the dial.
- **Signature elements:** Orbiting cyan planet, minute arc with engraved ticks, and translucent telemetry cards with hairline borders.
- **Interaction philosophy:** Pressing a control should feel like operating a precision device: clear state changes, small ripples, and restrained feedback rather than noisy decoration.
- **Animation:** Entrance stagger is slow and cinematic; running state adds a breathing glow and planet drift; lap creation uses a brief particle burst. Reduced-motion users receive the same hierarchy without continuous effects.
- **Typography system:** Space Grotesk for interface copy and JetBrains Mono for all numeric telemetry, labels, and keyboard hints.
- **Brand essence:** A stopwatch for people who want focus to feel physical — precise, cinematic, memorable. Personality: focused, luminous, tactile.
- **Brand voice:** Headlines are observational and concise. Example lines: “Time, in orbit.” / “Hold the moment. Read the instrument.”
- **Wordmark & logo:** A small orbit glyph wraps a single luminous dot beside the STOPWATCH wordmark.
- **Signature brand color:** Signal cyan `#6fffe9`.

## Project structure

- `src/App.jsx` orchestrates persistence, timer actions, mode/theme selection, history, focus mode, and global keyboard shortcuts.
- `src/hooks/` contains the accurate timer, localStorage wrapper, shortcut binding, and Web Audio feedback.
- `src/components/` contains the visual instrument, alternate modes, controls, lap/history panels, switches, and particles.
- `src/utils/` contains time formatting and CSV export helpers.
- `src/styles/` contains component-scoped styles plus the theme variable map; `src/index.css` owns global layout and accessibility foundations.
- `public/manus-routes.json` declares the root page for preview and publication tooling.

## Build workflow

Install dependencies with `npm install`, run the Vite server on port 3000 with `npm run dev -- --host 0.0.0.0`, and validate with `npm run build`. The app is static and needs no managed server, database, or secrets.
