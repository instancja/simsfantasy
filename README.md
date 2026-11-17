# LIFEVERSE

A private, local-first narrative and social simulation app.

## Requirements
- Node.js 20.9 or newer
- npm

## Run locally
1. Copy `.env.example` to `.env`.
2. Install dependencies: `npm install`.
3. Generate Prisma client and sync the local database:
   `npm run db:generate` then `npm run db:push`.
4. Start the app: `npm run dev`.
5. Open http://localhost:3000.

## Technology
- Next.js + React + TypeScript
- SQLite + Prisma
- English-language application UI

All character and world data is stored locally in SQLite. The database file is excluded from Git.