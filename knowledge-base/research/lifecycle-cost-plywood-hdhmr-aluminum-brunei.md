# 10-Year Lifecycle Cost of Plywood, HDHMR, and Aluminum-Frame Cabinet Systems in Brunei

## Executive Summary
This protocol estimates total ownership cost over 10 years for major cabinet system types under Brunei climate and maintenance conditions.

## Claim Labeling Rules
- `Measured`: project cost and maintenance records.
- `Cited`: published rates, standards, and supplier documentation.
- `Inference`: modeled cost outputs.

## Research Question
Which cabinet system minimizes 10-year total cost after accounting for installation, maintenance, defect risk, and replacement events?

## Methodology
1. Build cost library (installation, maintenance, repair, replacement).
2. Estimate failure probability by system and environment.
3. Compute discounted 10-year cost per scenario.
4. Perform sensitivity analysis for uncertainty ranges.

## Primary Endpoints
- tco_10y_bnd
- maintenance_share_percent
- failure_cost_share_percent
- break_even_year_vs_baseline

## Assumptions
- Discount-rate and inflation scenarios are predeclared.
- Usage profile tiers (light, medium, heavy) capture operational diversity.

## Limitations
- Market prices and labor rates shift over time.
- Some failure rates may rely on short historical windows.

## Comparative Benchmark Framework
Benchmark table compares plywood, HDHMR, and aluminum-frame systems on durability performance, maintenance cost, water-risk tolerance, and repair complexity trade-offs.  
Criteria are weighted by use-case tier (owner-occupied, rental, and high-turnover households) to avoid single-scenario bias.

## Data Sources
- Brunei Department of Economic Planning and Statistics (DEPS): CPI and household spending context.
- Brunei Darussalam Central Bank (BDCB): financing and macro indicators used in sensitivity ranges.
- International standards and material technical literature for panel behavior and moisture exposure.

## Citation Registry (Primary Links)
- https://deps.mofe.gov.bn/
- https://www.bdcb.gov.bn/
- https://www.iso.org/standard/75741.html
- https://www.fpl.fs.usda.gov/

## Independent Validation Status
Protocol complete, local dataset pending.

## What This Does Not Prove
- Exact project quote for any single home.
- Future price certainty beyond modeled scenarios.

## Dataset Specification
`knowledge-base/research/data/brunei-lifecycle-cost-cabinet-systems-template.csv`

## JSON-LD Block
`knowledge-base/research/data/brunei-lifecycle-cost-cabinet-systems.jsonld`

## Version
- Version: 1.0.0
- Last updated: 2026-03-04

## Changelog
- 2026-03-04 (v1.0.0): Initial protocol, template dataset, and JSON-LD.
