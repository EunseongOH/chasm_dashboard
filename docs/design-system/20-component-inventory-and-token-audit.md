# CHASM Component Inventory & Token Audit — v0.1

> 기준일: 2026-11-07  
> 범위: `docs/design-system/00–19`, `prototype/dashboard-sample`, `prototype/design-system-lab/*`, shared CSS tokens/components  
> 목적: 지금까지 만든 디자인 시스템을 실제 구현 단위로 재정렬하고, 중복 token/alias/raw value/component gap을 정리해 새 화면에서 같은 결정을 반복하지 않게 한다.

---

# 0. Audit Result Summary

현재 machine-readable component registry:
- `docs/design-system/component-inventory.json`

등록된 design-system item:
- 총 60개
- Shared: 46
- Dashboard-specific: 7
- Lab-only / Proposed: 2
- Deferred contract: 5

Shared CSS token:
- 선언 211개
- Dashboard + 12개 Design System Lab 전체에서 직접 참조 193개
- 현재 직접 참조가 없는 18개는 아래 분류 기준상 foundation/reserved contract로 유지

System UI에서 raw color 사용:
- 0개
- 남은 raw hex는 artist avatar / album cover의 prototype artwork gradient 5개뿐
- 이 값들은 UI semantic color가 아니라 더미 artwork이므로 tokenization 대상에서 제외

---

# 1. Source-of-Truth Order

충돌이 있을 때 다음 우선순위를 사용한다.

1. Product/Design rule: `docs/design-system/*.md`
2. Component/Token registry: `component-inventory.json`
3. Shared implementation primitives: `prototype/dashboard-sample/styles.css`
4. Design System Lab: visual/interaction validation
5. Dashboard sample: integrated product example

Lab과 Dashboard sample은 규칙을 검증하는 구현물이지, 문서에 있는 Stable decision을 조용히 덮어쓰는 source가 아니다.

---

# 2. Token Architecture

CHASM token은 네 층으로 관리한다.

## Layer A — Primitive / Palette

예:
- `blue-50 … blue-950`
- `neutral-0 … neutral-950`
- `space-*`
- `radius-*`
- typography primitive role tokens

특징:
- 현재 화면에서 사용하지 않더라도 scale completeness를 위해 존재할 수 있음
- `unused = delete` 규칙을 적용하지 않음

## Layer B — Semantic

예:
- `surface-default`
- `border-default`
- `fg-secondary`
- `control-bg-hover`
- `feedback-error`

질문:
`이 값이 무엇을 의미하는가?`

## Layer C — Component

예:
- `button-primary-bg`
- `chart-line-standard`
- `table-row-rich`
- `inset-notice-inline`

다음 중 하나일 때 component token을 만든다.
1. 여러 state가 한 세트로 움직임
2. palette를 직접 사용하면 semantic intent가 흐려짐
3. 같은 component family에서 반복됨

## Layer D — Reserved Contract

현재 Dashboard에는 없지만 문서/Lab에서 이미 의미가 정의된 토큰.

예:
- chart marker sizes
- future hero/section typography
- observation/evidence visual primitives

Reserved token은 임의 UI에 재활용하지 않는다.

---

# 3. Alias Audit

초기 prototype에서는 다음 alias가 함께 존재했다.

- `surface-*` + `bg-*`
- `border-*` + `stroke-*`
- `focus-ring-*` + `border-focus` / `a11y-focus`

문제:
- 같은 의미에 이름이 2개 존재
- 어떤 token이 canonical인지 알기 어려움
- component가 서로 다른 alias family를 사용함

이번 audit에서 CSS implementation canonical naming을 다음으로 통일했다.

- Surface → `surface-*`
- Border → `border-*`
- Foreground → `fg-*`
- Focus → `focus-ring-*`
- Control → `control-*`
- Component-specific → `button-*`, `chart-*`, `feedback-*`, `table-*`, `inset-*`

제거한 중복/legacy alias:
- `bg-canvas`
- `bg-surface`
- `bg-subtle`
- `stroke-subtle`
- `stroke-default`
- `stroke-strong`
- `border-focus`
- `card-gap`
- `a11y-text-muted`
- `a11y-focus`

`a11y-target-min`은 실제 minimum target contract라 유지하고 `.info` 등에 연결했다.

---

# 4. Raw Value Audit

## Color

System UI raw hex는 제거했다.

