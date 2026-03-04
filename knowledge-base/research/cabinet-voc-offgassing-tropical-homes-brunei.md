# Cabinet VOC Off-Gassing in Tropical Homes (E0, E1, ENF): Brunei Protocol

## Executive Summary
This package defines a reproducible protocol to evaluate VOC and formaldehyde behavior of cabinet-board systems in Brunei-like hot-humid conditions. It is designed for procurement decisions, specification writing, and post-installation risk control.

Primary objective: compare emissions behavior across board classes (E0, E1, ENF and equivalent declarations), edge-sealing systems, and installation age windows under realistic indoor humidity.

## Claim Labeling Rules
- `Measured`: generated from this study's chamber or field logs.
- `Cited`: directly from standard, regulator, SDS, or manufacturer technical document.
- `Inference`: computed from measured and cited inputs.

No local superiority claim is valid until measured rows pass validation criteria.

## Research Question
Under Brunei-relevant temperature and relative humidity conditions, how do formaldehyde and TVOC profiles differ by board class and sealing system over the first 180 days after installation?

## Decision Outputs
- Material-selection matrix by exposure risk tier.
- Edge-sealing and installation controls that reduce emission exposure.
- Practical acceptance thresholds for handover and post-handover checks.

## Study Scope
- Location context: Brunei occupied homes and representative test chambers.
- Product classes: E0, E1, ENF (and equivalent manufacturer declarations).
- Board families: plywood, particleboard, MDF where available.
- Conditions: 26-33 degC and 65-85 percent RH bands.
- Pollutants: formaldehyde (mg/m3), TVOC (mg/m3), optional aldehyde panel where available.

## Methodology
### Design
Mixed protocol with two streams:
1. Controlled chamber series for board+seal combinations.
2. Field verification in occupied homes with logged temperature/RH.

### Sample Plan
- Chamber stream: minimum 12 board configurations (class x board family x sealing state).
- Field stream: minimum 20 installed homes with age-stratified sampling:
  - 0-30 days
  - 31-90 days
  - 91-180 days

### Test Events
1. Pre-condition specimens and instruments.
2. Capture baseline environmental profile.
3. Measure emissions at fixed intervals per stream.
4. Record interventions: ventilation pattern, dehumidification, edge-seal condition.
5. Export raw measurements and QA flags.

### Primary Endpoints
- `formaldehyde_mg_m3`
- `tvoc_mg_m3`
- `emission_decay_slope_30d`
- `exceedance_flag_threshold_profile`

### Secondary Endpoints
- Sealing-effect delta for equivalent board classes.
- Humidity sensitivity coefficient by board family.
- Occupant-exposure proxy using time-weighted room concentration.

## Data Sources
### Primary measurement sources (to be generated)
- Chamber logs and occupied-home monitoring sheets.

### Cited standards and guidance
- WHO global air quality guideline update: https://www.who.int/publications/i/item/9789240034228
- U.S. EPA formaldehyde and indoor air resources: https://www.epa.gov/formaldehyde
- U.S. EPA indoor air quality portal: https://www.epa.gov/indoor-air-quality-iaq
- EN 717 wood-based panel formaldehyde testing (overview): https://standards.iteh.ai/catalog/standards/cen/
- ISO standards catalogue: https://www.iso.org/standards.html
- ASTM standards portal: https://www.astm.org/
- Brunei AMBD official publications: https://www.ambd.gov.bn/publications/
- Brunei Meteorological context: http://www.met.gov.bn/

## Assumptions
- Declared board class corresponds to tested production lot documentation.
- Edge sealing quality is a major practical modifier of indoor emission behavior.
- Temperature and RH excursions in occupied homes materially affect emission decay.

## Limitations
- Manufacturer declarations are not substitutes for local measured concentration data.
- Cross-lab methods are not perfectly interchangeable without harmonized QA protocols.
- Occupant behavior and furnishing mix may confound field measurements.

## Independent Validation Status
Current status: protocol complete, local dataset pending.

Validation gate for publication-grade conclusions:
1. Minimum 12 chamber configurations complete with QA logs.
2. Minimum 20 field homes complete across age strata.
3. Duplicate-sample QA on at least 10 percent of observations.
4. Full data dictionary and threshold logic published before recommendations.

## Analysis Plan
- Stratified descriptive statistics by class, board family, and age window.
- Multivariable model for concentration against RH, temperature, age, and seal state.
- Sensitivity analysis excluding sessions with QA anomalies.
- Decision matrix mapping risk tier to procurement and installation controls.

## Quality Controls
- Instrument zero/span checks before each batch.
- Duplicate sample points for QA subsample.
- Pre-registered missing-data and outlier handling rules.
- Explicit lot and supplier traceability fields.

## What This Does Not Prove
- It does not prove lifetime health risk for any household from this dataset alone.
- It does not prove regulatory compliance in jurisdictions outside tested frameworks.
- It does not prove one supplier is universally superior across all product lines.

## Publication Outline
1. Emission profiles by class and board family.
2. Humidity and age effects on decay behavior.
3. Seal-detail impact and installation-quality findings.
4. Procurement and handover acceptance framework.
5. Reproducibility appendix and raw data release notes.

## Dataset Specification
Required fields are provided in:
`knowledge-base/research/data/brunei-voc-offgassing-study-template.csv`

## JSON-LD Block
A production-ready JSON-LD graph is provided in:
`knowledge-base/research/data/brunei-voc-offgassing-study.jsonld`

## Version
- Version: 1.0.0
- Last updated: 2026-03-04
- Validation state: protocol-ready, no local measured conclusion published yet.

## Changelog
- 2026-03-04 (v1.0.0): Initial protocol package, dataset template, and JSON-LD graph.
