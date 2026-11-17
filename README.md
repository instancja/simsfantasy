# LIFEVERSE

Prywatna, lokalna aplikacja symulacyjno-fabularna.

## Wymagania

- Node.js 20.9 lub nowszy
- npm

## Uruchomienie lokalne

1. Skopiuj `.env.example` do `.env`.
2. Zainstaluj zależności:

   ```bash
   npm install
   ```

3. Wygeneruj klienta bazy danych i utwórz lokalną bazę:

   ```bash
   npm run db:generate
   npm run db:push
   ```

4. Uruchom aplikację:

   ```bash
   npm run dev
   ```

5. Otwórz http://localhost:3000.

## Technologie

- Next.js + React + TypeScript
- SQLite + Prisma
- CSS Modules / global CSS

Dane aplikacji są lokalne. Plik bazy danych nie jest wersjonowany w Git.
