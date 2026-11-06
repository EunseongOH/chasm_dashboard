# CHASM Accessibility System — v0.1

> 상태: Stable principles + Proposed implementation values  
> 목표 기준: WCAG 2.2 Level AA를 제품 기본선으로 삼고, 비용이 낮고 제품 품질에 도움이 되는 일부 AAA 기준은 내부 품질 기준으로 선제 적용한다.

---

# 0. Why Accessibility Is a System

접근성은 마지막 QA 체크리스트가 아니다.

CHASM에서는 다음이 모두 같은 시스템에 속한다.

- 정보 구조
- keyboard
- focus
- color / contrast
- responsive reflow
- chart alternative
- table semantics
- icon label
- tooltip
- dynamic status
- motion
- content language

따라서 개별 component가 “접근 가능해 보인다”는 이유만으로 충분하지 않다.

사용자가 처음부터 끝까지:
- 정보를 찾고
- 상태를 이해하고
- 행동하고
- 결과를 확인

할 수 있어야 한다.

---

# 1. External Baseline

CHASM 제품 기본선:

```text
WCAG 2.2 AA
```

특히 Dashboard에서 중요하게 보는 success criteria:

- 1.3.1 Info and Relationships
- 1.4.3 Contrast (Minimum)
- 1.4.4 Resize Text
- 1.4.10 Reflow
- 1.4.11 Non-text Contrast
- 1.4.13 Content on Hover or Focus
- 2.1.1 Keyboard
- 2.1.2 No Keyboard Trap
- 2.4.1 Bypass Blocks
- 2.4.3 Focus Order
- 2.4.7 Focus Visible
- 2.4.11 Focus Not Obscured (Minimum)
- 2.5.8 Target Size (Minimum)
- 3.3.2 Labels or Instructions
- 4.1.2 Name, Role, Value
- 4.1.3 Status Messages

추가 내부 품질 목표:
- 2.4.13 Focus Appearance 수준의 2px / 3:1 focus indicator를 가능하면 유지

References:
- https://www.w3.org/TR/WCAG22/
- https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- https://www.w3.org/WAI/planning/arrm/front-end/
- https://fluent2.microsoft.design/accessibility

---

# 2. Perceivable / Operable / Understandable / Robust

감사 구조는 WCAG의 네 원칙을 따른다.

## Perceivable
정보가 색상·이미지·차트 하나에만 묶이지 않는가?

## Operable
모든 핵심 기능을 keyboard만으로 사용할 수 있는가?

## Understandable
상태·라벨·오류·행동 결과가 예측 가능한가?

## Robust
semantic HTML과 ARIA가 assistive technology에서 의미를 유지하는가?

---

# 3. Semantic Structure

기본 page landmarks:

```text
Skip link
Sidebar / Navigation
Main
  H1
  Section H2...
```

## Rules

- page당 primary `main` landmark 하나
- page topic을 나타내는 `h1` 하나
- section hierarchy를 순서대로 유지
- visual size 때문에 heading level을 건너뛰지 않음
- navigation에는 accessible label
- 현재 navigation destination은 `aria-current="page"`
- repeated navigation을 건너뛸 수 있는 skip link 제공

---

# 4. Skip Navigation

Desktop sidebar처럼 반복 navigation이 앞에 있는 화면에는:

```text
본문으로 건너뛰기
```

skip link를 제공한다.

기본:
- 평소에는 visually hidden/off-screen
- keyboard focus 시 좌상단에 명확하게 표시
- main landmark로 이동

Prototype target:
`#mainContent`

---

# 5. Keyboard Baseline

모든 실제 기능은 keyboard만으로 완료 가능해야 한다.

## Native first

가능하면:
- button
- a
- select
- input
- details
- table

등 native semantics를 사용한다.

`div onclick` + custom tabindex 방식은 피한다.

## Minimum

- Tab / Shift+Tab: logical sequence
- Enter / Space: button activation
- Escape: temporary popup dismiss
- Arrow keys: composite controls에서 pattern에 맞게 사용
- positive tabindex 금지
- focus trap 금지

---

# 6. Focus Order

DOM order와 visual reading order가 최대한 일치해야 한다.

CHASM Dashboard 기본:

```text
Skip link
Sidebar navigation
Page header controls
Summary
KPI controls
Chart controls
Insights
Supporting modules
```

CSS grid로 시각 순서만 재배치해 keyboard 순서와 불일치시키지 않는다.

---

# 7. Focus Visible

기존 Interaction System을 유지한다.

```css
outline: 2px solid #075FBA;
outline-offset: 2px;
```

현재 blue-700은 light surfaces에서 약 5.7–6.3:1의 차이를 제공한다.

## Rules

