# 🧪 Server Test Suite

Comprehensive test suite for the VoiceAct server using Bun's built-in test runner.

## 📋 Test Structure

```
src/tests/
├── setup.ts                           # Test setup and utilities
├── utils/                             # Utility function tests
│   ├── AppError.test.ts
│   └── pagination.test.ts
├── modules/                           # Module/service tests
│   ├── auth/
│   │   └── auth.service.test.ts
│   ├── contact/
│   │   └── contact.service.test.ts
│   ├── project/
│   │   └── project.service.test.ts
│   └── service/
│       └── service.service.test.ts
├── integration/
│   └── api.test.ts                    # API integration tests
└── README.md                          # This file
```

## 🚀 Running Tests

### Prerequisites

1. **MongoDB running** (local or test database)
2. **Dependencies installed**: `bun install`
3. **Environment configured**: See [Environment Setup](#environment-setup)

### Test Commands

```bash
# Run all tests
bun test

# Run tests with watch mode (re-runs on file changes)
bun test:watch

# Run tests with coverage report
bun test:coverage

# Run specific test file
bun test src/tests/modules/contact/contact.service.test.ts

# Run tests matching pattern
bun test --grep "Contact Service"
```

## ⚙️ Environment Setup

### Test Database

Tests use a separate test database to avoid conflicts with development data.

**Option 1: Local MongoDB**
```bash
# Default test database (configured in bunfig.toml)
TEST_MONGODB_URI=mongodb://localhost:27017/voiceact-test
```

**Option 2: In-Memory Database**
For faster tests, you can use an in-memory MongoDB instance:
```bash
npm install -g mongodb-memory-server
```

**Option 3: Atlas Test Database**
```bash
# Create separate Atlas cluster for testing
TEST_MONGODB_URI=mongodb+srv://user:pass@test-cluster.mongodb.net/voiceact-test
```

### Environment Variables

Create a `.env.test` file (optional):
```bash
NODE_ENV=test
JWT_SECRET=test-secret-for-testing-only
TEST_MONGODB_URI=mongodb://localhost:27017/voiceact-test
```

## 📊 Test Coverage

### Current Test Coverage

- ✅ **Utils**
  - AppError class functionality
  - Pagination helper functions
  
- ✅ **Auth Service**
  - Login with valid/invalid credentials
  - JWT token generation and validation
  - Admin user retrieval
  
- ✅ **Contact Service** 
  - Contact creation and submission
  - Contact listing and filtering
  - Status updates
  - CSV export functionality
  
- ✅ **Project Service**
  - CRUD operations (create, read, update, delete)
  - Pagination and filtering
  - Featured project filtering
  - Slug-based retrieval
  
- ✅ **Service Service**
  - CRUD operations
  - Active/inactive filtering
  - Bulk reordering
  - Admin vs public service lists
  
- ✅ **API Integration**
  - All public and protected endpoints
  - Authentication flow
  - Error handling
  - Request/response validation

### Missing Coverage (TODO)

- [ ] Tracking service tests
- [ ] Admin service tests  
- [ ] Middleware tests (auth, error handling, rate limiting)
- [ ] Model validation tests
- [ ] Email service tests
- [ ] File upload tests (when implemented)

## 🔧 Test Utilities

### Test Setup (`setup.ts`)

Provides utilities for test database management and test data creation:

```typescript
import { testUtils } from "./setup.js";

// Create test admin user
const admin = await testUtils.createTestAdmin();

// Create JWT token for authentication
const token = testUtils.createTestToken(admin._id.toString());

// Create test data
const contact = await testUtils.createTestContact();
const service = await testUtils.createTestService();  
const project = await testUtils.createTestProject();
```

### Database Cleanup

Each test automatically:
1. **Connects** to test database before all tests
2. **Cleans** database before each test
3. **Drops** test database after all tests complete

This ensures test isolation and prevents data conflicts.

## 📝 Writing New Tests

### Basic Test Structure

```typescript
import { describe, test, expect, beforeEach } from "bun:test";
import "../../../tests/setup.js"; // Include setup
import { testUtils } from "../../setup.js";
import * as myService from "../../../modules/my-module/my.service.js";

describe("My Service", () => {
  describe("myFunction", () => {
    test("should do something", async () => {
      // Arrange
      const testData = await testUtils.createTestContact();
      
      // Act  
      const result = await myService.myFunction(testData.id);
      
      // Assert
      expect(result).toBeDefined();
      expect(result.someProperty).toBe("expected value");
    });

    test("should throw error for invalid input", async () => {
      // Assert that function throws
      expect(async () => {
        await myService.myFunction("invalid-input");
      }).toThrow("Expected error message");
    });
  });
});
```

### API Integration Test

```typescript
import request from "supertest";
import app from "../../app.js";

test("POST /api/my-endpoint should work", async () => {
  const response = await request(app)
    .post("/api/my-endpoint")
    .set("Authorization", `Bearer ${authToken}`)
    .send({ data: "test" });

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
});
```

### Test Best Practices

1. **Descriptive Names**: Test names should clearly describe what is being tested
2. **Arrange-Act-Assert**: Structure tests with clear setup, execution, and validation
3. **Test Isolation**: Each test should be independent and not rely on other tests
4. **Edge Cases**: Test both happy path and error scenarios
5. **Async/Await**: Always await async operations in tests

## 🐛 Troubleshooting

### Common Issues

**Tests timeout:**
```bash
# Increase timeout in bunfig.toml
[test]
timeout = 60000
```

**Database connection errors:**
```bash
# Ensure MongoDB is running
mongod --dbpath /path/to/test/db

# Check connection string
echo $TEST_MONGODB_URI
```

**Import errors:**
```bash
# Ensure proper file extensions in imports
import * as service from "../../../modules/contact/contact.service.js";
//                                                                   ^^^
```

**Tests interfering with each other:**
```bash
# Run tests in serial mode (configured in bunfig.toml)
[test]
serial = true
```

### Debugging Tests

```bash
# Run specific test with debug output
bun test src/tests/modules/contact/contact.service.test.ts --verbose

# Add console.log statements in tests
test("debug test", async () => {
  console.log("Debug info:", someVariable);
  expect(true).toBe(true);
});
```

## 📈 Continuous Integration

Tests are automatically run in CI/CD pipeline:

```yaml
# .github/workflows/ci.yml
- name: Run server tests
  run: |
    cd server
    bun install
    bun test
```

### CI Environment

CI runs use:
- **MongoDB**: In-memory or containerized instance
- **Node.js**: Latest LTS version with Bun runtime
- **Timeout**: Extended timeout for slower CI environments

## ✅ Test Checklist

Before pushing code:

- [ ] All existing tests pass
- [ ] New features have corresponding tests  
- [ ] Edge cases are covered
- [ ] Error scenarios are tested
- [ ] Integration tests updated if API changed
- [ ] No console errors or warnings
- [ ] Test names are descriptive
- [ ] Code coverage meets requirements

---

## 📚 References

- [Bun Test Runner Documentation](https://bun.sh/docs/cli/test)
- [Supertest Documentation](https://github.com/ladjs/supertest)
- [MongoDB Memory Server](https://github.com/nodkz/mongodb-memory-server)

---

**🎯 Keep tests fast, reliable, and comprehensive!**