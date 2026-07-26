# Scraper Engine

> This document defines the architecture, responsibilities, and implementation rules for the scraping engine used by the Lead Generation module.

---

# Purpose

The Scraper Engine is responsible for discovering businesses, collecting publicly available information, enriching leads, and preparing structured data for AI analysis.

It must be:

- Reliable
- Modular
- Extensible
- Fault tolerant
- Provider independent

The scraper should never be tightly coupled to a single website.

---

# Design Philosophy

The scraper is not "Google Maps Scraper".

It is a Business Discovery Engine.

It should support multiple providers.

Example

Business Discovery

↓

Google Maps

↓

JustDial

↓

IndiaMART

↓

Sulekha

↓

Yellow Pages

↓

Yelp

↓

Facebook

↓

LinkedIn Company Pages

↓

Company Website

↓

Government Directories

↓

Future Providers

Each provider is interchangeable.

---

# Scraper Pipeline

User Search

↓

Queue Job

↓

Provider Resolver

↓

Scraper Provider

↓

Raw Business Records

↓

Normalizer

↓

Duplicate Detector

↓

Website Crawler

↓

Contact Extractor

↓

Technology Detector

↓

Content Cleaner

↓

AI Analyzer

↓

Opportunity Scorer

↓

MongoDB

---

# Architecture

Never create one large scraper.

Instead divide into services.

```

services/

scraper/

providers/

google-maps.provider.ts

justdial.provider.ts

indiamart.provider.ts

website.provider.ts

directory.provider.ts

crawler/

website-crawler.ts

contact-page.ts

about-page.ts

team-page.ts

career-page.ts

extractors/

email.extractor.ts

phone.extractor.ts

social.extractor.ts

address.extractor.ts

technology/

technology-detector.ts

cms-detector.ts

framework-detector.ts

normalizer/

lead-normalizer.ts

deduplicator.ts

browser/

browser-manager.ts

context-manager.ts

proxy-manager.ts

user-agent.ts

```

---

# Browser Manager

Never launch a browser for every request.

Instead

Worker Starts

↓

Browser Starts

↓

Contexts Created

↓

Jobs Processed

↓

Contexts Destroyed

↓

Browser Closed

Reuse browser instances whenever possible.

---

# Browser Configuration

Use Playwright Chromium.

Configuration should support

Headless

Headed

Proxy

Viewport

Locale

Timezone

Permissions

JavaScript Enabled

Images Disabled (optional)

Fonts Disabled (optional)

Resource Blocking

Everything configurable through environment variables.

---

# Context Strategy

Each scraping job gets its own browser context.

Never reuse cookies between organizations.

Always destroy context after completion.

---

# Search Flow

User enters

Restaurant

Delhi

↓

Provider

↓

Business Listings

↓

Business Detail

↓

Website

↓

Website Crawl

↓

AI Analysis

---

# Business Listing Extraction

Extract

Business Name

Website

Phone

Address

Category

Rating

Review Count

Coordinates (if available)

Business Hours

Images (optional)

Source URL

External ID (if available)

Never assume every field exists.

---

# Website Discovery

If provider supplies website

↓

Visit website

Else

↓

Skip website analysis

↓

Save partial lead

Do not fail scraping because a website does not exist.

---

# Website Crawl

Pages to visit

/

/contact

/contact-us

/about

/about-us

/team

/services

/products

/privacy

/careers

Limit crawl depth.

Never crawl entire websites.

---

# Contact Extraction

Extract

Emails

Phone Numbers

WhatsApp

Address

Contact Forms

Social Links

Business Hours

Never rely on AI for simple regex extraction.

Use deterministic extraction first.

---

# Social Extraction

Supported

LinkedIn

Facebook

Instagram

Twitter/X

YouTube

Pinterest

Threads (future)

TikTok (future)

Store normalized URLs.

---

# Technology Detection

Attempt to detect

React

Next.js

Angular

Vue

Laravel

WordPress

Shopify

Wix

Squarespace

Drupal

Magento

PHP

ASP.NET

Node.js

Cloudflare

Google Analytics

Meta Pixel

This data will later help sales teams.

---

# Website Quality Checks

Determine

HTTPS

Responsive

Contact Form

Booking System

Live Chat

Blog

SEO Basics

Page Speed (future)

Accessibility (future)

Store results for AI analysis.

---

# Content Cleaning

Before AI

Remove

Scripts

CSS

Navigation

Cookie Banner

Headers

Footers

Ads

Tracking Code

Compress whitespace.

Extract meaningful content only.

---

# Normalization

Normalize

Phone

Email

Domain

Address

Website

Business Name

City

Country

Prevent duplicate formatting.

---

# Duplicate Detection

Check

Google Place ID

↓

Domain

↓

Phone

↓

Email

↓

Business Name + City

Update existing record if found.

---

# Error Recovery

If website fails

↓

Continue

If AI fails

↓

Continue

If contact page missing

↓

Continue

If browser crashes

↓

Restart

Never stop entire job.

---

# Timeouts

Search

60 seconds

Business Page

30 seconds

Website

30 seconds

AI

60 seconds

Everything configurable.

---

# Rate Limiting

Random delays

Request throttling

Browser reuse

Future

Proxy Rotation

Never hammer target websites.

---

# Legal & Compliance

Only collect publicly available business information.

Do not attempt to access:

- Login-protected areas
- Private dashboards
- Paywalled content
- User accounts
- Personal messages

Honor applicable laws and website terms where required.

---

# Output Format

The scraper must return normalized data.

Example

Business

Contact

Location

Website

Socials

Technology

Website Quality

Source Metadata

Raw Content

The AI service should never receive raw Playwright objects.

---

# Future Providers

Architecture must support

Google Maps

JustDial

IndiaMART

Sulekha

Yelp

Yellow Pages

LinkedIn

Facebook

Government Registries

CSV Imports

CRM Integrations

Adding a provider should require creating one new provider class, without modifying the core pipeline.

---

# AI Implementation Instructions

When implementing:

1. Build provider-based architecture.
2. Reuse browser instances.
3. Use deterministic extraction before AI.
4. Keep crawler independent of providers.
5. Normalize all data.
6. Handle partial failures gracefully.
7. Never block the worker because one business fails.
8. Make adding future providers straightforward.