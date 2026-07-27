# syntax=docker/dockerfile:1
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --production

# Build (TypeScript → JavaScript)
FROM base AS builder
COPY package.json bun.lock* tsconfig.json ./
COPY src ./src
RUN bun install --frozen-lockfile
RUN bun run build || bun tsc

# Production runner
FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app

# Copy built files and production dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

EXPOSE 5000
CMD ["bun", "run", "dist/server.js"]
