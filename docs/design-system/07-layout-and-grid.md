# CHASM Layout & Grid System — v0.1

> 상태: Proposed v0.1  
> 목적: 음악 데이터 대시보드의 카드·차트·인사이트가 다양한 데스크톱 폭에서 일관되게 재배치되도록 콘텐츠 폭, 사이드바, 12-column grid, breakpoint를 명시한다.

## 1. 참고 시스템에서 가져온 원칙

### SEED
SEED는 Dashboard Layout을 Low / Middle / High Density로 나누며 Middle Density에 12-column centered grid를 사용하고, High Density에서는 데이터 시각화·편집을 위해 fluid layout을 허용한다.

공식 breakpoint:
- base: 0
- sm: 480
- md: 768
- lg: 1280
- xl: 1440

Sidebar는 md(768px) 이상에서 기본 노출하고, 더 작은 화면에서는 header 내부로 통합하거나 숨기는 방향을 제시한다.

Reference:
- https://seed-design.io/foundations/layout
- https://seed-design.io/react/components/concepts/responsive-design

### Microsoft Fluent 2
Fluent는 12-column framework를 일반적인 web application grid로 설명한다. 동시에 fixed / stretch / hybrid 중 콘텐츠 특성에 맞는 grid behavior를 고르며, 작은 화면에서는 단순 축소가 아니라 reposition / resize / reflow / show-hide / re-architect를 사용한다.

Reference:
- https://fluent2.microsoft.design/layout

### Shopify Polaris
Polaris Grid는 CSS Grid 기반으로 responsive columns, gap, span, reflow를 사용한다. Desktop multi-column layout을 작은 화면에 그대로 압축하지 말고 breakpoint에서 재구성하는 것을 권장한다.

Reference:
- https://shopify.dev/docs/api/admin-extensions/2026-01/web-components/layout-and-structure/grid

## 2. CHASM Layout Strategy

CHASM은 일반 콘텐츠 사이트보다 차트와 표 비중이 높으므로 Hybrid Dashboard Layout을 사용한다.

- 큰 화면: content width에 max-width를 두고 12-column grid 사용
- 중간 화면: sidebar를 icon rail로 줄여 분석 공간 확보
- 작은 화면: card를 억지로 좁히지 않고 stack/reflow
- 768px 미만: sidebar를 top brand/header 형태로 축소

## 3. Main Content Width

초기안:
- content max-width: 1440px
- desktop horizontal padding: 32px
- wrapper maximum: 1504px

1280px은 일반 콘텐츠에는 충분하지만 4-series time-series, insight panel, table, event annotation, controls가 같이 존재하는 CHASM에는 제한적일 수 있다. 반대로 실제 content가 1600px 이상으로 계속 늘어나면 대형 모니터에서 차트가 필요 이상으로 퍼질 수 있어 1440px을 초기 검증값으로 둔다.

상태: Proposed. 실제 DSP 데이터가 들어간 Chart Gallery에서 재검증한다.

## 4. Column Grid

Desktop 기본:
- 12 columns
- 16px gutter

기본 span:
- KPI: 3 + 3 + 3 + 3
- Main analysis: chart 8 + insight 4
- Supporting modules: 4 + 4 + 4

12-column을 사용하는 이유는 3 / 4 / 6 / 8 / 9 / 12 span 조합으로 KPI, chart+insight, supporting modules를 한 체계로 표현할 수 있기 때문이다.

## 5. Gutter

Layout gutter는 16px을 제안한다.

이전 prototype의 12px card gap은 layout-level gutter와 component 내부 spacing의 구분이 약했다. 앞으로는:
- layout module ↔ layout module: 16px
- compact component group: 12px
- card 내부 related group: 4–12px

로 분리한다.

## 6. Responsive Breakpoints

### XL — 1440px 이상
- Sidebar: 232px
- Page padding: 32px
- Grid: 12 columns
- Gutter: 16px
- Content max: 1440px

### LG — 1280–1439px
- Sidebar: 232px
- Page padding: 24–32px
- Grid: 12 columns
- KPI 4-column / Main 8+4 / Supporting 4+4+4 유지

### MD — 1024–1279px
- Sidebar: 72px icon rail
- Page padding: 24px
- Grid: 12 columns
- Main Chart + Insight 8+4 유지

### SM/Landscape — 768–1023px
- Sidebar: 72px icon rail
- Page padding: 24px
- KPI: 2 columns
- Main analysis: stack
- Supporting: 2 columns
- Event: full width

### Narrow — 0–767px
- Sidebar → top brand/header
- Page padding: 16px
- Main analysis: single column
- 640–767px: KPI 2 columns 허용
- <640px: KPI 1 column

## 7. 1024px Breakpoint Validation

1024px viewport에서:
- Icon rail: 72px
- Main available: 952px
- Horizontal padding: 24px × 2
- Grid content: 904px
- Gutter: 16px × 11 = 176px
- Pure column area: 728px
- Column width: 약 60.7px

8-column chart:
60.7 × 8 + 16 × 7 ≈ 598px

4-column insight:
60.7 × 4 + 16 × 3 ≈ 291px

이는 Main Chart + Insight를 나란히 둘 수 있는 초기 하한으로 본다. 따라서:
- >=1024px: 8 + 4 유지
- <1024px: stack

