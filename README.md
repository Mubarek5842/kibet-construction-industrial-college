# Kibet Construction and Industrial College

A full-stack student registration system for TVET institutions.

## Stack

- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: NestJS + TypeScript
- Database: PostgreSQL + Prisma
- Auth: JWT + RBAC
- Testing: Jest + Supertest + RTL
- Deployment: Docker Compose

## Production features included

- Public applicant registration and application tracking
- Admission verification workflow
- Merit and preference aware admissions flow
- Student registration and ID number issuance
- Finance payment tracking and receipts
- Academic registration, attendance, and grading support
- Configurable policy management for age, attendance, cut-off score, and fees
- Report summary APIs
- Audit-friendly backend structure

## Quick start

```bash
npm install
cp .env.example .env
docker compose up -d postgres
npm run prisma:generate --workspace apps/backend
npm run prisma:migrate --workspace apps/backend
npm run prisma:seed --workspace apps/backend
npm run dev
```

## Default admin account

- Email: admin@kibetcollege.edu.et
- Password: Admin@123

## Key URLs

- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Swagger: http://localhost:4000/docs

## Notes

This repository implements a production-oriented scaffolding and feature set for the Kibet Construction and Industrial College registration system, with configurable academic and admissions rules managed through the database.
