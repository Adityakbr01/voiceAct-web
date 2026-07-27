# 🧪 Testing Guide — VoiceAct Agency Website

This guide walks you through testing every feature of the agency website, from local setup to complete functionality verification.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 20+** (for web frontend)
- **Bun** (for server backend)
- **MongoDB** (local or cloud)
- **Git** (to clone/pull latest changes)

### 1. Environment Setup

```bash
# 1. Navigate to project
cd c:/Users/ADITYA/Desktop/voiceAct-web

# 2. Server setup
cd server
cp .env.example .env
# Edit .env if needed (default values work for local testing)
bun install

# 3. Web setup (new terminal)
cd ../web
cp .env.example .env.local
# Default values work for local testing
npm install  # or bun install
```

### 2. Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows (if MongoDB is installed)
mongod --dbpath C:\data\db

# macOS with Homebrew
brew services start mongodb-community

# Linux (systemd)
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Update `MONGODB_URI` in `server/.env` to your Atlas connection string

### 3. Start Services

```bash
# Terminal 1: Start server (from /server directory)
bun run seed    # Creates admin user + sample data
bun run dev     # Starts on http://localhost:5000

# Terminal 2: Start web (from /web directory)
npm run dev     # Starts on http://localhost:3000
```

### 4. Verify Setup

Open in browser:
- **Website:** http://localhost:3000
- **Admin:** http://localhost:3000/admin/login
- **API Health:** http://localhost:5000/api/health

---

## 🔐 Admin Credentials

After running `bun run seed`:

| Field | Value |
|-------|-------|
| **Email** | `admin@voiceact.com` |
| **Password** | `admin123` |
| **Admin URL** | http://localhost:3000/admin/login |

---

## 📋 Feature Testing Checklist

### ✅ Public Website Testing

#### Homepage Sections
- [ ] **Hero section** loads with animations
- [ ] **Showcase gallery** displays projects (should show 6 projects with real images)
- [ ] **Services section** shows 5 active services (Web Dev, Mobile, UI/UX, Digital Marketing, E-commerce)
- [ ] **Work section** displays featured projects
- [ ] **Process section** renders correctly
- [ ] **Stack section** shows technologies
- [ ] **Testimonials** carousel works
- [ ] **FAQ section** expands/collapses
- [ ] **Contact CTA** section visible

