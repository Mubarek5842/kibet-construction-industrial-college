# Kibet Construction and Industrial College

This repository contains a full-stack student registration system for a TVET college in Ethiopia.

## Stack

- Frontend: Next.js + React + TypeScript + Tailwind CSS
- Backend: NestJS + TypeScript
- Database: PostgreSQL + Prisma ORM
- Auth: JWT + RBAC
- File uploads: S3-compatible / MinIO support in production
- Tests: Jest + Supertest + React Testing Library
- Deployment: Docker + Docker Compose

## Monorepo structure

```text
kibet-college-system/
├─ apps/
│  ├─ backend/
│  └─ frontend/
├─ prisma/
├─ docker/
├─ docker-compose.yml
├─ .env.example
├─ package.json
└─ README.md
```

## Prerequisites

- Node.js 20+
- npm 10+
- Docker and Docker Compose
- PostgreSQL 16+

## Local setup

1. Clone the repository.
2. Copy environment variables:

```bash
cp .env.example .env
```

3. Install dependencies:

```bash
npm install
```

4. Start PostgreSQL:

```bash
docker compose up -d postgres
```

5. Generate Prisma client and run migrations when schema is ready:

```bash
npm run prisma:generate --workspace apps/backend
npm run prisma:migrate --workspace apps/backend
```

6. Start the app in development mode:

```bash
npm run dev
```

The backend runs at http://localhost:4000 and the frontend at http://localhost:3000.

## API docs

When the backend is running, Swagger is available at:

```text
http://localhost:4000/docs
```

## Notes

This is the Phase 0 foundation. Database schema, authentication, admissions workflows, and feature-specific modules will be added in later phases.
