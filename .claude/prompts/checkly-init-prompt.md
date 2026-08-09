Initialize Checkly in this project at /Users/joewebber/projects/checkly-challenge.

This project does NOT monitor its own codebase. It monitors a remote instance
of the OpenTelemetry Demo (the "Astronomy Shop" e-commerce app) running at:

http://206.189.232.100:8080

Set up 3 checks, tailored to a specific scenario: a prospect who has
Grafana/metrics/logs/traces already, but no synthetic monitoring, and has had
customers discover bugs before their internal alerting did.

1. An API check hitting the Product Catalog service's list-products endpoint.
   High frequency (every 1 min). This is the cheap canary that should fail
   fast and isolate backend health before anything else does.

2. An API check hitting the Cart/Checkout backend directly (add item to cart),
   bypassing the UI. Goal: isolate "checkout logic is broken" from "frontend
   rendering is broken."

3. A browser check (Playwright) covering the full revenue path: browse to a
   product, add it to cart, complete checkout, confirm success. This should
   be written as a standard @playwright/test spec so it's reusable outside
   Checkly too.

Use the checkly/constructs package (current syntax — defineConfig from
"checkly", ApiCheck/AssertionBuilder from "checkly/constructs"), TypeScript,
runtimeId 2025.04, locations us-east-1 and eu-west-1.

Do not scaffold more than these 3 checks. Do not add checks for services
outside the core browse -> cart -> checkout path (skip recommendation,
currency, shipping, ad service, email, quote, accounting, fraud-detection —
none of those are relevant to this prospect's stated gap).

I'll provide the exact API routes, request payloads, and page selectors after
inspecting the running app's network traffic — use TODO placeholders for
those until I confirm them, don't guess at exact paths.