- `outline: none` 금지
- focus와 selected 분리
- focus ring이 component fill에 묻히지 않게 offset 유지
- shadow만으로 focus를 표현하지 않음

---

# 8. Focus Not Obscured

Sticky sidebar/header/footer, popover, toast가 focused element를 완전히 가리지 않아야 한다.

현재 Dashboard:
- sidebar는 horizontal content를 밀어내므로 기본적으로 문제 없음
- 향후 sticky top header / toast 도입 시 반드시 확인

Overlay를 닫은 뒤 focus는 logical trigger로 돌아가야 한다.

---

# 9. Target Size

WCAG 2.2 AA minimum:

```text
24 × 24 CSS px
```

CHASM 내부 기본:

- default control: 40px
- compact control: 32px
- small info target: minimum 24px

12–20px glyph 자체를 hit target으로 사용하지 않는다.

---

# 10. Text Contrast

WCAG AA:

- normal text: 4.5:1
- large text: 3:1

CHASM에서 의미 있는 11–14px text는 normal text로 본다.

## Audit finding

기존:
```text
fg-tertiary = neutral-500 #7C8796
white contrast ≈ 3.64:1
```

→ 작은 설명/metadata text에 AA 미달.

따라서 의미 있는 tertiary text:

```text
neutral-600 #5E6978
white ≈ 5.57:1
canvas ≈ 5.28:1
```

로 조정한다.

neutral-500은:
- low-priority non-text icon
- optional decorative graphical cue

정도로 제한한다.

Disabled controls는 WCAG contrast exemption이 존재하지만, 가능한 범위에서 readable 상태를 유지한다.

---

# 11. Non-text Contrast

필수 UI component와 의미 있는 graphical object는 adjacent color 대비 3:1 이상을 목표로 한다.

대상:
- functional icons
- focus indicators
- chart data lines
- selected control boundaries where needed
- meaningful status symbols

## Current chart audit

기존:
- Blue #1393FD ≈ 3.17:1 on white — pass, margin small
- Teal #2EAD75 ≈ 2.86:1 — fail
- Purple #9D6ADE ≈ 3.78:1 — pass
- Amber #D99A13 ≈ 2.45:1 — fail
- Slate #5C6F8A ≈ 5.13:1 — pass

Proposed accessible adjustment:
- Teal → #278F63 ≈ 4.04:1
- Amber → #B7790D ≈ 3.65:1

최종 palette는 Chart Lab에서 identity/discriminability도 함께 검증한다.

---

# 12. Color Is Never the Only Signal

예:
- line color + legend name
- selected + background + text
- warning icon + text
- delta arrow + value

금지:
- green = good, red = bad만으로 의미 전달
- platform identity를 색상 하나에 의존
- selected state를 color만 바꿔 표현

---

# 13. Reflow / Zoom

WCAG 1.4.10 기준을 제품 기본선으로 적용한다.

목표:
- 320 CSS px 수준까지 핵심 정보/기능 손실 없이 reflow
- 일반 content는 2차원 scroll을 요구하지 않음
- genuinely two-dimensional comparison table/chart는 예외적으로 horizontal scroll 가능

## CHASM rules

- chart + insight는 squeeze보다 stack
- table은 column priority/reflow 우선
- comparison matrix만 horizontal scroll 허용
- fixed pixel font 축소로 해결하지 않음
- 200% text zoom에서도 clipping 없어야 함

실제 browser zoom 200% / 400% 테스트는 manual QA 필수.

---

# 14. Text Spacing Resilience

Custom user styles가:
- line height
- letter spacing
- word spacing
- paragraph spacing

을 늘려도 content clipping이 없어야 한다.

따라서:
- fixed text container height 지양
- line clamp는 primary meaning 손실 여부 확인
- button은 min-height 사용
- text wrap 허용

---

# 15. Reduced Motion

Motion은 정보 접근의 필수 조건이 되어서는 안 된다.

`prefers-reduced-motion: reduce`에서:

- smooth scroll → instant
- nonessential transition → 제거/최소화
- decorative animation → 제거

Loading spinner처럼 상태 전달에 필요한 animation도 대체 text/status를 갖는다.

---

# 16. Tooltip Accessibility

Tooltip은:
- hover
- keyboard focus

둘 다 열려야 한다.

Trigger는 설명과 programmatically 연결한다.

권장:
```html
<button aria-describedby="metricHelp">...</button>
<span id="metricHelp" class="sr-only">...</span>
```

Visual tooltip은 같은 설명을 표시할 수 있다.

## Hover/focus behavior

WCAG 1.4.13을 고려해:
- Escape로 dismiss
- pointer가 tooltip 위로 이동해도 읽을 수 있음
- focus를 강제로 다른 곳으로 보내지 않음
- trigger blur 시 dismiss 가능

