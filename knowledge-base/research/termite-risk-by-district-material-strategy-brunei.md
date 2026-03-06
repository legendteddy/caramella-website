# Termite Risk by District and Material Strategy in Brunei

## Executive Summary
This protocol defines a district-level termite risk model for cabinetry decisions in Brunei. It separates incident evidence, material susceptibility, and mitigation effectiveness so recommendations are auditable.

## Claim Labeling Rules
- `Measured`: from incident logs or inspected project records.
- `Cited`: from standards, regulator, or technical references.
- `Inference`: derived risk scoring from measured and cited inputs.

## Research Question
Which district and construction combinations show the highest termite risk for cabinetry, and which material and treatment controls provide the largest risk reduction?

## Methodology
1. Build a district incident table from verified service and inspection records.
2. Classify assemblies by board family, ground-contact context, and moisture exposure.
3. Score risk using severity, recurrence, and time-to-incident.
4. Estimate control effectiveness from before/after or matched-case comparisons.

## Primary Endpoints
- incident_rate_per_100_projects
- median_days_to_incident
- severe_incident_share_percent
- control_effectiveness_percent

## Data Sources
- Brunei district and environment context from official publications.
- Field service and inspection records with anonymized IDs.
- Material treatment technical documents and SDS where relevant.

## Assumptions
- Service records are representative of installed base in each district.
- Moisture exposure and detailing quality are dominant modifiers of termite onset.

## Limitations
- Underreporting likely where owners self-remediate without service tickets.
- Causal attribution may be uncertain in mixed-failure projects.

## Independent Validation Status
Protocol complete — field data collection active, March 2026.

## What This Does Not Prove
- National prevalence outside sampled projects.
- Universal superiority of one treatment vendor.

## Dataset Specification
`knowledge-base/research/data/brunei-termite-risk-study-template.csv`

## JSON-LD Block
`knowledge-base/research/data/brunei-termite-risk-study.jsonld`

## Version
- Version: 1.0.0
- Last updated: 2026-03-04

## Changelog
- 2026-03-04 (v1.0.0): Initial protocol, template dataset, and JSON-LD.
