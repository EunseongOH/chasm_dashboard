# CHASM Surface, Border & Elevation — v0.1

> 상태: Proposed v0.1  
> 목적: 대시보드가 여러 개의 떠 있는 카드 모음처럼 보이지 않도록, surface / border / shadow의 역할을 분리해 정보 흐름과 깊이를 일관되게 만든다.

---

## 1. 참고 디자인 시스템에서 가져온 원칙

### SEED

SEED는 elevation을 세 가지 방식으로 표현한다.

1. Surface color
2. Shadow
3. Stroke

또한 shadow는 화면 전체에서 주목도가 높은 소수의 요소에만 사용하는 것을 권장한다.

Layer 역시:
- layer-basement
- layer-default
- floating layer

처럼 구조적 깊이를 나눈다.

Reference:
- https://v3.seed-design.io/foundations/elevation

### Microsoft Fluent 2

Fluent는 elevation을 실제 z-axis의 거리처럼 다룬다.

낮은 elevation:
- 일반 card
- edge 없는 surface

높은 elevation:
- raised card
- callout
- tooltip
- dialog

처럼 구분한다.

또한 fill이나 border만으로 shape를 충분히 구분할 수 있는 경우 shadow가 필수는 아니다.

References:
- https://fluent2.microsoft.design/elevation/
- https://fluent2.microsoft.design/shapes

### Shopify Polaris

Polaris의 최신 Section 구조는 context에 따라 surface styling을 조정한다.

특히 nested section은 top-level section처럼 자기 border를 반복하지 않는다.

이는 CHASM의 “Card 안에 Card를 반복하지 않는다”는 원칙과 연결된다.

Reference:
- https://shopify.dev/docs/apps/build/customer-accounts/migrate-to-web-components/card

---

# 2. CHASM Surface Model

CHASM의 light theme에서는 surface를 네 단계로 나눈다.

## Surface 0 — Canvas

페이지의 가장 아래 배경.

```text
surface.canvas
#F7F9FC
```

용도:
- 전체 app background
- 카드 사이의 공간
- dashboard의 가장 낮은 레이어

Canvas 위에는 직접 주요 콘텐츠를 길게 배치하지 않고, section/card surface를 사용한다.

---

## Surface 1 — Default

대부분의 콘텐츠가 올라가는 기본 surface.

```text
surface.default
#FFFFFF
```

용도:
- KPI Card
- Chart Card
- Insight Card
- Table Card
- Sidebar

기본 dashboard card는 이 surface를 사용한다.

---

## Surface 2 — Subtle / Inset

같은 카드 안에서 약한 grouping이 필요할 때.

```text
surface.subtle
#F7F9FC 또는 #F1F4F8
```

용도:
- insight 설명 callout
- segmented control background
- table header
- selected/hover가 아닌 neutral inset area

중요:
이 surface는 “새로운 카드”가 아니라 같은 card 안의 local grouping이다.

따라서 기본적으로 shadow를 사용하지 않는다.

---

## Surface 3 — Floating

다른 콘텐츠 위에 실제로 떠 있는 temporary surface.

```text
surface.floating
#FFFFFF
```

용도:
- Tooltip
- Popover
- Dropdown menu
- Date picker overlay
- Context menu

Floating surface는 border + shadow를 함께 사용할 수 있다.

---

# 3. Border System

## Primitive

| Token | Value | 역할 |
|---|---|---|
| border-subtle | #F1F4F8 | row divider / 내부 구분 |
| border-default | #E5EAF0 | 일반 card/control |
| border-strong | #D5DCE5 | hover / 강한 구조 구분 |
| border-focus | brand blue | keyboard focus |

기본 stroke width:

```text
1px
```

2px 이상은:
- focus ring
- 특별한 selection
- 강한 state

처럼 의미가 있을 때만 사용한다.

---

# 4. Default Card Rule

CHASM Dashboard의 일반 카드는 기본적으로:

```text
White surface
+ 1px border
+ R16
+ no shadow
```

를 사용한다.

즉:

```css
background: surface.default;
border: 1px solid border.default;
border-radius: R16;
box-shadow: none;
```

## 이유

대시보드 화면에는 많은 card가 동시에 존재한다.

모든 card에 shadow가 들어가면:
- 각 카드가 서로 지나치게 분리되어 보이고
- 사용자의 시선이 카드 경계에 계속 걸리며
- 전체 정보 흐름보다 box 구조가 먼저 보인다.

따라서 기본 구분은 **Canvas vs White surface + Border**로 해결한다.

---

> Surface/border/shadow의 역할은 이 문서가 담당하고, box 내부 padding/inset은 `19-content-spacing-and-inset-system.md`를 따른다.

# 5. Shadow System

Shadow는 “Card style”이 아니라 **Elevation state**다.

현재 CHASM shadow scale:

| Token | Value | 용도 |
|---|---|---|
| shadow-none | none | 일반 dashboard card |
| shadow-low | 0 1px 4px rgba(0,0,0,.08) | low floating |
| shadow-mid | 0 2px 10px rgba(0,0,0,.10) | popover / dropdown |
| shadow-high | 0 4px 16px rgba(0,0,0,.12) | dialog / 높은 modal |

SEED의 s1–s3 값과 유사한 low/mid/high 구조를 사용한다.

## 사용 원칙

### shadow-none
- KPI card
- Chart card
- Table card
- Insight card
- Summary banner

### shadow-low
- 필요 시 hover된 floating card
- sticky element가 content 위로 실제 겹칠 때
- 작은 transient surface

### shadow-mid
- Dropdown
- Popover
- Date picker
- Context menu

