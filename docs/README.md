# VoiceAct Platform

A digital agency platform for mobile, web development, and other services.

## Overview

VoiceAct is a full-stack platform consisting of:

- **Frontend** (`web/`) — TanStack Start + React + Tailwind CSS
- **Backend** (`server/`) — Express.js + MongoDB + TypeScript (Bun)

## What It Does

### Public-Facing

- **Service Listings** — Display services offered (mobile dev, web dev, etc.)
- **Portfolio/Projects** — Showcase completed work with descriptions and media
- **Contact Form** — Visitors submit project inquiries
- **About Page** — Company info, team, mission

### Admin

- **Dashboard** — Overview of inquiries, projects, and services
- **Content Management** — CRUD for services, projects, and site content
- **Inquiry Management** — View and respond to contact form submissions
- **Auth** — JWT-based admin authentication

## Architecture

```
voiceAct-web/
├── docs/           # This folder — project documentation
├── web/            # Frontend (TanStack Start + React)
└── server/         # Backend (Express.js + MongoDB)
    ├── src/
    │   ├── app.ts          # Express app setup
    │   ├── server.ts       # Entry point
    │   ├── config/         # Environment, DB config
    │   ├── modules/
    │   │   ├── auth/       # Admin authentication
    │   │   │   ├── admin.model.ts
    │   │   │   ├── admin.dao.ts
    │   │   │   ├── auth.service.ts
    │   │   │   ├── auth.controller.ts
    │   │   │   ├── auth.routes.ts
    │   │   │   └── auth.validation.ts
    │   │   ├── contact/    # Contact form submissions
    │   │   ├── service/    # Service listings
    │   │   └── project/    # Portfolio projects
    │   ├── middleware/      # Auth, error handling, rate limiting, logging
    │   └── utils/          # Shared helpers
    ├── package.json
    └── .env.example
```

## API Endpoints

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/services` | List all services |
| GET | `/api/services/:id` | Get single service |
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/:id` | Get single project |

### Admin (requires JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/auth/me` | Get current admin |
| GET | `/api/admin/inquiries` | List all inquiries |
| PATCH | `/api/admin/inquiries/:id` | Update inquiry status |
| POST | `/api/admin/services` | Create service |
| PUT | `/api/admin/services/:id` | Update service |
| DELETE | `/api/admin/services/:id` | Delete service |
| POST | `/api/admin/projects` | Create project |
| PUT | `/api/admin/projects/:id` | Update project |
| DELETE | `/api/admin/projects/:id` | Delete project |

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Runtime | Bun | Fast, native TypeScript |
| Framework | Express.js | Minimal, well-understood |
| Database | MongoDB | Flexible schema for content |
| ODM | Mongoose | MongoDB-specific validation + queries |
| Auth | JWT | Stateless, simple |
| Validation | Zod | Already used in frontend |
| Rate Limiting | express-rate-limit | Prevents abuse |

## Getting Started

```bash
# Install dependencies
cd server && bun install

# Set up environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Seed database (creates admin + sample data)
bun run seed

# Run development
bun run dev
```

## Design Decisions

1. **Router > Controller > Service > DAO** — Each module follows: routes (HTTP + validation) → controller (req/res) → service (business logic) → dao (Mongoose queries).
2. **Zod for validation** — Already a frontend dependency; reuse instead of adding a new validator.
3. **Mongoose over raw MongoDB driver** — Provides schema validation, middleware, and cleaner queries with minimal overhead.
4. **Minimal utilities** — `sendSuccess`, `sendCreated`, `sendPaginated`, `parsePagination`, `asyncHandler`, `AppError`. Added only when each had real use cases.
5. **Function-based, not class-based** — All modules use plain functions and factory functions. No classes.
6. **Rate limiting** — Contact form: 10 req/15min. Auth: 5 req/15min. General: 60 req/min.
7. **Request logging** — Method, URL, status code, duration. Errors highlighted.
8. **Seed script** — `bun run seed` creates admin user + sample services/projects.
