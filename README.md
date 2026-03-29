# Style Street

A full-stack e-commerce storefront for streetwear. Built with Next.js App Router, featuring Google OAuth, a persistent cart, an admin dashboard, and a full order management flow.

**[Live Demo](https://style-street-psi.vercel.app)**

---

## Features

- **Product catalogue** — browse and filter by category and badge (New, Hot)
- **Shopping cart** — persisted in localStorage via Zustand, survives page refreshes
- **Checkout** — place orders with shipping details, authenticated users only
- **Order history** — users can view past orders from their profile
- **Google OAuth** — sign in with Google, role-based access control (user / admin)
- **Admin dashboard** — create, edit, and delete products; manage order statuses; upload product images
- **Image uploads** — product images stored on Vercel Blob

## Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui |
| Auth | NextAuth v5, Google OAuth |
| Database | PostgreSQL (Neon serverless) |
| ORM | Drizzle ORM |
| State | Zustand (persisted) |
| Storage | Vercel Blob |
| Forms | React Hook Form |
| Testing | Jest |

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (e.g. [Neon](https://neon.tech) free tier)
- [Google OAuth credentials](https://console.cloud.google.com/)
- A [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) token (for image uploads)

### Installation

```bash
git clone https://github.com/your-username/style-street.git
cd style-street
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

```env
# Database
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# Auth
AUTH_SECRET=your-random-secret
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

# Storage
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

### Database Setup

```bash
npm run db:push      # apply schema to your database
npm run db:studio    # optional: open Drizzle Studio to inspect data
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm test` | Run Jest tests |
| `npm run lint` | ESLint |
| `npm run db:push` | Push schema changes to database |
| `npm run db:studio` | Open Drizzle Studio |

## Project Structure

```
app/
├── (auth)/sign-in/     # Google OAuth sign-in page
├── admin/              # Admin dashboard (products, orders)
├── checkout/           # Checkout flow + order confirmation
├── products/           # Catalogue + product detail pages
├── profile/            # User profile + order history
└── api/auth/           # NextAuth route handler

components/             # Shared UI components
store/cart.ts           # Zustand cart store
lib/                    # Database client, auth helpers, utilities
db/schema.ts            # Drizzle schema
auth.ts                 # NextAuth config
```

## Deployment

Deploys to Vercel with zero configuration. Set the environment variables above in your Vercel project settings and push to main.
