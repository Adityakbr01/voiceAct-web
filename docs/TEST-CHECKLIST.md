# ✅ Complete Test Checklist — VoiceAct Agency Website

**Print this checklist and check off each item as you test.**

---

## 🔧 Setup Verification

### Prerequisites
- [ ] **Node.js 20+** installed (`node --version`)
- [ ] **Bun** installed (`bun --version`) 
- [ ] **MongoDB** running (local or Atlas)
- [ ] **Git** available

### Environment Setup
- [ ] **Server .env** copied from .env.example
- [ ] **Web .env.local** copied from .env.example
- [ ] **Dependencies installed** (server: `bun install`, web: `npm install`)
- [ ] **Database seeded** (`bun run seed` - shows success message)

### Services Running
- [ ] **MongoDB** accessible (port 27017 or Atlas)
- [ ] **Server** running on http://localhost:5000
- [ ] **Web** running on http://localhost:3000
- [ ] **API Health** responds: http://localhost:5000/api/health

---

## 🌐 Public Website Testing

### Homepage Loading
- [ ] **Page loads** without errors (check console)
- [ ] **Navigation menu** visible and functional
- [ ] **Hero section** displays with animations
- [ ] **Page title** correct in browser tab
- [ ] **Favicon** displays

### Homepage Sections
- [ ] **Showcase gallery** renders with project images
  - Should show 6 projects
  - Images load properly (no broken images)
  - Gallery is interactive (drag/scroll)
- [ ] **Services section** shows 5 services
  - Web Development, Mobile Development, UI/UX Design, Digital Marketing, E-commerce Solutions
- [ ] **Work section** displays featured projects
  - Should show 4 featured projects
- [ ] **Process section** renders correctly
- [ ] **Stack section** shows technologies
- [ ] **Testimonials** carousel functional
- [ ] **FAQ section** expand/collapse works
- [ ] **Contact CTA** section visible

### Navigation & Routing
- [ ] **Smooth scroll** to sections works
  - Click "Services" → scrolls to #services
  - Click "Work" → scrolls to #work
- [ ] **Mobile menu** works (test on narrow screen)
- [ ] **Project detail pages** accessible:
  - /work/techflow-ecommerce
  - /work/fitlife-fitness-tracker
  - /work/greenspace-property-portal
  - /work/edutech-lms
  - /work/restopos-restaurant-system
  - /work/medconnect-telemedicine

### Project Detail Pages
- [ ] **Page loads** without errors
- [ ] **Project image** displays
- [ ] **Project title** and client shown
- [ ] **Description** renders properly
- [ ] **Services tags** display correctly
- [ ] **External link** works (if present)
- [ ] **Back to work** link functions
- [ ] **SEO metadata** correct (check page source for `<title>`, `<meta>`)

### Contact Form
- [ ] **Form renders** on homepage
- [ ] **All fields present**: name, email, phone (optional), service dropdown, message
- [ ] **Service dropdown** populated with 5 options
- [ ] **Form validation** works:
  - Submit empty → shows errors
  - Invalid email → shows error
  - Valid submission → shows success message
- [ ] **Form clears** after successful submission
- [ ] **No console errors** during submission

### Performance & UX
- [ ] **Page loads** under 3 seconds
- [ ] **Images optimized** (reasonable file sizes)
- [ ] **No broken links** or 404 errors
- [ ] **Responsive design** works on mobile/tablet
- [ ] **Smooth animations** (no janky scrolling)

---

## 🔐 Admin Panel Testing

### Authentication Flow
- [ ] **Login page** loads: http://localhost:3000/admin/login
- [ ] **Form validation** works:
  - Empty fields → shows errors
  - Invalid credentials → shows "Invalid credentials" or similar
- [ ] **Successful login** with admin@voiceact.com / admin123
  - Redirects to /admin/contacts
  - No console errors
- [ ] **Authentication persistence**:
  - Refresh page → stays logged in
  - Navigate to /admin/projects → doesn't redirect to login