### shadow-high
- Modal
- Dialog
- 화면 최상위 blocking surface

---

# 6. Border vs Shadow 선택 기준

## Border를 우선

다음 경우 shadow보다 border를 우선한다.

- 같은 page layer 위의 card
- 서로 나란히 있는 dashboard module
- table/list 영역
- sidebar와 content 분리
- static content grouping

## Shadow를 우선

다음 경우 실제 elevation을 전달해야 하므로 shadow를 쓸 수 있다.

- 다른 콘텐츠와 겹침
- overlay
- popup
- transient feedback
- modal

## Surface color를 우선

다음 경우 border/shadow 없이 background tone만으로도 충분하다.

- inset grouping
- selected/subtle region
- explanatory callout
- neutral control group

---

# 7. Nested Surface Rule

Card 안에 또 box가 들어갈 경우:

## 기본값

```text
Outer Card
  └─ Subtle surface
      border: none
      shadow: none
```

즉 내부 grouping에:
- 또 White card
- 또 1px border
- 또 shadow

를 반복하지 않는다.

## Border를 허용하는 경우

nested area 자체가 별도 interaction boundary일 때.

예:
- selectable item
- input area
- upload drop zone
- 별도 form control

이때도 shadow는 기본적으로 사용하지 않는다.

---

# 8. Divider Rule

Divider는 border보다 더 약한 구조 구분이다.

용도:
- table row
- list row
- sidebar section
- card 안의 distinct body section

기본:

```text
1px border-subtle
```

Divider 앞뒤에 충분한 spacing이 있다면 굳이 line을 추가하지 않는다.

즉:

```text
spacing OR divider
```

중 하나만으로 관계가 명확하면 둘 다 쓰지 않는다.

---

# 9. Summary / Highlight Surface

Summary banner처럼 일반 card보다 의미적으로 강조된 영역은:

```text
brand-subtle fill
+ brand-subtle border
+ no shadow
```

를 사용한다.

색상이 이미 hierarchy를 만들기 때문에 shadow를 추가하지 않는다.

---

# 10. Interaction과 Elevation

Hover되었다고 모든 element가 “위로 떠야” 하는 것은 아니다.

## 일반 button / row hover

- background change
- border change

정도로 처리한다.

## 실제 draggable / floating card

필요한 경우에만 low shadow 적용.

즉:

```text
hover != elevation
```

이다.

---

# 11. Sidebar

Sidebar는 page와 다른 structural surface이지만 floating surface는 아니다.

기본:

```text
surface.default
+ right border
+ no shadow
```

Sticky 상태에서도 content와 겹치지 않는다면 shadow를 추가하지 않는다.

---

# 12. Table

Table card:

```text
Outer card:
  border-default
  no shadow

Table header:
  subtle surface

Rows:
  default surface
  divider-subtle
```

각 row에:
- 별도 border
- 별도 shadow
- 별도 rounded surface

를 넣지 않는다.

---

# 13. Tooltip / Popover

Tooltip은 실제로 content 위에 올라오는 temporary surface다.

Tooltip:
- dark high-contrast surface
- shadow-low 또는 mid
- border는 상황에 따라 생략 가능

Popover / Dropdown:
- surface.floating
- border-default
- shadow-mid
- R8–12

---

# 14. Surface Token Proposal

```css
--surface-canvas: #F7F9FC;
--surface-default: #FFFFFF;
--surface-subtle: #F7F9FC;
--surface-inset: #F1F4F8;
--surface-floating: #FFFFFF;

--border-subtle: #F1F4F8;
--border-default: #E5EAF0;
--border-strong: #D5DCE5;

--shadow-none: none;
--shadow-low: 0 1px 4px rgba(0,0,0,.08);
--shadow-mid: 0 2px 10px rgba(0,0,0,.10);
--shadow-high: 0 4px 16px rgba(0,0,0,.12);
```

---

# 15. Prototype 적용 규칙

현재 prototype에서:

### Shadow 제거
- KPI cards
- Chart card
- Insight card
- Track card
- Event card

### 유지
Tooltip:
- shadow-mid

### Border 유지
- top-level card
- KPI card
- controls
- sidebar separator

### 내부 Surface
- Insight footnote: subtle fill / no border / no shadow
- Segmented control: inset fill / no border / no shadow
- Table header: subtle fill
- Event tag: semantic/subtle fill

---

# 16. 피해야 할 패턴

## Don't — Border + Shadow + Strong Fill 모두 사용

```text
Card
= white fill
+ dark border
+ shadow
+ strong background contrast
```

한 요소를 구분하기 위해 세 가지 elevation 표현을 동시에 과도하게 사용하지 않는다.

## Don't — 모든 카드 shadow

Dashboard의 모든 module에 shadow를 적용하지 않는다.

## Don't — Nested card repetition

```text
Card
 └ Card
    └ Card
```

대신:
- subtle surface
- divider
- spacing

을 우선한다.

## Don't — Hover = Shadow

hover는 interaction state이지 반드시 elevation change가 아니다.

---

# 17. Decision Status

| 결정 | 상태 |
|---|---|
| Canvas / Default / Subtle / Floating surface 분리 | Stable |
| 일반 dashboard card는 border + no shadow | Proposed |
| Shadow는 실제 floating/overlay 위주로 제한 | Stable |
| Default border 1px | Stable |
| nested surface에서 border/shadow 반복 금지 | Stable |
| Divider는 subtle 1px | Proposed |
| low/mid/high shadow scale | Proposed |

실제 화면에서 card 경계가 너무 약하거나 강하지 않은지 확인 후 색상값을 Stable로 승격한다.
