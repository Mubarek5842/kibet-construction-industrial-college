# Production hardening and deployment

## Role-based UI

- `/dashboard` selects the role workspace from the authenticated user.
- `/apply` is the applicant portal.
- `/registrar` is the registrar workspace.
- `/student-registration` handles admitted-student conversion.
- `/finance-academics` is shared by finance and department users.
- `/admin` provides policy administration and report links.

## Secure production configuration

1. Copy `.env.example` to `.env` and replace every secret.
2. Do not expose PostgreSQL directly to the public internet.
3. Put HTTPS/TLS and a reverse proxy in front of ports 3000 and 4000.
4. Keep `UPLOAD_DIR` on persistent encrypted storage or replace `StorageService` with S3/MinIO.
5. Run migrations in a controlled release step:

```bash
docker compose -f docker-compose.prod.yml up -d postgres
docker compose -f docker-compose.prod.yml run --rm backend npx prisma migrate deploy
# seed only in a controlled initial deployment
# docker compose -f docker-compose.prod.yml run --rm backend npx prisma db seed
docker compose -f docker-compose.prod.yml up -d backend frontend
```

6. Back up PostgreSQL and the uploads volume regularly.
7. Rotate JWT secrets and admin credentials before go-live.
8. Restrict policy and report endpoints with role guards before exposing them to staff users.

## File uploads

Documents are uploaded as multipart form data to `POST /api/documents/upload` with fields `applicationId`, `type`, and `file`. Files are limited to 5 MB and receive generated non-colliding names. The upload volume is persisted by Docker.
