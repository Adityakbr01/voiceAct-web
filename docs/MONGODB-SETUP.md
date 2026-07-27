# 🗄️ MongoDB Setup Guide

Quick setup instructions for MongoDB on different platforms for the VoiceAct agency website.

---

## 🚀 Quick Setup Options

### Option 1: MongoDB Atlas (Cloud - Recommended for Production)

1. **Create Account**
   - Go to https://www.mongodb.com/atlas
   - Sign up for free account
   - Create new project: "voiceact-agency"

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "M0 Sandbox" (Free tier)
   - Select region closest to you
   - Cluster name: "voiceact-cluster"

3. **Setup Access**
   ```bash
   # Database Access → Add New User
   Username: voiceact-admin
   Password: [Generate secure password]
   Role: Atlas Admin
   
   # Network Access → Add IP Address
   Add: 0.0.0.0/0 (Allow from anywhere - for development only)
   ```

4. **Get Connection String**
   ```bash
   # Click "Connect" → "Connect your application"
   # Copy connection string, it looks like:
   mongodb+srv://voiceact-admin:<password>@voiceact-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   
   # Replace <password> with your actual password
   # Update server/.env:
   MONGODB_URI=mongodb+srv://voiceact-admin:YOUR_PASSWORD@voiceact-cluster.xxxxx.mongodb.net/voiceact?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB (Development)

#### Windows

**Method A: MongoDB Community Server**
```powershell
# Download MongoDB Community Server from:
# https://www.mongodb.com/try/download/community

# Install to default location: C:\Program Files\MongoDB\Server\7.0\

# Create data directory
New-Item -ItemType Directory -Force -Path C:\data\db

# Start MongoDB
& "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath C:\data\db

# Test connection (new PowerShell window)
& "C:\Program Files\MongoDB\Server\7.0\bin\mongosh.exe"
```

**Method B: Chocolatey**
```powershell
# Install Chocolatey first: https://chocolatey.org/install
choco install mongodb

# Create data directory
New-Item -ItemType Directory -Force -Path C:\data\db

# Start MongoDB
mongod --dbpath C:\data\db
```

#### macOS

**Method A: Homebrew (Recommended)**
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Test connection
mongosh
```

**Method B: Manual Install**
```bash
# Download from MongoDB website
# Extract to /usr/local/mongodb

# Create data directory
sudo mkdir -p /data/db
sudo chown $(whoami) /data/db

# Add to PATH in ~/.zshrc or ~/.bash_profile
export PATH="/usr/local/mongodb/bin:$PATH"

# Start MongoDB
mongod --dbpath /data/db
```

#### Linux (Ubuntu/Debian)

```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod

# Test connection
mongosh
```

---

## 🔧 Configuration

### Update Environment Variables

**For Local MongoDB:**
```bash
# server/.env
MONGODB_URI=mongodb://localhost:27017/voiceact
```

**For MongoDB Atlas:**
```bash
# server/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/voiceact?retryWrites=true&w=majority
```

### Verify Connection

```bash
cd server
node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/voiceact')
  .then(() => { console.log('✅ MongoDB connected!'); process.exit(0); })
  .catch(err => { console.error('❌ MongoDB connection failed:', err.message); process.exit(1); });
"
```

---

## 📊 Database Commands

### Connect to Database
```bash
# Local MongoDB
mongosh voiceact

# MongoDB Atlas
mongosh "mongodb+srv://cluster.mongodb.net/voiceact" --username your-username
```

### Useful Commands
```javascript
// Show databases
show dbs

// Use voiceact database
use voiceact

// Show collections
show collections

// View admin users
db.admins.find().pretty()

// View contacts
db.contacts.find().pretty()

// View projects
db.projects.find().pretty()

// View services
db.services.find().pretty()

// Count documents
db.contacts.countDocuments()
db.projects.countDocuments()
db.services.countDocuments()

// Drop collections (be careful!)
db.contacts.drop()
db.projects.drop()
db.services.drop()

// Drop entire database (be very careful!)
db.dropDatabase()
```

