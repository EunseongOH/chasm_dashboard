# CHASM Typography & Card Anatomy — v0.1

> 상태: Proposed v0.1  
> 목적: 글자를 작게 만들어 정보량을 억지로 밀어 넣지 않고, 읽기 쉬운 Typography와 일관된 Vertical Rhythm으로 데이터 밀도를 관리한다.

---

## 1. 참고 디자인 시스템에서 가져온 원칙

### SEED

SEED는 font-size, line-height, weight를 따로 임의 조합하기보다 semantic text style을 중심으로 사용한다.

특히:
- Title / Subtitle / Body / Caption / Label 역할을 분리
- 각 font-size에 대응되는 line-height를 함께 사용
- 긴 본문과 짧은 정보 텍스트의 line-height를 다르게 운영

현재 SEED font stack에도 Pretendard Variable과 Apple SD Gothic Neo 등이 포함된다.

References:
- https://seed-design.io/foundations/typography
- https://v2.seed-design.io/foundation/typography/
- https://v3.seed-design.io/react/getting-started/styling/fonts

### Microsoft Fluent 2

Fluent Web type ramp의 대표 값:
- Caption 1: 12 / 16
- Body 1: 14 / 20
- Subtitle 2: 16 / 22
- Title 3: 24 / 32
- Title 2: 28 / 36
- Title 1: 32 / 40

Fluent는 baseline alignment와 명확한 typographic hierarchy를 통해 vertical rhythm을 만든다.

Reference:
- https://fluent2.microsoft.design/typography
- https://fluent2.microsoft.design/layout

### Shopify Polaris

Polaris의 핵심은 개별 텍스트를 임의 크기로 조정하기보다 Heading / Text와 Stack layout을 이용해 위계를 일관되게 만드는 것이다.

Card에서는:
- related information만 묶고
- 목적을 설명하는 heading을 제공하고
- 가장 중요한 정보를 먼저 보여주고
- 카드가 과도하게 커지면 분리

하도록 권장한다.

References:
- https://shopify.dev/docs/apps/design/visual-design
- https://shopify.dev/docs/api/customer-account-ui-extensions/2025-07/ui-components/layout-and-structure/card
- https://shopify.dev/docs/api/customer-account-ui-extensions/2026-01/web-components/layout-and-structure/stack

---

## 2. CHASM Typography Principle

### 2.1 데이터 밀도 ≠ 작은 글자

CHASM의 타깃은 데이터 분석에 익숙하지 않은 국내 인디 아티스트·레이블·유통사다.

따라서 많은 정보를 넣기 위해 의미 있는 텍스트를 9–10px로 줄이는 방식을 지양한다.

기본 원칙:

- 의미 있는 설명 / 비교 기준: 최소 12px
- 일반적인 UI/본문: 13–14px
- 카드 제목: 16px 이상
- 주요 KPI: 28px 이상
- 10–11px은 축 눈금, 영문 kicker 등 제한적인 보조 요소에만 허용

### 2.2 Text와 Data type을 분리한다

같은 14px이라도 일반 문장과 숫자는 역할이 다르다.

Text typography:
- Page title
- Section title
- Card title
- Body
- Supporting
- Label
- Meta
- Kicker

Data typography:
- Hero value
- KPI value
- Medium value
- Table value
- Delta

숫자 비교가 필요한 곳에는 tabular numerals를 사용한다.

### 2.3 한국어를 기준으로 검증한다

영문 UI를 기준으로 typography를 정하지 않는다.

한국어는 영문보다 같은 font-size에서도 획 밀도가 높게 보일 수 있으므로:
- 지나치게 tight한 line-height를 피함
- 작은 글자에서 과도한 negative letter-spacing 금지
- 설명문은 135%보다 145–150%에 가까운 line-height를 우선 검토

한다.

---

## 3. Font Family

현재 우선 후보:

```css
font-family:
  "Pretendard Variable",
  Pretendard,
  -apple-system,
  BlinkMacSystemFont,
  "Apple SD Gothic Neo",
  "Segoe UI",
  Roboto,
  "Noto Sans KR",
  sans-serif;
```

Pretendard를 사용할 수 없는 환경에서도 system font로 자연스럽게 fallback한다.

---

## 4. CHASM Text Type Ramp

### Primitive role tokens

| Token | Size / Line-height | Weight | 용도 |
|---|---|---:|---|
| text-page-title | 28 / 36 | 700 | 페이지 대표 제목 |
| text-section-title | 20 / 28 | 700 | 큰 페이지 섹션 |
| text-card-title | 16 / 24 | 650 | Card / chart title |
| text-body | 14 / 20 | 400 | 기본 문장 |
| text-body-strong | 14 / 20 | 600 | 강조 본문 |
| text-supporting | 13 / 20 | 400 | 비교·설명 맥락 |
| text-label | 13 / 18 | 600 | KPI label / control |
| text-meta | 12 / 16 | 400 | 출처·날짜·낮은 위계 |
| text-meta-strong | 12 / 16 | 600 | 작은 중요 label |
| text-kicker | 11 / 16 | 700 | 영문 eyebrow / category only |

