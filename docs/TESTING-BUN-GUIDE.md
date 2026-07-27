# 🧪 Bun Test Guide — Server Testing

Complete guide for running server tests using Bun's built-in test runner.

---

## 🚀 Quick Start

### Prerequisites
- **Bun installed** (`bun --version`)
- **MongoDB running** (local or Atlas)
- **Dependencies installed** (`bun install` in server directory)

### Run All Tests
```bash
cd server
bun test
```

---

## 📋 Test Commands

### Basic Testing
```bash
# Run all tests
bun test

# Run tests with verbose output
bun test --verbose

# Run specific test file
bun test src/tests/modules/contact/contact.service.test.ts

# Run tests matching pattern
bun test --grep "Contact Service"
```

### Development Testing
```bash
# Watch mode - re-runs tests on file changes
bun test:watch

# Coverage report
bun test:coverage

# Custom test runner script
bun run src/tests/run-tests.ts
```

### Advanced Options
```bash
# Set custom timeout (30 seconds)
bun test --timeout 30000

# Run tests in serial (one at a time)
bun test --serial

# Run specific test suite
bun test src/tests/modules/
bun test src/tests/utils/
bun test src/tests/integration/
```

---

## 🗂️ Test Structure

```
server/src/tests/
├── setup.ts                           # Test configuration & utilities
├── run-tests.ts                       # Custom test runner
├── utils/                             # Utility tests
│   ├── AppError.test.ts               # Error class tests
│   ├── pagination.test.ts             # Pagination helper tests
│   └── response.test.ts               # Response helper tests
├── middleware/                        # Middleware tests
│   ├── auth.test.ts                   # Authentication tests
│   └── validation.test.ts             # Validation middleware tests
├── modules/                           # Business logic tests
│   ├── auth/
│   │   └── auth.service.test.ts       # Authentication service tests
│   ├── contact/
│   │   └── contact.service.test.ts    # Contact management tests
│   ├── project/
│   │   └── project.service.test.ts    # Project management tests
│   ├── service/
│   │   └── service.service.test.ts    # Service management tests
│   ├── admin/
│   │   └── admin.service.test.ts      # Admin dashboard tests
│   └── tracking/
│       └── tracking.service.test.ts   # Analytics & tracking tests
└── integration/
    └── api.test.ts                    # Full API integration tests
```

---

## 🔧 Configuration

### bunfig.toml
```toml
[test]
# Test timeout in milliseconds
timeout = 30000

# Run tests in serial to avoid database conflicts
serial = true

# Test environment variables
[test.env]
NODE_ENV = "test"
JWT_SECRET = "test-secret-for-testing-only"
TEST_MONGODB_URI = "mongodb://localhost:27017/voiceact-test"
```

### package.json Scripts
```json
{
  "scripts": {
    "test": "bun test src/tests --timeout 30000",
    "test:watch": "bun test src/tests --watch",
    "test:coverage": "bun test src/tests --coverage"
  }
}
```

---

## 🗄️ Database Setup

### Option 1: Local MongoDB (Recommended)
```bash
# Start MongoDB
mongod --dbpath /path/to/test/db

# Tests automatically use: mongodb://localhost:27017/voiceact-test
```

### Option 2: MongoDB Atlas
```bash
# Set environment variable
export TEST_MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/voiceact-test"

# Or add to .env.test file
TEST_MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/voiceact-test
```

### Option 3: In-Memory Database
```bash
# Install mongodb-memory-server
bun add -d mongodb-memory-server

# Tests will use in-memory database (faster but requires setup changes)
```

---

## ✅ Test Categories

### 1. Unit Tests (Services & Utils)

**Contact Service Tests:**
```bash
bun test src/tests/modules/contact/contact.service.test.ts
```
Tests: create, list, filter, status updates, CSV export

**Project Service Tests:**
```bash
bun test src/tests/modules/project/project.service.test.ts
```
Tests: CRUD operations, pagination, featured filtering

**Service Management Tests:**
```bash
bun test src/tests/modules/service/service.service.test.ts
```
Tests: CRUD, active/inactive, reordering

**Auth Service Tests:**
```bash
bun test src/tests/modules/auth/auth.service.test.ts
```
Tests: login, JWT generation, user retrieval

**Utility Tests:**
```bash
bun test src/tests/utils/
```
Tests: AppError, pagination, response helpers

### 2. Middleware Tests

**Authentication Middleware:**
```bash
bun test src/tests/middleware/auth.test.ts
```
Tests: JWT validation, role-based access, cookie auth

**Validation Middleware:**
```bash
bun test src/tests/middleware/validation.test.ts
```
Tests: Zod schema validation, error formatting

### 3. Integration Tests

**API Integration Tests:**
```bash
bun test src/tests/integration/api.test.ts
```
Tests: All endpoints, auth flow, error handling

---

## 📊 Test Output Examples

