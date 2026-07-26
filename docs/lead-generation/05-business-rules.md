# Business Rules

> This document defines the business rules governing the Lead Generation module. These rules describe **how the system should behave**, independent of implementation details.

---

# Purpose

The Lead Generation module is not just a scraper.

It is a complete Sales Intelligence system that helps the agency:

- Discover businesses
- Analyze opportunities
- Prioritize leads
- Track communication
- Convert businesses into paying clients

Every service, API, worker, and UI component must follow the rules defined in this document.

---

# Lead Lifecycle

Every lead follows a predefined lifecycle.

```
Discovered

↓

Analyzed

↓

Qualified

↓

Assigned

↓

Contacted

↓

Meeting Scheduled

↓

Proposal Sent

↓

Negotiation

↓

Won

↓

Client

↓

Project

↓

Completed

↓

Repeat Business
```

A lead may also exit the pipeline.

```
Discovered

↓

Archived

or

Lost

or

Duplicate

or

Spam
```

---

# Lead Status Rules

Allowed statuses

| Status | Description |
|----------|------------|
| New | Newly discovered lead |
| Qualified | AI or user verified |
| Contacted | First outreach completed |
| Follow Up | Waiting for next interaction |
| Meeting Scheduled | Discovery/demo booked |
| Proposal Sent | Proposal shared |
| Negotiation | Active commercial discussion |
| Won | Converted to client |
| Lost | Opportunity lost |
| Archived | No longer active |

Status transitions should be validated.

Example:

New → Qualified → Contacted → Proposal Sent → Won

Do not allow invalid transitions unless an administrator overrides them.

---

# Lead Creation Rules

A lead can be created by:

- Scraping
- Manual entry
- CSV import
- API integration
- Referral
- Website form

Every lead must belong to exactly one organization.

---

# Required Fields

Minimum information required:

- Organization
- Business Name
- Source

Everything else may initially be empty and enriched later.

---

# Lead Assignment Rules

A lead may be:

Unassigned

OR

Assigned to one sales representative.

Assignment should generate an activity record.

Example

```
Lead Assigned

Assigned To

John Doe

Time

2026-08-14 11:45
```

---

# Duplicate Detection

Never blindly insert new leads.

Before creating a lead check:

1. Google Place ID

2. Domain

3. Phone Number

4. Email

5. Business Name + City

If duplicate found:

Update existing record.

Create activity.

Do not create another lead.

---

# Lead Enrichment

Existing leads may receive additional information later.

Examples

Email discovered

Website discovered

AI summary updated

Phone discovered

Social profiles found

This should update the lead instead of creating duplicates.

---

# AI Analysis Rules

Every website should be analyzed.

AI should generate:

Business summary

Detected services

Technology stack (if possible)

Pain points

Recommended services

Opportunity score

Priority

Estimated modernization requirements

Never overwrite manually edited fields unless explicitly allowed.

---

# Opportunity Score

Range

0–100

The score represents the likelihood that the business could become a customer.

Higher score = higher priority.

---

# Suggested Scoring Factors

Positive indicators:

- No website
- Old website
- Poor mobile experience
- Missing SSL
- Poor SEO
- Missing contact form
- Missing booking system
- Poor performance
- Outdated UI
- No analytics
- Weak online presence

Negative indicators:

- Recently redesigned site
- Enterprise-grade website
- Strong SEO
- Existing CRM
- Excellent digital presence

The exact scoring algorithm should remain configurable.

---

# Priority Levels

| Score | Priority |
|--------|----------|
| 0–30 | Low |
| 31–60 | Medium |
| 61–80 | High |
| 81–100 | Critical |

Priority should automatically update whenever opportunity score changes.

---

# Sales Recommendations

AI should recommend agency services.

Examples

Website Redesign

Mobile App

CRM

ERP

SEO

Cloud Migration

AI Chatbot

Automation

API Integration

Maintenance

Digital Marketing

