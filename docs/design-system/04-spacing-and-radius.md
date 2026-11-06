# CHASM Spacing & Radius System — v0.1

> 상태: Proposed v0.1  
> 목적: 데이터가 많은 화면에서도 관계가 명확하고, 카드 안의 카드가 과도하게 둥글거나 답답해 보이지 않도록 여백과 모서리 규칙을 통일한다.

## 1. 참고 시스템에서 가져온 원칙

### SEED

SEED는 spacing을 임의 숫자가 아니라 공통 dimension scale로 관리한다.

주요 scale:
- 2
- 4
- 6
- 8
- 10
- 12
- 14
- 16
- 18
- 20
- 24
- 28
- 32
- 36
- 40
- 48px 등

특히 List 문서의 **Concentric Radius** 원칙을 CHASM에 적용한다.

바깥 rounded container 안에 inset된 rounded element가 있을 때, 안쪽 요소에 바깥과 같은 radius를 반복하면 두 곡선이 평행하게 보이지 않을 수 있다.

기본 관계:

```text
inner radius ≈ outer radius - inset
```

예:
- Outer radius 16
- Inner inset 6
- Inner radius 10

Reference:
- https://seed-design.io/foundations/spacing
- https://seed-design.io/foundations/radius
- https://v3.seed-design.io/components/list

### Microsoft Fluent 2

Fluent는 4px base spacing ramp를 사용하며 2/6/10px 같은 optical 보정 값도 허용한다.

또한 요소 크기에 따라 radius 위계를 둔다.
- 작은 badge: 작은 radius
- button/dropdown: 중간 radius
- large container/popover: 큰 radius

핵심은 모든 요소를 동일한 radius로 만드는 것이 아니라 **크기와 역할에 따라 radius를 다르게 쓰는 것**이다.

Reference:
- https://fluent2.microsoft.design/layout
- https://fluent2.microsoft.design/shapes

### Shopify Polaris

Polaris는 layout을 Stack/Grid/Box처럼 구성하고 spacing을 gap/padding token으로 제어한다.

핵심 원칙:
- 가까운 요소는 하나의 정보 그룹으로 인식된다.
- 서로 다른 정보 그룹은 더 큰 간격으로 분리한다.
- 임의 margin보다 Stack gap과 container padding처럼 부모 레이아웃이 간격을 관리하는 구조를 우선한다.

Reference:
- https://shopify.dev/docs/api/app-home/latest/web-components/layout-and-structure/stack
- https://shopify.dev/docs/api/app-home/latest/web-components/layout-and-structure/box

---

## 2. CHASM Spacing Base Scale

CHASM은 데이터 밀도가 높은 Desktop dashboard이므로 **4px baseline + 2px optical step**을 사용한다.

### Primitive tokens

| Token | Value | 주 용도 |
|---|---:|---|
| space-0 | 0 | 없음 |
| space-0_5 | 2px | optical adjustment |
| space-1 | 4px | 매우 가까운 텍스트 관계 |
| space-1_5 | 6px | icon/label, title/subtitle |
| space-2 | 8px | inline item, control 내부 |
| space-2_5 | 10px | compact control |
| space-3 | 12px | 기본 component gap |
| space-4 | 16px | related group 분리 |
| space-5 | 20px | standard card padding |
| space-6 | 24px | section/group 간격 |
| space-8 | 32px | page-level spacing |
| space-10 | 40px | 큰 section break |
| space-12 | 48px | page bottom / large break |

임의로 13px, 17px, 23px 같은 spacing을 추가하지 않는다.

예외가 필요하면 먼저 기존 scale에서 해결 가능한지 확인한다.

---

## 3. Semantic Spacing

Primitive 값만 기억해서 사용하기보다 역할 기준으로 사용한다.

### Page

| Semantic token | Value |
|---|---:|
| page-padding-inline | 32px desktop |
| page-padding-block-start | 32px |
| page-section-gap | 24px |
| page-card-gap | 16px |