수정 예:
- Primary pressed hardcode `#083E78` → `button-primary-bg-pressed` → `blue-900`
- Data warning text hardcode → `feedback-warning-fg`
- Data error text hardcode → `feedback-error-fg`
- Event subtype colors → `event-concert-*`, `event-content-*`
- structural white → `neutral-0`
- Summary gradient end → `neutral-25`

남은 raw color는 prototype artwork에만 허용한다.

## Spacing / Size

모든 raw px를 금지하지 않는다.

Token 우선 대상:
- 반복되는 spacing
- radius
- typography
- control heights
- common inset
- repeated status/component color

Explicit component geometry로 남길 수 있는 값:
- intrinsic artwork size
- chart SVG geometry
- timeline coordinate
- breakpoint
- one-off illustration/placeholder geometry

단 같은 값/역할이 반복되면 semantic token 후보로 승격한다.

---

# 5. Current Unreferenced Token Classification

Dashboard + 모든 Lab 기준 직접 참조되지 않는 token은 18개다.

## Keep — palette completeness

- `blue-300`
- `blue-600`
- `blue-950`
- `neutral-800`
- `neutral-950`
- `viz-coral`

이들은 palette의 일부이므로 삭제하지 않는다.

## Keep — primitive completeness

- `space-0`
- `radius-0`

0 token도 reset/flush variant 계약에 필요하다.

## Keep — typography contract

- `type-section-title-size/line`
- `type-data-hero-size/line`
- `type-data-small-size/line`

현재 Dashboard sample에 해당 role이 없을 뿐 type ramp의 일부다.

## Keep — reserved visualization/insight contract

- `chart-marker-small`
- `chart-marker-hit-target`
- `insight-observation-bg`
- `insight-evidence-border`

향후 chart interaction/insight variant가 실제 구현될 때 사용한다.

즉 이번 audit 기준 **삭제가 필요한 dead token은 0개**다.

---

# 6. Component Inventory Status

정확한 machine-readable 목록은 `component-inventory.json`을 따른다.

## Shared — 현재 재사용 가능

대표:
- Button: Primary / Secondary / Tertiary / Danger
- Icon button / Text action
- Segmented / Tabs primitive
- Select / Search / Filter popover / Filter chip
- Field error message
- Standard card / KPI card
- Inline feedback / Callout / Toast / Dialog
- Tooltip / Popover
- Skeleton / Refresh spinner
- Sidebar / Icon rail / Mobile nav
- Data table / Resource table / Ranking
- Insight row / Evidence

## Dashboard-specific — 패턴은 정해졌으나 아직 generic extraction 불필요

- Summary banner
- Date-range control composition
- Artist context switcher
- SVG time-series chart renderer
- Contribution breakdown
- Event timeline
- Data health overview/detail

이 항목은 같은 패턴이 두 번째 화면에서 반복될 때 generic component extraction을 검토한다.

## Lab-only / Proposed

- Breadcrumb
- Page Tabs as IA composition

이 둘은 실제 route/page hierarchy가 확정되기 전 production primitive로 고정하지 않는다.

## Deferred

- Production route/history
- Reusable chart library/framework component
- Production calendar picker
- Permission-aware navigation
- source refresh/stale data contract

---

# 7. Component Gaps Found and Repaired

## Critical / Danger button

Before:
- Feedback 문서에는 정의
- Feedback Lab에만 local `.danger-button` 존재

After:
- shared `.button--danger`로 승격

## Field error

Before:
- Query error/filter error와 Lab field error가 각각 다른 local class

After:
- shared `.field-message`, `.field-message--error` 추가
- 기존 query-specific class는 composition상 당장 유지 가능

## Confirmation dialog

Before:
- 문서상 anatomy는 Stable
- Feedback Lab에만 local dialog CSS

After:
- shared `.dialog-system` family로 승격

---

# 8. Components That Should NOT Be Extracted Yet

컴포넌트화 자체가 목표가 아니다.

아래는 지금 generic abstraction을 만들지 않는다.

## Time-series chart renderer

현재 plain JS/SVG sample이다.
실제 chart library/framework와 data contract가 결정되기 전 generic API를 만들면 잘못된 abstraction이 될 가능성이 높다.

## Breadcrumb

route hierarchy가 아직 Proposed다.

## Artist switch persistence

실제 artist/entity routing이 필요하다.

## Date calendar

현재 native input은 interaction concept 검증용이다.

---

# 9. Design System Visual Coverage Audit

현재 Design System Lab은 12개다.

