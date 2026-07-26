# Lead Processing Pipeline

> This document defines the complete end-to-end processing pipeline for the Lead Generation module.

---

# Purpose

The Lead Processing Pipeline orchestrates every step required to transform a user search request into qualified business leads.

The pipeline is responsible for:

- Business discovery
- Data normalization
- Duplicate detection
- Website enrichment
- AI analysis
- Opportunity scoring
- Database persistence
- Activity logging
- Notification generation
- Analytics updates

The pipeline should be fault tolerant, scalable, and idempotent.

---

# High-Level Architecture

```
User

↓

Create Search Request

↓

Queue Job

↓

Business Discovery

↓

Normalize Data

↓

Duplicate Detection

↓

Website Crawl

↓

Contact Extraction

↓

Technology Detection

↓

Website Quality Analysis

↓

AI Analysis

↓

Opportunity Scoring

↓

Lead Persistence

↓

Activity Creation

↓

Notification

↓

Dashboard Update

↓

Completed
```

---

# Processing Principles

Every lead should follow the same lifecycle.

The processing pipeline must:

- Never block HTTP requests.
- Continue processing after recoverable failures.
- Produce deterministic results where possible.
- Avoid duplicate records.
- Support retries.
- Record every important event.

---

# Processing Stages

The pipeline is divided into independent stages.

1. Search Request
2. Business Discovery
3. Normalization
4. Validation
5. Deduplication
6. Website Crawl
7. Contact Extraction
8. Technology Detection
9. Website Quality Analysis
10. AI Analysis
11. Opportunity Scoring
12. Database Persistence
13. Activity Logging
14. Notification
15. Analytics Update

Each stage should have a single responsibility.

---

# Stage 1 — Search Request

Input

- Search Keyword
- Location
- Business Category
- Maximum Results
- Organization
- Requested By

Validation

- Required fields
- Permission checks
- Organization scope
- Search limits

Output

Queue Job

---

# Stage 2 — Business Discovery

The provider searches supported business directories.

Examples

- Google Maps
- JustDial
- IndiaMART
- Sulekha
- Future Providers

Output

Raw business records.

---

# Stage 3 — Data Normalization

Normalize all collected information.

Examples

Business Name

```
ABC Technologies Pvt Ltd.
```

↓

```
ABC Technologies
```

Phone

```
+91 98765-43210
```

↓

```
9876543210
```

Website

```
https://example.com/
```

↓

```
example.com
```

Email

Always lowercase.

Addresses should follow a consistent structure.

---

# Stage 4 — Validation

Before continuing

Validate

- Business Name
- Website
- Email format
- Phone format
- Coordinates
- URLs

Reject malformed records.

Do not stop processing other businesses.

---

# Stage 5 — Duplicate Detection

Priority

1. External Provider ID
2. Domain
3. Phone
4. Email
5. Business Name + City

Duplicate Found

↓

Merge

↓

Update

↓

Create Activity

↓

Continue

Never create duplicate leads.

---

# Stage 6 — Website Crawl

If a website exists

↓

Visit

↓

Collect content

↓

Extract metadata

↓

Extract contacts

↓

Analyze technologies

If website unavailable

↓

Continue processing

Website availability should never determine whether a lead is created.

---

# Stage 7 — Contact Extraction

Extract

- Email addresses
- Phone numbers
- WhatsApp numbers
- Contact forms
- Social links
- Business address

Use deterministic extraction.

Do not rely solely on AI.

---

# Stage 8 — Technology Detection

Identify

Frontend

- React
- Vue
- Angular
- Next.js

Backend

- Laravel
- ASP.NET
- PHP
- Node.js

CMS

- WordPress
- Shopify
- Wix
- Drupal
- Magento

Infrastructure

- Cloudflare
- Google Analytics
- Meta Pixel

Store detected technologies.

---

# Stage 9 — Website Quality Analysis

Evaluate

- HTTPS
- Mobile friendliness
- Contact form
- Live chat
- Blog
- Call-to-action
- Branding
- Navigation
- Trust signals

Generate structured quality metrics.

---

# Stage 10 — AI Analysis

The AI receives

- Clean website content
- Technology report
- Business metadata
- Website quality report
- Contact information

AI generates

- Business summary
- Industry
- Pain points
- Opportunity score
- Recommended services
- Confidence score

Never send raw HTML.

---

# Stage 11 — Opportunity Scoring

Final score

0–100

Factors

- Website quality
- Technology stack
- Digital maturity
- Business size
- AI confidence
- Service opportunities

Score Categories

90–100

Hot Lead

75–89

High Priority

60–74

Qualified

40–59

Medium

Below 40

Low Priority

Store both score and reasoning.

---

# Stage 12 — Database Persistence

Persist

Lead

Website

Technology

Contacts

AI Analysis

Score

Activities

Metadata

Everything should be stored inside a transaction whenever supported.

---

# Stage 13 — Activity Logging

Automatically create activities.

Examples

Lead Created

Website Crawled

Technology Detected

AI Analysis Completed

Opportunity Updated

Duplicate Merged

Manual Review Requested

Every important action should appear in the timeline.

---

# Stage 14 — Notifications

Notify

Job Completed

High Opportunity Lead

Processing Failed

Manual Review Required

Notification delivery should be asynchronous.

---

# Stage 15 — Analytics Update

Update

Total Leads

Qualified Leads

Opportunity Distribution

Industry Breakdown

Technology Breakdown

Pipeline Counts

Dashboard metrics should remain eventually consistent.

---

# Manual Review

Some leads require manual verification.

Examples

Low AI confidence

Incomplete contact information

Duplicate conflicts

AI validation failure

Unknown industry

Flag these leads for review.

---

# Partial Processing

A lead should still be saved if

AI fails

Website unavailable

Technology detection fails

Missing social profiles

Missing phone number

Partial information is better than losing the lead.

---

# Retry Strategy

Retry

Temporary network failures

AI timeout

Provider timeout

Browser crash

Do not retry

Validation failures

Permission failures

Malformed requests

---

# Idempotency

Processing the same lead multiple times should never create duplicates.

Every stage should be safe to execute again.

---

# Performance Goals

Queue Creation

< 100ms

Lead Discovery

Configurable

AI Analysis

Configurable

Database Save

As fast as practical

The pipeline should support thousands of leads without architectural changes.

---

# Monitoring

Track

Processing Time

Failure Rate

Retry Count

AI Success Rate

Duplicate Rate

Website Crawl Success

Technology Detection Success

Average Opportunity Score

These metrics should feed operational dashboards.

---

# Error Recovery

Recoverable failures

- AI timeout
- Website timeout
- Temporary provider errors
- Browser restart

Non-recoverable failures

- Invalid input
- Missing organization
- Permission denied

Log every failure with sufficient context.

---

# Future Enhancements

The processing pipeline should support

- Competitor enrichment
- WHOIS lookup
- Google Business Profile updates
- Financial data enrichment
- LinkedIn company enrichment
- Email verification
- Phone verification
- CRM synchronization
- Proposal generation
- Automatic follow-up creation

The pipeline should allow new processing stages to be inserted without modifying existing stages.

---

# AI Implementation Instructions

When implementing this pipeline:

1. Build each stage as an independent service.
2. Keep every stage idempotent.
3. Continue processing whenever possible.
4. Record activities throughout the lifecycle.
5. Store partial results instead of discarding leads.
6. Execute expensive operations asynchronously.
7. Support retries for transient failures.
8. Update analytics after successful persistence.
9. Make the pipeline extensible so future enrichment stages can be added without major refactoring.