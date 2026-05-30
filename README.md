# Learning Platform

Built this for a frontend challenge. The brief was to make something that felt premium and actually worked with live data — not just a pretty static mockup.

Live demo: [your-vercel-url-here]

---

## What I Built

A dark-mode dashboard where students can track their active courses, learning streaks, and weekly activity — all fetched live from a Supabase PostgreSQL database. The UI is built around a Bento Grid layout with a collapsible sidebar, smooth spring animations throughout, and skeleton loaders while data is loading.

---

## Tech Stack

- **Next.js 14** (App Router)
- **Supabase** — PostgreSQL + `@supabase/ssr` for server-side queries
- **Tailwind CSS** — styling and responsive layout
- **Framer Motion** — all animations
- **Lucide React** — icons (dynamically rendered from DB values)
- **TypeScript** — throughout

---

## How to Run Locally

```bash
git clone https://github.com/your-username/Learning_Platform-dashboard
cd Learning_Platform-dashboard
npm install
```

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Then set up the database by running `supabase/schema.sql` in your Supabase SQL editor — it creates the courses table and seeds it with sample data.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects straight to the dashboard.

---

## Architectural Decisions

### Server vs Client Components

The main `dashboard/page.tsx` is a React Server Component. It creates the Supabase client using `@supabase/ssr` and fetches the courses table directly on the server — no API routes needed, no data exposed to the client before render. The result gets passed down as props to the `CourseGrid` component.

The animated parts (cards, sidebar, progress bars) are all `"use client"` components. I kept the boundary clean — server handles data, client handles interaction.

### Suspense for Loading States

I wrapped the `CoursesSection` (the part that talks to Supabase) in a `<Suspense>` boundary with a skeleton fallback. This means the rest of the page — the hero tile, stats row, activity graph — renders immediately while the database query runs in the background. The skeleton has a shimmer animation so it never feels like the page is frozen.

There's also a `loading.tsx` at the route segment level as a safety net for the initial page load.

### Animations Without Layout Shifts

Every animation uses only `transform` and `opacity` — nothing that triggers a reflow. The tile entrance uses a staggered `translateY` + `opacity` fade. Card hover uses `scale(1.015)` with spring physics (`stiffness: 300, damping: 20`). The sidebar active highlight uses Framer Motion's `layoutId` so it slides between nav items instead of jumping.

The one tricky part was the activity heatmap — I was initially generating random data with `Math.random()` which caused a React hydration mismatch between server and client renders. Fixed it by switching to a seeded deterministic function so both environments produce identical output.

### Dynamic Icon Rendering

The `icon_name` field in Supabase stores a string like `"Atom"` or `"Code2"`. The `CourseCard` component dynamically imports from `lucide-react` using that string as a key. This means you can change icons directly from the database without touching the code.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout + font loading
│   ├── globals.css             # Tailwind base + custom keyframes
│   └── dashboard/
│       ├── page.tsx            # Server Component — fetches from Supabase
│       ├── layout.tsx          # Sidebar + main content wrapper
│       └── loading.tsx         # Route-level skeleton fallback
├── components/
│   ├── sidebar/
│   │   ├── Sidebar.tsx         # Collapsible nav with spring animation
│   │   ├── NavLink.tsx         # Active state via usePathname + layoutId
│   │   └── MobileNav.tsx       # Bottom tab bar for mobile
│   ├── tiles/
│   │   ├── BentoCard.tsx       # Base card with hover + entrance animation
│   │   ├── HeroTile.tsx        # Greeting + streak badge
│   │   ├── StatsRow.tsx        # Quick stats (hours, XP, lessons)
│   │   ├── CourseGrid.tsx      # Renders Supabase courses as cards
│   │   ├── CourseCard.tsx      # Individual course — icon, title, progress bar
│   │   └── ActivityTile.tsx    # 16-week contribution heatmap
│   └── ui/
│       ├── CourseSkeleton.tsx  # Shimmer placeholder for course cards
│       └── HeroSkeleton.tsx    # Shimmer placeholder for hero tile
├── lib/
│   ├── supabase/server.ts      # Supabase SSR client (server-only)
│   ├── utils.ts                # cn() helper
│   └── activity.ts             # Deterministic activity data + streak logic
└── types/
    └── index.ts                # Course, NavItem interfaces
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

Any Lucide icon name works for `icon_name` — `Atom`, `Code2`, `Database`, `Network`, `Globe`, `Brain`, `Cpu`, `Palette`, etc.

---

## Responsive Behaviour

| Screen | Sidebar | Grid |
|---|---|---|
| Mobile < 768px | Hidden — replaced by bottom tab bar | Single column |
| Tablet 768–1024px | Visible but icon-only (auto-collapsed) | 2 columns |
| Desktop > 1024px | Full sidebar with labels | 3 columns |

---

## Deployment

Deployed on Vercel. To deploy your own:

1. Push to a public GitHub repo
2. Import the repo on [vercel.com](https://vercel.com)
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel's environment variable settings
4. Deploy — no other config needed