- [ ] **Auto-redirect when not authenticated**:
  - Clear cookies/logout
  - Visit /admin/contacts → redirects to /admin/login
- [ ] **Logout functionality**:
  - Click logout → redirects to /admin/login
  - Try accessing admin pages → requires login again

### Contacts Management (/admin/contacts)
- [ ] **Page loads** without errors
- [ ] **Contacts list** displays 6 sample contacts
- [ ] **Contact information** shows:
  - Name, email, service, status, date received
- [ ] **Status filtering** works:
  - Click "All" → shows all 6 contacts
  - Click "New" → shows 3 contacts
  - Click "Read" → shows 2 contacts  
  - Click "Replied" → shows 1 contact
- [ ] **Status updates** work:
  - Click "Mark read" → status updates to "read"
  - Click "Mark replied" → status updates to "replied"
  - Changes reflect immediately (no page refresh needed)
- [ ] **Message expansion** works:
  - Click contact name → expands message
  - Click again → collapses message
- [ ] **CSV Export** works:
  - Click "Export CSV" button
  - File downloads automatically
  - File contains correct data (open in Excel/Sheets)
  - Filtered exports work (set filter, then export)

### Projects Management (/admin/projects)
- [ ] **Page loads** without errors
- [ ] **Projects list** shows 6 projects
- [ ] **Project information** displays:
  - Title, client, services, featured status, image
- [ ] **Create project** works:
  - Click "Create Project" or "+" button
  - Form appears with all fields
  - Required field validation works
  - Successful creation adds to list
- [ ] **Edit project** works:
  - Click edit button on existing project
  - Form pre-populated with current data
  - Changes save successfully
  - Updated data reflects in list
- [ ] **Delete project** works:
  - Click delete button
  - Confirmation dialog appears
  - Confirm → project removed from list
- [ ] **Featured toggle** works:
  - Toggle featured status
  - Change saves automatically
  - Featured projects show on public site
- [ ] **Image URLs** work:
  - Add/edit image URL in form
  - Image preview shows (if implemented)
  - Image displays on public site

### Services Management (/admin/services)
- [ ] **Page loads** without errors
- [ ] **Services list** shows 6 services (5 active, 1 inactive)
- [ ] **Service information** displays:
  - Title, description, active status, order
- [ ] **Create service** works:
  - Click "Create Service"
  - Form validation works
  - New service appears in list
  - New service available in contact form dropdown
- [ ] **Edit service** works:
  - Click edit button
  - Form pre-populated
  - Changes save successfully
- [ ] **Delete service** works:
  - Click delete button
  - Confirmation required
  - Service removed from list
- [ ] **Active/inactive toggle** works:
  - Toggle active status
  - Inactive services don't appear on public site
  - Inactive services don't appear in contact form
- [ ] **Order management** works (if implemented):
  - Drag and drop to reorder
  - Order persists after refresh

### Analytics Dashboard (/admin/analytics)
- [ ] **Page loads** without errors
- [ ] **Dashboard stats** display:
  - Contact counts (may be 0 for new install)
  - Project and service counts
  - Recent activity
- [ ] **Analytics charts** render:
  - Traffic sources (may be empty initially)
  - Time-series data
  - Device/browser breakdown
  - Country breakdown
- [ ] **Period selector** works:
  - 24h, 7d, 30d, 90d buttons
  - Data updates when period changes
- [ ] **Realtime data** shows:
  - Active sessions count
  - Recent page views
- [ ] **Conversion funnel** displays:
  - Sessions → Engaged → Contact submitted
  - Percentages calculated correctly

### Admin Navigation
- [ ] **Sidebar navigation** works:
  - All menu items clickable
  - Current page highlighted
  - No broken links
- [ ] **Breadcrumbs** show current location (if implemented)
- [ ] **User menu** works (logout, profile if implemented)

---

## 🔌 API Testing

### Public Endpoints (no auth required)
Test these in browser or with curl:

- [ ] **Health check**: http://localhost:5000/api/health
  - Returns 200 status
  - Returns `{"success": true, "message": "OK"}`