Tooltip 내부에 링크/버튼이 필요하면 tooltip이 아니라 popover/dialog pattern을 사용한다.

---

## Data State loading/accessibility

Loading, refreshing, stale, partial, error의 visual/behavior grammar는 `15-data-state-system.md`를 따른다. 접근성 측면에서는 loading/sync 상태를 animation만으로 전달하지 않고 필요한 경우 status text/live region을 제공한다.

# 17. Dynamic Status

사용자 action 후 화면 일부가 갱신되는데 focus가 이동하지 않는 경우, 필요한 상태는 assistive technology에도 전달한다.

예:
- “주간 보기로 변경했습니다.”
- “조회 기간을 최근 30일로 변경했습니다.”
- “3개 곡을 선택했습니다.”
- “저장했습니다.”

Pattern:
```html
<div role="status" aria-live="polite" aria-atomic="true"></div>
```

실패/긴급 오류는 별도 alert semantics를 검토한다.

모든 변화에 live announcement를 남발하지 않는다.

---

# 18. Forms / Labels

모든 form control은 accessible name을 가져야 한다.

우선:
1. visible `label`
2. aria-labelledby
3. aria-label

가능하면 visible label을 우선한다.

placeholder를 label 대체로 사용하지 않는다.

Error:
- control과 error message programmatic association
- color만으로 error 전달 금지

---

Navigation 세부 wayfinding, icon rail, mobile menu, breadcrumb 규칙은 `17-navigation-and-information-architecture.md`를 따른다.

# 19. Navigation State

현재 위치:

```html
<a aria-current="page">대시보드</a>
```

selected visual style만으로 current page를 전달하지 않는다.

Icon rail에서도 accessible name이 유지되어야 한다.

Prototype에서 destination이 구현되지 않은 링크는 production-ready 상태로 간주하지 않는다.

---

# 20. Tables

기존 Table System 유지:

- native table
- caption
- `th scope="col"`
- sortable `aria-sort`
- numeric alignment은 visual only, semantics 유지

단순 읽기/정렬 table을 ARIA grid로 바꾸지 않는다.

Responsive에서 column이 숨겨져도 primary identity와 metric 의미가 보존되어야 한다.

---

# 21. Charts — Two Layers

Chart accessibility는 두 층으로 제공한다.

## Layer A — concise summary

예:
```text
9월 18일 발매 직후 모든 플랫폼에서 스트리밍이 증가했고,
Spotify 증가폭이 가장 큽니다.
```

`aria-describedby`로 chart와 연결 가능.

## Layer B — accessible data table

사용자가 exact values를 확인할 수 있는:

```text
차트 데이터 표로 보기
```

disclosure를 제공한다.

Table:
- 날짜/기간
- Spotify
- YouTube Music
- Apple Music
- Melon

Chart와 같은 data source에서 생성해 divergence를 막는다.

---

# 22. Interactive Chart Marks

모든 data point를 Tab stop으로 만들면 dense chart에서 keyboard burden이 너무 커질 수 있다.

기본 Overview:
- SVG 자체에 summary
- accessible data table 제공
- chart mark hover는 pointer enhancement

향후 chart 자체를 keyboard-explorable하게 만들 경우:
- roving tabindex
- arrow navigation
- clear focus marker
- tooltip equivalence

등 별도 pattern으로 구현한다.

무작정 모든 50–100개 point에 `tabindex=0`을 붙이지 않는다.

---

# 23. Sparkline

KPI sparkline이 이미:
- primary value
- comparison context

를 텍스트로 제공하면 sparkline은 보조 정보다.

두 선택지:

A. shape 자체가 추가 의미를 제공:
- concise accessible label 유지

B. 완전히 redundant:
- aria-hidden

현재 prototype은 A를 유지한다.

---

# 24. Images / Artwork

Decorative:
```text
alt=""
aria-hidden where appropriate
```

Meaningful artwork:
곡/앨범명 text가 바로 옆에 있으면 artwork를 decorative 처리할 수 있다.

Artwork의 시각적 내용 자체가 정보라면 descriptive alt 필요.

Official CHASM logo:
visible “CHASM” text 옆에서는 decorative.

---

# 25. Icons

Iconography System 유지.

- visible label이 있으면 SVG aria-hidden
- icon-only button은 accessible name
- functional icon 3:1 contrast
- tooltip은 accessible name 대체 아님

---

# 26. Live Feedback / Toast

Success:
- role=status / polite

Error that requires immediate awareness:
- role=alert를 제한적으로 검토

Toast가 keyboard focus를 강제로 빼앗지 않는다.

Auto-dismiss timeout이 있다면 사용자가 읽을 충분한 시간이 있어야 하고 중요한 정보는 다른 경로로도 남아야 한다.

