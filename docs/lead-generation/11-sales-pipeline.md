# Sales Pipeline

> This document defines the complete sales lifecycle, pipeline stages, lead qualification process, follow-up workflow, and conversion rules for the Lead Generation module.

---

# Purpose

The Sales Pipeline manages every lead after it has been processed and enriched.

The pipeline enables sales representatives to:

- Track lead progress
- Assign ownership
- Schedule follow-ups
- Record interactions
- Manage opportunities
- Estimate revenue
- Convert qualified leads into customers
- Analyze conversion performance

Every lead should always belong to exactly one pipeline stage.

---

# Objectives

The sales pipeline should:

- Organize leads visually
- Improve sales efficiency
- Standardize the sales process
- Prevent leads from being forgotten
- Track every interaction
- Measure conversion rates
- Support multiple sales representatives
- Generate actionable analytics

---

# Pipeline Architecture

```
Processed Lead

↓

New Lead

↓

Qualified

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

OR

Lost
```

A lead can move both forward and backward except after reaching a final stage.

---

# Pipeline Stages

## New Lead

Description

Lead has been created by the processing pipeline.

Characteristics

- No contact made
- No owner interaction
- Waiting for review

Allowed Actions

- Assign owner
- Add notes
- Schedule follow-up
- Qualify lead
- Archive lead

---

## Qualified

Description

Sales representative reviewed the lead and determined that it is worth pursuing.

Requirements

- Contact information exists
- Opportunity score reviewed
- Business verified

Allowed Actions

- Contact lead
- Schedule meeting
- Add internal notes

---

## Contacted

Description

Initial communication has been made.

Examples

- Email sent
- Phone call completed
- LinkedIn message
- WhatsApp message

Track

- Contact date
- Contact method
- Response status

---

## Meeting Scheduled

Description

A discovery or consultation meeting has been scheduled.

Store

- Meeting date
- Meeting platform
- Attendees
- Meeting notes
- Agenda

---

## Proposal Sent

Description

A quotation or proposal has been shared.

Track

- Proposal version
- Proposal date
- Estimated value
- Expiration date

---

## Negotiation

Description

The customer is reviewing the proposal.

Track

- Counter offers
- Requested changes
- Budget discussions
- Decision timeline

---

## Won

Description

Lead successfully converted into a customer.

Store

- Contract value
- Close date
- Purchased services
- Account manager
- Project reference

Won leads become customers.

---

## Lost

Description

Opportunity closed without conversion.

Store

Loss reason

Examples

Budget

Competitor

No Response

Project Cancelled

Timeline

Not Interested

Other

Lost leads remain available for future reporting.

---

# Lead Assignment

Every lead may have

Assigned User

Assigned Team

Assigned Date

Assigned By

Only authorized users may change ownership.

Assignment changes should create activity entries.

---

# Lead Priority

Priority levels

Low

Medium

High

Critical

Priority may be calculated automatically or manually overridden.

---

# Lead Status

Status is independent from the pipeline stage.

Examples

Open

In Progress

Waiting

Completed

Archived

Status provides operational visibility while the pipeline stage reflects sales progress.

---

# Lead Lifecycle

```
Lead Created

↓

Assigned

↓

Qualified

↓

Contacted

↓

Follow-up

↓

Meeting

↓

Proposal

↓

Negotiation

↓

Won / Lost
```

Every transition should be logged.

---

# Stage Transition Rules

Valid transitions

New

↓

Qualified

Qualified

↓

Contacted

Contacted

↓

Meeting Scheduled

Meeting Scheduled

↓

Proposal Sent

Proposal Sent

↓

Negotiation

Negotiation

↓

Won

Negotiation

↓

Lost

Backward transitions should remain possible until the lead is closed.

Won and Lost are terminal stages.

---

# Follow-Up Management

Every lead may have multiple follow-ups.

Each follow-up contains

- Date
- Time
- Type
- Description
- Assigned User
- Reminder
- Completion Status

Follow-up types

Phone Call

Email

Meeting

WhatsApp

LinkedIn

Demo

Site Visit

Other

---

# Sales Activities

Activities should automatically record

Lead Assigned

Stage Changed

Priority Changed

Owner Changed

