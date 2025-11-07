<!--
Guidance for AI coding agents working on the IMB Playground (TypeRacer) monorepo.
Focus: concise, actionable facts that make an AI agent productive immediately.
--> 

# Copilot / AI agent instructions — IMB Playground (TypeRacer)

Summary
- Monorepo (TypeScript) with three packages: `packages/frontend`, `packages/backend`, `packages/shared`.
- Frontend: React + TypeScript (HMR, served on :3000). Backend: Express + Socket.IO (API & real-time, :3001).
- Shared types live in `packages/shared/types.ts` and are imported by both sides.

Key files & where to look
- Backend entry: `packages/backend/src/server.ts` — Express server and Socket.IO bootstrap.
- Backend domain: `packages/backend/src/services/GameService.ts` (game logic), `socket/socketHandlers.ts` (event handlers), `routes/gameRoutes.ts` and `routes/fileRoutes.ts`.
- Frontend UI: `packages/frontend/src/components/*` — game components live under `components/game` (e.g. `TypingInterface.tsx`, `CelebrationHeader.tsx`).

Architecture notes an agent must know
- Layered monolith with clear separation: presentation (frontend), API/socket (backend), shared types.
- Communication: backend emits/receives Socket.IO events (see `socketHandlers.ts`) and also exposes REST routes for file uploads.
- Persistence: current design uses in-memory runtime state (no persistent DB). Avoid assumptions about durable storage.

Developer workflows (commands to run)
- Install and run locally (root):
	```bash
	npm install
	npm run dev        # turborepo dev: runs frontend + backend with hot reload
	npm run dev:frontend
	npm run dev:backend
	```
- Docker-compose (optional, includes Sentry stack):
	```bash
	npm run docker:build
	npm run docker:up
	npm run docker:down
	```
- Linting (frontend):
	```bash
	cd packages/frontend
	npx eslint src --format=compact
	```

Project-specific conventions
- Shared types: always import from `packages/shared` (single source of truth). Example: `import { GameResult } from '../../types'` in frontend components.
- Socket events: prefer emitting shaped payloads defined in `shared/types.ts`. Look at `captureGameEvent` usage in frontend components.
- No DB: state resets on server restart — if you change GameService to persist, update Docker/Sentry config as appropriate.

CI / code review hooks
- GitHub workflows live in `.github/workflows/`. Current repo uses ReviewDog for static checks (`reviewdog.yml`).
- For AI-assisted PR reviews we sometimes used Codex/AI actions; if present they require `OPENAI_API_KEY` secret. Otherwise use ReviewDog + local linting.

When editing code
- Run lint and unit checks locally (see `packages/frontend` ESLint config). Fix warnings before proposing PR to avoid noisy ReviewDog comments.
- For socket-related changes, run both frontend and backend dev servers and perform end-to-end manual tests (quick typing game run) — many behaviors are integration-time dependent.

Examples of small tasks an agent can help with
- Fix a missing React hook dependency: update dependency array in `TypingInterface.tsx` (example already changed in repo).
- Remove unused imports in components (e.g. in `CelebrationHeader.tsx`).
- Improve type coverage by adding missing types to `packages/shared/types.ts` and updating usages.

If something is unclear
- Point to the exact file and function you want changed. Prefer small diffs (<200 lines) for accurate PR reviews.

End.