---

# 27. Dialog / Popover / Menu

향후 추가 시 WAI-ARIA APG pattern을 따른다.

## Dialog
- initial focus
- focus containment
- Escape
- close 후 trigger focus return
- labelled title

## Menu button
- aria-haspopup
- aria-expanded
- Enter/Space
- menu open 시 item으로 focus 이동
- Escape 시 close + trigger return

## Tabs
- tablist / tab / tabpanel semantics
- arrow navigation
- manual activation if content load latency exists

---

# 28. Screen Reader-only Content

`.sr-only`는:
- table caption
- visible label이 없는 control 설명
- chart summary
- status region

등에 사용한다.

의미 있는 visible text를 무조건 숨겨 접근성 문제를 해결하지 않는다.

---

# 29. Dead / Placeholder Controls

프로토타입에서는 시각 검증을 위해 실제 기능이 없는 control이 존재할 수 있다.

그러나 production에서는:
- click해도 아무 일도 없는 button
- destination 없는 navigation link
- 열리지 않는 menu/date control

을 노출하지 않는다.

Prototype 문서에서 별도 표시하고 production readiness audit에서 fail 처리한다.

---

# 30. Accessibility Testing Matrix

자동 검사만으로 완료하지 않는다.

## Code/static
- semantic landmarks
- labels
- aria
- duplicate IDs
- contrast calculations

## Keyboard manual
- Tab order
- Shift+Tab
- Enter/Space
- Escape
- Arrow keys
- focus return
- no trap

## Visual
- 200% text zoom
- 400% / 320px reflow
- high contrast / forced colors
- focus visibility
- color blindness simulation as supporting test

## Screen reader
최소:
- VoiceOver/Safari 또는 NVDA/Chrome/Firefox 계열 중 한 환경
- landmarks/headings
- controls
- chart summary/table
- dynamic announcements

브라우저/스크린리더 조합은 실제 개발 환경 확정 후 QA matrix로 고정한다.

---

# 31. Current Prototype Audit — 2026-11

## Pass / improved

- `lang="ko"`
- viewport zoom 차단 없음
- main + nav semantics 존재
- H1/H2 hierarchy 기본 구조
- controls 대부분 native button/select/link
- focus-visible 2px blue-700
- 24/32/40px target system
- native semantic track table
- icon-only buttons accessible name
- SVG icons mostly aria-hidden when text is present
- responsive stack rules 존재

## Fixed in this accessibility pass

- skip link 추가
- main target ID 추가
- active nav `aria-current="page"`
- tooltip description association
- tooltip Escape focus 유지
- tooltip hoverability 개선
- reduced-motion handling
- dynamic polite status region
- chart summary + accessible data table
- meaningful tertiary text contrast 개선
- chart teal/amber contrast 개선

## Remaining / manual validation required

- 실제 200% text zoom
- 실제 400% / 320px reflow
- Windows High Contrast / forced-colors
- screen reader announcement quality
- chart palette distinguishability beyond contrast
- all prototype placeholder controls production behavior
- actual modal/menu/date-picker patterns when implemented

---

# 32. Accessibility Tokens / Policies

```css
--a11y-text-muted: var(--neutral-600);
--a11y-focus: var(--blue-700);
--a11y-target-min: 24px;
```

접근성 전용 토큰을 지나치게 늘리기보다 기존 semantic tokens가 기준을 만족하도록 수정하는 것을 우선한다.

---

# 33. Definition of Done

새 component는 최소 다음을 통과해야 한다.

- semantic role/name/value
- keyboard operable
- visible focus
- no keyboard trap
- target >=24px or valid exception
- text contrast AA
- meaningful non-text contrast >=3:1
- color not sole signal
- 200% text zoom resilience
- responsive/reflow strategy
- dynamic update announcement if necessary
- motion reduced alternative if motion used

Chart/Table 추가 조건:
- non-visual equivalent path
- exact data access when needed

---

# 34. Decision Status

| 결정 | 상태 |
|---|---|
| WCAG 2.2 AA를 제품 기본선으로 사용 | Stable |
| 2px blue-700 focus ring 유지 | Stable |
| 24px minimum target | Stable |
| meaningful small text neutral-600 이상 | Stable |
| color-only encoding 금지 | Stable |
| skip link / landmarks / aria-current | Stable |
| tooltip hover + focus + Escape | Stable |
| dynamic status live region | Stable |
| chart summary + accessible data table | Stable |
| prefers-reduced-motion 지원 | Stable |
| 320px/400% 실제 브라우저 QA | Required manual validation |
| screen reader QA | Required manual validation |
| Teal #278F63 / Amber #B7790D | Proposed palette revision |
