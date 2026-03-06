# Indoor Air Quality During Cooking in Brunei Homes

## Executive Summary
This package defines a publishable research protocol for measuring cooking-related indoor air quality (IAQ) in Brunei homes. It is built for replication, transparent assumptions, and decision-useful outcomes.

Primary goal: quantify short-duration pollution spikes (PM2.5 and NO2) across kitchen configurations and ventilation behaviors, then convert findings into practical design guidance.

## Claim Labeling Rules
- `Measured`: Generated from instrument logs in this study.
- `Cited`: Taken from external primary sources.
- `Inference`: Derived from measured and cited evidence.

No claim in this document should be treated as measured local evidence until dataset rows are collected and validated.

## Research Question
How much do PM2.5 and NO2 concentrations rise during typical cooking events in Brunei homes, and which ventilation controls produce the largest reduction in peak and one-hour exposure?

## Decision Outputs
- Minimum viable ventilation strategy for common kitchen layouts.
- Expected reduction ranges for interventions (hood use, window strategy, door state).
- Practical trigger thresholds for homeowner action.

## Study Scope
- Geography: Brunei-Muara, Belait, Tutong, and Temburong.
- Home types: detached, semi-detached, terrace, apartment.
- Kitchen types: wet kitchen, dry kitchen, hybrid/open-plan.
- Fuels: gas, induction, electric coil (if present).
- Pollutants: PM2.5 (ug/m3), NO2 (ppb).
- Environmental covariates: temperature, relative humidity, occupancy, window/door state.

## Methodology
### Design
Prospective observational field study with repeated sessions per home.

### Sample
- Target: 30 homes minimum.
- Sessions: 3 sessions per home (breakfast, lunch, dinner windows where possible).
- Total events: 90+ cooking sessions.

### Session Protocol
1. Place monitors at breathing-zone height in kitchen and adjacent living area.
2. Record 15-minute pre-cooking baseline.
3. Record full cooking period with event markers:
   - Burner start
   - Hood ON/OFF
   - Window OPEN/CLOSED
   - Door OPEN/CLOSED
4. Record 60-minute decay period after cooking stops.
5. Export timestamped logs and event notes.

### Primary Endpoints
- `pm25_peak_ug_m3`: maximum PM2.5 during session.
- `pm25_1h_mean_ug_m3`: one-hour mean from cook start.
- `no2_peak_ppb`: maximum NO2 during session.
- `time_to_pm25_baseline_min`: minutes to return within 10 percent of pre-cook baseline.

### Secondary Endpoints
- Adjacent-area transfer ratio.
- Effect size by intervention state (hood/window/door).
- Fuel-specific risk profile.

## Data Sources
### Primary measurement sources (to be generated)
- Study logger exports and structured event logs.

### Cited standards and guidance
- WHO Air Quality Guidelines: https://www.who.int/publications/i/item/9789240034228
- WHO Household Air Pollution: https://www.who.int/health-topics/air-pollution#tab=tab_3
- U.S. EPA indoor air quality resources: https://www.epa.gov/indoor-air-quality-iaq
- U.S. EPA PM basics: https://www.epa.gov/pm-pollution/particulate-matter-pm-basics
- ASHRAE indoor environmental quality resources: https://www.ashrae.org/technical-resources/indoor-air-quality
- CDC indoor environmental quality overview: https://www.cdc.gov/niosh/topics/indoorenv/
- Brunei Darussalam Meteorological Department: http://www.met.gov.bn/
- AMBD official publications index: https://www.ambd.gov.bn/publications/

## Assumptions
- Sensor placement is representative of occupant exposure in each zone.
- Participant behavior in logged sessions reflects typical cooking behavior.
- Weather and occupancy variability are partially controlled through repeated sessions.

## Limitations
- Observational design cannot isolate all confounders with causal certainty.
- Low-cost sensors may drift; calibration checks are required.
- Small sample subsets (for rare kitchen types) may widen uncertainty bands.

## Independent Validation Status
Current status: protocol complete — field data collection active, March 2026.

Validation gate for publication-quality conclusions:
1. At least 90 valid sessions.
2. Calibration check logs attached.
3. Outlier handling published before analysis.
4. Reproducible codebook and data dictionary released.

## Analysis Plan
- Descriptive: median, IQR, 95th percentile for each endpoint by kitchen type.
- Comparative: mixed-effects model with home-level random intercepts.
- Intervention effects: within-home delta for hood/window/door state changes.
- Robustness: sensitivity checks excluding sessions with instrument anomalies.

## Quality Controls
- Clock sync before each session.
- Duplicate monitor spot checks on 10 percent of sessions.
- Missing-data policy:
  - Keep rows with at least 80 percent valid minute-level readings.
  - Flag and document imputation where used.

## What This Does Not Prove
- It does not prove long-term disease risk from this dataset alone.
- It does not prove national prevalence outside sampled households.
- It does not prove one appliance brand is superior without controlled appliance trials.

## Publication Outline
1. Baseline exposure profile by kitchen type.
2. Peak and one-hour concentration comparisons.
3. Ventilation intervention effectiveness.
4. Design guidance and homeowner action thresholds.
5. Reproducibility appendix and dataset release notes.

## Dataset Specification
Required fields are provided in:
`knowledge-base/research/data/brunei-iaq-cooking-study-template.csv`

## JSON-LD Block
A production-ready JSON-LD graph is provided in:
`knowledge-base/research/data/brunei-iaq-cooking-study.jsonld`

## Version
- Version: 1.0.0
- Last updated: 2026-03-04
- Validation state: protocol-ready, no local measured rows published yet.

## Changelog
- 2026-03-04 (v1.0.0): Initial editorial-grade protocol package, dataset template, and JSON-LD graph.
