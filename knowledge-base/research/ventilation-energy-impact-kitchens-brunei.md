# Energy Impact of Kitchen Ventilation Configurations in Brunei

## Executive Summary
This protocol estimates energy and cost impact of kitchen ventilation choices while preserving IAQ performance targets.

## Claim Labeling Rules
- `Measured`: meter and runtime logs.
- `Cited`: technical and standards references.
- `Inference`: modeled cost and efficiency outcomes.

## Research Question
Which ventilation configurations deliver acceptable IAQ with the lowest annual energy cost under Brunei operating conditions?

## Methodology
1. Collect runtime and power data for ventilation configurations.
2. Pair energy data with IAQ compliance indicators.
3. Model annualized cost using tariff scenarios.
4. Produce decision matrix by household profile.

## Primary Endpoints
- monthly_kwh
- monthly_cost_bnd
- iaq_compliance_rate_percent
- cost_per_compliant_hour_bnd

## Assumptions
- Electricity tariff assumptions are fixed per scenario.
- IAQ compliance threshold profile is predeclared.

## Limitations
- Seasonal occupancy behavior may shift runtime patterns.
- Appliance aging may alter power draw over time.

## Independent Validation Status
Protocol complete, local dataset pending.

## What This Does Not Prove
- Guaranteed utility bill outcome for every home.
- IAQ compliance outside defined threshold profile.

## Dataset Specification
`knowledge-base/research/data/brunei-kitchen-ventilation-energy-template.csv`

## JSON-LD Block
`knowledge-base/research/data/brunei-kitchen-ventilation-energy.jsonld`

## Version
- Version: 1.0.0
- Last updated: 2026-03-04

## Changelog
- 2026-03-04 (v1.0.0): Initial protocol, template dataset, and JSON-LD.