### Successful Test Run
```bash
$ bun test

✓ AppError should create instance with message and status code
✓ Contact Service > submitContact > should create a new contact
✓ Auth Service > login > should login with valid credentials
✓ API Integration > GET /api/health > should return 200

Ran 47 tests across 8 files. [2.34s]
```

### Failed Test Example
```bash
$ bun test

✗ Contact Service > getContactById > should get contact by ID
  AssertionError: expected undefined to be "Test Contact"
    at /server/src/tests/modules/contact/contact.service.test.ts:89:23

✓ 46 passing
✗ 1 failing

Ran 47 tests across 8 files. [2.67s]
```

### Coverage Report
```bash
$ bun test:coverage

File                          | % Stmts | % Branch | % Funcs | % Lines
------------------------------|---------|----------|---------|--------
src/modules/contact/          |   95.2% |    87.5% |   100%  |   94.8%
src/modules/auth/             |   92.3% |    83.3% |   100%  |   91.7%
src/modules/project/          |   88.9% |    75.0% |   100%  |   87.5%
src/utils/                    |   100%  |    100%  |   100%  |   100%
------------------------------|---------|----------|---------|--------
All files                     |   94.1% |    86.5% |   100%  |   93.5%
```

---

## 🐛 Debugging Tests

### Debug Individual Test
```bash
# Run single test with verbose output
bun test src/tests/modules/contact/contact.service.test.ts --verbose

# Add debug logs in tests
test("debug test", async () => {
  console.log("Debug info:", someVariable);
  expect(true).toBe(true);
});
```

### Common Issues & Solutions

**Test timeout:**
```bash
# Increase timeout
bun test --timeout 60000

# Or in bunfig.toml:
[test]
timeout = 60000
```

**Database connection errors:**
```bash
# Check MongoDB is running
mongosh

# Verify connection string
echo $TEST_MONGODB_URI

# Check test database
mongosh mongodb://localhost:27017/voiceact-test
```

**Import/module errors:**
```bash
# Ensure .js extensions in imports
import * as service from "../../../modules/contact/contact.service.js";
//                                                                 ^^^

# Check TypeScript compilation
bun tsc --noEmit
```

**Tests interfering with each other:**
```bash
# Tests run in serial mode by default (bunfig.toml)
# Each test cleans database beforeEach
# Check setup.ts for cleanup logic
```

---

## 🔄 CI/CD Integration

### GitHub Actions
```yaml
# .github/workflows/ci.yml
- name: Run server tests
  run: |
    cd server
    bun install
    bun test --timeout 60000
```

### Docker Testing
```dockerfile
# Multi-stage Dockerfile
FROM oven/bun:1 as test
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install
COPY src ./src
RUN bun test
```

---

## 📋 Test Checklist

Before committing code:

- [ ] **All tests pass**: `bun test`
- [ ] **New features tested**: Add tests for new functionality
- [ ] **Edge cases covered**: Test error scenarios
- [ ] **No console errors**: Clean test output
- [ ] **Performance check**: Tests complete under 30s
- [ ] **Database cleanup**: Tests don't leave data behind

---

## 🎯 Test Data Management

### Automatic Cleanup
```typescript
// In setup.ts
beforeEach(async () => {
  // Clean database before each test
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});
```

### Test Utilities
```typescript
import { testUtils } from "../setup.js";

// Create test data
const admin = await testUtils.createTestAdmin();
const contact = await testUtils.createTestContact({ name: "Test" });
const project = await testUtils.createTestProject({ featured: true });
const service = await testUtils.createTestService({ active: true });

// Generate JWT token
const token = testUtils.createTestToken(admin._id.toString());
```

---

## 📚 Resources

- **Bun Test Documentation**: https://bun.sh/docs/cli/test
- **Expect API**: https://bun.sh/docs/test/expect
- **Supertest**: https://github.com/ladjs/supertest (for API testing)
- **MongoDB Testing**: https://www.mongodb.com/docs/manual/tutorial/test/

---

## 🎉 Example Test Session

```bash
# Terminal session showing complete test workflow
$ cd server

$ bun install
bun install v1.0.0
 + 25 packages installed [1.2s]

$ bun test
✓ AppError tests (4 tests) [12ms]
✓ Pagination tests (8 tests) [8ms]
✓ Response utils tests (9 tests) [5ms]
✓ Auth service tests (8 tests) [245ms]
✓ Contact service tests (12 tests) [312ms]
✓ Project service tests (10 tests) [189ms]
✓ Service service tests (11 tests) [198ms]
✓ Admin service tests (6 tests) [156ms]
✓ Tracking service tests (7 tests) [203ms]
✓ Auth middleware tests (8 tests) [134ms]
✓ Validation middleware tests (12 tests) [98ms]
✓ API integration tests (24 tests) [567ms]

Ran 119 tests across 12 files. [2.34s]
All tests passed! 🎉
```

---

**🧪 Happy testing with Bun! Your server is now thoroughly tested and reliable.**