#### Navigation & Routing
- [ ] **Navigation menu** works (desktop & mobile)
- [ ] **Smooth scrolling** to sections (e.g., click "Work" → scrolls to #work)
- [ ] **Project detail pages** accessible:
  - http://localhost:3000/work/techflow-ecommerce
  - http://localhost:3000/work/fitlife-fitness-tracker
  - http://localhost:3000/work/greenspace-property-portal
  - http://localhost:3000/work/medconnect-telemedicine

#### Contact Form
- [ ] **Contact form** renders on homepage
- [ ] **Form validation** works (try submitting empty)
- [ ] **Successful submission** shows success message
- [ ] **Form data** appears in admin contacts list
- [ ] **Email notification** sent (if SMTP configured)

#### SEO & Metadata
- [ ] **Page titles** are correct (check browser tab)
- [ ] **Meta descriptions** set on project pages
- [ ] **Open Graph tags** present (view page source)

### ✅ Admin Panel Testing

#### Authentication
- [ ] **Login page** loads: http://localhost:3000/admin/login
- [ ] **Invalid credentials** shows error
- [ ] **Valid login** (admin@voiceact.com / admin123) redirects to contacts
- [ ] **Auto-redirect** when not logged in (try accessing /admin/projects directly)
- [ ] **Logout** works and clears session

#### Contacts Management (`/admin/contacts`)
- [ ] **Contacts list** shows 6 sample contacts
- [ ] **Status filter** works (All, New, Read, Replied)
- [ ] **Status change** works (click "Mark read", "Mark replied")
- [ ] **Message expansion** works (click contact name)
- [ ] **Export CSV** button downloads file with correct data
- [ ] **Real-time updates** (status changes reflect immediately)

#### Projects Management (`/admin/projects`)
- [ ] **Projects list** shows 6 projects
- [ ] **Create project** form works
- [ ] **Edit project** (click edit button on existing project)
- [ ] **Delete project** works (delete button)
- [ ] **Featured toggle** saves correctly
- [ ] **Image URLs** display in form and list
- [ ] **Form validation** prevents invalid submissions

#### Services Management (`/admin/services`)
- [ ] **Services list** shows 6 services (5 active, 1 inactive)
- [ ] **Create service** form works
- [ ] **Edit service** (click edit button)
- [ ] **Delete service** works
- [ ] **Active/inactive toggle** works
- [ ] **Order management** (drag-and-drop if implemented)

#### Analytics Dashboard (`/admin/analytics`)
- [ ] **Dashboard loads** without errors
- [ ] **Traffic sources** chart shows data
- [ ] **Time-series charts** display (may be empty for new setup)
- [ ] **Device/browser breakdown** shows data
- [ ] **Realtime sessions** count displays
- [ ] **Period selector** works (24h, 7d, 30d, 90d)
- [ ] **Conversion funnel** shows progression

### ✅ API Testing

#### Public Endpoints
```bash
# Test these URLs directly in browser or with curl

# Health check
curl http://localhost:5000/api/health

# Public services
curl http://localhost:5000/api/services

# Public projects
curl http://localhost:5000/api/projects

# Single project
curl http://localhost:5000/api/projects/techflow-ecommerce

# Contact form submission (POST)
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'
```

#### Admin Endpoints (require authentication)
Test these after logging into admin panel (cookie will be set):

```bash
# Admin contacts
curl -b cookies.txt http://localhost:5000/api/contact

# Admin services
curl -b cookies.txt http://localhost:5000/api/services/admin/all

# Analytics
curl -b cookies.txt http://localhost:5000/api/tracking/analytics

# Dashboard stats
curl -b cookies.txt http://localhost:5000/api/admin/stats
```

### ✅ Tracking & Analytics Testing

#### UTM Parameter Tracking
Test with URLs like:
- http://localhost:3000/?utm_source=google&utm_medium=cpc&utm_campaign=test
- http://localhost:3000/?utm_source=facebook&utm_medium=social

Then check admin analytics to see if tracking data appears.

#### Page View Tracking
- [ ] **Navigate between pages** (homepage → project detail → homepage)
- [ ] **Check analytics dashboard** for page view increases
- [ ] **Session tracking** should show multiple pages for same session

#### Contact Attribution
- [ ] **Visit with UTM parameters** (use URLs above)
- [ ] **Submit contact form**
- [ ] **Check admin contacts** — should see UTM data in backend
- [ ] **Analytics funnel** should show conversion

---

## 🐛 Common Issues & Solutions

### Server Won't Start
```bash
# Check if MongoDB is running
mongosh  # Should connect without error

# Check if port 5000 is free
netstat -an | findstr :5000  # Windows
lsof -i :5000                # macOS/Linux

# Clear node_modules and reinstall
rm -rf node_modules bun.lockb
bun install
```

### Web Won't Start
```bash
# Check if port 3000 is free
netstat -an | findstr :3000  # Windows
lsof -i :3000                # macOS/Linux

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Admin Login Fails
```bash
# Re-run seed to ensure admin exists
cd server
bun run seed

# Check database
mongosh voiceact
db.admins.find()  # Should show admin user
```

### Images Don't Load in Showcase
- Check browser console for CORS errors
- Verify project `image` fields in database
- Test with different image URLs if Unsplash is blocked

### Contact Form Doesn't Submit
- Check browser Network tab for API errors
- Verify CORS settings in server config
- Check server logs for validation errors

### Analytics Shows No Data
- Make sure to navigate around the site first
- Check that pageview tracking fires (Network tab)
- UTM parameters may take time to aggregate

---

## 🏗️ Advanced Testing

### Docker Testing
```bash
# Build and run with Docker
cp server/.env.example .env
# Edit .env with production-like values
docker-compose up -d

# Seed database in Docker
docker-compose exec server bun run src/seed.ts

# Access
# Website: http://localhost:3000
# API: http://localhost:5000
```

### Production Environment Testing
```bash
# Test production builds locally
cd server
bun run build
bun run dist/server.js

cd ../web
npm run build
npm start
```

### Performance Testing
- [ ] **Lighthouse audit** on homepage (should score 90+ for performance)
- [ ] **Page load times** under 3 seconds
- [ ] **API response times** under 500ms
- [ ] **Image optimization** (check Network tab)

---

## 📊 Expected Test Data

After running seed, you should see:

### Services (5 active, 1 inactive)
1. Web Development ✅
2. Mobile Development ✅
3. UI/UX Design ✅
4. Digital Marketing ✅
5. E-commerce Solutions ✅
6. Cloud Infrastructure ❌ (inactive)

### Projects (6 total, 4 featured)
1. TechFlow E-commerce Platform ⭐
2. FitLife Fitness Tracker ⭐
3. GreenSpace Property Portal ⭐
4. EduTech Learning Management System
5. RestoPOS Restaurant System
6. MedConnect Telemedicine Platform ⭐

### Contacts (6 with different statuses)
- 3 "new" status
- 2 "read" status  
- 1 "replied" status

### Admin User
- Email: admin@voiceact.com
- Password: admin123
- Role: super_admin

---

## ✅ Test Completion Checklist

Print this checklist and check off as you test:

**Setup:**
- [ ] MongoDB running
- [ ] Server started (port 5000)
- [ ] Web started (port 3000)
- [ ] Seed data loaded
- [ ] Admin login successful

**Public Features:**
- [ ] Homepage loads completely
- [ ] All sections render
- [ ] Showcase shows project images
- [ ] Contact form submits
- [ ] Project detail pages work
- [ ] Navigation functions

**Admin Features:**
- [ ] Login/logout works
- [ ] Contacts management works
- [ ] Projects CRUD works
- [ ] Services CRUD works
- [ ] Analytics dashboard loads
- [ ] CSV export works

**API:**
- [ ] Health check responds
- [ ] Public endpoints work
- [ ] Admin endpoints require auth
- [ ] Error handling works

**Advanced:**
- [ ] Docker deployment works
- [ ] Performance meets targets
- [ ] SEO metadata correct
- [ ] Tracking data appears

---

## 🆘 Getting Help

If tests fail:

1. **Check console logs** (browser dev tools + server terminal)
2. **Verify prerequisites** (Node.js, Bun, MongoDB versions)
3. **Clear caches** (.next, node_modules, browser cache)
4. **Review error messages** carefully
5. **Check network requests** in browser dev tools

**Still stuck?** Check the troubleshooting section in `IMPLEMENTATION-SUMMARY.md`.

---

**🎉 Happy testing! The agency website should now be fully functional.**