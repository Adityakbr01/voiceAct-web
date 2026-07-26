# Dashboard UI

> This document defines the complete user interface specification for the Lead Generation Dashboard. It describes all screens, layouts, components, interactions, filters, and user experience requirements for the frontend.

---

# Purpose

The Lead Generation Dashboard provides a centralized workspace where users can:

- View lead statistics
- Monitor scraping jobs
- Manage leads
- Track sales progress
- Review AI analysis
- Schedule follow-ups
- View analytics
- Export data
- Configure module settings

The dashboard should provide fast access to all lead management functionality.

---

# Design Goals

The dashboard should be

- Clean
- Responsive
- Modern
- Accessible
- Fast
- Data-driven
- Easy to navigate
- Consistent with the existing application

The UI should reuse the existing design system.

---

# Navigation Structure

```
Lead Generation

├── Dashboard
├── Leads
├── Pipeline
├── Scraping Jobs
├── Analytics
├── Activities
├── Exports
├── Settings
```

Every page belongs to the Lead Generation module.

---

# Dashboard Home

Purpose

Provide a complete overview of lead generation activities.

Sections

- KPI Cards
- Opportunity Summary
- Recent Leads
- Recent Activities
- Running Jobs
- Revenue Summary
- Conversion Overview
- Upcoming Follow-ups

---

# KPI Cards

Display

Total Leads

Qualified Leads

Hot Leads

Active Opportunities

Won Deals

Lost Deals

Running Jobs

Conversion Rate

Each card should display

- Current value
- Trend indicator
- Comparison with previous period

Cards should support click navigation.

---

# Opportunity Summary

Display

High Opportunity

Medium Opportunity

Low Opportunity

Unknown

Each section should show

Count

Percentage

Trend

---

# Lead Distribution

Display charts for

Industry

Country

City

Lead Source

Technology Stack

Recommended Services

Opportunity Score

Charts should support filtering.

---

# Recent Leads

Display

Business Name

Industry

Location

Opportunity Score

Assigned User

Pipeline Stage

Created Date

Quick Actions

Default limit

10

Support

View All

Refresh

Sorting

---

# Recent Activities

Display

User

Action

Lead

Time

Description

Support

Filtering

Pagination

Infinite scrolling

---

# Running Jobs

Display

Job Name

Progress

Status

Started

Estimated Completion

Cancel Action

Retry Action

Refresh progress automatically.

---

# Revenue Summary

Display

Expected Revenue

Won Revenue

Pipeline Value

Average Deal Size

Monthly Revenue

Quarterly Revenue

---

# Follow-up Widget

Display

Today's Follow-ups

Overdue Follow-ups

Upcoming Meetings

Completed Today

Allow quick navigation.

---

# Leads Page

Purpose

Display all leads.

Features

Server-side pagination

Sorting

Filtering

Search

Bulk actions

Export

Saved views

---

# Lead Table

Columns

Business Name

Industry

City

Country

Website

Opportunity Score

Priority

Status

Pipeline Stage

Assigned User

Created Date

Actions

Columns should be configurable.

---

# Table Features

Support

Column resize

Column visibility

Sticky header

Pagination

Row selection

Multi-select

Keyboard navigation

Virtual scrolling

Server-side sorting

Server-side filtering

---

# Search

Search should support

Business Name

Email

Phone

Website

Domain

Industry

City

Tags

Assigned User

Pipeline Stage

Results should update efficiently.

---

# Filters

Support

Industry

Country

City

Status

Priority

Pipeline Stage

Opportunity Score

Assigned User

Tags

Technology

Lead Source

Date Range

Filters should persist during navigation.

---

# Bulk Actions

Allow

Assign

Archive

Delete

Export

Update Priority

Update Stage

Add Tags

Remove Tags

Bulk operations require confirmation.

---

# Lead Details Page

Display

Business Information

Contact Information

Website Information

Technology Stack

AI Analysis

Opportunity Score

Recommended Services

Activities

Notes

Follow-ups

Attachments

Timeline

Everything related to one lead should be accessible from a single page.