Dashboard의 layout-level module 간격은 16px을 기본으로 한다. 12px은 component 내부의 compact group에서 사용한다.

큰 Section이 명확하게 바뀌는 경우 24px 이상을 사용한다.

### Card

#### Standard card
- outer padding: 20px
- header → body: 16px
- distinct body group → body group: 16px
- title → description: 4px
- kicker → title: 4px

#### Compact KPI card
- outer padding: 16px
- label → value: 8px
- value → comparison context: 4–6px
- metric group → supporting visualization: 12–16px

### Related text

같은 의미 그룹 안에서:
- title ↔ description: 4px
- value ↔ unit: inline 2–4px
- delta ↔ comparison label: 6–8px
- icon ↔ label: 6–8px

### Rows

Table/List row는 개별 카드처럼 보이게 만들지 않는다.

- horizontal padding: card edge와 정렬
- vertical padding: 8–12px
- row separator 또는 hover background를 사용
- 정적인 row마다 별도 rounded box를 만들지 않는다.

---

## 4. Spacing이 정보 관계를 표현해야 한다

다음 원칙을 따른다.

### 같은 정보 단위
작은 spacing 사용.

예:
```text
전체 스트리밍
2,498만 회
↑ 18.4% · 이전 3개월 대비
```

Label → Value → Comparison은 하나의 정보 덩어리이므로 서로 가깝게 둔다.

### 다른 정보 그룹
큰 spacing 사용.

예:
```text
[KPI value block]

16px

[mini chart / track list]
```

### 카드의 외부 간격과 내부 간격을 구분

카드 사이 layout gap이 16px이라고 해서 카드 내부의 모든 요소도 16px으로 만들지 않는다.

- 카드와 카드: 16px
- 카드 padding: 20px
- 같은 텍스트 그룹: 4–8px
- 내부 섹션: 16px

이 차이가 hierarchy를 만든다.

---

## 5. CHASM Radius Scale

### Primitive tokens

| Token | Value | 용도 후보 |
|---|---:|---|
| radius-0 | 0 | table edge / flush element |
| radius-1 | 4px | tiny inset state |
| radius-1_5 | 6px | tag / badge |
| radius-2 | 8px | button / input / interactive row |
| radius-2_5 | 10px | segmented container |
| radius-3 | 12px | medium container / dropdown |
| radius-4 | 16px | major card / banner |
| radius-full | 9999px | progress / pill / circular |

CHASM의 top-level dashboard card는 기본적으로 **16px**을 사용한다.

---

## 6. Radius Hierarchy

### Level A — Major surface
- Dashboard card
- KPI card
- Summary banner

기본:
```text
R16
```

### Level B — Medium nested surface
- card 안의 callout
- inset information box
- dropdown
- artist switcher

기본:
```text
R8–12
```

상위 container와의 inset 관계를 확인한 뒤 결정한다.

### Level C — Controls
- button
- filter
- selected segment
- interactive list hover

기본:
```text
R8
```

### Level D — Small labels
- tag
- badge
- event label

기본:
```text
R6
```

### Full radius
다음 경우에만 사용:
- progress bar
- circular icon/avatar
- 정말 pill semantics가 있는 chip

모든 chip/tag를 습관적으로 pill로 만들지 않는다.

---

## 7. Concentric Radius Rule

### 적용하는 경우

바깥 rounded container의 모서리와 안쪽 rounded surface가 시각적으로 가까워 두 곡선이 동시에 보이는 경우.

예:
- inset selectable row
- inset image/preview surface
- segmented control 안의 selected segment
- outer panel 안쪽에 거의 붙어 있는 nested surface

공식:

```text
inner radius = outer radius - inset
```

정확한 값이 token scale에 없으면 가장 가까운 token으로 맞춘다.

### 예시 1

```text
Outer R16
Inset 8px
Inner ≈ R8
```

### 예시 2

```text
Segmented outer R10
Inner padding 2px
Selected segment R8
```

