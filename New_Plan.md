# DSA Forge — Agent Build Spec

> **Agent model:** claude-opus-4-6 | **Framework:** Next.js 14 App Router + TypeScript strict
> Build in the order listed. Do not skip steps. Do not ask clarifying questions — make decisions.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript strict |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Animation | framer-motion (`motion/react`) |
| Auth | NextAuth.js v5 (GitHub OAuth + Credentials) |
| DB ORM | Prisma |
| DB | SQLite (dev) → PostgreSQL-compatible schema |
| Charts | Recharts |
| Search | Fuse.js |
| Icons | lucide-react |
| Fonts | next/font/google |

---

## Design Tokens (apply everywhere, no exceptions)

```css
/* Colors */
--bg-root:     #0E0E0E;
--bg-card:     #141414;
--bg-elevated: #1A1A1A;
--bg-surface:  #1E1E1E;
--border:      #2A2A2A;
--border-hover:#333333;
--primary:     #E8B86D;   /* copper — CTAs, active, accent */
--primary-dim: #C49A52;
--text-1:      #F0EDE8;
--text-2:      #A09890;
--text-3:      #605850;
--success:     #4CAF72;
--danger:      #E05C5C;
--code-bg:     #111111;

/* Fonts */
--font-rubik:   'Rubik';           /* hero headlines, auth headlines, large stats */
--font-jakarta: 'Plus Jakarta Sans'; /* all UI: nav, cards, body, buttons, forms */
--font-mono:    'JetBrains Mono';  /* streak numbers, complexity tags, code, badges */
```

**Hard rules:** No blue. No purple. No teal. No neon. No multi-hue gradients.
Depth via bg color steps, not drop shadows. One allowed glow: `box-shadow: 0 0 40px rgba(232,184,109,0.06)` on active cards only.

---

## Routes (all required, none optional)

```
/                          → Public hero/landing
/login                     → Auth — sign in
/register                  → Auth — create account
/dashboard                 → Protected — user home
/topics                    → Protected — all 15 topics grid
/topic/[slug]              → Protected — topic detail + patterns
/pattern/[id]              → Protected — single pattern deep dive
/profile                   → Protected — user stats + settings

/api/auth/[...nextauth]    → NextAuth handler
/api/progress              → GET (fetch solved) / POST (mark solved)
/api/streak                → GET streak data + heatmap days
/api/user                  → GET aggregated user stats
```

Protect all `/dashboard`, `/topics`, `/topic/*`, `/pattern/*`, `/profile` via `middleware.ts`.
Redirect authenticated users away from `/login` and `/register` to `/dashboard`.

---

## Database Schema

```prisma
model User {
  id             String          @id @default(cuid())
  email          String          @unique
  name           String?
  image          String?
  password       String?
  createdAt      DateTime        @default(now())
  solvedProblems SolvedProblem[]
  streakDays     StreakDay[]
}

model SolvedProblem {
  id        String   @id @default(cuid())
  userId    String
  problemId String
  solvedAt  DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  @@unique([userId, problemId])
}

model StreakDay {
  id     String   @id @default(cuid())
  userId String
  date   DateTime
  count  Int      @default(1)
  user   User     @relation(fields: [userId], references: [id])
  @@unique([userId, date])
}
```

Progress is **DB-only**. No localStorage for solved state.

---

## Build Order

```
1. Scaffold + tailwind.config + globals.css + fonts
2. Prisma schema + seed script
3. NextAuth v5 config (GitHub + Credentials)
4. middleware.ts (route protection)
5. App shell layout: sidebar + topbar (components/layout/)
6. /login + /register pages
7. /dashboard page
8. Data layer: types/index.ts + data/*.ts (15 topic files)
9. /topics page
10. /topic/[slug] page
11. /pattern/[id] page
12. /profile page
13. API routes (progress, streak, user)
14. / hero/landing page
15. Cmd+K search modal (Fuse.js)
```

---

## Page Specs

### `/` — Hero (public)

**Component:** Create `components/ui/pointer-highlight.tsx` exactly as below.

```tsx
"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";

export function PointerHighlight({ children, rectangleClassName, pointerClassName, containerClassName }:
  { children: React.ReactNode; rectangleClassName?: string; pointerClassName?: string; containerClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => { if (ref.current) { const r = ref.current.getBoundingClientRect(); setDim({ width: r.width, height: r.height }); }};
    update();
    const ro = new ResizeObserver(e => { for (const en of e) setDim({ width: en.contentRect.width, height: en.contentRect.height }); });
    if (ref.current) ro.observe(ref.current);
    return () => { if (ref.current) ro.unobserve(ref.current); };
  }, []);

  return (
    <div className={cn("relative w-fit", containerClassName)} ref={ref}>
      {children}
      {dim.width > 0 && (
        <motion.div className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <motion.div className={cn("absolute inset-0 border border-[#E8B86D]", rectangleClassName)}
            initial={{ width: 0, height: 0 }} whileInView={{ width: dim.width, height: dim.height }}
            transition={{ duration: 1, ease: "easeInOut" }} />
          <motion.div className="pointer-events-none absolute"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1, x: dim.width + 4, y: dim.height + 4 }}
            style={{ rotate: -90 }} transition={{ duration: 1, ease: "easeInOut" }}>
            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 16 16" className={cn("h-5 w-5 text-[#E8B86D]", pointerClassName)} xmlns="http://www.w3.org/2000/svg">
              <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
```

