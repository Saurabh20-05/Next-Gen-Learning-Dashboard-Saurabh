# Next-Gen Learning Platform

Student learning dashboard — tracks courses, streaks and activity. The interesting parts were getting the server/client split right with Next.js App Router and making the animations feel natural rather than just flashy.

Live demo: https://next-gen-learning-dashboard-saurabh.vercel.app/

---

## What I Built

A dark-mode student dashboard where students can track their active courses, learning streaks, and weekly activity. Course data is fetched live from a Supabase PostgreSQL database using Next.js Server Components. All the animations, hover states and sidebar transitions run on the client side with Framer Motion.

---

## Stack

- **Next.js 14** — App Router, React Server Components
- **Supabase** — PostgreSQL + `@supabase/ssr` for secure server-side queries
- **Tailwind CSS** — all styling and responsive layout
- **Framer Motion** — every animation in the app
- **Lucide React** — icons, dynamically rendered from DB values
- **TypeScript** — throughout

---

## Running Locally

```bash
git clone https://github.com/your-username/next-gen-learning-dashboard
cd next-gen-learning-dashboard
npm install
```

Set up your env file:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and paste your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Run the SQL file at `supabase/schema.sql` in your Supabase SQL editor — it creates the courses table and seeds it with sample rows.

```bash
npm run dev
```

Opens at `http://localhost:3000` and redirects straight to `/dashboard`.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # root layout, font loading
│   ├── globals.css             # tailwind base + custom keyframes
│   ├── page.tsx                # redirects to /dashboard
│   └── dashboard/
│       ├── page.tsx            # server component — fetches from Supabase
│       ├── layout.tsx          # sidebar + main content wrapper
│       └── loading.tsx         # route-level skeleton fallback
├── components/
│   ├── sidebar/
│   │   ├── Sidebar.tsx         # desktop nav with spring collapse animation
│   │   ├── NavLink.tsx         # active state via usePathname + layoutId
│   │   └── MobileNav.tsx       # bottom tab bar on mobile
│   ├── tiles/
│   │   ├── BentoCard.tsx       # base card — hover spring, stagger entrance
│   │   ├── BentoGrid.tsx       # responsive grid layout wrapper
│   │   ├── HeroTile.tsx        # greeting + streak badge
│   │   ├── StatsRow.tsx        # hours, lessons, XP, progress delta
│   │   ├── CourseGrid.tsx      # maps Supabase rows to CourseCard
│   │   ├── CourseCard.tsx      # icon, title, animated progress bar
│   │   └── ActivityTile.tsx    # 16-week contribution heatmap
│   └── ui/
│       ├── CourseSkeleton.tsx  # shimmer placeholder while courses load
│       └── HeroSkeleton.tsx    # shimmer placeholder for hero tile
├── lib/
│   ├── supabase/
│   │   └── server.ts           # supabase SSR client, server-only
│   ├── activity.ts             # seeded activity data + streak calculation
│   └── utils.ts                # cn() tailwind merge helper
├── types/
│   └── index.ts                # Course, NavItem TypeScript interfaces
└── supabase/
    └── schema.sql              # table schema + seed data
```

---

## Architectural Decisions

### Server vs Client Components

`dashboard/page.tsx` is a pure Server Component. It connects to Supabase using `@supabase/ssr`, fetches the courses table directly on the server and passes the result down as props to `CourseGrid`. No API routes, no client-side fetching, no data exposed before render.

Everything with animations or interactivity — cards, sidebar, progress bars — is marked `"use client"`. Kept the split simple: server handles data, client handles interaction.

### Suspense for Loading States

Wrapped the Supabase fetch inside a `<Suspense>` boundary with a shimmer skeleton fallback. This means the hero tile, stats row and activity graph all render immediately while the database query is running in the background. There's also a `loading.tsx` at the route segment level as a fallback for the initial page load.

### Animations Without Layout Shifts

Every animation only touches `transform` and `opacity` — nothing that triggers a browser reflow or layout recalculation. Tile entrances stagger with `translateY + opacity`. Card hover uses `scale(1.015)` with Framer Motion spring physics (`stiffness: 300, damping: 20`). The sidebar active highlight uses `layoutId` so it slides smoothly between nav items.

One thing that took a while to figure out — the activity heatmap kept throwing React hydration errors in development. Turns out `Math.random()` runs on both server and client and produces different values each time, so React sees a mismatch between the server-rendered HTML and what the client tries to render. Fixed it by replacing `Math.random()` with a seeded deterministic function that always returns the same output for the same input. Obvious in hindsight but took a bit to track down.

### Dynamic Icons

The `icon_name` column in Supabase stores a plain string like `"Globe"` or `"Code2"`. `CourseCard` uses that string as a key to pull the matching component from `lucide-react` at render time. Means icons can be updated directly from the database without touching any code.

---

## Database Schema

```sql
create table courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  progress    integer not null check (progress >= 0 and progress <= 100),
  icon_name   text not null,
  created_at  timestamptz not null default now()
);
```

Any valid Lucide icon name works for `icon_name` — `Globe`, `Code2`, `Database`, `BrainCircuit`, `Palette`, `Cloud`, `Cpu`, `Atom` etc.

---

## Responsive Behaviour

| Screen | Sidebar | Grid |
|---|---|---|
| Mobile under 768px | Hidden — replaced by bottom tab bar | Single column |
| Tablet 768–1024px | Visible, icons only | 2 columns |
| Desktop over 1024px | Full sidebar with labels | 3 columns |

---

## Known Limitations

- Activity heatmap data is seeded and deterministic — not pulling from a real events table yet, that would need auth set up first
- Stats row (hours, XP, lessons done) is hardcoded — making those dynamic would need a separate user activity tracking table
- No authentication — name and avatar in the sidebar are static, would be replaced with real session data once auth is added
- The other nav pages (My Courses, Progress, Rewards) are placeholder stubs — the brief only required the main dashboard

---

## Deployment

Deployed on Vercel.

1. Push to a public GitHub repo
2. Import the repo on [vercel.com](https://vercel.com)
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables in Vercel project settings
4. Click Deploy — no other config needed, Vercel auto-detects Next.js