- [ ] **Services list**: http://localhost:5000/api/services
  - Returns 200 status
  - Returns 5 active services (not the inactive one)
- [ ] **Projects list**: http://localhost:5000/api/projects
  - Returns 200 status
  - Returns all 6 projects
- [ ] **Single project**: http://localhost:5000/api/projects/techflow-ecommerce
  - Returns 200 status
  - Returns single project data
- [ ] **Contact submission**: 
  ```bash
  curl -X POST http://localhost:5000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'
  ```
  - Returns 201 status
  - Contact appears in admin panel

### Admin Endpoints (require authentication)
Test these after logging into admin (cookie set):

- [ ] **Admin contacts**: http://localhost:5000/api/contact
  - Returns contact list for authenticated user
- [ ] **Admin services**: http://localhost:5000/api/services/admin/all
  - Returns all services including inactive ones
- [ ] **Analytics**: http://localhost:5000/api/tracking/analytics
  - Returns analytics data
- [ ] **Dashboard stats**: http://localhost:5000/api/admin/stats
  - Returns dashboard statistics

### Error Handling
- [ ] **404 errors** for invalid endpoints return proper JSON
- [ ] **401 errors** for protected endpoints without auth
- [ ] **400 errors** for invalid request data
- [ ] **Rate limiting** works (test by making many rapid requests)

---

## 📊 Analytics & Tracking Testing

### Page View Tracking
- [ ] **Navigate between pages**:
  - Homepage → project detail → back to homepage
  - Multiple page views in same session
- [ ] **Check analytics dashboard**:
  - Page view counts increase
  - Session data appears
- [ ] **Multiple browser sessions**:
  - Open in different browsers/incognito
  - Each should count as separate session

### UTM Parameter Tracking
Test with these URLs:
- [ ] **Google Ads simulation**: 
  http://localhost:3000/?utm_source=google&utm_medium=cpc&utm_campaign=test&utm_term=web+development
- [ ] **Facebook simulation**:
  http://localhost:3000/?utm_source=facebook&utm_medium=social&utm_campaign=portfolio
- [ ] **Email simulation**:
  http://localhost:3000/?utm_source=newsletter&utm_medium=email&utm_campaign=monthly

After testing:
- [ ] **UTM data appears** in analytics dashboard
- [ ] **Traffic sources** show correct channels
- [ ] **Campaign data** tracked properly

### Contact Attribution
- [ ] **Visit with UTM parameters** (use URLs above)
- [ ] **Submit contact form**
- [ ] **Check admin contacts** for attribution data (may need backend inspection)
- [ ] **Analytics funnel** shows conversion

### Device & Browser Tracking
- [ ] **Test different browsers** (Chrome, Firefox, Safari, Edge)
- [ ] **Test mobile devices** (or browser dev tools mobile simulation)
- [ ] **Analytics dashboard** shows device/browser breakdown

---

## 🐳 Docker Testing (Optional)

### Docker Setup
- [ ] **Environment configured**: 
  - Copy .env.example to .env
  - Set production-like values
- [ ] **Docker Compose builds**: `docker-compose build`
  - No build errors
  - All services build successfully
- [ ] **Services start**: `docker-compose up -d`
  - All services show "healthy" status
  - No container crashes

### Docker Functionality
- [ ] **Web accessible**: http://localhost:3000
- [ ] **API accessible**: http://localhost:5000
- [ ] **MongoDB accessible** (to containers)
- [ ] **Seed database**: `docker-compose exec server bun run src/seed.ts`
- [ ] **Logs viewable**: `docker-compose logs -f`

### Docker Cleanup
- [ ] **Stop services**: `docker-compose down`
- [ ] **Remove volumes**: `docker-compose down -v` (if needed)

---

## 🚨 Error Scenarios Testing

### Network Issues
- [ ] **API server down**:
  - Stop server (Ctrl+C)
  - Try using website
  - Should show fallback content or graceful errors
- [ ] **MongoDB down**:
  - Stop MongoDB
  - API requests should return 500 errors
  - Should not crash the server

