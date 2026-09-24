# Kibet Construction and Industrial College

## Phase 1 Update

This phase implements the foundational database model, Prisma schema, seed data, and JWT-based authentication with role-based guard support.

## Included in this phase

- Prisma schema covering users, applicants, applications, programs, students, fees, attendance, audits, and policies
- PostgreSQL migration SQL for all Phase 1 tables
- Seed definitions for admin user, default campus, sample departments, sample programs, and default policies
- NestJS auth module with registration, login, JWT validation, and RBAC scaffolding
- Initial frontend login page for API validation

## Setup

```bash
npm install
cp .env.example .env

docker compose up -d postgres
npm run prisma:generate --workspace apps/backend
npm run prisma:migrate --workspace apps/backend
npm run prisma:seed --workspace apps/backend
npm run dev
```

## Admin login

- Email: admin@kibetcollege.edu.et
- Password: Admin@123

## Notes

Policy values such as age and attendance thresholds are stored in the `AcademicPolicy` table and are fully configurable.
