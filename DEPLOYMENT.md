# Local startup

For native development, use `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/kibet_college?schema=public`. The `postgres` hostname is only available from containers.

```bash
npm install
cp .env.example .env
# change DATABASE_URL to localhost when backend runs natively
docker compose up -d postgres
npm run prisma:generate --workspace apps/backend
npm run prisma:migrate --workspace apps/backend
npm run prisma:seed --workspace apps/backend
npm run dev
```

The API is served under `/api`; the frontend uses `NEXT_PUBLIC_API_URL` and no longer hardcodes unprefixed API paths.

# Production checklist

- [ ] Replace all JWT and database secrets; store them in a managed secret store.
- [ ] Use HTTPS, a reverse proxy, secure DNS, and restrictive `CORS_ORIGINS`.
- [ ] Run `npm audit`, dependency updates, and secret scanning in CI.
- [ ] Run `prisma migrate deploy`, never `migrate dev`, in production.
- [ ] Back up PostgreSQL and the uploads volume; test restoration.
- [ ] Use S3/MinIO with private buckets and signed download URLs for sensitive documents.
- [ ] Enforce MIME/type validation and antivirus scanning for uploads before go-live.
- [ ] Add rate limiting and account lockout to authentication endpoints.
- [ ] Restrict policy/report/document verification routes with role guards.
- [ ] Configure structured logs, metrics, alerts, health checks, and error tracking.
- [ ] Rotate the seeded admin password and disable public staff-role registration.
- [ ] Run unit, integration, migration, and end-to-end tests in CI before deployment.
- [ ] Use encrypted disks, least-privilege database credentials, and a non-root container user.