### Invalid Data
- [ ] **Malformed contact form**:
  - Submit contact form with invalid email
  - Submit with missing required fields
  - Submit with extremely long message
- [ ] **Invalid API requests**:
  - POST to contact with malformed JSON
  - GET invalid project slug
  - Access admin endpoints without auth

### Browser Issues
- [ ] **JavaScript disabled**:
  - Disable JS in browser
  - Basic page content should still load
- [ ] **Slow connection**:
  - Throttle connection in dev tools
  - Page should load progressively
  - No broken layouts during loading

---

## 📱 Cross-Browser & Device Testing

### Desktop Browsers
- [ ] **Chrome** (latest)
- [ ] **Firefox** (latest)  
- [ ] **Safari** (if on macOS)
- [ ] **Edge** (latest)

### Mobile Devices
- [ ] **iPhone Safari** (or Chrome dev tools iPhone simulation)
- [ ] **Android Chrome** (or Chrome dev tools Android simulation)
- [ ] **Tablet view** (iPad simulation)

### Test on Each Platform:
- [ ] **Homepage loads** correctly
- [ ] **Navigation menu** works (hamburger menu on mobile)
- [ ] **Contact form** usable
- [ ] **Admin login** works
- [ ] **Admin panels** responsive

---

## 🎯 Performance Testing

### Page Load Times
- [ ] **Homepage** loads under 3 seconds
- [ ] **Project detail pages** load under 2 seconds
- [ ] **Admin pages** load under 2 seconds
- [ ] **API responses** under 500ms

### Lighthouse Audit
Run in Chrome Dev Tools → Lighthouse:
- [ ] **Performance** score 80+
- [ ] **Accessibility** score 90+
- [ ] **Best Practices** score 90+
- [ ] **SEO** score 90+

### Network Efficiency
- [ ] **Images optimized** (WebP format preferred, reasonable sizes)
- [ ] **No unused CSS/JS** (check Coverage tab)
- [ ] **API requests minimal** (no unnecessary calls)

---

## 📋 Final Integration Test

### Complete User Journey
- [ ] **Visitor discovers site** (homepage)
- [ ] **Browses services** (services section)
- [ ] **Views portfolio** (work section + detail pages)
- [ ] **Submits contact form** (contact section)
- [ ] **Admin receives notification** (email if configured)
- [ ] **Admin reviews contact** (admin panel)
- [ ] **Admin updates contact status** (mark as replied)
- [ ] **Admin manages content** (add/edit projects, services)
- [ ] **Admin reviews analytics** (traffic, conversions)

### Data Consistency
- [ ] **Public site reflects admin changes**:
  - Add project in admin → appears on homepage
  - Mark service inactive → disappears from contact form
  - Edit project → changes show on detail page
- [ ] **Analytics data matches reality**:
  - Page views counted correctly
  - Contact submissions tracked
  - UTM attribution working

---

## ✅ Sign-off Checklist

**Before marking complete:**
- [ ] **All sections tested** (no skipped items)
- [ ] **Critical bugs fixed** (anything that breaks core functionality)
- [ ] **Performance acceptable** (pages load quickly)
- [ ] **Data integrity verified** (admin changes reflect on public site)
- [ ] **Security tested** (admin auth works, no exposed data)

**Production readiness:**
- [ ] **Environment variables** set for production
- [ ] **HTTPS** configured (for production)
- [ ] **Database backups** configured (for production)
- [ ] **Monitoring** set up (for production)

---

## 🎉 Test Summary

**Testing completed on:** ________________

**Tested by:** ________________

**Overall status:**
- [ ] ✅ All tests passed — ready for production
- [ ] ⚠️ Minor issues found — acceptable for launch
- [ ] ❌ Major issues found — needs fixes before launch

**Critical issues found:**
_________________________________
_________________________________
_________________________________

**Notes:**
_________________________________
_________________________________
_________________________________

---

**🎯 Congratulations! The VoiceAct agency website has been thoroughly tested.**