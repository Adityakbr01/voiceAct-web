# Agency website — production checklist

**Scope:** Contacts, projects, services, visitor/session tracking, admin CMS, analytics.  
**Out of scope (for now):** Lead-generation module (`docs/lead-generation/`).

## Legend

- [x] Done in this pass
- [ ] Remaining / follow-up

---

## Backend (`server/`)

### Core API (existing)

- [x] Auth — JWT login, `/api/auth/me`
- [x] Contacts — public POST, admin list + status patch
- [x] Services — public list/slug, admin CRUD
- [x] Projects — public list/slug, admin CRUD
- [x] Tracking — pageview ingestion, admin analytics aggregate

### Enhancements

- [x] Admin dashboard stats — `/api/admin/stats`
- [x] Analytics payload — inquiry counts + recent submissions
- [x] Contact PATCH — Zod validation for status
- [x] Contact GET by id
- [x] Project list query filters (`featured`, pagination)
- [x] Service reorder bulk endpoint
- [x] Email notifications on new contact (SMTP/Resend)
- [x] Rate-limit tuning per environment
- [x] Production env validation on boot (`JWT_SECRET`, `MONGO_URI`)
- [x] **Code quality** — AppError is now a proper class, all controllers use response utils, all routes use validate() middleware
- [ ] Image upload (S3/Cloudinary) for project `image` (future enhancement)

---

## Frontend — public (`web/`)

- [x] React Query provider
- [x] Tracking — UTM capture, session id, pageview on route change
- [x] Contact CTA — POST `/api/contact` with attribution headers
- [x] Services section — API data with static presentation fallback
- [x] Work section — API projects with presentation fallback
- [x] Showcase gallery — drive images from API project `image`
- [x] Dedicated project detail pages (`/work/[slug]`)
- [x] SEO metadata per project/service from API
- [x] Error boundary + offline messaging on form submit

---

## Frontend — admin (`web/app/admin`)

- [x] Login page
- [x] Auth context + route guard (httpOnly cookie)
- [x] Sidebar — CMS + analytics navigation
- [x] Contacts inbox — list, filter status, mark read/replied
- [x] Services CRUD
- [x] Projects CRUD
- [x] Analytics — live traffic sources + visitor KPIs from API
- [x] Move token to httpOnly cookie (security hardening)
- [x] Export contacts CSV
- [ ] Role-based access (if multiple admin types) — infrastructure ready, not enforced in UI

---

## Tracking & analytics

- [x] Server middleware — visitor, session, UTM, ad click ids
- [x] Lead attribution on contact submit (not full lead-gen UI)
- [x] Client pageview + session header on API calls
- [x] GeoIP country on visitor (MaxMind/geoip-lite)
- [x] Time-series charts from DB (daily buckets)
- [x] Realtime visitor count from active sessions
- [x] Funnel steps tied to real events (pageview → contact)

---

## DevOps & production

- [x] `.env.example` for `web` and `server` documented
- [x] Docker Compose (Mongo + server + web)
- [x] CI — lint, typecheck, build (GitHub Actions)
- [x] CORS allowlist for production domain
- [x] Health check endpoint (`/api/health`)
- [ ] Staging + production MongoDB backups (setup depends on hosting provider)
- [ ] Uptime monitoring (configure external service: BetterUptime, UptimeRobot, Pingdom)

---

## How to run locally

```bash
# Terminal 1 — API
cd server && cp .env.example .env && bun install && bun run seed && bun run dev

# Terminal 2 — Web
cd web && cp .env.example .env.local && bun install && bun run dev
```

Admin: `http://localhost:3000/admin/login` (seed: `admin@voiceact.com` / `admin123`)

---

## How to run with Docker

```bash
# Copy and configure environment
cp server/.env.example .env
# Edit .env with production values (JWT_SECRET, SMTP, etc.)

# Start all services
docker-compose up -d

# Seed database
docker-compose exec server bun run src/seed.ts

# View logs
docker-compose logs -f
```

Access:
- Frontend: `http://localhost:3000`
- API: `http://localhost:5000`
- Admin: `http://localhost:3000/admin/login`

---

## Production deployment checklist

1. **Environment variables**
   - [ ] Set strong `JWT_SECRET` (32+ chars)
   - [ ] Configure `MONGODB_URI` for production cluster
   - [ ] Set `CORS_ORIGINS` to production domain(s)
   - [ ] Configure SMTP credentials for email notifications
   - [ ] Set `COOKIE_DOMAIN` if using subdomains

2. **Security**
   - [ ] Enable HTTPS (Let's Encrypt, Cloudflare, etc.)
   - [ ] Configure firewall rules
   - [ ] Set up MongoDB authentication
   - [ ] Review rate limits for production traffic

3. **Monitoring**
   - [ ] Configure uptime monitoring (BetterUptime, etc.)
   - [ ] Set up error tracking (Sentry, etc.)
   - [ ] Configure log aggregation

4. **Backups**
   - [ ] Automated MongoDB backups
   - [ ] Test restore procedure
   - [ ] Document backup retention policy