### Sample Queries
```javascript
// Find contacts by status
db.contacts.find({"status": "new"})

// Find featured projects
db.projects.find({"featured": true})

// Find active services
db.services.find({"active": true})

// Find contacts from last 7 days
db.contacts.find({
  "createdAt": {
    $gte: new Date(Date.now() - 7*24*60*60*1000)
  }
})

// Update contact status
db.contacts.updateOne(
  {"email": "sarah.johnson@techstartup.com"}, 
  {"$set": {"status": "replied"}}
)
```

---

## 🚨 Troubleshooting

### Connection Issues

**Error: "MongoNetworkError: connect ECONNREFUSED"**
```bash
# MongoDB not running - start it:

# Windows
& "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath C:\data\db

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Error: "Authentication failed"**
```bash
# For Atlas: Check username/password in connection string
# For local: MongoDB runs without auth by default

# Enable auth on local MongoDB (optional):
mongosh admin
db.createUser({
  user: "admin",
  pwd: "password",
  roles: ["root"]
})

# Then connect with auth:
mongosh -u admin -p password --authenticationDatabase admin
```

**Error: "Server selection timeout"**
```bash
# For Atlas: Check network access (whitelist your IP)
# For local: Check if MongoDB is actually running

# Test with ping
ping your-atlas-cluster-url.mongodb.net

# Check MongoDB logs
tail -f /usr/local/var/log/mongodb/mongo.log  # macOS
tail -f /var/log/mongodb/mongod.log          # Linux
```

### Performance Issues

**Database is slow:**
```javascript
// Check database stats
db.stats()

// Check collection sizes
db.contacts.stats()
db.projects.stats()

// Add indexes (already done in models, but you can check):
db.contacts.getIndexes()
db.projects.getIndexes()

// Create additional indexes if needed
db.contacts.createIndex({"email": 1})
db.projects.createIndex({"slug": 1, "featured": 1})
```

---

## 🛡️ Security Best Practices

### For Production (Atlas)

1. **Restrict Network Access**
   ```bash
   # Instead of 0.0.0.0/0, add specific IPs:
   # Your server IP
   # Your office IP
   # CI/CD service IPs
   ```

2. **Use Strong Passwords**
   ```bash
   # Generate strong password:
   openssl rand -base64 32
   ```

3. **Enable Database Auditing**
   ```bash
   # In Atlas: Security → Database Auditing → Enable
   ```

### For Local Development

1. **Enable Authentication** (optional)
   ```javascript
   // Connect to MongoDB
   mongosh admin
   
   // Create admin user
   db.createUser({
     user: "admin",
     pwd: "secure_password_here",
     roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
   })
   
   // Update server/.env
   MONGODB_URI=mongodb://admin:secure_password_here@localhost:27017/voiceact?authSource=admin
   ```

2. **Bind to Localhost Only**
   ```bash
   # Start with bind IP
   mongod --bind_ip 127.0.0.1 --dbpath C:\data\db
   ```

---

## 📁 Backup & Restore

### Create Backup
```bash
# Local backup
mongodump --db voiceact --out ./backup

# Atlas backup (using mongodump)
mongodump --uri "mongodb+srv://username:password@cluster.mongodb.net/voiceact" --out ./backup
```

### Restore from Backup
```bash
# Local restore
mongorestore --db voiceact ./backup/voiceact

# Atlas restore
mongorestore --uri "mongodb+srv://username:password@cluster.mongodb.net/voiceact" ./backup/voiceact
```

### Automated Backup Script
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --db voiceact --out "./backups/voiceact_$DATE"
echo "Backup completed: voiceact_$DATE"

# Make executable and run
chmod +x backup.sh
./backup.sh
```

---

## 🎯 Quick Start Summary

**For Development (Local):**
```bash
# 1. Install MongoDB (see platform instructions above)
# 2. Start MongoDB
mongod --dbpath C:\data\db  # Windows
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux

# 3. Update server/.env
MONGODB_URI=mongodb://localhost:27017/voiceact

# 4. Test connection
cd server && bun run seed
```

**For Production (Atlas):**
```bash
# 1. Create Atlas cluster (see instructions above)
# 2. Update server/.env with Atlas connection string
# 3. Test connection
cd server && bun run seed
```

---

**✅ MongoDB is now ready for the VoiceAct agency website!**