### Kicker 사용 제한

영문 대문자 `ARTIST PERFORMANCE`, `INSIGHTS`처럼 짧은 category label에만 사용한다.

한국어를 ALL CAPS처럼 시각적으로 강제하거나, 핵심 정보를 kicker 크기로 축소하지 않는다.

---

## 5. CHASM Data Type Ramp

| Token | Size / Line-height | Weight | 용도 |
|---|---|---:|---|
| data-hero | 32 / 40 | 700 | 화면 대표 KPI |
| data-kpi | 28 / 36 | 700 | 일반 KPI card |
| data-medium | 20 / 28 | 650 | 강조된 보조 지표 |
| data-small | 14 / 20 | 600 | Table / breakdown |
| data-delta | 13 / 18 | 650 | 증감·비교 |

### Number alignment

다음에는:

```css
font-variant-numeric: tabular-nums;
```

사용을 우선 검토한다.

- KPI 비교
- table
- ranking
- axis / tooltip

일반 문장 속 숫자에는 반드시 적용할 필요가 없다.

---

## 6. Letter Spacing

현재 기본안:

| 역할 | Letter spacing |
|---|---:|
| Page / Section title | -0.01em |
| Card title | -0.005em |
| Body / Supporting | 0 |
| Label | 0 |
| Meta | 0 |
| Kicker | +0.06 ~ +0.08em |
| Large data | -0.015em |
| Table data | 0 |

한국어 작은 텍스트에는 negative spacing을 기본 적용하지 않는다.

---

# 7. Vertical Rhythm의 핵심

## 7.1 Line-height 자체도 spacing이다

텍스트 element 사이에 margin을 계산할 때 font-size만 보면 안 된다.

예:

```text
Card title 16 / 24
Supporting 13 / 20
```

각 line box 내부에 이미 여백이 존재한다.

따라서 `title → description`에 무조건 8px margin을 추가하면 시각적으로는 지나치게 멀어질 수 있다.

CHASM은 **box gap과 perceived visual gap을 구분**한다.

### 기본 관계

- Kicker → title: 2px
- Title → description: 0–2px
- Label → KPI value: 4px
- KPI value → comparison: 0–2px
- Header group → body: 16px
- Body group → secondary group: 16px

같은 텍스트 덩어리 내부는 line-height가 관계를 만드는 데 이미 기여하기 때문에 spacing을 작게 둔다.

## 7.2 서로 다른 의미 그룹 사이에서 spacing을 크게 쓴다

텍스트 그룹 내부:
- 0–4px

독립된 정보 그룹:
- 12–16px

카드의 큰 영역:
- 16–20px

즉, **모든 요소 사이에 균등한 8px을 쓰지 않는다.**

---

> Card의 typography/vertical rhythm은 이 문서가 담당하고, 박스 내부 inset과 nested padding은 `19-content-spacing-and-inset-system.md`를 따른다.

# 8. Card Anatomy

CHASM은 모든 카드를 하나의 구조로 강제하지 않는다.

현재 네 가지 anatomy를 구분한다.

---

## A. KPI Card — Compact Metric

목적:
한 가지 핵심 metric을 빠르게 읽기.

### Anatomy

```text
┌──────────────────────────── R16
│ 16
│ Label              [Info]
│ 4
│ 2,498만 회
│ 0–2
│ ↑ 18.4% · 이전 3개월 대비
│
│ 12–16
│ Supporting visual / mini list
│ 16
└────────────────────────────
```

### Rules

- Padding: 16px
- Label: text-label
- Value: data-kpi
- Context: data-delta + text-meta/supporting
- Supporting visual은 main metric block과 최소 12px 분리
- 카드에 설명문을 길게 넣지 않음
- 하나의 card에서 primary metric은 하나

### Height

동일 row의 KPI card는 가능하면 같은 height를 유지한다.

단, 내용이 다른데 고정 높이를 맞추기 위해 의미 없는 공백을 과도하게 만들지 않는다.

---

## B. Analysis Card — Chart / Visualization

목적:
추이·비교·분포 등 하나의 분석 질문에 답하기.

### Anatomy

```text
┌──────────────────────────────── R16
│ 20
│ [Kicker]               [Control]
│ Title
│ Description
│
│ 16
│ Legend / context / secondary controls
│
│ 12
│ Visualization
│
│ 16–20
└────────────────────────────────
```

### Rules

- Padding: 20px
- Header 내부 text gap: 0–2px
- Header → legend/control: 16px
- Legend → visualization: 12px
- Chart axis와 card description은 같은 위계가 아님
- Source/freshness가 필요한 경우 chart 아래 별도 meta line 사용
- visualization은 카드의 가장 큰 면적을 차지

### Card title

질문형 또는 설명형 제목을 권장.

예:
- 플랫폼별 스트리밍은 어떻게 변하고 있나요?
- 플랫폼별 스트리밍 추이

근거가 충분할 때만 insight형 title 사용.

---

