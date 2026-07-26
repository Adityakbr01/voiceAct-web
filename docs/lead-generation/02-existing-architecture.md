# Existing Architecture

> This document describes how the Lead Generation module integrates into the existing Agency Management Platform.

---

# Purpose

The Lead Generation module is **not** an independent application.

It is one feature module inside the existing IT Services Agency platform.

Its responsibility is to help the agency discover potential clients, qualify opportunities using AI, manage the sales pipeline, and convert qualified leads into clients and projects.

The implementation must follow the current architecture and reuse all shared infrastructure.

---

# Platform Overview

The platform is an Enterprise SaaS built for managing an IT Services Agency.

The agency provides services such as:

- Website Development
- Mobile Application Development
- CRM Development
- ERP Development
- SaaS Development
- AI Solutions
- UI/UX Design
- API Development
- DevOps
- Cloud Migration
- Automation
- Technical Consulting
- Maintenance & Support

---

# Existing Technology Stack

## Frontend

- Next.js (App Router)
- React
- TypeScript
- TailwindCSS
- shadcn/ui
- TanStack Query
- React Hook Form
- Zod

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Infrastructure

- BullMQ
- Redis
- Docker
- PM2
- Playwright
- Gemini API / Mistral API
- Cloudinary / AWS S3

---

# Existing Modules

The application already contains multiple modules.

Examples:

Dashboard

Authentication

Organizations

Users

Roles & Permissions

Clients

Projects

Tasks

Invoices

Documents

Notifications

Analytics

Settings

The Lead Generation module must become another first-class module.

---

# Module Placement

Backend

```
server/
└── modules/
    ├── auth/
    ├── organization/
    ├── users/
    ├── projects/
    ├── clients/
    ├── notifications/
    ├── analytics/
    └── lead-generation/
```

Frontend

```
app/

dashboard/

lead-generation/

page.tsx
jobs/
leads/
pipeline/
analytics/
settings/
```

Do not create another dashboard.

Do not create another authentication system.

---

# Shared Infrastructure

The following services already exist.

Reuse them.

Authentication

Authorization

Database Connection

Redis Connection

Logger

Response Handler

Error Handler

Validation Middleware

Socket Service

Storage Service

Email Service

Environment Loader

Never duplicate these services.

---

# Authentication Flow

User

↓

Login

↓

JWT / Session

↓

Authentication Middleware

↓

Authorization Middleware

↓

Organization Middleware

↓

Lead Generation APIs

Lead Generation must rely entirely on the existing authentication flow.

---

# Multi-Tenant Architecture

Every resource belongs to an Organization.

Organization

↓

Users

↓

Lead Generation

↓

Leads

↓

Pipeline

↓

Clients

↓

Projects

No resource should exist without an organization reference unless explicitly intended for global configuration.

---

# Organization Data Isolation

Every database query must automatically include:

organizationId

Examples

Correct

```
Lead.find({
organizationId:req.organization._id
})
```

Incorrect

```
Lead.find({})
```

Cross-organization access must never occur.

---

# Existing Client Lifecycle

Current Flow

Lead

↓

Client

↓

Project

↓

Invoice

↓

Revenue

The Lead Generation module starts this lifecycle.

---

# High-Level Data Flow

User creates search request

↓

Express API

↓

BullMQ Queue

↓

Redis

↓

Worker

↓

Playwright

↓

Website Data

↓

Gemini/Mistral Analysis

↓

Lead Processing

↓

MongoDB

↓

Frontend Dashboard

---

# Lead Generation Workflow

Search Business

↓

Create Queue Job

↓

Worker Starts

↓

Search Google Maps / Directories

↓

Collect Business Information

↓

Visit Website

↓

Extract Contact Information

↓

AI Analysis

↓

Calculate Opportunity Score

↓

Save Lead

↓

Notify User

↓

Display in Dashboard

---

# Shared Database

The Lead Generation module shares the existing MongoDB database.

Only new collections should be added where necessary.

Expected new collections include:

Leads

ScrapeJobs

LeadActivities (optional)

LeadNotes (optional)

LeadTags (optional)

Do not duplicate Users, Organizations, or Clients.

---

# Shared User Model

Never create another user model.

Every Lead record should reference existing users where applicable.

Examples

createdBy

assignedTo

lastUpdatedBy

---

# Shared Organization Model

Every new model must reference the existing Organization model.

Example

organizationId

ObjectId

ref: "Organization"

---

# Shared Notification System

The platform already contains notifications.

Reuse it.

Possible notifications

Scraping Started

Scraping Completed

Scraping Failed

Lead Assigned

Lead Converted

CSV Export Ready

AI Analysis Completed

---

# Shared Storage

If screenshots, exports, or reports are generated:

Reuse existing storage provider.

Possible providers

Cloudinary

AWS S3

Never implement another storage layer.

---

# Shared Logging

All Lead Generation services must use the centralized logger.

Log:

Job creation

Job completion

Retries

Failures

AI responses (metadata only, never secrets)

Worker crashes

Browser crashes

Rate limits

Exports

---

# Shared Error Handling

Use existing AppError or equivalent.

Never return raw errors.

Every service should throw standardized application errors.

---

# Shared Validation

Use existing validation strategy.

Possible tools

Zod

Joi

Express Validator

Never validate business objects manually inside controllers.

---

# Existing API Versioning

All APIs must follow the existing versioning strategy.

Example

/api/v1/lead-generation

Never create inconsistent routes.

---

# Shared Frontend Components

Reuse existing components.

Examples

Button

Card

Dialog

Modal

Drawer

Input

Select

Badge

Avatar

DataTable

Pagination

Form

Toast

Spinner

Skeleton

Empty State

Do not duplicate UI components.

---

# Existing Design System

Follow the platform's design language.

Maintain

Typography

Spacing

Border Radius

Shadows

Dark Mode

Theme Colors

Responsive Layout

Do not introduce inconsistent UI.

---

# Existing State Management

Reuse the project's existing approach.

Examples

TanStack Query

Context

Redux (if already present)

Avoid introducing a second state management solution.

---

# Existing API Layer

Frontend must communicate through the shared API layer.

Do not use direct fetch calls if Axios or another shared client already exists.

Reuse interceptors and authentication handling.

---

# Existing Configuration

Reuse

Environment loader

Constants

Enums

Feature flags

Permissions

Role definitions

Do not duplicate configuration values.

---

# Integration Principle

The Lead Generation module should feel like it has always been part of the platform.

A developer unfamiliar with the implementation should not be able to distinguish it from the original modules.

The architecture, coding style, naming conventions, UI, and infrastructure must remain consistent across the entire application.

---

# AI Implementation Requirement

Before implementing any code:

1. Analyze the existing project structure.
2. Identify reusable services and components.
3. Extend existing modules whenever possible.
4. Create new files only when no reusable implementation exists.
5. Explain modifications required for existing files instead of replacing them.
6. Preserve backward compatibility with all existing features.