이미 별도 Lab이 있는 영역:
- Interaction
- Data Visualization
- Table / Ranking
- Insight / Annotation
- Iconography
- Content / Microcopy
- Accessibility
- Data State
- Query Controls
- Navigation / IA
- Feedback
- Content Spacing / Inset

별도 standalone Lab이 없는 foundation 영역:
- Brand
- Color
- Primitive Spacing / Radius
- Typography
- Surface / Border / Elevation
- Layout / Grid

이 foundation들은 문서와 Dashboard에는 존재하지만 **한 화면에서 시각적으로 훑는 Explorer가 없다.**

따라서 다음 구현 우선순위는 새로운 규칙 추가보다:

`Design System Explorer / Gallery`

가 적절하다.

Explorer는 기존 12개 Lab을 복제해서 새 규칙을 만들기보다, shared token/component를 실제로 render하고 각 Lab으로 연결하는 **single visual entry point**여야 한다.

---

# 10. Explorer Information Architecture Candidate

## Foundations
- Brand
- Color
- Typography
- Spacing & Inset
- Radius
- Surface / Border / Elevation
- Layout / Grid
- Iconography

## Controls
- Buttons
- Icon buttons
- Inputs / Select / Search
- Tabs / Segmented
- Filter / Chips
- Date / Query

## Data Display
- KPI
- Cards
- Chart grammar
- Tables
- Ranking
- Timeline
- Insight / Evidence

## States & Feedback
- Loading / Empty / Partial / Stale / Error
- Inline feedback
- Callout
- Toast
- Dialog

## Navigation
- Sidebar
- Icon rail
- Mobile nav
- Breadcrumb
- Page tabs

## Accessibility
- Focus
- Keyboard
- Contrast
- Reflow
- Reduced motion

---

# 11. Explorer Must Reuse, Not Fork

Explorer에서 새로운 visual rule을 만들지 않는다.

Must:
- `styles.css`의 shared tokens/classes를 import
- official logo asset 사용
- `component-inventory.json`을 inventory 기준으로 사용
- 기존 Lab을 참고/링크
- Stable/Proposed/Deferred 상태 표시

Must not:
- Explorer 전용 Button 색/spacing 생성
- 기존 component를 비슷하게 다시 그리기
- raw hex/spacing으로 showcase만 예쁘게 꾸미기
- Dashboard와 다른 token 값을 사용

Explorer에서 문제가 발견되면 source token/component를 고친 뒤 Explorer가 자동으로 반영되게 한다.

---

# 12. New Component Definition of Done

새 component를 Shared로 올리려면 최소:

1. 해결하는 product role이 명확함
2. 기존 component와 중복되지 않음
3. Stable design-system rule과 충돌 없음
4. semantic token 사용
5. spacing/inset role 정의
6. Default/Hover/Pressed/Focus/Selected/Disabled 등 필요한 state 정의
7. keyboard/accessibility behavior 정의
8. responsive/reflow 확인
9. relevant Data State/Feedback behavior 확인
10. Lab/Explorer에서 시각화
11. `component-inventory.json` 갱신
12. 문서 source of truth 링크

---

# 13. Migration Priority

## P0 — Done in this audit

- Token alias family 통합
- Primary pressed raw color 제거
- System UI raw semantic colors tokenization
- Danger button shared extraction
- Field error shared extraction
- Confirmation dialog shared extraction
- Inset tokens 실제 component에 연결

## P1 — Explorer 구축

- Foundations visual page
- Shared components gallery
- status badge: Shared / Proposed / Deferred
- responsive width preview
- state preview
- existing Lab deep links

## P2 — Real app framework 선택 후

- plain HTML classes → actual component package/API
- chart renderer extraction
- routing-aware Breadcrumb/Nav
- calendar/date picker
- URL state

---

# 14. Decision Status

| 결정 | 상태 |
|---|---|
| `component-inventory.json`을 implementation inventory로 사용 | Stable |
| Palette → Semantic → Component token hierarchy | Stable |
| `surface/border/fg`를 canonical CSS alias로 사용 | Stable |
| legacy `bg/stroke` CSS aliases 제거 | Stable |
| raw system UI color 금지 | Stable |
| prototype artwork raw color 예외 | Stable |
| unused token을 자동 삭제하지 않음 | Stable |
| Shared 승격 시 Definition of Done 적용 | Stable |
| Design System Explorer 구축 | Proposed next implementation |
| framework-level component API | Deferred |
