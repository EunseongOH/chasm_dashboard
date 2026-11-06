# CHASM Dashboard — Claude Code Guidance

## Before editing

Read these documents first:

1. `docs/design-system/README.md`
2. `docs/design-system/00-context-and-principles.md`
3. `docs/design-system/01-color-system.md`
4. `docs/design-system/02-dashboard-ui-sample.md`
5. `docs/design-system/03-brand-assets.md`
6. `docs/design-system/04-spacing-and-radius.md`
7. `docs/design-system/05-typography-and-card-anatomy.md`
8. `docs/design-system/06-surface-border-elevation.md`
9. `docs/design-system/07-layout-and-grid.md`
10. `docs/design-system/08-interaction-states-and-controls.md`
11. `docs/design-system/09-data-visualization-system.md`
12. `docs/design-system/10-table-and-ranking-system.md`
13. `docs/design-system/11-insight-and-annotation-system.md`
14. `docs/design-system/12-iconography-system.md`
15. `docs/design-system/13-content-and-microcopy-system.md`
16. `docs/design-system/14-accessibility-system.md`

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

## Accessibility system

Follow `docs/design-system/14-accessibility-system.md`.

Key rules:
- WCAG 2.2 AA is the CHASM product baseline.
- Accessibility is a cross-system requirement covering structure, keyboard, focus, contrast, reflow, charts, tables, dynamic status, motion, and content.
- Provide skip navigation for repeated sidebar/navigation blocks and mark the current destination with aria-current.
- Prefer native semantic HTML. Do not invent custom ARIA widgets when button/link/select/table/details already fit.
- All meaningful functions must work with keyboard only and preserve a logical focus order.
- Keep the 2px blue-700 focus ring. Do not remove focus outlines.
- Minimum target is 24×24 CSS px; CHASM defaults remain 32/40px where possible.
- Meaningful small text uses neutral-600 or stronger on light surfaces. neutral-500 is not a normal 11–14px text token.
- Meaningful graphical objects such as chart lines and functional icons target at least 3:1 contrast.
- Color must not be the sole carrier of state, series identity, direction, or status.
- Respect prefers-reduced-motion; smooth scrolling and nonessential transitions must degrade to instant/minimal behavior.
- Tooltip information must be available on hover and keyboard focus, dismissible with Escape, and programmatically associated with the trigger.
- Dynamic changes that users need to know without focus movement should use a polite live status region.
- Complex charts need both a concise accessible summary and an exact data-table path generated from the same data source.
- Do not make every dense chart point a Tab stop by default; provide summary/table access unless a deliberate keyboard-explorable chart pattern is built.
- Design for 200% text zoom and 320 CSS px / 400% reflow; genuine two-dimensional comparison workspaces may use intentional horizontal scrolling.
- Production readiness requires manual keyboard, zoom/reflow, forced-colors, and screen-reader testing. Static/code inspection is not sufficient.
- Prototype-only dead controls or missing destinations are not production-ready even if visually polished.

Design-system accessibility lab:
`prototype/design-system-lab/accessibility.html`

## Content and microcopy system

Follow `docs/design-system/13-content-and-microcopy-system.md`.

Key rules:
- UI copy is part of data interpretation; prefer precise context over promotional language.
- Analytical dashboard sentences use Korean 합니다체. Labels, headings, and controls use short noun/verb phrases without periods.
- Do not mix 해요체 and 합니다체 inside the same analytical surface.
- Use 증가/감소 primarily for quantity/count changes; use 상승/하락 for rate, rank, index, or level when appropriate.
- Avoid generic “성장” as a direction label unless it is an actual defined metric or evaluative context is justified.
- Distinguish 이전 기간 대비, 전월 대비, and event-specific baselines such as 발매 전 4주 평균 대비.
- Keep % and %p distinct.
- Prefer plain Korean over analytics jargon; translate terms such as baseline, anomaly, contribution, and leading signal when the technical term adds no value.
- Button/link labels should reveal the destination or outcome: 근거 보기, 플랫폼별 보기, 발매 전후 비교, 필터 초기화. Avoid generic 자세히/확인/실행 when more specific wording is possible.
- Tooltip copy should add definition, limitation, or rationale rather than repeat the label.
- Separate empty states by cause: not connected, connected but no data, no filter results, and not applicable.
- Error copy should state the problem, impact, and next action.
- Keep Partial, Stale, and Estimated data wording distinct.
- Avoid evaluative adjectives such as “좋은”, “폭발적”, “성공적” unless a benchmark/goal makes the evaluation supportable.
- Product terminology must stay consistent. The current metric/entity glossary is Proposed until real DSP schema/entity mapping is validated.

Design-system content lab:
`prototype/design-system-lab/content-microcopy.html`