---

# AI Analysis Section

Display

Business Summary

Industry

Pain Points

Recommended Services

Website Review

Confidence Score

Reasoning

Allow manual reanalysis.

---

# Technology Section

Display detected technologies

Frontend

Backend

CMS

Analytics

Hosting

CDN

Security

Integrations

---

# Activity Timeline

Chronological history.

Examples

Lead Created

Lead Updated

Website Crawled

AI Analysis Completed

Stage Changed

Follow-up Added

Proposal Sent

Won

Lost

Newest activity first.

---

# Notes Section

Allow

Create

Edit

Delete (Soft Delete)

Mention users (future)

Markdown support (future)

Every note stores

Author

Date

Content

---

# Follow-up Section

Display

Upcoming

Completed

Overdue

Allow

Create

Edit

Mark Complete

Reschedule

---

# Pipeline Page

Display

Kanban Board

Columns

New

Qualified

Contacted

Meeting Scheduled

Proposal Sent

Negotiation

Won

Lost

Support drag-and-drop stage movement.

---

# Pipeline Cards

Each card displays

Business Name

Company Logo (if available)

Opportunity Score

Priority

Assigned User

Expected Revenue

Next Follow-up

Tags

Quick Actions

---

# Scraping Jobs Page

Display

Job Queue

Status

Progress

Duration

Created By

Provider

Results

Retry

Cancel

Failed Reason

Refresh automatically.

---

# Analytics Page

Sections

Lead Analytics

Sales Analytics

Industry Analytics

Technology Analytics

Revenue Analytics

Conversion Analytics

Job Analytics

Charts should support date filtering.

---

# Activities Page

Display all activities.

Support

Filtering

Search

Pagination

User filter

Lead filter

Date filter

Action filter

---

# Export Page

Display

Export History

Requested By

Export Type

Status

Created Date

Download

Delete

Support downloading completed exports.

---

# Settings Page

Sections

General

AI

Scraper

Notifications

Permissions

Export

Retention

API Keys

Queue

Settings should be grouped logically.

---

# Global Search

Accessible from every page.

Search

Leads

Companies

Contacts

Activities

Jobs

Pipeline

Return categorized results.

---

# Notifications

Notification center should display

Assignments

Follow-ups

Completed Jobs

Failed Jobs

Won Deals

Lost Deals

Unread Count

Support

Mark Read

Mark All Read

Delete

---

# Loading States

Every page should display

Skeleton loaders

Progress indicators

Empty states

Error states

Retry actions

Avoid blank screens.

---

# Empty States

Examples

No Leads

No Jobs

No Activities

No Analytics

No Notes

Provide contextual actions.

---

# Error States

Display

Friendly message

Retry button

Error reference

Support contact (future)

Never expose internal server errors.

---

# Responsive Design

Support

Desktop

Laptop

Tablet

Mobile

Navigation should adapt appropriately.

---

# Accessibility

Support

Keyboard navigation

Focus indicators

ARIA labels

Screen readers

High contrast

Accessible color usage

WCAG compliance where practical.

---

# Performance Requirements

The dashboard should

Load quickly

Lazy load heavy components

Use server-side pagination

Avoid unnecessary re-renders

Support thousands of leads

Cache repeated requests

---

# Security

Hide UI actions the user cannot perform.

Never rely on frontend permissions alone.

Sensitive actions require backend authorization.

---

# Future Enhancements

Support

Custom dashboards

Saved filters

Saved reports

Widget customization

Dark mode improvements

Dashboard sharing

Real-time collaboration

Custom analytics

AI dashboard assistant

---

# AI Implementation Instructions

When implementing:

1. Reuse the existing UI components and design system.
2. Keep all data loading server-driven.
3. Support responsive layouts.
4. Build reusable table and filter components.
5. Minimize unnecessary API requests.
6. Keep every page accessible.
7. Display meaningful loading and error states.
8. Keep dashboard widgets independent.
9. Ensure all pages support future expansion.
10. Maintain a consistent user experience across the entire Lead Generation module.