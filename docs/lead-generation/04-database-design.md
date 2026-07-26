# Database Design

> This document defines the database architecture for the Lead Generation module.

---

# Purpose

The Lead Generation module must store, organize, qualify, and manage business leads in a scalable and multi-tenant manner.

The database design must support:

- Millions of leads
- AI analysis
- Sales pipeline
- Team collaboration
- Activity history
- Future CRM expansion
- High-performance searching
- Deduplication
- Analytics

The module must integrate with the existing MongoDB database.

Never create another database.

---

# Collections

The Lead Generation module introduces the following collections.

Required

- leads
- scrape_jobs
- lead_activities
- lead_notes

Optional (Future)

- lead_tags
- lead_assignments
- lead_imports

Reuse Existing Collections

- organizations
- users
- clients

Never duplicate these collections.

---

# Lead Collection

Collection

```
leads
```

Represents a business that could become a customer.

Each document belongs to one organization.

---

# Lead Fields

## Ownership

organizationId

ObjectId

Required

Reference

Organization

---

createdBy

ObjectId

Reference

User

---

assignedTo

ObjectId

Reference

User

Nullable

---

# Basic Information

businessName

String

Required

---

legalName

String

Optional

---

slug

String

Generated

Unique per organization

---

description

String

Optional

---

industry

String

Example

Restaurant

Hospital

School

Salon

Gym

Retail

Construction

Hotel

Law Firm

Clinic

Agency

---

subIndustry

String

Optional

---

# Contact Information

email

String

Nullable

---

phone

String

Nullable

---

alternatePhone

String

Nullable

---

website

String

Nullable

---

domain

String

Normalized

Used for deduplication

---

# Location

address

String

city

String

state

String

country

String

postalCode

String

latitude

Number

longitude

Number

GooglePlaceId

String

Nullable

---

# Social Links

linkedin

String

facebook

String

instagram

String

twitter

String

youtube

String

---

# Business Information

googleRating

Number

reviewCount

Number

yearsInBusiness

Number

employeeSize

String

businessHours

Mixed

---

# Website Analysis

hasWebsite

Boolean

websiteResponsive

Boolean

hasSSL

Boolean

hasContactForm

Boolean

hasBookingSystem

Boolean

hasBlog

Boolean

hasLiveChat

Boolean

seoScore

Number

performanceScore

Number

technologyStack

Array<String>

---

# AI Analysis

aiSummary

String

servicesDetected

Array<String>

recommendedServices

Array<String>

painPoints

Array<String>

opportunityReasons

Array<String>

opportunityScore

Number

Range

0-100

priority

Enum

Low

Medium

High

Critical

---

# Sales Pipeline

status

Enum

New

Qualified

Contacted

Meeting Scheduled

Proposal Sent

Negotiation

Won

Lost

Archived

---

pipelineStage

String

---

expectedValue

Number

Currency handled by existing application settings

---

probability

Number

0-100

---

nextFollowUp

Date

---

lastContacted

Date

---

convertedAt

Date

---

clientId

ObjectId

Reference

Client

Nullable

---

projectId

ObjectId

Nullable

Reference

Project

---

# Source

source

Enum

Google Maps

Manual

Import

Referral

Website

Directory

API

---

searchKeyword

String

Example

Restaurants Delhi

---

scrapeJobId

Reference

ScrapeJob

---

# Audit

createdAt

updatedAt

deletedAt

Soft delete

Never permanently delete leads by default.

---

# Lead Notes

Collection

```
lead_notes
```

Purpose

Internal team notes.

Fields

organizationId

leadId

createdBy

note

attachments

createdAt

---

# Lead Activities

Collection

```
lead_activities
```

Purpose

Timeline history.

Example

Lead Created

Assigned

Email Sent

Status Changed

AI Analysis Completed

Converted

Exported

Meeting Scheduled

Fields

organizationId

leadId

userId

activityType

metadata

createdAt

Never delete activities.

---

# Scrape Jobs

Collection

```
scrape_jobs
```

Purpose

Tracks scraping progress.

Fields

organizationId

createdBy

queueJobId

status

searchKeyword

location

limit

processed

found

failed

startedAt

completedAt

error

retryCount

createdAt

updatedAt

---

# Deduplication Rules

A lead is considered duplicate when one or more of the following match within the same organization.

Highest Priority

Google Place ID

Second

Domain

Third

Phone Number

Fourth

Email

Fifth

Business Name + City

Duplicates should update existing records rather than creating new ones where appropriate.

---

# Indexes

Lead

organizationId

organizationId + status

organizationId + city

organizationId + industry

organizationId + assignedTo

organizationId + createdAt

organizationId + opportunityScore

domain

phone

email

GooglePlaceId

Text Index

businessName

description

servicesDetected

aiSummary

---

# Soft Delete

Never permanently delete records.

Instead

deletedAt

Date

Queries should ignore deleted records unless explicitly requested.

---

# Relationships

Organization

↓

Lead

↓

Activities

↓

Notes

↓

Client

↓

Project

---

# Future Expansion

The schema should support future additions without breaking compatibility.

Possible future features

Email Campaigns

WhatsApp Campaigns

Proposal Generator

Meeting Scheduler

Calling Integration

Lead Scoring AI

Sales Forecasting

CRM Automation

Follow-up Automation

Task Automation

---

# Migration Rules

Do not modify existing collections unless required.

Create only new collections for this module.

Reference existing User, Organization, Client, and Project models instead of duplicating data.

---

# AI Implementation Instructions

When implementing:

1. Create Mongoose schemas with TypeScript.
2. Add proper indexes.
3. Enable timestamps.
4. Use ObjectId references.
5. Use enums for controlled values.
6. Default to soft delete.
7. Validate required fields.
8. Keep schemas extensible for future CRM features.