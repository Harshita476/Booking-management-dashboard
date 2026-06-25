# Saltline Charters — Full-Stack App

A Next.js (App Router) site for a private sailing charter business, with a booking form backed by
a real Postgres database (via Neon) and a protected admin panel to review requests.

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Prisma ORM + PostgreSQL (Neon)
- NextAuth.js (Credentials provider) for the admin login
- Zod for validation

## 1. Install dependencies

```bash
npm install
```

## 2. Set up the database (Neon)

Run this from the project root:

```bash
npx neonctl@latest init
```

This will:
- Open your browser to authenticate with Neon
- Create a new Neon project
- Detect the `prisma/schema.prisma` file in this project
- Write the connection string into your `.env` file automatically as `DATABASE_URL`

If you'd rather do it manually: sign up at neon.tech, create a project, copy the **pooled**
connection string from the dashboard, and paste it into `.env` as `DATABASE_URL`.

## 3. Set the rest of your environment variables

Copy the example file:

```bash
cp .env.example .env
```

Then fill in (if `neonctl init` didn't already set `DATABASE_URL` for you):

```
DATABASE_URL=            # from Neon
NEXTAUTH_SECRET=         # run: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=pick-a-strong-password
```

## 4. Create the database tables

```bash
npx prisma migrate dev --name init
```

This creates the `BookingRequest` and `AdminUser` tables in your Neon database.

## 5. Seed the admin user

```bash
npm run db:seed
```

This creates one admin account using `ADMIN_EMAIL` / `ADMIN_PASSWORD` from your `.env` (the
password is hashed before it's stored — never stored in plaintext).

## 6. Run it locally

```bash
npm run dev
```

- Landing page + booking form: http://localhost:3000
- Admin login: http://localhost:3000/admin/login
- Admin dashboard (after logging in): http://localhost:3000/admin

Submit a test booking on the landing page, then log into the admin panel and confirm it shows up
in the table. Try changing its status from "New" to "Confirmed" — it should update immediately.

## 7. Deploy to Vercel

1. Push this project to a GitHub repo.
2. Import the repo in Vercel.
3. In the Vercel project's Environment Variables settings, add the same variables from your `.env`
   (`DATABASE_URL`, `NEXTAUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`), and set `NEXTAUTH_URL` to
   your real production URL (e.g. `https://saltlinecharters.com`).
4. Deploy. Vercel runs `npm run build` automatically.
5. After the first deploy, run the migration and seed against production once, either:
   - Locally, by temporarily pointing your `.env`'s `DATABASE_URL` at the production database and
     running `npm run db:deploy` then `npm run db:seed`, or
   - Via Vercel's terminal / a one-off script, if you prefer not to touch prod from your machine.

## Project structure

```
src/
  app/
    page.tsx                 — landing page
    layout.tsx                — root layout, fonts, providers
    globals.css               — base styles + animation keyframes
    api/
      bookings/route.ts       — POST: public booking submissions
      admin/bookings/route.ts — GET/PATCH: protected, used by the admin dashboard
      auth/[...nextauth]/     — NextAuth handler
    admin/
      login/page.tsx          — admin login form
      page.tsx                — protected dashboard (server component, fetches bookings)
  components/                 — landing page sections
  components/admin/           — BookingsTable, LogoutButton
  lib/
    prisma.ts                 — Prisma client singleton
    auth.ts                   — NextAuth config
    validation.ts             — Zod schemas (shared shape for client + server validation)
  middleware.ts                — redirects unauthenticated visitors away from /admin
prisma/
  schema.prisma                — BookingRequest + AdminUser models
  seed.ts                      — creates the first admin user
```

## Notes

- **No data is ever stored in localStorage or only in memory** — every booking is written straight
  to Postgres via Prisma, and the admin table reads directly from the same database.
- The booking API includes basic per-IP rate limiting against accidental double-submits. It resets
  on server restart — fine for a small site, but swap in a real store (e.g. Upstash Redis) if you
  expect meaningful traffic.
- Swap the placeholder contact details (email, phone, coordinates) in `Footer.tsx` and
  `BookingSection.tsx` for your real ones before going live.
- No email-sending is wired up. If you want a confirmation email sent automatically when someone
  books, the cleanest addition is a transactional email provider (e.g. Resend) called from inside
  `src/app/api/bookings/route.ts` after the database write succeeds.
