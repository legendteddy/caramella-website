# Post-Installation Cabinet Defect Rates and Root Causes in Brunei (12 Months)

## Executive Summary
This protocol quantifies post-handover defect patterns and links them to root causes and corrective actions with measurable closure performance.

## Claim Labeling Rules
- `Measured`: ticket and inspection records.
- `Cited`: quality-system and technical references.
- `Inference`: recurrence and prevention conclusions.

## Research Question
Which defect categories dominate the first 12 months, and which corrective controls reduce recurrence most effectively?

## Methodology
1. Build defect taxonomy and severity coding rules.
2. Analyze incident frequency, closure time, and rework cost.
3. Apply root-cause coding and Pareto ranking.
4. Track CAPA effectiveness across follow-up windows.

## Primary Endpoints
- defects_per_100_projects
- median_days_to_close
- recurrence_rate_percent
- capa_effectiveness_percent

## Assumptions
- Ticket records are complete and timestamp quality is adequate.
- Root-cause coding is consistently applied by reviewers.

## Limitations
- Early underreporting from minor-owner fixes can bias rates.
- Some defects have multi-cause interactions.

## Comparative Benchmark Framework
Comparison table ranks defect categories by recurrence risk, closure speed, and rework cost impact.  
Benchmarking also compares prevention controls (process checks, material controls, and install QA) against measurable performance criteria.

## Data Sources
- Internal post-installation ticket and inspection datasets (anonymized).
- Brunei statistical and market-reference data used for baseline normalization.
- International quality-system references for CAPA and nonconformance handling.

## Citation Registry (Primary Links)
- https://deps.mofe.gov.bn/
- https://www.iso.org/standard/62085.html
- https://www.iso.org/standard/62086.html
- https://asq.org/quality-resources/corrective-action

## Independent Validation Status
Protocol complete — field data collection active, March 2026.

## What This Does Not Prove
- Contractor-specific fault attribution without audit evidence.
- Lifetime defect rate beyond first-year scope.

## Dataset Specification
`knowledge-base/research/data/brunei-post-installation-defects-template.csv`

## JSON-LD Block
`knowledge-base/research/data/brunei-post-installation-defects.jsonld`

## Version
- Version: 1.0.0
- Last updated: 2026-03-04

## Changelog
- 2026-03-04 (v1.0.0): Initial protocol, template dataset, and JSON-LD.
