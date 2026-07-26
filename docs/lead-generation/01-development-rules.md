# Development Rules

> This document defines the mandatory implementation rules for the Lead Generation module.

---

# Purpose

The purpose of this document is to ensure every piece of generated code follows the architecture, coding standards, security requirements, and engineering principles already used in the existing Agency Management Platform.

These rules are **mandatory**. If any instruction conflicts with another document, this document takes precedence unless explicitly stated otherwise.

---

# 1. General Principle

This is **NOT** a new application.

This is **NOT** a boilerplate project.

This is **NOT** a proof of concept.

This is an enterprise feature that extends an already existing production SaaS platform.

Never replace existing functionality.

Always integrate with the current architecture.

---

# 2. Existing Codebase First

Before creating anything new:

- Search for an existing implementation.
- Reuse existing services.
- Reuse shared utilities.
- Reuse existing middleware.
- Reuse existing hooks.
- Reuse shared UI components.
- Reuse helper functions.
- Reuse API clients.
- Reuse logger.
- Reuse validators.
- Reuse error handlers.

Never duplicate functionality.

---

# 3. Never Recreate

The following components already exist and must never be recreated:

- Express application
- MongoDB connection
- Redis connection
- Authentication
- Authorization
- Organization model
- User model
- Role system
- Layout
- Sidebar
- Navbar
- Toast provider
- API response wrapper
- Logger
- Error handler
- File upload service
- Email service
- Socket service
- Environment loader
- Docker configuration (unless modification is required)

Only extend them.

---

# 4. Folder Rules

Never create random folders.

Every new file must belong to the existing module architecture.

Keep feature-related code grouped together.

Business logic must never be scattered across unrelated folders.

---

# 5. Controller Rules

Controllers should:

- Validate request
- Call service
- Return response

Controllers must never:

- Access MongoDB directly
- Write business logic
- Parse HTML
- Execute Playwright
- Call AI providers
- Implement retry logic

Controllers should remain as small as possible.

---

# 6. Service Rules

Business logic belongs inside services.

Services are responsible for:

- Validation
- Database operations
- AI communication
- Queue interaction
- Scraping
- Lead processing
- Business calculations

Services must remain reusable.

---

# 7. Repository Rule (Recommended)

If repositories already exist, use them.

Repository responsibilities:

- Mongo queries
- Aggregations
- Pagination
- Bulk updates
- Transactions

Services should avoid writing complex queries directly.

---

# 8. Utility Rule

Utilities must only contain generic reusable logic.

Examples:

- URL normalization
- Email validation
- Phone formatting
- Domain extraction
- CSV helpers
- Date formatting

Utilities must never depend on business logic.

---

# 9. Dependency Injection

Whenever practical:

Pass dependencies into services.

Avoid importing global singletons directly unless already used by the project.

This improves testing and maintainability.

---

# 10. Configuration

Never hardcode:

- API Keys
- Tokens
- URLs
- Secrets
- Redis addresses
- Mongo URI
- Timeouts
- Limits

Everything configurable belongs inside environment variables.

Always provide sensible defaults where appropriate.

---

# 11. Environment Variables

Every required variable must be documented.

Examples:

PLAYWRIGHT_HEADLESS

REDIS_URL

GEMINI_API_KEY

MISTRAL_API_KEY

SCRAPER_CONCURRENCY

SCRAPER_TIMEOUT

QUEUE_ATTEMPTS

QUEUE_BACKOFF

MAX_LEADS_PER_JOB

AI_PROVIDER

PROXY_ENABLED

PROXY_URL

These should be validated during application startup.

---

# 12. Logging

Never use:

console.log()

console.error()

console.warn()

Use the existing logger.

Every important action should be logged.

Examples:

Job started

Job completed

Retry

AI failure

Browser crash

Redis disconnect

Export completed

Authentication failure

Permission denied

---

# 13. Error Handling

Never expose internal errors.

Use centralized error handling.

Every error should include:

- Message
- Error code
- Context
- Stack (development only)

Never return raw exceptions.

---

# 14. Async Programming

Use async/await.

Avoid nested promise chains.

Handle every rejection.

Never leave unhandled promises.

---

# 15. Database Rules

Never:

Duplicate documents

Store temporary scraping HTML

Store browser state

Store API keys

Store Playwright sessions

Always normalize data before saving.

---

# 16. Data Validation

Validate:

- Request body
- Params
- Query
- AI response
- CSV imports
- Scraped URLs

Never trust external data.

---

# 17. AI Validation

Every AI response must be validated before use.

If schema validation fails:

Retry once.

If retry fails:

Fallback to manual extraction.

Never store malformed AI output.

---

# 18. Queue Rules

Long-running work must always execute through BullMQ.

Never block Express requests.

Controllers should only enqueue jobs.

Workers perform processing.

---

# 19. Scraping Rules

Respect robots.txt where appropriate and applicable.

Only collect publicly available business information.

Do not attempt to bypass authentication.

Do not scrape private dashboards.

Do not store personal information beyond what is publicly available and necessary for legitimate business contact.

Implement reasonable delays, retry limits, and rate limiting to reduce load on target sites.

Support graceful handling of temporary blocks or failures.

---

# 20. Performance

Avoid unnecessary database queries.

Avoid duplicate AI requests.

Avoid duplicate scraping.

Batch operations where possible.

Use indexes.

Stream exports.

Use pagination.

---

# 21. Security

Always sanitize:

Input

Output

HTML

URLs

Never trust client input.

Escape dangerous content before rendering.

Prevent injection attacks.

Validate file uploads.

---

# 22. Authorization

Every endpoint must verify:

Authenticated user

Organization membership

Required permission

Never trust client-provided organization IDs.

Always derive organization context from authenticated user/session where applicable.

---

# 23. Multi-Tenancy

Every record belongs to an Organization.

Every query must automatically scope data to the current organization.

No cross-tenant access is allowed.

This rule applies everywhere.

---

# 24. Frontend Rules

Reuse:

Buttons

Cards

Dialogs

Inputs

Tables

Badges

Pagination

Forms

Toasts

Icons

Never build duplicate UI components.

Follow the existing design system.

---

# 25. Accessibility

All UI must:

Support keyboard navigation

Have accessible labels

Use semantic HTML

Maintain sufficient color contrast

Support screen readers where practical

---

# 26. Testing

Every important service should be testable.

Avoid hidden dependencies.

Keep functions small.

Prefer deterministic logic.

---

# 27. Documentation

Every exported function should have concise documentation.

Complex business logic should include explanatory comments where they add value.

Avoid obvious comments.

---

# 28. Production Readiness

Every feature must support:

Graceful shutdown

Retry

Timeout

Cancellation

Rate limiting

Partial failures

Network failures

Redis failures

Mongo failures

AI failures

Browser crashes

Queue recovery

Idempotent operations where applicable

---

# 29. Definition of Done

A feature is complete only if:

- Integrated into the existing platform
- Production-ready
- Tested
- Secure
- Scalable
- Multi-tenant
- Documented
- Uses existing infrastructure
- Does not break existing functionality

---

# 30. AI Implementation Instructions

When implementing this module:

1. Read all documentation files in order.
2. Never skip a document.
3. Follow existing project conventions.
4. Extend existing code instead of replacing it.
5. Explain any required modifications to existing files.
6. Generate modular, maintainable code.
7. Stop after completing each task in `19-task-list.md` and wait for confirmation before moving to the next task.