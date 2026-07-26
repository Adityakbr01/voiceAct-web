# API Specification

> This document defines every REST API endpoint required by the Lead Generation module.

---

# Purpose

The Lead Generation module exposes REST APIs used by the existing Next.js frontend.

All APIs must:

- Reuse existing authentication
- Reuse existing authorization
- Reuse existing response wrapper
- Reuse existing validation middleware
- Follow existing API conventions
- Remain organization scoped

Never expose another organization's data.

---

# Base Route

```
/api/v1/lead-generation
```

All endpoints belong under this route.

---

# Authentication

Every endpoint requires authentication unless explicitly stated.

Authenticated User

↓

JWT Middleware

↓

Organization Middleware

↓

Permission Middleware

↓

Lead API

Never trust organizationId from request body.

Always derive organization from authenticated user.

---

# Standard Response Format

Success

```json
{
    "success": true,
    "message": "Lead created successfully.",
    "data": {},
    "meta": {}
}
```

Error

```json
{
    "success": false,
    "message": "Validation failed.",
    "errors": []
}
```

Never return inconsistent response structures.

---

# Pagination

Every list endpoint must support:

page

limit

sort

order

search

Default

page = 1

limit = 20

Maximum

limit = 100

---

# Filtering

Support filtering by:

status

assignedTo

industry

city

country

priority

source

hasWebsite

hasEmail

hasPhone

opportunityScore

pipelineStage

createdBy

createdAfter

createdBefore

Filters should be combinable.

---

# Sorting

Supported sorting

createdAt

updatedAt

businessName

opportunityScore

priority

status

city

Only allow whitelisted fields.

---

# Search

Global search should match

Business Name

Email

Phone

Website

Domain

City

Industry

AI Summary

Search should be case insensitive.

---

# Endpoint Categories

The module consists of

Lead APIs

Scrape APIs

Job APIs

Pipeline APIs

Analytics APIs

Export APIs

Settings APIs

---

# Lead APIs

---

## Create Lead

POST

```
/api/v1/lead-generation/leads
```

Purpose

Manual lead creation.

Permission

lead.create

Validation

Business Name required.

Returns

Created lead.

---

## Get Leads

GET

```
/api/v1/lead-generation/leads
```

Supports

Pagination

Search

Filtering

Sorting

Returns

Paginated leads.

---

## Get Single Lead

GET

```
/api/v1/lead-generation/leads/:id
```

Returns

Complete lead details

Activities

Notes

AI Analysis

Pipeline

---

## Update Lead

PATCH

```
/api/v1/lead-generation/leads/:id
```

Editable

Status

Assignment

Follow-up

Notes

Tags

Expected Value

Priority (manual override if allowed)

Never overwrite AI fields unless requested.

---

## Delete Lead

DELETE

```
/api/v1/lead-generation/leads/:id
```

Soft delete only.

Never permanently delete.

---

# Bulk APIs

---

## Bulk Update

PATCH

```
/api/v1/lead-generation/leads/bulk
```

Supports

Assign

Archive

Status Update

Delete

Tag

Permission

lead.bulk

---

## Bulk Delete

DELETE

```
/api/v1/lead-generation/leads/bulk
```

Soft delete.

---

# Scraper APIs

---

## Create Scraping Job

POST

```
/api/v1/lead-generation/scrape
```

Purpose

Queue a scraping job.

Body

Business Category

Location

Maximum Results

Source

Priority (optional)

Returns

Job ID.

Never perform scraping inside controller.

---

## Cancel Job

POST

```
/api/v1/lead-generation/jobs/:id/cancel
```

Marks BullMQ job cancelled.

Worker should stop gracefully.

---

## Retry Job

POST

```
/api/v1/lead-generation/jobs/:id/retry
```

Creates another queue job.

Links to previous job.

---

# Job APIs

---

## Job Status

GET

```
/api/v1/lead-generation/jobs/:id
```

Returns

Queue status

Progress

Processed

Remaining

Errors

Started

Finished

---

## List Jobs

GET

```
/api/v1/lead-generation/jobs
```

Supports

Pagination

Status

Created By

Date Range

---

# Pipeline APIs

---

## Update Pipeline Stage

PATCH

```
/api/v1/lead-generation/pipeline/:leadId
```

Updates

Stage

Probability

Expected Value

Next Follow-up

Creates activity automatically.

---

## Pipeline Board

GET

```
/api/v1/lead-generation/pipeline
```

Returns

Kanban-ready grouped data.

---

# Notes APIs

---

## Add Note

POST

```
/api/v1/lead-generation/leads/:id/notes
```

Creates note.

Creates activity.

---

## Update Note

PATCH

```
/api/v1/lead-generation/notes/:id
```

---

## Delete Note

DELETE

```
/api/v1/lead-generation/notes/:id
```

Soft delete.

---

# Activities APIs

---

## Lead Timeline

GET

```
/api/v1/lead-generation/leads/:id/activities
```

Returns chronological history.

Newest first.

---

# Analytics APIs

---

## Dashboard Metrics

GET

```
/api/v1/lead-generation/analytics
```

Returns

Total Leads

Qualified

Won

Lost

Conversion Rate

Opportunity Average

High Priority

Scraping Jobs

---

## Charts

GET

```
/api/v1/lead-generation/analytics/charts
```

Returns

Monthly Leads

Lead Sources

Industry Distribution

Pipeline Funnel

Conversion Trend

---

# Export APIs

---

## Export CSV

POST

```
/api/v1/lead-generation/export
```

Supports

Filters

Columns

Sort

Returns

Download URL

or

Streams file.

---

# AI APIs

---

## Reanalyze Lead

POST

```
/api/v1/lead-generation/leads/:id/analyze
```

Queues AI analysis.

Never blocks request.

---

# Settings APIs

---

## Get Settings

GET

```
/api/v1/lead-generation/settings
```

Returns

Scraper Config

AI Provider

Limits

Default Search

Queue Settings

---

## Update Settings

PATCH

```
/api/v1/lead-generation/settings
```

Permission

lead.settings

Only administrators.

---

# Permissions

Examples

lead.view

lead.create

lead.update

lead.delete

lead.export

lead.assign

lead.scrape

lead.analytics

lead.settings

Reuse existing RBAC.

Never implement another permission system.

---

# Validation

Every endpoint must validate

Request Body

Params

Query

Headers (where required)

Reject invalid requests before reaching services.

---

# Rate Limiting

Protect expensive endpoints.

Examples

Scraping

Export

AI Analysis

Bulk Operations

Use the existing rate limiter if present.

---

# Idempotency

The following operations should be idempotent where practical.

Retry Job

Bulk Assign

Lead Conversion

AI Reanalysis

Avoid duplicate side effects.

---

# Error Codes

Suggested application codes

LEAD_NOT_FOUND

DUPLICATE_LEAD

INVALID_STATUS

JOB_NOT_FOUND

JOB_CANCELLED

SCRAPER_FAILED

AI_FAILED

EXPORT_FAILED

PERMISSION_DENIED

VALIDATION_FAILED

QUEUE_UNAVAILABLE

---

# API Documentation

Every endpoint should include

Purpose

Permission

Validation

Possible Errors

Success Response

Example Payload

The implementation should be compatible with future OpenAPI/Swagger generation.

---

# AI Implementation Instructions

When implementing APIs:

1. Keep controllers thin.
2. Place business logic in services.
3. Use repositories for database access if available.
4. Scope every query to the authenticated organization.
5. Validate all input.
6. Return standardized responses.
7. Never expose internal errors.
8. Ensure endpoints are backwards compatible with the existing platform.