Recommendations help sales representatives prepare proposals.

---

# Follow-up Rules

Each lead may have:

Next follow-up date

Reminder

Responsible user

Missed follow-ups should be highlighted on the dashboard.

---

# Lead Notes

Users may create unlimited notes.

Notes:

- Are internal
- Are organization scoped
- Are never visible to customers

Every note should create an activity record.

---

# Lead Activities

Every significant action must create an activity.

Examples

Lead Created

Lead Updated

Lead Assigned

Email Sent

Call Logged

Meeting Scheduled

Proposal Uploaded

Status Changed

Converted

Archived

Exported

Activities must never be deleted.

---

# Conversion Rules

A lead may become a client.

Conversion process

```
Lead

↓

Client

↓

Project
```

During conversion:

Create client if one does not already exist.

Link lead to client.

Optionally create first project.

Preserve all activities.

Preserve notes.

Mark lead as Won.

---

# Lead Deletion

Hard deletion is not allowed by default.

Use soft delete.

Archived leads remain searchable by administrators.

---

# Import Rules

CSV import should:

Validate rows

Skip invalid entries

Detect duplicates

Report errors

Generate import summary

Imports should not block the application.

---

# Export Rules

Users can export filtered leads.

Supported formats

CSV

Future:

Excel

PDF

Exports must respect organization boundaries.

---

# Search Rules

Users should be able to search by:

Business name

Email

Phone

City

Industry

Website

Status

Assigned user

Opportunity score

Recommended service

Pipeline stage

Search should be case-insensitive.

---

# Filtering Rules

Examples

Has Website

No Website

Has Email

Missing Email

High Opportunity

Assigned

Unassigned

Contacted

Won

Lost

Recently Added

Filters should be combinable.

---

# Permission Rules

Not every user should have full access.

Typical permissions:

View Leads

Create Leads

Assign Leads

Delete Leads

Export Leads

Run Scrapers

Manage Settings

Permissions should reuse the existing RBAC system.

---

# Scraping Rules

Scraping jobs:

Run asynchronously

Can be cancelled

Can be retried

Track progress

Store failures

Avoid duplicate scraping of the same business within a configurable cooldown period.

---

# AI Failure Rules

If AI fails:

Retry.

If retry fails:

Continue with partial lead.

Mark AI status as failed.

Allow manual re-analysis later.

Scraping should not fail entirely because AI failed.

---

# Queue Failure Rules

If worker crashes:

Retry.

If retries exhausted:

Mark job failed.

Notify user.

Store failure reason.

---

# Notification Rules

Notify users when:

Scraping completed

Scraping failed

Lead assigned

Lead converted

Export ready

Long-running job completed

Use the platform's existing notification system.

---

# Audit Rules

Important actions must be auditable.

Record:

Who

What

When

Previous Value (where applicable)

New Value (where applicable)

Audit history should not be editable.

---

# Analytics Rules

The system should support reporting on:

Total Leads

Qualified Leads

Won Leads

Lost Leads

Conversion Rate

Average Opportunity Score

Most Requested Services

Most Common Industries

Lead Sources

Top Sales Representatives

Average Response Time

These metrics should be generated efficiently.

---

# Future Compatibility

Business rules should allow future expansion.

Examples

Email Campaigns

WhatsApp Campaigns

Cold Calling

Proposal Generator

Meeting Scheduler

AI Sales Assistant

Sales Forecasting

CRM Automation

Lead Scoring Improvements

No future feature should require redesigning the existing business logic.

---

# AI Implementation Instructions

Before implementing business logic:

1. Read this document completely.
2. Keep rules inside services, not controllers.
3. Reuse existing authentication and RBAC.
4. Create activity records automatically where required.
5. Prevent duplicate leads.
6. Support soft deletion.
7. Make all rules configurable where practical.
8. Ensure all data remains organization-scoped.
9. Preserve backward compatibility with the rest of the Agency platform.