## C. Insight Card / Panel — Interpretation

목적:
사용자가 지금 봐야 할 변화와 다음 탐색 지점을 제시.

### Anatomy

```text
┌──────────────────────────── R16
│ 20
│ Kicker
│ Title
│
│ 12–16
│ Insight row
│ Insight row
│ Insight row
│
│ 12
│ [Optional explanatory callout R8]
│ 20
└────────────────────────────
```

### Rules

- Insight row마다 별도 border/card를 만들지 않음
- 기본 상태에서는 flat
- hover / selected 때만 R8 background를 사용
- row 내부 icon → text: 8–10px
- primary sentence: 13–14px / 20
- evidence/context: 12px / 16
- arrow/action은 낮은 위계

Callout은 card 안에 또 card를 만들기 위한 장식이 아니라:
- 해석 원칙
- 경고
- 중요한 context

처럼 별도 의미가 있을 때만 사용.

---

## D. Table / Ranking Card — Dense Data

목적:
여러 곡·플랫폼·기간을 정확히 비교.

### Anatomy

```text
┌──────────────────────────────── R16
│ 20
│ Title                   [Action]
│ Description
│
│ 16
├────────────────────────────────
│ Table header
├────────────────────────────────
│ Row
├────────────────────────────────
│ Row
├────────────────────────────────
│ Row
└────────────────────────────────
```

### Rules

- Header area만 20px padding
- Table은 card body에서 edge-to-edge 구조를 허용
- Row horizontal padding은 20px로 header alignment와 맞춤
- 각 row를 rounded card로 만들지 않음
- Row separation은 subtle divider 사용
- 정확값은 text/data-small + tabular numerals
- Column title은 12px / 16 medium/semibold
- Row primary title은 13–14px / 20
- Secondary metadata는 12px / 16

Table처럼 정확한 비교가 중요한 영역에서는 지나친 compact notation보다 exact value를 우선한다.

---

# 9. Card Header Pattern

모든 standard card header는 가능한 한 동일한 구조를 공유한다.

```text
Header
├─ Header copy
│  ├─ optional kicker
│  ├─ title
│  └─ optional description
└─ optional action/control
```

### Header copy

Kicker가 없다면 빈 공간을 남기지 않는다.

Description이 없다면 title과 body 사이의 간격을 별도 보정한다.

즉, 요소가 빠졌을 때도 고정 margin 때문에 불필요한 빈 공간이 생기지 않아야 한다.

---

# 10. Card 내부 Alignment

## 10.1 Left edge

기본적으로 다음은 같은 x-axis에 정렬한다.

- Card title
- Description
- Body text
- Table row content
- Chart legend

특별한 이유 없이 20px / 16px / 12px 등 서로 다른 시작점을 만들지 않는다.

## 10.2 Numeric alignment

Table의 숫자는 가능한 경우:
- 우측 정렬 또는
- 같은 column에서 일관된 left/right alignment

를 사용한다.

현재 prototype에서는 column 구조를 유지하면서 추후 실제 table에서 right alignment를 검토한다.

---

# 11. Card Density Modes

현재 MVP에서는 두 가지 density만 둔다.

### Comfortable — 기본

사용:
- 대부분의 dashboard card
- insight
- chart
- beginner-facing views

기준:
- card padding 20
- row height 44–56px
- body 14/20

### Compact — 제한적

사용:
- KPI
- dense ranking/table
- 작은 control cluster

기준:
- card padding 16
- supporting typography 12–13px
- 핵심 의미를 11px 이하로 줄이지 않음

사용자가 직접 density mode를 바꾸는 기능은 현재 MVP 범위에 넣지 않는다.

---

# 12. 현재 Prototype에서 수정할 문제

기존 prototype에서 다음을 개선한다.

1. 9px / 10px 의미 텍스트 → 12px 이상으로 상향
2. card title 16px / 24px로 통일
3. card description 13px / 20px
4. KPI label 13px / 18px
5. KPI value 28px / 36px
6. comparison 12–13px
7. table row title / metadata 가독성 개선
8. card header와 body 사이 간격을 anatomy별로 통일
9. margin-top을 개별 요소에 반복하기보다 parent group/gap 사용 확대

---

# 13. Decision Status

| 결정 | 상태 |
|---|---|
| Text / Data typography 분리 | Stable |
| 의미 있는 text 최소 12px 원칙 | Proposed |
| Page title 28/36 | Proposed |
| Card title 16/24 | Proposed |
| Body 14/20 | Proposed |
| Supporting 13/20 | Proposed |
| Meta 12/16 | Proposed |
| KPI value 28/36 | Proposed |
| KPI / Analysis / Insight / Table anatomy 구분 | Stable |
| Comfortable / Compact 두 density 체계 | Proposed |
| line-height 자체도 spacing으로 계산 | Stable |
| Card 안의 정보 그룹에 따라 gap 차등 | Stable |

실제 한국어 콘텐츠와 다양한 길이의 아티스트/곡명을 넣어 stress test한 뒤 세부 수치를 Stable로 승격한다.
