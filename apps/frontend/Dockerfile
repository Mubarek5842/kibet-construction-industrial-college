FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY apps/frontend/package*.json apps/frontend/
RUN npm install
COPY . .
RUN npm run build --workspace apps/frontend
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=build /app/apps/frontend/public ./apps/frontend/public
COPY --from=build /app/apps/frontend/package.json ./apps/frontend/package.json
EXPOSE 3000
CMD ["npm", "run", "start", "--workspace", "apps/frontend"]