**Hero headline structure:**
```tsx
<h1 className="font-rubik text-6xl font-bold text-[#F0EDE8]">
  Master DSA by mastering{" "}
  <PointerHighlight>
    <span className="text-[#E8B86D]">the patterns.</span>
  </PointerHighlight>
</h1>
<p className="font-jakarta text-[#A09890] mt-4">
  500+ problems. 50+ patterns. 15 topics. One framework — Java.
</p>
```

Background: CSS dot grid (`radial-gradient` on `#0E0E0E`). No images, no video.

---

### `/login` + `/register`

- Centered card `bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl`
- Rubik headline: `"Welcome back."` / `"Start your forge."`
- GitHub OAuth button + `———  or  ———` divider + email/password inputs
- Show/hide toggle on password field
- On success → redirect `/dashboard`

---

### `/dashboard`

**Stats row (4 cards, Rubik numbers, Jakarta labels):**
- Problems Solved | Current Streak 🔥 (mono) | Topics Covered | Completion %

**52-week heatmap (build with SVG, no lib):**
```
Color scale: #1E1E1E (0) → #4A3010 (1-2) → #8B5E1A (3-5) → #E8B86D (6+)
Months along top. Days of week on left. Staggered fade-in on mount.
```

**Right panel:** Last 10 solved — title, difficulty badge, topic tag, timestamp.

**Bottom:** Horizontal progress bars per topic. `Arrays  67%  ██████░░░░  134/200`

---

### App Shell Sidebar

```
⚡ DSA Forge          ← Rubik bold, #E8B86D accent
─────────────────
⌂  Dashboard
◫  Topics
◈  Patterns
◉  Profile
─────────────────
🔥 12 day streak     ← JetBrains Mono, #E8B86D
247 solved           ← JetBrains Mono
─────────────────
[Avatar] Name        ← bottom, logout button
```

Active route: `border-l-2 border-[#E8B86D] bg-[#1E1E1E]`

---

### `/topics`

- 3-col responsive grid of cards
- Each card: topic name (Jakarta Bold), pattern count, problem count, copper progress bar, difficulty pills
- Hover: `border-[#333] translate-y-[-2px]`

---

### `/topic/[slug]`

- Sticky left sidebar: pattern list with per-pattern progress
- Main: pattern sections, 4 tabs each → Overview / Problems / Java Template / Companies
- Problem row: checkbox (POST to `/api/progress` on toggle), title, difficulty badge, company pills, external link

---

### `/pattern/[id]`

- When to use, recognition signals
- Java template (syntax highlighted, `bg-[#111111]`, JetBrains Mono)
- Full problem list with solved tracking

---

## Streak Logic

```
streak_day = any UTC date with ≥1 solved problem
current_streak = consecutive days ending today OR yesterday
if today unsolved AND yesterday was active → show warning banner
```

---

## Animations (Framer Motion)

| Element | Motion |
|---|---|
| Page enter | `opacity 0→1, y 10→0, duration 0.3` |
| Cards hover | `y: -2, duration: 0.15` |
| Sidebar active bar | width expand on route change |
| Dashboard stats | count-up on mount via `requestAnimationFrame` |
| Heatmap cells | staggered `opacity 0→1` on first render |
| PointerHighlight | as defined above |

**Tone:** "expensive software." No springs. No rotations. No bounce.

---

## Constraints (agent must obey)

- No blue / purple / teal anywhere in the UI
- No localStorage for progress — DB via API routes only
- No pre-built heatmap library — SVG grid, hand-built
- No `<form>` HTML tags in React — use controlled inputs, server actions, or `onSubmit` on a div
- No fonts other than Rubik, Plus Jakarta Sans, JetBrains Mono
- No missing routes — all 8 pages must exist and be reachable
- No placeholder pages — every page must be functional on first build

---

## Data Layer Summary

15 topic files in `data/` (Arrays, Strings, LinkedList, Stack, Queue, Tree, Graph, Heap, Trie, DP, Backtracking, Greedy, BinarySearch, SlidingWindow, TwoPointers).
Each exports a `Topic` object with patterns → problems (real LeetCode/GFG URLs, company tags, difficulty).
`data/index.ts` barrel-exports `allTopics: Topic[]`.

Types in `types/index.ts`:
```ts
type Difficulty = 'Easy' | 'Medium' | 'Hard'
type Platform = 'LeetCode' | 'GFG' | 'HackerRank'
interface Problem { id: string; title: string; url: string; difficulty: Difficulty; companies: string[]; platform: Platform }
interface Pattern { id: string; name: string; description: string; whenToUse: string; javaTemplate: string; problems: Problem[] }
interface Topic { slug: string; name: string; icon: string; description: string; patterns: Pattern[] }
```

---

*Build. Don't explain. Don't ask. Ship.*
