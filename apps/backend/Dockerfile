FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY apps/backend/package*.json apps/backend/
RUN npm install
COPY . .
RUN npx prisma generate --schema=prisma/schema.prisma && npm run build --workspace apps/backend
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/backend/dist ./apps/backend/dist
COPY --from=build /app/prisma ./prisma
EXPOSE 4000
CMD ["node", "apps/backend/dist/main.js"]
