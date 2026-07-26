---

# AI Module Structure

To keep the AI layer maintainable and provider-independent, all AI-related code should be isolated under a dedicated module.

```
server/
└── src/
    └── modules/
        └── lead-generation/
            └── services/
                └── ai/
                    ├── providers/
                    │   ├── provider.interface.ts
                    │   ├── gemini.provider.ts
                    │   ├── mistral.provider.ts
                    │   └── index.ts
                    │
                    ├── prompts/
                    │   ├── business-analysis.prompt.ts
                    │   ├── opportunity.prompt.ts
                    │   ├── website-audit.prompt.ts
                    │   ├── service-recommendation.prompt.ts
                    │   ├── lead-summary.prompt.ts
                    │   ├── proposal.prompt.ts
                    │   └── index.ts
                    │
                    ├── validators/
                    │   ├── business.schema.ts
                    │   ├── opportunity.schema.ts
                    │   ├── recommendation.schema.ts
                    │   ├── website-audit.schema.ts
                    │   └── index.ts
                    │
                    ├── transformers/
                    │   ├── ai-input.transformer.ts
                    │   ├── ai-output.transformer.ts
                    │   └── index.ts
                    │
                    ├── cache/
                    │   ├── ai-cache.service.ts
                    │   └── cache-key.ts
                    │
                    ├── telemetry/
                    │   ├── ai-metrics.service.ts
                    │   ├── token-usage.service.ts
                    │   └── latency.service.ts
                    │
                    ├── utils/
                    │   ├── prompt-builder.ts
                    │   ├── token-estimator.ts
                    │   ├── content-cleaner.ts
                    │   └── json-parser.ts
                    │
                    ├── ai.service.ts
                    ├── ai.factory.ts
                    ├── ai.constants.ts
                    ├── ai.types.ts
                    ├── ai.config.ts
                    └── index.ts
```

---

# Folder Responsibilities

## providers/

Contains integrations with every supported AI provider.

Responsibilities

- Call external AI APIs
- Handle authentication
- Retry failed requests
- Normalize provider responses
- Return standardized output

Business logic should never exist inside providers.

Every provider must implement the common interface.

---

## prompts/

Contains every AI prompt used by the application.

Each prompt should have a single responsibility.

Examples

business-analysis.prompt.ts

Analyzes business information.

opportunity.prompt.ts

Calculates opportunity score and reasoning.

website-audit.prompt.ts

Reviews website quality and identifies issues.

service-recommendation.prompt.ts

Maps detected pain points to agency services.

lead-summary.prompt.ts

Creates a concise lead summary for sales.

proposal.prompt.ts

Generates proposal recommendations for future use.

Prompt files should export reusable templates rather than dynamically constructing prompts throughout the codebase.

---

## validators/

Every AI response must be validated before it is accepted.

Validation should ensure

- Required fields exist
- Data types are correct
- Scores remain within allowed ranges
- Arrays contain expected values
- Unknown structures are rejected

Validation failures should trigger retry logic or manual review.

---

## transformers/

Transformers convert between internal models and AI models.

Responsibilities

Internal Lead

↓

AI Input

↓

Provider Response

↓

Normalized AI Result

↓

Database Model

This layer isolates business models from AI-specific formats.

---

## cache/

Responsible for preventing unnecessary AI requests.

Cache keys should include

- Provider
- Model
- Prompt Version
- Website Hash
- Domain

Cached responses may be reused when inputs have not changed.

---

## telemetry/

Tracks AI performance.

Metrics include

- Total Requests
- Successful Requests
- Failed Requests
- Average Latency
- Average Tokens
- Cost Estimates
- Cache Hit Rate

This information should feed future analytics dashboards.

---

## utils/

Contains reusable helper utilities.

Examples

Prompt Builder

Creates final prompts.

Token Estimator

Estimates token usage before sending requests.

Content Cleaner

Removes unnecessary website content.

JSON Parser

Safely parses AI responses and handles malformed JSON.

---

## ai.factory.ts

Responsible for selecting the configured AI provider.

Example flow

```
Environment Variable

↓

Factory

↓

Gemini Provider

OR

Mistral Provider

↓

AI Service
```

The remainder of the application should never know which provider is being used.

---

## ai.service.ts

Acts as the orchestration layer.

Responsibilities

- Prepare AI input
- Select provider
- Execute prompts
- Validate responses
- Cache results
- Handle retries
- Return standardized business intelligence

This service coordinates all AI operations while keeping providers isolated.

---

## ai.types.ts

Defines shared TypeScript types.

Examples

BusinessAnalysis

OpportunityAnalysis

WebsiteAudit

Recommendation

AIProvider

TokenUsage

These types should be shared across providers, validators, and services.

---

## ai.constants.ts

Contains

- Default model names
- Retry limits
- Timeout values
- Prompt versions
- Confidence thresholds
- Opportunity score limits

Avoid hardcoding these values elsewhere.

---

## ai.config.ts

Centralizes AI configuration.

Configuration should include

- Default Provider
- Default Model
- Maximum Tokens
- Temperature
- Retry Count
- Timeout
- Cache TTL

No provider-specific configuration should be scattered throughout the codebase.

---

## index.ts

Exports the public API of the AI module.

Other modules should import from this single entry point rather than accessing internal files directly.

---

# AI Module Design Principles

The AI module must follow these principles.

- Single Responsibility
- Provider Independence
- Strict Schema Validation
- Prompt Versioning
- Cached Responses
- Reusable Utilities
- Configurable Providers
- Minimal Token Usage
- Easy Testability
- Future Extensibility

The rest of the application should communicate only with `ai.service.ts`, while provider implementations, prompt management, validation, caching, telemetry, and utilities remain internal to the AI module.