## Iconography system

Follow `docs/design-system/12-iconography-system.md`.

Key rules:
- Icons support meaning; they do not replace clear labels by default.
- Use one coherent SVG icon style. Do not mix Unicode glyphs, emoji, icon fonts, and multiple icon families.
- Use Regular/outline system icons as the default. Filled variants are reserved for selected/high-emphasis cases when they add value.
- Current primitive sizes are 12 / 16 / 20 / 24 / 32px; 20px is the default system/navigation icon size.
- Keep glyph size separate from hit target size: default icon-only target 40×40, compact 32×32.
- Functional icons should generally use neutral-600 or stronger; neutral-400 is decorative-only on light surfaces.
- Selected/action icons may use blue-700. Metric direction must not inherit success/error semantic colors automatically.
- System icons, DSP brand logos, artwork, and avatars are different primitives and must not share the same treatment rules.
- Do not add icons to every card heading for decoration.
- Icon-only actions need an accessible name; tooltip text is not a substitute for aria-label.
- With a visible text label, SVG icons are normally aria-hidden and inherit currentColor.
- Use semantic product aliases such as nav.dashboard or action.export so the underlying asset can change later.
- Prototype uses inline SVG with shared currentColor/stroke tokens. Final external icon library selection is Deferred.

Design-system icon lab:
`prototype/design-system-lab/iconography.html`

## Insight and annotation system

Follow `docs/design-system/11-insight-and-annotation-system.md`.

Key rules:
- Separate Observation, Comparison, Pattern/Signal, Interpretation/Hypothesis, and Recommendation/Action.
- Do not collapse direction, importance, evidence level, and alert severity into one color or score.
- Direction != Evaluation and Signal != Cause.
- Do not use arbitrary numeric confidence scores by default.
- Deterministic observations/comparisons may use direct factual language; interpretations require uncertainty language.
- Prefer explicit labels like “신호”, “가능한 해석”, or “다음 확인” when epistemic status could otherwise be confused.
- Provide evidence through progressive disclosure: period, baseline, source, calculation, related event, and freshness when available.
- Link insights back to supporting charts, periods, series, events, or table rows whenever possible.
- Event/chart annotations are factual context; do not place causal claims directly inside the plot.
- Keep analytical insights separate from system/data alerts. Amber/red alert tone is not for metric direction.
- When signals conflict, show the contradiction rather than forcing one positive/negative conclusion.
- When evidence is insufficient, explain that limitation and offer a next inspection path instead of inventing a cause.
- Prefer exploration actions inside the product before strong operational recommendations.
- If AI/LLM later generates interpretations or recommendations, identify that generation source and provide an explainability path.

Design-system insight lab:
`prototype/design-system-lab/insight-annotation.html`

## Table and ranking system

Follow `docs/design-system/10-table-and-ranking-system.md`.

Key rules:
- Separate Data Table, Rich Resource Table, Ranking Preview, and Comparison Matrix by task.
- Prefer native HTML table semantics for read/sort/link/select use cases; do not turn a normal analytics table into an ARIA spreadsheet grid.
- Primary identity columns align left; comparable numeric and delta columns align right with tabular numerals.
- Use exact values in detail tables; compact values are acceptable in ranking previews.
- Keep rank change formatting separate from metric delta formatting because lower rank numbers indicate improvement.
- Use Compact 40px, Standard 48px, and Rich 64px row density as current proposed variants.
- Track/album resource rows may include 32–40px artwork plus title and one secondary metadata line.
- Assign responsive column priorities: P0 identity, P1 primary metric, P2 comparison/context, P3 supporting metadata.
- On narrow layouts, recompose important row information into a list pattern instead of endlessly squeezing columns.
- Sortable headers get explicit controls and aria-sort; static headers remain non-interactive.
- Keep sort state independent of wide-only headers so narrow layouts can expose the same sort through another control.
- Ranking previews default to roughly 5–6 visible rows and link to a full table for long-tail exploration.
- Use pagination/cursor navigation for long analytical tables; do not default to infinite scroll.
- Add selection only when a meaningful row/bulk action exists.
- Use horizontal overflow only for genuine multi-metric comparison workspaces; consider a sticky identity column there.

Design-system table lab:
`prototype/design-system-lab/table-ranking.html`

## Data visualization system

Follow `docs/design-system/09-data-visualization-system.md`.