을 사용한다.

이 breakpoint는 device category가 아니라 실제 콘텐츠 최소 폭을 기준으로 결정한 값이다.

## 8. Chart Width Rule

Multi-series chart는 가능한 경우 minimum comfortable width ≈600px을 초기 기준으로 둔다.

이 값은 Stable이 아니다. Chart Gallery에서 다음을 stress test한 뒤 수정할 수 있다.
- 1 series
- 4 series
- long date range
- dense annotation
- long Korean title
- legend wrap
- event overlap

## 9. Insight Panel Width

Insight panel의 초기 minimum comfortable width는 약 280–300px로 둔다.

300px 아래에서는 1–2줄 insight sentence, supporting context, action이 과도하게 줄바꿈될 가능성이 높아 chart와 함께 squeeze하지 않고 stack한다.

## 10. KPI Minimum Width

KPI card의 초기 comfortable minimum은 약 200px이다.

포함 요소:
- label
- 28px KPI value
- delta/context
- optional supporting visual

4-card layout에서 각 카드가 200px 아래로 내려가면 2-column reflow를 우선한다.

> Navigation의 IA/wayfinding, icon rail label, mobile menu behavior는 `17-navigation-and-information-architecture.md`를 따른다. 이 문서는 layout width/reflow만 정의한다.

## 11. Sidebar Modes

### Full Sidebar
- width: 232px
- Logo + CHASM
- Artist switcher
- label + icon navigation
- bottom utilities

### Icon Rail
- width: 72px
- official logo
- Artist avatar
- navigation icons
- label hidden

실제 제품에서는 hover/focus tooltip으로 menu label을 제공해야 한다.

### Top Header
<768px에서는 세로 sidebar를 유지하지 않고 brand/header만 남긴다. 실제 mobile navigation pattern은 MVP 범위 밖에서 확정한다.

## 12. Page Alignment

같은 dashboard section에서는 Page title, Summary banner, KPI row, Main analysis grid, Supporting modules의 x-axis를 공유한다.

Card 내부에서는 header text, body text, legend, table row content의 left edge를 가능한 한 맞춘다.

Chart plot area는 y-axis label 때문에 별도 internal inset을 가질 수 있으므로 Card content alignment와 Plot alignment를 구분한다.

## 13. Height Alignment

같은 row에 놓인 cards는 필요할 때 equal height를 사용한다.

적용:
- KPI row
- Chart + Insight
- Supporting modules

단 equal height는 arbitrary fixed height를 뜻하지 않는다. 내용이 늘어나면 container가 확장될 수 있어야 한다.

## 14. Overflow Rules

### Long titles
곡/앨범/아티스트 이름은 primary label이면 wrap을 우선하고, dense table에서는 필요 시 1–2 line clamp를 사용한다.

### Charts
Chart를 단순 scale-down해서 축과 label까지 작게 만들지 않는다. 공간이 부족하면 stack → control 축약 → secondary metadata 이동 → 필요 시 horizontal scroll 순으로 해결한다.

### Tables
작은 화면에서 모든 column을 squeeze하지 않는다. 우선순위가 낮은 column을 숨기거나 detail로 이동하는 규칙은 Table System에서 별도로 정의한다.

## 15. Implementation Rule

Page composition에는 CSS Grid 12-column을 사용한다.

예시:
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      gap: var(--layout-gutter);
    }

Span:
- span 3: KPI
- span 4: supporting
- span 6: medium two-column
- span 8: main chart
- span 12: full-width

모든 component 내부까지 12-column을 강제하지 않는다. Component 내부의 단순 정렬은 Flex 또는 local Grid를 사용한다.

## 16. Do / Don't

Do:
- 콘텐츠 폭으로 breakpoint 결정
- sidebar를 먼저 축소해 분석 공간 확보
- 핵심 데이터는 hide보다 reflow를 우선

Don't:
- desktop layout을 비율로 계속 축소
- 모든 nested component에 12-column 강제
- chart label을 작게 만들어 좁은 폭 문제를 해결

## 17. Current Prototype Mapping

>=1280:
- KPI: 3 / 3 / 3 / 3
- Chart: 8
- Insight: 4
- Supporting: 4 / 4 / 4

1024–1279:
- Sidebar: icon rail
- KPI: 3 / 3 / 3 / 3
- Chart: 8
- Insight: 4
- Supporting: 4 / 4 / 4

768–1023:
- Sidebar: icon rail
- KPI: 6 / 6
- Chart: 12
- Insight: 12
- Supporting: 6 / 6
- Event: 12

<640:
- KPI: 12
- Main: 12
- Supporting: 12

## 18. Decision Status

| 결정 | 상태 |
|---|---|
| Page-level 12-column grid | Stable |
| Responsive behavior는 content width 기준 | Stable |
| Content max-width 1440px | Proposed |
| Layout gutter 16px | Proposed |
| Full sidebar 232px | Proposed |
| Icon rail 72px | Proposed |
| Sidebar visible from 768px | Proposed |
| 1024px chart+insight stack breakpoint | Proposed, width calculation으로 1차 검증 |
| Chart minimum comfortable width ≈600px | Proposed / Chart Gallery 검증 필요 |
| Insight minimum ≈280–300px | Proposed |
| KPI minimum ≈200px | Proposed |
