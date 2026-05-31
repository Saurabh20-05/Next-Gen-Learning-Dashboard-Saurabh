# Next-Gen Learning Platform

A student dashboard built for a frontend engineering challenge. The goal was to build something that actually felt premium and worked with real live data — not just a Figma mockup thrown into code.

Live demo: https://next-gen-learning-dashboard-saurabh.vercel.app/

---

## What It Does

Dark-mode student dashboard where you can track active courses, learning streaks, and weekly activity. Course data is fetched live from a Supabase PostgreSQL database using Next.js Server Components. Everything else — animations, hover states, sidebar transitions — runs on the client with Framer Motion.

---

## Stack

- **Next.js 14** — App Router, React Server Components
- **Supabase** — PostgreSQL database, `@supabase/ssr` for secure server-side queries
- **Tailwind CSS** — all styling and responsive layout
- **Framer Motion** — every animation in the app
- **Lucide React** — icons, dynamically rendered from database values
- **TypeScript** — end to end

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

Open `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Run the SQL schema in your Supabase SQL editor — the file is at `supabase/schema.sql`. It creates the courses table and seeds it with sample rows automatically.

```bash
npm run dev
```

Goes straight to `/dashboard` on load.

---

## Architecture

### Server vs Client split

`dashboard/page.tsx` is a pure Server Component. It connects to Supabase using `@supabase/ssr`, fetches the courses table, and passes the result down as props. Nothing hits the client until the data is ready. No API routes, no useEffect fetching, no loading spinners caused by client-side requests.

The animated parts — cards, sidebar, progress bars — are all `"use client"`. Kept the boundary simple: server for data, client for interaction. Any time I needed both in the same component I split it into two files.

### Suspense boundaries

Wrapped the courses fetch in a `<Suspense>` boundary so the rest of the page — hero tile, stats row, activity graph — loads immediately while Supabase responds. The fallback is a shimmer skeleton that pulses so it never feels frozen. There's also a `loading.tsx` at the route level as a backup for the initial navigation.

### Animations

Everything uses only `transform` and `opacity` — nothing that causes a layout reflow. Tile entrances stagger with a `translateY` + `opacity` fade. Card hover uses `scale(1.015)` with spring physics. The sidebar nav highlight uses `layoutId` so it slides smoothly between items instead of just switching.

One thing I had to figure out — the activity heatmap kept throwing React hydration errors. Took me a bit to realise `Math.random()` was running on both server and client and producing different values each time, so the HTML didn't match. Fixed it by replacing it with a seeded deterministic function that always returns the same output for the same input. Obvious once you know but it wasn't immediately obvious.

### Dynamic icons

The `icon_name` column in Supabase stores a string like `"Globe"` or `"Code2"`. `CourseCard` uses that string as a key to pull the right component from `lucide-react`. Means you can update icons directly from the database without touching any code.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # root layout, font loading
│   ├── globals.css             # tailwind + custom keyframes
│   └── dashboard/
│       ├── page.tsx            # server component — fetches from Supabase
│       ├── layout.tsx          # sidebar + main content layout
│       └── loading.tsx         # route-level skeleton fallback
├── components/
│   ├── sidebar/
│   │   ├── Sidebar.tsx         # desktop nav, fixed width
│   │   ├── NavLink.tsx         # active state from usePathname + layoutId
│   │   └── MobileNav.tsx       # bottom tab bar on mobile
│   ├── tiles/
│   │   ├── BentoCard.tsx       # base card — hover spring, stagger entrance
│   │   ├── HeroTile.tsx        # greeting + streak badge
│   │   ├── StatsRow.tsx        # hours, lessons, XP, progress delta
│   │   ├── CourseGrid.tsx      # maps Supabase rows to CourseCard
│   │   ├── CourseCard.tsx      # icon, title, animated progress bar
│   │   └── ActivityTile.tsx    # 16-week contribution heatmap
│   └── ui/
│       ├── CourseSkeleton.tsx  # shimmer placeholder while courses load
│       └── HeroSkeleton.tsx    # shimmer placeholder for hero tile
├── lib/
│   ├── supabase/server.ts      # supabase SSR client, server only
│   ├── utils.ts                # cn() tailwind helper
│   └── activity.ts             # seeded activity data + streak calc
└── types/
    └── index.ts                # Course, NavItem TypeScript interfaces
```

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

`icon_name` accepts any valid Lucide icon name — `Globe`, `Code2`, `Database`, `BrainCircuit`, `Palette`, `Cloud`, etc.

---

## Responsive Layout

| Screen size | Sidebar | Grid |
|---|---|---|
| Mobile under 768px | Hidden, replaced by bottom tab bar | Single column |
| Tablet 768–1024px | Visible, icons only | 2 columns |
| Desktop over 1024px | Full sidebar with labels | 3 columns |

---

## Known Limitations

- Activity data is seeded/mocked — there's no real user_events table yet, that would need auth to be set up first
- Stats row (hours, XP, lessons) is hardcoded — making those dynamic would need a separate activity tracking table
- No authentication — the name and avatar in the sidebar are static for now, would swap those out with real session data once auth is added
- The other nav pages (My Courses, Progress, Rewards) are placeholder stubs — the brief only asked for the dashboard itself

---

## Deployment

Deployed on Vercel.

1. Push to a public GitHub repo
2. Import on [vercel.com](https://vercel.com)
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables
4. Deploy

No other config needed — Vercel auto-detects Next.js.
