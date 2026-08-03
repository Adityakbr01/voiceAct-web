# syntax=docker/dockerfile:1

# Base image
FROM oven/bun:1 AS base
WORKDIR /app

# ============================
# Install production dependencies
# ============================
FROM base AS deps

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --production

# ============================
# Build TypeScript
# ============================
FROM base AS builder

COPY package.json bun.lock* tsconfig.json ./
COPY src ./src

RUN bun install --frozen-lockfile
RUN bun run build || bun tsc

# ============================
# Production Runner
# ============================
FROM base AS runner

ENV NODE_ENV=production
WORKDIR /app

# Install curl for Docker health checks
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/*

# Copy production dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy compiled application
COPY --from=builder /app/dist ./dist
COPY package.json ./

EXPOSE 5000

CMD ["bun", "run", "dist/server.js"]