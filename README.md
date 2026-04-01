# 🚀 DSA Forge - Master Data Structures & Algorithms Through Patterns

**DSA Forge** is a pattern-first platform for mastering Data Structures and Algorithms. Learn 50+ DSA patterns across 15 topics with 500+ curated problems, progress tracking, and daily streaks.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?logo=tailwind-css)

---

## ✨ Features

- 🎯 **Pattern-Based Learning**: 50+ DSA patterns organized across 15 topics
- 📊 **Progress Tracking**: Track solved problems, difficulty breakdown, and completion percentage
- 🔥 **Streak System**: Daily activity tracking with visual heatmap
- 🔐 **User Authentication**: Secure JWT-based authentication with NextAuth.js
- 💾 **Persistent Data**: All user progress synced with PostgreSQL
- 🎨 **Beautiful UI**: Modern, responsive design with Tailwind CSS & Framer Motion
- 🔍 **Smart Search**: Full-text search across topics, patterns, and problems
- 📱 **Mobile Friendly**: Fully responsive for all devices
- 🚀 **Production Ready**: Deployed on Vercel with PostgreSQL on Neon

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Animations**: Framer Motion
- **UI Components**: Lucide React Icons
- **Search**: Fuse.js

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Authentication**: NextAuth.js (JWT Strategy)
- **Password Hashing**: bcryptjs

### Database
- **ORM**: Prisma
- **Database**: PostgreSQL (Neon)
- **Schema**: User, SolvedProblem, StreakDay models

### Deployment
- **Platform**: Vercel
- **Database Hosting**: Neon (Free PostgreSQL)
- **CI/CD**: Git-based automatic deployments

---

## 📁 Project Structure

```
dsa-wizard/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # Backend API routes
│   │   │   ├── auth/                 # Authentication endpoints
│   │   │   │   ├── [...]nextauth/   # NextAuth.js handler
│   │   │   │   └── signup/          # User registration
│   │   │   ├── progress/            # Problem progress tracking
│   │   │   ├── streak/              # Streak data
│   │   │   └── user/                # User info & stats
│   │   ├── dashboard/               # Dashboard page
│   │   ├── login/                   # Login page
│   │   ├── register/                # Registration page
│   │   ├── topics/                  # Topics listing
│   │   ├── topic/[slug]/            # Topic detail page
│   │   ├── pattern/[id]/            # Pattern detail page
│   │   ├── profile/                 # User profile
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Homepage
│   │   └── globals.css              # Global styles
│   │
│   ├── components/                  # Reusable React components
│   │   ├── AppShell.tsx             # Main app wrapper
│   │   ├── Navbar.tsx               # Navigation bar
│   │   ├── Sidebar.tsx              # Sidebar navigation
│   │   ├── AuthProvider.tsx         # Auth session provider
│   │   ├── ProgressBar.tsx          # Progress visualization
│   │   ├── ProgressRing.tsx         # Circular progress
│   │   ├── DifficultyBadge.tsx      # Difficulty indicator
│   │   ├── CodeBlock.tsx            # Syntax-highlighted code
│   │   ├── SearchModal.tsx          # Search interface
│   │   ├── Footer.tsx               # Footer
│   │   └── ui/                      # UI utilities
│   │       └── pointer-highlight.tsx
│   │
│   ├── data/                        # Static DSA problems & patterns
│   │   ├── arrays-strings.ts
│   │   ├── linked-lists.ts
│   │   ├── trees-bst.ts
│   │   ├── graphs.ts
│   │   ├── heaps.ts
│   │   ├── tries.ts
│   │   ├── backtracking.ts
│   │   ├── dynamic-programming.ts
│   │   ├── greedy.ts
│   │   ├── bit-manipulation.ts
│   │   ├── sliding-window.ts
│   │   ├── binary-search.ts
│   │   ├── sorting-searching.ts
│   │   ├── stacks-queues.ts
│   │   ├── math.ts
│   │   └── index.ts                 # Barrel export
│   │
│   ├── lib/                         # Utility libraries
│   │   ├── auth.ts                  # Auth configuration
│   │   ├── prisma.ts                # Prisma client
│   │   ├── problem-index.ts         # Problem metadata
│   │   ├── streak.ts                # Streak calculations
│   │   └── utils.ts                 # Helper functions
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useProgress.ts           # Progress management
│   │   ├── useSearch.ts             # Search functionality
│   │   └── useKeyboard.ts           # Keyboard shortcuts
│   │
│   └── types/                       # TypeScript type definitions
│       ├── index.ts                 # Main types
│       └── next-auth.d.ts           # NextAuth types
│
├── prisma/
│   └── schema.prisma                # Database schema
│
├── public/                          # Static assets
├── .env                             # Environment variables (not committed)
├── .env.example                     # Environment template
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── tailwind.config.ts               # Tailwind CSS config
├── next.config.mjs                  # Next.js config
├── middleware.ts                    # Next.js middleware
└── README.md                        # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (18+ recommended)
- npm or yarn
- PostgreSQL database (or Neon account)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/s4rojx/dsa-forge.git
cd dsa-wizard
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require&channel_binding=require"

# Authentication
NEXTAUTH_SECRET="your-random-secret-key"  # Generate: openssl rand -hex 32
NEXTAUTH_URL="http://localhost:3000"

# Build
NODE_ENV="development"
```

