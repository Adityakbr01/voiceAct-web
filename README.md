# 🚀 VoiceAct Agency Website

A complete full-stack agency website with CMS, analytics, and visitor tracking.

## 📋 Quick Start

### 🔐 Admin Credentials

After running the seed command:
- **Email**: `admin@voiceact.com`  
- **Password**: `admin123`  
- **Admin URL**: http://localhost:3000/admin/login

### 🛠️ Local Setup

```bash
# 1. Server setup
cd server
cp .env.example .env
bun install
bun run seed    # Creates admin user + sample data
bun run dev     # http://localhost:5000

# 2. Web setup (new terminal)
cd web
cp .env.example .env.local
npm install
npm run dev     # http://localhost:3000
```

### 🔗 Access Points

- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login
- **API Health**: http://localhost:5000/api/health

## 📊 Test Data Included

After seeding, you'll have:
- **6 Services** (5 active, 1 inactive for testing)
- **6 Projects** with real images and URLs
- **6 Sample Contacts** with different statuses
- **1 Admin User** (super_admin role)

### 🧪 Testing

Comprehensive test suite using Bun's built-in test runner:

```bash
# Run all server tests
cd server
bun test

# Run with coverage
bun test:coverage

# Watch mode (re-runs on changes)
bun test:watch
```

**Test Coverage:**
- ✅ **119 tests** across 12 test files
- ✅ **Unit tests** for all services and utilities
- ✅ **Integration tests** for all API endpoints  
- ✅ **Middleware tests** for auth and validation
- ✅ **Database isolation** (each test uses clean database)

See **[TESTING-BUN-GUIDE.md](docs/TESTING-BUN-GUIDE.md)** for detailed testing instructions.

## 🏗️ Architecture

```
├── server/          # Express API (Bun runtime)
│   ├── src/modules/ # Contacts, Projects, Services, Auth, Analytics
│   └── src/utils/   # AppError, validation, response helpers
├── web/             # Next.js 16 frontend
│   ├── app/         # App router (public + admin pages)
│   └── src/         # Components, hooks, API clients
└── docs/            # Comprehensive documentation
```

## ✨ Features

### Public Website
- ✅ Responsive homepage with all sections
- ✅ Project showcase gallery (driven by CMS)
- ✅ Services section (CMS managed)
- ✅ Contact form with tracking
- ✅ Project detail pages (`/work/[slug]`)
- ✅ SEO metadata and Open Graph tags

### Admin CMS
- ✅ Secure cookie-based authentication
- ✅ Contacts management (list, filter, status updates, CSV export)
- ✅ Projects CRUD (create, edit, delete, featured toggle)
- ✅ Services CRUD (active/inactive, reordering)
- ✅ Analytics dashboard (traffic, conversions, funnel)

### Analytics & Tracking
- ✅ UTM parameter capture
- ✅ Visitor & session tracking
- ✅ Device, browser, geo detection
- ✅ Lead attribution on contact submission
- ✅ Conversion funnel analysis
- ✅ Real-time active sessions

### Production Ready
- ✅ Docker Compose setup
- ✅ GitHub Actions CI/CD
- ✅ Environment configuration
- ✅ Error handling & validation
- ✅ Rate limiting & security
- ✅ Health checks

## 🐳 Docker Deployment

```bash
# Configure environment
cp server/.env.example .env
# Edit .env with production values

# Start all services
docker-compose up -d

# Seed database
docker-compose exec server bun run src/seed.ts
```

## 📚 Documentation

- **[IMPLEMENTATION-SUMMARY.md](docs/IMPLEMENTATION-SUMMARY.md)** - Complete technical overview
- **[TESTING-GUIDE.md](docs/TESTING-GUIDE.md)** - Testing instructions
- **[MONGODB-SETUP.md](docs/MONGODB-SETUP.md)** - Database setup
- **[agency-production-todo.md](docs/agency-production-todo.md)** - Production checklist

## 🔧 Tech Stack

**Backend**: Express, MongoDB, Mongoose, Zod, Bun, JWT  
**Frontend**: Next.js 16, React 19, TanStack Query, Tailwind CSS  
**DevOps**: Docker, GitHub Actions, health checks  
**Analytics**: Custom tracking, GeoIP, UTM attribution

---

**🎉 Ready for production! Start with the [TESTING-GUIDE.md](docs/TESTING-GUIDE.md) to verify everything works.**