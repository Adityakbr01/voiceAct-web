# Queue System

> This document defines the asynchronous job processing architecture for the Lead Generation module.

---

# Purpose

Web scraping, AI analysis, website crawling, CSV generation, and long-running operations must never execute inside Express request handlers.

All heavy tasks must be processed asynchronously using BullMQ.

The queue system is responsible for:

- Background processing
- Automatic retries
- Progress tracking
- Failure recovery
- Concurrency management
- Worker scaling
- Job scheduling
- Monitoring

---

# Technology

Queue

- BullMQ

Broker

- Redis

Worker Runtime

- Node.js

---

# Existing Infrastructure

Reuse the existing Redis connection if available.

Never create multiple Redis clients unless required.

The Lead Generation module should import the shared Redis configuration.

Example

```
server/src/config/redis.ts
```

or

```
server/src/config/index.ts
```

If Redis does not exist, create a shared Redis configuration under `server/src/config`.

Never initialize Redis inside services or controllers.

---

# Queue Architecture

```
Frontend

↓

POST /scrape

↓

Controller

↓

Lead Service

↓

BullMQ Queue

↓

Redis

↓

Worker

↓

Playwright
      ↓
Raw Business Data
      ↓
Normalizer
      ↓
Deduplicator
      ↓
Website Crawler
      ↓
Content Cleaner
      ↓
AI Analyzer
      ↓
Opportunity Scorer
      ↓
Lead Repository
      ↓
Activity Logger
      ↓
Notification Service

↓

Progress Update

↓

Notification

↓

Completed
```

Controllers should never execute scraping directly.

---

# Queue Types

Initially create the following queues.

Required

Lead Scraping Queue

Future

Website Audit Queue

AI Analysis Queue

CSV Export Queue

Email Campaign Queue

WhatsApp Campaign Queue

Proposal Generation Queue

Each queue should remain independent.

---

# Queue Name

```
lead-scraping
```

Keep queue names centralized inside constants.

Never hardcode queue names.

---

# Queue Responsibilities

The Lead Scraping Queue performs:

Search request

↓

Launch Playwright

↓

Collect businesses

↓

Visit websites

↓

Extract raw content

↓

AI analysis

↓

Deduplicate

↓

Store leads

↓

Create activities

↓

Update progress

↓

Complete

---

# Job Payload

Every job should include

organizationId

userId

searchKeyword

location

maximumResults

source

requestedAt

requestedBy

priority

metadata

Never store API keys inside jobs.

---

# Job Lifecycle

Queued

↓

Waiting

↓

Active

↓

Processing

↓

Completed

OR

Failed

OR

Cancelled

Every transition should update MongoDB.

---

# Job Progress

Progress should be continuously updated.

Examples

5%

Queue accepted

10%

Launching browser

20%

Searching businesses

40%

Collecting websites

60%

Extracting content

75%

AI analysis

90%

Saving leads

100%

Completed

The frontend should poll or subscribe to progress updates.

---

# Concurrency

Worker concurrency must be configurable.

Example

```
SCRAPER_CONCURRENCY=2
```

Never hardcode concurrency.

Different servers may require different values.

---

# Retry Strategy

Retry automatically for temporary failures.

Examples

Network timeout

Browser crash

Redis timeout

Rate limiting

Temporary AI failure

Recommended

Attempts

3

Backoff

Exponential

Example

5 seconds

15 seconds

45 seconds

Never infinitely retry.

---

# Permanent Failures

Do not retry

Invalid request

Invalid API key

Permission denied

Malformed configuration

Missing organization

Validation failure

These should fail immediately.

---

# Browser Pool

Workers should reuse browser instances where possible.

Avoid launching a new browser for every lead.

Preferred strategy

Worker starts

↓

Launch browser

↓

Create contexts

↓

Process jobs

↓

Close browser on shutdown

This significantly reduces resource usage.

---

# Worker Scaling

Multiple workers should be supported.

Example

Worker 1

↓

Queue

↓

Worker 2

↓

Queue

↓

Worker 3

BullMQ should distribute jobs automatically.

Workers must remain stateless.

---

# Idempotency

A job should not create duplicate leads.

Before saving

Check

Google Place ID

↓

Domain

↓

Phone

↓

Email

If duplicate exists

Update

Do not insert again.

---

# Cancellation

Users should be able to cancel jobs.

Cancellation should

Mark job cancelled

Stop Playwright safely

Close page

Update MongoDB

Create activity

Notify frontend

Never leave zombie browsers running.

---

# Graceful Shutdown

When worker receives SIGINT or SIGTERM

Stop accepting jobs

Finish current job

Close browser

Close Redis connection

Exit safely

Never terminate in the middle of database writes.

---

# Rate Limiting

Workers should respect target websites.

Support

Random delay

Configurable delay

Proxy rotation (future)

User Agent rotation

Avoid unnecessary requests.

---

# Timeout Strategy

Timeouts should exist for

Queue Job

Playwright

AI

Website Loading

CSV Generation

Database

Never wait forever.

---

# Failure Recovery

If Playwright fails

Retry

If AI fails

Retry

If Redis disconnects

Reconnect

If Mongo disconnects

Retry

If browser crashes

Restart browser

If retries exhausted

Mark failed

Notify user

Continue processing remaining jobs where appropriate.

---

# Dead Letter Queue

Future Support

Failed jobs after all retries should move to

```
lead-scraping-dead
```

This allows administrators to inspect failures.

Do not silently discard failed jobs.

---

# Monitoring

Expose queue metrics.

Examples

Waiting Jobs

Active Jobs

Completed Jobs

Failed Jobs

Cancelled Jobs

Average Duration

Average Retry Count

Average Success Rate

These metrics should be available for dashboard analytics.

---

# Job History

Store

Started At

Finished At

Duration

Retry Count

Failure Reason

Processed Leads

Successful Leads

Failed Leads

Skipped Leads

This data should remain queryable.

---

# Notifications

Notify users when

Job Started

Job Progress

Job Completed

Job Failed

Job Cancelled

Use the existing notification infrastructure.

---

# Logging

Log

Queue Created

Worker Started

Worker Stopped

Retry

Cancellation

Browser Restart

Redis Disconnect

Mongo Disconnect

Job Failed

Job Completed

Never log API secrets.

---

# Security

Validate every job payload before adding it to the queue.

Never trust frontend data.

Always derive

organizationId

userId

from authenticated context.

---

# Performance Goals

Queue creation

Less than 100ms

Worker startup

Less than 5 seconds

Redis latency

As low as practical

Memory usage

Configurable based on server capacity

The queue should remain responsive under heavy load.

---

# Future Expansion

The queue architecture should support future modules.

Examples

Website Audit

Email Campaigns

WhatsApp Campaigns

Proposal Generation

AI Chat

Lead Enrichment

CRM Automation

Each should be implemented as a separate queue.

---

# AI Implementation Instructions

When implementing the queue system:

1. Reuse the existing Redis configuration.
2. Keep BullMQ isolated inside the Lead Generation module.
3. Controllers must only enqueue jobs.
4. Workers execute all long-running tasks.
5. Update progress throughout execution.
6. Implement retries with exponential backoff.
7. Support cancellation.
8. Support graceful shutdown.
9. Prevent duplicate lead creation.
10. Ensure the architecture supports horizontal scaling with multiple workers.