### 적용하지 않아도 되는 경우

내부 box가 outer edge에서 충분히 멀리 떨어져 있어 두 corner가 시각적으로 직접 관계하지 않는 경우.

예:
- R16 card 안에 20px padding 후 별도 callout
- Chart card 안쪽의 tooltip
- 카드 안 album cover

이 경우에는 **요소 역할에 맞는 semantic radius**를 사용한다.

---

## 8. Rounded Container 안에 Rounded Container를 넣을 때

다음 순서로 판단한다.

### 1. 정말 box가 필요한가?

배경색/테두리 없이 spacing만으로 grouping이 가능하면 nested box를 만들지 않는다.

특히 데이터 dashboard에서 “카드 안의 카드 안의 카드”를 피한다.

### 2. 박스가 별도 의미를 가지는가?

다음 중 하나가 있어야 nested surface를 정당화할 수 있다.

- 선택 가능한 영역
- 정보 상태가 다른 callout
- 별도의 interaction target
- 강조/경고/설명 영역
- 서로 다른 background context

단순 grouping이라면 spacing과 divider를 우선한다.

### 3. 모서리가 가까운가?

가깝다면 Concentric Radius를 적용한다.

### 4. 안쪽 요소가 더 작다면 radius도 작게

바깥 R16 안에 작은 badge까지 R16을 쓰지 않는다.

크기와 역할이 작아질수록 radius 단계도 내려간다.

---

## 9. CHASM Card Anatomy

기본 card는 다음 구조를 따른다.

```text
┌──────────────────────────── R16
│ 20px
│  Kicker
│  4px
│  Title
│  4px
│  Description
│
│  16px
│
│  Body / Visualization
│
│  16px (if another distinct group)
│
│  Secondary information
│
│ 20px
└────────────────────────────
```

KPI card는 더 compact하게:

```text
┌──────────────────────────── R16
│ 16px
│ Label
│ 8px
│ Value
│ 4–6px
│ Delta + comparison
│
│ 12–16px
│ Supporting visual
│ 16px
└────────────────────────────
```

---

## 10. 현재 Prototype에 적용할 규칙

### Top-level
- Summary banner: R16
- KPI card: R16
- Chart / Insight / Track / Event card: R16

### Inner
- Artist switcher: R12
- Filter/select/button: R8
- Segmented container: R10
- Segmented selected item: R8
- Insight interactive row: R8
- Insight footnote/callout: R8
- Album cover: R8
- Event tag: R6
- Tooltip: R8
- Progress/bar: Full

### Spacing
- page horizontal padding: 32px desktop
- cards gap: 16px
- standard card padding: 20px
- KPI card padding: 16px
- card header → content: 16px
- title → description: 4px

---

## 11. 피해야 할 패턴

### Don't — 동일 radius 반복

```text
Outer R16
  Inner R16
    Small chip R16
```

모든 단계가 같은 둥글기로 보여 hierarchy가 사라진다.

### Don't — 모든 grouping을 box로 만들기

```text
Card
 └─ rounded section
     └─ rounded row
         └─ rounded badge
```

가능하면:

```text
Card
 ├─ spacing
 ├─ divider
 └─ one meaningful callout
```

처럼 단순화한다.

### Don't — child margin의 누적

각 child에 `margin-top`을 임의로 붙여 layout rhythm을 만들지 않는다.

가능하면 부모의:
- gap
- padding
- grid/flex spacing

으로 관리한다.

---

## 12. Decision Status

| 결정 | 상태 |
|---|---|
| 4px baseline + 2px optical spacing | Proposed |
| top-level card R16 | Proposed |
| standard card padding 20px | Proposed |
| compact KPI padding 16px | Proposed |
| layout card gap 16px | Proposed |
| Concentric Radius 원칙 | Stable |
| nested box 최소화 | Stable |
| spacing으로 정보 관계 표현 | Stable |

실제 Dashboard 화면에서 검증한 뒤 수치 토큰을 Stable로 승격한다.
