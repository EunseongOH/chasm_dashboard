# CHASM Dashboard — Claude Code Guidance

## Before editing

Read these documents first:

1. `docs/design-system/README.md`
2. `docs/design-system/00-context-and-principles.md`
3. `docs/design-system/01-color-system.md`
4. `docs/design-system/02-dashboard-ui-sample.md`
5. `docs/design-system/03-brand-assets.md`
6. `docs/design-system/04-spacing-and-radius.md`

Treat these documents as the current source of truth for established product/design decisions.

## Product context

CHASM Dashboard integrates artist data scattered across DSP/SNS services and helps Korean indie artists, labels, and distributors understand what changed and what to inspect next.

The MVP is Korean-first and must remain understandable to users who are not comfortable with data analysis.

Do not turn the product into a raw metrics browser.

Core information flow:

**Meaning → Context → Evidence → Detail**

The default metric presentation unit is:

**Value + Context + Comparison**

## Visualization rule

Do not prematurely create a separate hard-coded chart component for every DSP or metric.

Prefer reusable visualization grammar:
- title
- description/question
- primary value
- comparison context
- controls
- visualization
- legend
- annotations/events
- interpretation/insight
- action
- source/freshness

Actual chart modules will be fixed after real DSP schemas and use cases are confirmed.

## Number formatting

Never round or abbreviate all metrics globally.

Each metric may eventually define:
- unit
- precision
- canRound
- canAbbreviate
- comparisonType

Preserve exact values when precision matters.

Do not confuse % with %p.

## Color system

Use semantic tokens rather than arbitrary hex values.

Primary direction:
- Blue + Cool Neutral
- CHASM vivid blue: `#1393FD`
- Solid primary interaction candidate: `#075FBA`

Do not automatically use green for increases or red for decreases.

**Direction != Evaluation**

DSP brand color is not automatically chart series color.

## Spacing and radius

Follow `docs/design-system/04-spacing-and-radius.md`.

Key rules:
- Use the shared spacing scale instead of arbitrary one-off margins.
- Let parent layout `gap` and container `padding` manage spacing where possible.
- Top-level dashboard cards use R16 as the current proposed value.
- Standard card padding is 20px; compact KPI card padding is 16px.
- Card-to-card gap is 12px.
- Use smaller radii as component size/role becomes smaller.
- For visually adjacent nested rounded surfaces, use the concentric-radius principle: inner radius ≈ outer radius - inset.
- Do not create nested rounded boxes merely to group content; prefer spacing or dividers when no separate surface/interaction meaning exists.
- Do not give every nested element the same radius.

## Official brand asset

Use the official CHASM logo asset:

`assets/brand/chasm-logo.svg`

Do not redraw, approximate, or replace the logo with a generated symbol.

Current official SVG uses the original `#101010` fill. Preserve the original geometry and aspect ratio. Alternative logo color variants are not defined yet; do not invent them without a design decision.

When the logo appears next to visible "CHASM" text, it can be treated as decorative with an empty alt attribute. When used alone as the brand identifier, provide an appropriate accessible label.

## Prototype workflow

Current prototype:

`prototype/dashboard-sample/`

Development files:
- `index.html`
- `styles.css`
- `app.js`

Standalone local preview:
- `preview.html`

After modifying development files, rebuild the standalone preview:

Windows:
```bash
py scripts/build-preview.py
```

or:

```bash
python scripts/build-preview.py
```

Do not manually maintain duplicated CSS/JS inside `preview.html`.

## Local preview

Preferred during active development:
- VS Code Live Server, or
- `py -m http.server 8000`

Then open:
`http://localhost:8000/prototype/dashboard-sample/`

For a quick single-file check, open:
`prototype/dashboard-sample/preview.html`

## Design decision logging

When a design/product rule becomes stable or materially changes, update the relevant file in `docs/design-system/`.

Do not silently replace existing Stable decisions.

If a proposed change conflicts with a Stable rule, call out the conflict before implementing it.

## Current data warning

All prototype artist names and metrics are dummy data unless explicitly replaced with confirmed DSP data.

Do not infer real metric definitions, aggregation rules, causal relationships, or data availability from the prototype.
