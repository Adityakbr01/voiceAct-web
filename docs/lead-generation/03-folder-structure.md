# Folder Structure

> This document defines exactly where every file related to the Lead Generation module must be created.

---

# Purpose

The Lead Generation module must follow the existing feature-based architecture already used throughout the project.

Never introduce a different folder structure.

Never move unrelated files.

Never refactor existing modules unless explicitly required.

---

# Existing Repository Structure

```
voiceAct-web/

docs/

server/

web/
```

The Lead Generation feature will extend both:

- server/
- web/

---

# Backend Structure

Current backend

```
server/src/

config/

middleware/

modules/

utils/

app.ts

server.ts
```

Current modules

```
modules/

auth/

contact/

project/

service/

tracking/
```

A new feature module must be added.

```
modules/

lead-generation/
```

---

# Lead Generation Module Structure

```
server/src/modules/

lead-generation/

controllers/

lead.controller.ts

job.controller.ts

services/

lead.service.ts

scraper.service.ts

ai.service.ts

pipeline.service.ts

export.service.ts

repositories/

lead.repository.ts

job.repository.ts

models/

lead.model.ts

scrape-job.model.ts

validators/

create-job.validator.ts

update-lead.validator.ts

routes/

lead.routes.ts

queue/

lead.queue.ts

workers/

lead.worker.ts

utils/

domain.ts

phone.ts

email.ts

csv.ts

constants/

lead.constants.ts

types/

lead.types.ts

index.ts
```

---

# Responsibility of Each Folder

## controllers

Only receive HTTP requests.

Never implement business logic.

Responsibilities

- validate request
- call services
- return response

---

## services

Contains business logic.

Examples

Lead Processing

AI

Scraping

CSV Export

Pipeline

Opportunity Score

Deduplication

---

## repositories

Responsible only for MongoDB queries.

No business logic.

Examples

findByDomain

findByPhone

bulkInsert

pagination

aggregation

---

## models

Contains Mongoose models.

No helper functions.

No business logic.

---

## validators

Request validation.

Examples

POST validation

PATCH validation

Query validation

---

## routes

Only define Express routes.

No controller logic.

---

## queue

Contains BullMQ queue configuration.

No scraping logic.

No AI logic.

---

## workers

BullMQ workers.

Responsible for:

running scraper

calling AI

saving data

updating progress

---

## utils

Pure reusable helper functions.

Examples

normalizeDomain()

normalizePhone()

extractEmail()

generateCSV()

---

## constants

Feature constants.

Examples

Lead Status

Pipeline Stage

Score Threshold

---

## types

Shared TypeScript interfaces.

Enums.

DTOs.

---

# Frontend Structure

Current structure

```
web/src/modules/
```

New module

```
web/src/modules/

lead-generation/
```

---

# Module Layout

```
lead-generation/

components/

pages/

hooks/

services/

types/

constants/

utils/

schemas/

index.ts
```

---

# Components

```
components/

lead-table.tsx

lead-card.tsx

scrape-dialog.tsx

job-progress.tsx

status-badge.tsx

score-badge.tsx

pipeline-board.tsx

metric-card.tsx

filters.tsx

search-form.tsx

empty-state.tsx
```

Only reusable UI belongs here.

---

# Pages

```
pages/

dashboard.tsx

jobs.tsx

leads.tsx

pipeline.tsx

analytics.tsx

settings.tsx
```

---

# Hooks

```
hooks/

useLeads.ts

useLead.ts

useJobs.ts

useScrape.ts

useExport.ts

usePipeline.ts
```

Always use TanStack Query.

Never call fetch directly inside components.

---

# Services

Contains frontend API layer.

Examples

```
lead.api.ts

job.api.ts

export.api.ts
```

These communicate with Express.

---

# Schemas

Contains Zod schemas.

Examples

```
create-job.schema.ts

update-lead.schema.ts
```

---

# Types

```
lead.ts

job.ts

pipeline.ts
```

---

# Constants

Examples

```
lead-status.ts

pipeline.ts

filters.ts
```

---

# Utils

Pure frontend helpers.

Examples

date formatting

CSV download

score color

badge color

table columns

---

# Dashboard Integration

Do NOT create another dashboard.

Instead extend

```
web/src/modules/dashboard/
```

Add

Navigation

Sidebar Menu

Route

Permission

Widgets

Analytics

Recent Activity

---

# Shared Components

Reuse existing components whenever possible.

Examples

Button

Input

Dialog

Card

Badge

Avatar

Table

Pagination

Toast

Skeleton

Spinner

Never duplicate them.

---

# Import Rules

Allowed

```
controllers

↓

services

↓

repositories

↓

models
```

Never reverse this dependency.

Models must never import services.

Controllers must never import repositories directly.

---

# Naming Convention

Folders

kebab-case

Files

kebab-case

React Components

PascalCase

Functions

camelCase

Types

PascalCase

Constants

UPPER_SNAKE_CASE

---

# Index Files

Every folder should expose public APIs using index.ts.

Avoid deep imports throughout the application.

---

# AI Implementation Instructions

Before generating code:

1. Detect the existing folder structure.
2. Create only missing folders.
3. Reuse existing utilities where possible.
4. Do not rename current modules.
5. Do not move existing files.
6. Keep the architecture consistent with the rest of the project.
7. Add the Lead Generation module as a first-class feature under both `server/src/modules` and `web/src/modules`.