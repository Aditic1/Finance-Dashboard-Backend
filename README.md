# Finance Dashboard Backend

A REST API for a finance dashboard system with role-based access control, financial record management, and analytics.

Live URL: https://finance-dashboard-backend-ce6k.onrender.com/health
Note: Hosted on Render free tier — first request after inactivity may take 30-60 seconds.

GitHub: https://github.com/Aditic1/Finance-Dashboard-Backend

---

## Tech Stack

Node.js, Express, TypeScript, PostgreSQL, Prisma v5, JWT, Zod v4, Pino, Faker.js

---

## Architecture

Feature-first modular structure with strict three-layer separation inside each module.

```
src/
config/         # Env config, Prisma singleton
errors/         # AppError base class
middlewares/    # Auth, RBAC, error handling
modules/
auth/         # Login, JWT utilities
users/        # User CRUD
transactions/ # Financial records
analytics/    # Dashboard aggregations
types/          # Express Request augmentation
utils/          # Logger, password utilities
```

- Repository: All database interaction. No business logic.
- Service: All business rules and domain decisions.
- Controller: Request validation, response mapping, DTO transformation.

---

## Key Design Decisions

**Feature-first over layer-first:** All files for a domain are co-located. Easier to navigate when working on a single feature.

**Centralized error handling:** Controllers and services throw typed AppError instances. A single Express error middleware catches everything and maps to HTTP responses. No scattered try-catch blocks.

**Raw SQL for analytics:** Standard Prisma queries handle CRUD. Analytics endpoints use $queryRaw for precise control over aggregation queries at scale.

**No public registration:** Internal finance system. Admins create users. First admin bootstrapped via seed script.

**JWT with short expiry:** Stateless, no session store required. Tokens expire in 1 hour. Logout is client-side. Redis blacklisting documented as post-MVP.

**Selective indexing:** Transactions indexed on type, category, and transactionDate — the three columns most used in WHERE and GROUP BY clauses. Write overhead is minimal since transactions are rarely updated after creation.

---

## Role-Based Access Control

- ADMIN: Full CRUD on users and transactions, all analytics, userId filter on transactions
- ANALYST: Read transactions, all analytics
- VIEWER: Read transactions only

Enforced via a factory middleware applied per route — auth middleware sets req.user, RBAC middleware checks role against the permitted list.

---

## API Endpoints

### Auth

- POST /auth/login — Public

### Users (Admin only)

- GET /users
- GET /users/:id
- POST /users
- PATCH /users/:id
- DELETE /users/:id

### Transactions

- GET /transactions — All roles. Query params: type, category, userId (admin only), search, startDate, endDate, page, limit
- GET /transactions/:id — All roles
- POST /transactions — Admin only
- PATCH /transactions/:id — Admin only
- DELETE /transactions/:id — Admin only

### Dashboard (Admin and Analyst only)

- GET /dashboard/financial-summary
- GET /dashboard/category-total
- GET /dashboard/trend-data?period=weekly|monthly
- GET /dashboard/recent-activity?limit=10

---

## Setup

```bash
git clone https://github.com/Aditic1/Finance-Dashboard-Backend.git
cd Finance-Dashboard-Backend/backend
npm install
```

Create `.env` in `backend/`:

```
DATABASE_URL="postgresql://username@localhost:5432/financedb"
PORT=3000
JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN="1h"
ADMIN_EMAIL="admin@financeapp.com"
SEED_ADMIN_PASSWORD="your_admin_password"
```

```bash
npx prisma migrate dev --name init
npx prisma generate
npm run seed
npm run dev
```

### Default Admin Credentials

Email and password are set via ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env.

For the live deployment:

- Email: credentials@financeapp.com
- Password: password@zorvyn

---

## Assumptions

- Users cannot self-register. All users are created by an admin.
- Analytics return company-wide aggregates, not per-user data.
- Soft delete not implemented — hard deletes only. Post-MVP item.
- No refresh tokens. Post-MVP: Redis blacklisting with JWT jti claim.
- No rate limiting. Post-MVP: express-rate-limit.

---

## Seeding

Creates one admin user and 50,000 randomized transactions across 10 categories spanning January 2024 to April 2026. Batched in groups of 1,000.

```bash
npm run seed
```