Key rules:
- Reuse chart grammar, not one rigid visual template.
- Axis typography/grid tokens may be shared, but domain/reference behavior must follow analytical meaning.
- Absolute bar comparisons start at zero.
- Line charts may use focused non-zero domains only when the question is trend shape, not absolute magnitude.
- Signed deltas keep a visible zero baseline.
- Cross-platform comparisons require comparable metric definitions; otherwise use small multiples, indexed comparison, or change rates.
- Indexed comparison uses an explicit baseline such as 100 and never mixes raw and indexed values on one axis.
- Dual axes are not a default pattern; prefer small multiples or indexed comparison.
- Missing data breaks a line. Only genuinely estimated/interpolated data may use an explicitly labeled dashed segment.
- One-series charts do not need a legend. Prefer direct labels when they do not collide; use a compact legend when they do.
- Dense series remove point markers before shrinking type.
- Time-series default to horizontal major grid lines and no vertical grid unless the analysis requires both dimensions.
- Event annotations are factual time context, not causal claims.
- Do not rely on color alone; preserve labels/position/line style/markers where needed.
- Axis labels may be compact, but tooltips/details should show exact values when available.
- Responsive degradation should reduce ticks, switch direct labels to legends, cluster annotations, or reflow the card before shrinking meaningful text.

Design-system chart lab:
`prototype/design-system-lab/data-visualization.html`

## Interaction states and controls

Follow `docs/design-system/08-interaction-states-and-controls.md`.

Key rules:
- Treat Default, Hover, Pressed, Focus-visible, Selected, Disabled, and Loading as distinct states.
- Focus and Selected must never be conflated.
- Use the 2px blue-700 external focus ring; do not remove focus outlines.
- Default controls are 40px high; compact dashboard controls are 32px high.
- Icon-only controls need an accessible name and at least a 32px target; prefer 40px.
- Primary actions are limited to the most important action in the current scope.
- Tabs navigate views; Segmented controls switch modes within the same context.
- Select changes a persistent value; Menu presents actions.
- Reuse shared control tokens/classes before inventing new per-component states.
- Disabled controls should use explicit disabled tokens and explain unavailable prerequisites when useful.
- Verify keyboard interaction for custom controls.

Design-system interaction lab:
`prototype/design-system-lab/interaction-controls.html`

## Layout and grid

Follow `docs/design-system/07-layout-and-grid.md`.

Key rules:
- Use a 12-column page grid for dashboard composition, not inside every component.
- Default layout gutter is 16px.
- Current proposed content max-width is 1440px.
- >=1280px: full sidebar; 1024–1279px: 72px icon rail.
- >=1024px: main chart + insight may use 8+4 columns.
- <1024px: stack chart and insight instead of squeezing them.
- 768–1023px: KPI uses 6+6 and supporting modules use two-column reflow.
- <768px: sidebar becomes a top brand/header structure.
- Responsive decisions should be based on content minimum widths, not device labels alone.
- Reflow before hiding meaningful data.
- Do not shrink chart labels or meaningful text to compensate for insufficient width.

## Surface, border, and elevation

Follow `docs/design-system/06-surface-border-elevation.md`.

Key rules:
- Default dashboard cards use white/default surface + 1px border + no shadow.
- Shadow indicates actual elevation/overlap, not a generic card style.
- Use surface color, border, and shadow deliberately; do not stack all three aggressively just to create separation.
- Use subtle/inset surface for nested grouping instead of creating another bordered/shadowed card.
- Tooltip/popover/dropdown/modal may use elevation shadows because they actually float above content.
- Hover does not automatically mean elevation.
- Table/list rows use subtle dividers rather than individual rounded cards.
- Sidebar is a structural surface separated by a border, not a floating surface.

## Typography and card anatomy

Follow `docs/design-system/05-typography-and-card-anatomy.md`.

Key rules:
- Do not solve dashboard density by shrinking meaningful text to 9–10px.
- Prefer 12px+ for meaningful supporting/meta text, 13–14px for normal UI text, 16px for card titles, and 28px+ for KPI values.
- Treat line-height as part of spacing; title/description groups often need only 0–2px explicit gap.
- Use distinct card anatomies for KPI, Analysis/Chart, Insight, and Table/Ranking surfaces.
- KPI cards are compact (16px padding); standard analysis/insight cards are comfortable (20px padding).
- Table bodies may run edge-to-edge inside a card while keeping row content aligned to the card header.
- Preserve left-edge alignment across header copy, legend/body content, and table rows unless the visualization itself requires different plot margins.
- Use tabular numerals for comparable numeric data.
- Korean readability takes priority over maximizing raw information density.

## Spacing and radius

Follow `docs/design-system/04-spacing-and-radius.md`.

Key rules:
- Use the shared spacing scale instead of arbitrary one-off margins.
- Let parent layout `gap` and container `padding` manage spacing where possible.
- Top-level dashboard cards use R16 as the current proposed value.
- Standard card padding is 20px; compact KPI card padding is 16px.
- Layout-level card/module gap is 16px. Use 12px for compact component groups, not the main page grid.
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