Meeting Scheduled

Proposal Sent

Note Added

Follow-up Completed

Lead Won

Lead Lost

Every activity must include

Timestamp

User

Action

Details

---

# Notes

Users may create unlimited notes.

Each note stores

Author

Created Date

Updated Date

Visibility

Content

Support

Plain Text

Markdown

Rich Text (future)

Notes should never be deleted permanently.

---

# Revenue Tracking

Store

Estimated Revenue

Expected Revenue

Final Revenue

Currency

Probability

Revenue values should update as the lead progresses.

---

# Win Probability

Each stage has a default probability.

Example

New

10%

Qualified

25%

Contacted

40%

Meeting Scheduled

55%

Proposal Sent

70%

Negotiation

90%

Won

100%

Lost

0%

Users with sufficient permissions may override probability.

---

# Forecasting

Forecast calculations should include

Open Opportunities

Expected Revenue

Won Revenue

Lost Revenue

Average Deal Size

Pipeline Value

Monthly Forecast

Quarterly Forecast

Forecasts should update automatically.

---

# Tags

Leads may contain multiple tags.

Examples

Enterprise

Startup

Healthcare

Education

Urgent

VIP

Referral

Returning Client

Tags improve filtering and reporting.

---

# Search

Search should support

Business Name

Email

Phone

Website

Assigned User

Industry

Tags

City

Country

Pipeline Stage

Status

Search should be case insensitive.

---

# Filtering

Allow filtering by

Stage

Status

Priority

Industry

Assigned User

Opportunity Score

Date Range

Revenue

Country

City

Service Recommendation

Tags

Multiple filters should work together.

---

# Bulk Operations

Support

Bulk Assignment

Bulk Stage Change

Bulk Priority Change

Bulk Tag Update

Bulk Archive

Bulk Export

Bulk operations must respect permissions.

---

# Automation Rules

Examples

High opportunity score

↓

Assign to senior sales representative

No activity for seven days

↓

Create reminder

Meeting completed

↓

Move to Proposal stage

Proposal accepted

↓

Move to Won

Automation rules should remain configurable.

---

# Dashboard Metrics

Track

Total Leads

Open Leads

Qualified Leads

Meetings Scheduled

Proposals Sent

Negotiations

Won Deals

Lost Deals

Conversion Rate

Average Sales Cycle

Average Deal Size

Revenue

---

# Sales Analytics

Generate reports for

Lead Sources

Industry Distribution

Pipeline Distribution

Conversion Funnel

Win Rate

Loss Reasons

Sales Performance

Revenue Growth

Follow-up Performance

Team Performance

---

# Permissions

Support permissions for

View Pipeline

Edit Pipeline

Assign Leads

Move Stages

Delete Leads

Export Leads

View Revenue

Manage Automation

Every permission should integrate with the existing RBAC system.

---

# Audit Trail

Every important change must create an immutable audit record.

Track

Old Value

New Value

User

Timestamp

Reason

Audit history should never be modified.

---

# Notifications

Generate notifications for

New Assignment

Upcoming Follow-up

Overdue Follow-up

Meeting Reminder

Proposal Viewed (future)

Lead Won

Lead Lost

Notifications should be asynchronous.

---

# Performance Requirements

Pipeline board should support

- Thousands of leads
- Pagination
- Lazy loading
- Virtual scrolling
- Server-side filtering
- Server-side sorting

Performance should remain consistent as data grows.

---

# Future Enhancements

The pipeline should support future capabilities

- Multiple pipelines
- Team pipelines
- Custom pipeline stages
- AI follow-up suggestions
- Automated proposal generation
- Email synchronization
- Calendar synchronization
- CRM integration
- Revenue forecasting using AI
- Custom workflow automation

---

# AI Implementation Instructions

When implementing:

1. Keep pipeline stages configurable.
2. Record every stage transition.
3. Create activities automatically.
4. Maintain complete audit history.
5. Support multiple follow-ups per lead.
6. Allow configurable automation rules.
7. Prevent invalid stage transitions.
8. Update analytics after every significant change.
9. Keep the sales pipeline independent from the lead processing pipeline.
10. Ensure future support for custom pipelines without breaking existing functionality.