4. **Setup database**
```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# (Optional) View database
npx prisma studio
```

5. **Run development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Database Schema

### User
```typescript
{
  id: String (unique)
  email: String (unique)
  name: String?
  image: String?
  password: String (hashed)
  createdAt: DateTime
  updatedAt: DateTime
  solvedProblems: SolvedProblem[]
  streakDays: StreakDay[]
}
```

### SolvedProblem
```typescript
{
  id: String
  userId: String (FK → User.id)
  problemId: String
  solvedAt: DateTime
  
  // Constraints
  Unique: [userId, problemId]
  Index: [userId, solvedAt]
}
```

### StreakDay
```typescript
{
  id: String
  userId: String (FK → User.id)
  date: DateTime
  count: Int (problems solved that day)
  
  // Constraints
  Unique: [userId, date]
  Index: [userId, date]
}
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth.js handler

### Progress
- `GET /api/progress` - Get all solved problems
- `POST /api/progress` - Mark problem as solved/unsolved

### User Stats
- `GET /api/user` - Get user progress summary
  - Total solved problems
  - Difficulty breakdown
  - Topics covered
  - Completion percentage

### Streak
- `GET /api/streak` - Get streak data & heatmap

---

## 🚀 Deployment on Vercel

### 1. Prepare for Production
```bash
# Build locally
npm run build

# Test production build
npm run start
```

### 2. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 3. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `DATABASE_URL` - Your Neon PostgreSQL connection string
   - `NEXTAUTH_SECRET` - Generate with `openssl rand -hex 32`
   - `NEXTAUTH_URL` - Your Vercel domain (e.g., `https://your-project.vercel.app`)
5. Click "Deploy"

### 4. Setup PostgreSQL (Neon)
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the PostgreSQL connection string
4. Add to Vercel environment variables as `DATABASE_URL`

### 5. Post-Deployment
- Test signup/login at your live URL
- Verify progress tracking works
- Check Priism Studio for database

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:push     # Push schema to database
npx prisma studio      # Open Prisma Studio GUI

# Code Quality
npm run lint            # Run ESLint
npm run lint -- --fix   # Fix ESLint issues
```

---

## 📚 Data Structure Topics Covered

1. **Arrays & Strings** - Prefix, suffix, two-pointer techniques
2. **Linked Lists** - Node manipulation, cycle detection
3. **Stacks & Queues** - LIFO/FIFO applications
4. **Trees & BST** - Tree traversal, BST operations
5. **Graphs** - DFS, BFS, topological sort, shortest paths
6. **Heaps** - Min/Max heaps, heap sort
7. **Tries** - Prefix trees, word search
8. **Backtracking** - Subsets, permutations, N-Queens
9. **Dynamic Programming** - DP, memoization, tabulation
10. **Greedy** - Interval scheduling, activity selection
11. **Bit Manipulation** - Bitwise operations, XOR tricks
12. **Sliding Window** - Fixed/variable windows
13. **Binary Search** - Search, answer space
14. **Sorting & Searching** - Sort algorithms
15. **Math & Number Theory** - GCD, primes, combinatorics

---

## 🔐 Security Features

- ✅ Password hashing with bcryptjs (salt rounds: 12)
- ✅ JWT-based session management
- ✅ Protected API routes with authentication checks
- ✅ Middleware-based route protection
- ✅ Environment variables (secrets never committed)
- ✅ HTTPS on production (Vercel)
- ✅ SQL injection prevention (Prisma)
- ✅ CSRF protection (NextAuth.js)

---

## 📝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🤝 Support

For issues, questions, or feature requests, please open an [GitHub Issue](https://github.com/s4rojx/dsa-forge/issues).

---

## 👨‍💻 Author

**Saroj** - [@s4rojx](https://github.com/s4rojx)

---

**Happy Coding! Master the patterns, master DSA.** 🚀

