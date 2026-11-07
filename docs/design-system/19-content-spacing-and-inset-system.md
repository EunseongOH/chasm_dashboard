# CHASM Content Spacing & Inset System — v0.1

> 상태: Stable principles + Proposed semantic inset values  
> 목적: “박스 안에 텍스트가 있을 때 몇 px 띄울 것인가”를 컴포넌트마다 다시 판단하지 않고, **박스의 역할·정보 밀도·상호작용 여부**에 따라 일관된 내부 여백과 요소 간 간격을 사용한다.
>
> Primitive spacing scale 자체는 `04-spacing-and-radius.md`를 따른다. 이 문서는 primitive spacing을 **실제 container 역할에 매핑하는 semantic layer**다.

---

# 0. Why This Layer Exists

기존 Spacing System은 다음을 잘 정의하고 있었다.

- 4px baseline + optical 2px
- card 20px / KPI 16px
- title ↔ description
- layout gap
- radius hierarchy

하지만 실제 product UI에서는 다음 질문이 반복된다.

```text
이 안내 박스는 12px인가 16px인가?
Tooltip은 왜 8×10인가?
Popover 안 form은 12px인가 16px인가?
Insight row는 카드처럼 20px을 써야 하나?
Chip 안 텍스트와 X 버튼은 얼마나 떨어져야 하나?
텍스트 + action이 같은 box에 있으면 action 위 간격은?
```

따라서 다음을 분리한다.

```text
Outer spacing
Container inset
Internal stack gap
Inline gap
Action separation
```

---

# 1. Terminology

## Outer spacing

Container와 다른 container 사이 거리.

예:
- 카드 ↔ 카드
- 카드 ↔ 다음 section

## Inset

Container edge에서 첫 content까지의 내부 여백.

```text
┌──────────────┐
│ ← inset → Text
│
└──────────────┘
```

## Stack gap

같은 container 안에서 vertical sibling group 사이 거리.

## Inline gap

아이콘 ↔ 텍스트, label ↔ value처럼 같은 행의 요소 간 거리.

## Action separation

본문 group과 button/link group 사이 거리.

---

# 2. Primitive Scale

Primitive token은 기존 체계를 재사용한다.

- 2
- 4
- 6
- 8
- 10
- 12
- 16
- 20
- 24
- 32px

새 semantic system을 위해 14px, 18px 같은 arbitrary value를 추가하지 않는다.

---

# 3. Semantic Inset Ladder

CHASM container는 역할에 따라 다음 inset ladder를 사용한다.

| Role | Block / Inline | 예시 |
|---|---:|---|
| Micro label | 2 / 6 | event tag |
| Compact chip | 4 / 8–10 | active filter chip |
| Tooltip | 8 / 10 | definition tooltip |
| Dense interactive row | 10 / 12 | menu/list row |
| Inline notice | 12 / 16 | warning/info/error |
| Popover / menu panel | 16 / 16 | filter/date picker |
| Inset content box | 16 / 16 | evidence/details |
| Compact card | 16 / 16 | KPI |
| Standard card | 20 / 20 | chart/table/analysis |
| Empty / spacious state | 24 / 24 | empty/error replacement |
| Dialog content | 24 / 24 | modal body |

상태:
- 역할 구조: Stable
- 정확한 수치: Proposed until visual stress test

---

# 4. Why Horizontal Inset Is Often Larger

텍스트가 들어간 compact box에서는 종종:

```text
vertical 12
horizontal 16
```

처럼 inline inset을 더 크게 둔다.

이유:
- 한글 문장은 획 밀도가 높아 edge와 가까우면 답답해 보임
- horizontal reading 시작/끝에 breathing room 필요
- icon + text가 있으면 좌우가 더 복잡함

따라서 notice/callout은 기본적으로:

```text
12px block / 16px inline
```

을 사용한다.

---

# 5. Text-only Box

단순 설명 box:

```text
[Title]
[Description]
```

기본:
- inset: 12/16 또는 16/16
- title → description: 2–4
- paragraph ↔ paragraph: 8
- 별도 action이 없으면 추가 bottom gap 없음

선택:
- 짧고 보조적인 note → 12/16
- 독립된 explanation/evidence → 16/16

---

# 6. Icon + Text Box

Anatomy:

```text
[Icon]  [Title]
        [Body]
```

기본:
- container inset: 12/16
- icon ↔ text group: 10–12
- title ↔ body: 2–4
- icon top은 첫 text line과 optical align

Icon container 자체가 background box를 갖는다면:
- icon box → text: 10
- icon box internal inset은 icon primitive size에 맞춤
- 전체 notice inset을 줄이지 않음

---

# 7. Text + Action Box

Anatomy:

```text
Title
Body

[Action]
```

기본:
- body → action: 12
- action이 inline link면 6–8 가능
- button group이면 12
- button ↔ button: 8

한 줄 message + 작은 link:
```text
Message     Action
```

가능하지만 좁은 폭에서는 action을 아래로 reflow한다.

---

# 8. Notice / Message Bar

Role:
- 상태
- 경고
- 오류
- 정보

기본:
- inset: 12 block / 16 inline
- icon → content: 12
- title → body: 2–4
- content → action: 12
- close target이 있으면 right inset은 close target 포함해 별도 계산

현재 기존 `.data-state-notice`의 12px all-side는:
- vertical은 적절
- horizontal은 다소 tight

따라서 12/16으로 조정한다.

---

# 9. Callout

Callout은 상태 피드백이 아니라 **미리 알아야 할 contextual information**이다.

기본:
- inset: 16
- title → body: 4
- body → link: 8–12
- 다른 card 내부에 들어가도 20px card inset을 반복하지 않음

Callout 자체가 또 card처럼 보이지 않도록:
- no shadow
- subtle surface
- radius 8–12

---

# 10. Popover / Filter Panel

Form/control을 포함하는 floating box.

기본:
- inset: 16
- field ↔ field: 12
- field label → control: 4
- control group → actions: 16
- action buttons gap: 8

현재 query/filter popover의 12px inset은 compact하지만,
한글 label + date input + action이 들어갈 때 답답할 수 있어 16px을 Proposed default로 올린다.

단 매우 작은 context menu는 별도 compact menu row grammar를 사용한다.

---

# 11. Menu / List Panel

단순 option list:

Panel inset:
- top/bottom: 8
- inline: 8

각 row:
- min-height 36–40
- row inline padding 12
- icon → label 8–10

즉:
```text
Panel padding 8
  Row padding 0/12
```

처럼 panel과 row inset을 합성한다.

Popover 전체에 16을 주고 각 row에도 16을 주어 32px씩 누적하지 않는다.

---

# 12. Evidence / Detail Box

근거 표, 정의, source detail처럼 정보량이 있는 inset surface.

기본:
- inset: 16
- heading → first row: 12
- row ↔ row: 8
- label ↔ value column: 12
- distinct section: 16

현재 `.insight-evidence`의 16px은 역할에 적합하므로 유지한다.

---

# 13. Interactive Insight Row

이것은 작은 card가 아니라 **card 내부 interactive row**다.

따라서:
- outer side margin: 12
- row inset: 10 block / 12 inline
- icon → text: 10
- text title → support: 2
- arrow/action area: 최소 24 target 확보

기존 12 block / 8 inline은 horizontal 여백이 너무 작은 방향이라 수정한다.

---

# 14. Tooltip

Tooltip은 가장 compact한 floating explanatory surface.

기본:
- 8 block / 10 inline
- title이 있다면 title → body 2–4
- 최대 1–3 short sentences
- interactive action이 필요하면 tooltip이 아니라 popover

현재 값 8/10은 유지.

---

# 15. Tag

짧은 metadata label.

기본:
- 2 block / 6 inline
- single line
- action 없음

현재 event tag 2/6 유지.

---

# 16. Removable Chip

Label + remove button.

Anatomy:

```text
10px  Label  4px [24px remove] 4px
```

기본:
- min-height: 28–32
- start inset: 10
- label → remove: 4
- remove target: 24 minimum
- end inset은 remove target 외부 4

일반 tag와 같은 inset을 쓰지 않는다.

현재 Filter Chip 구조는 이 원칙과 일치하므로 유지.

---

# 17. Card

## Standard Card

- inset: 20
- header ↔ body: 16
- distinct body group: 16

## Compact KPI

- inset: 16
- label → value: 4
- value → comparison: 0–2
- metric → support: 12–16

## Edge-to-edge Table Card

Card header:
- 20 inline
- 20 top

Table:
- card body edge-to-edge 가능
- cell 자체 inset으로 정렬

즉 table까지 20px wrapper를 추가해 이중 inset을 만들지 않는다.

---

# 18. Summary Banner

현재:
- 16 block / 20 inline

역할:
- page-level summary
- card보다 짧은 one-line/short multi-line

따라서 Standard Card 20 all-side보다 block inset을 줄이는 현재 규칙을 유지한다.

---

# 19. Empty / Error Replacement State

상태가 원래 content 영역을 대체할 때:
- inset: 24
- icon → title: 12
- title → body: 4
- body → primary action: 12–16

Minimum height는 component context에 따라 달라질 수 있다.

Empty state는 좁게 12px inset을 사용하지 않는다.

---

# 20. Dialog

Modal/dialog는 별도 focused task surface다.

기본 Proposed:
- Header: 24
- Body: 0 24 24 또는 body section 24
- Footer: 16–24
- title → description: 4
- body group: 16
- footer buttons: 8

Scrolling dialog에서는:
- Header/Footer fixed
- Body scroll
- 각 영역 padding을 중복하지 않음

---

# 21. Table Cell Inset

Table은 box/container padding과 다르게 **row rhythm**이 우선한다.

Current:
- standard x: 16
- rich resource x: 20
- row height: 40 / 48 / 64

유지.

Table cell에 vertical padding을 별도로 추가해 row height와 충돌시키지 않는다.

---

# 22. Form Field Group

```text
Label
4
Control
4–6
Help / Error
```

서로 다른 field:
- 12–16

Field group → form actions:
- 16–24

Error가 생겨도 field 사이 margin이 랜덤하게 늘어나지 않도록 helper/error 영역을 같은 anatomy로 취급한다.

---

# 23. Button Content

Button은 container inset보다 min-height 중심.

기본:
- Compact: 32h, inline 8–12
- Default: 40h, inline 12–16
- icon ↔ text: 8
- icon-only: 32/40 square

텍스트가 길어져 wrap되면 fixed height가 아니라 min-height를 유지한다.

---

# 24. Structural spacing에서 negative margin 금지

기본적으로 component 간 간격을 맞추기 위해 negative margin을 사용하지 않는다.

피함:
- 이전 요소의 bottom margin을 상쇄하기 위한 `margin-top: -12px`
- close/action target을 box edge 밖으로 밀어내는 음수 margin
- breakpoint마다 겹침을 숨기기 위한 offset 보정

선호:
- parent `gap`
- expanded/collapsed state별 명시적 margin
- grid/flex alignment
- 별도의 inset token

예외:
- chart annotation처럼 좌표 기반 optical positioning
- 명확한 overlay primitive

이 예외도 content flow spacing 용도로 사용하지 않는다.

# 25. Parent Owns Spacing

Stable 원칙:

```text
Sibling spacing is owned by the parent.
```

피함:
- 각 child에 margin-top
- 마지막 child에만 특별 margin
- 상태에 따라 margin 누적

선호:
- flex/grid gap
- parent padding
- dedicated section separator

예외:
- document flow paragraph
- semantic alignment을 위해 component-local optical margin이 필요한 경우

---

# 25. Nested Inset Accumulation

다음처럼 같은 방향 padding이 누적되지 않는지 확인한다.

나쁨:
```text
Card 20
  Sub-box 20
    Row 16
      Text
→ edge에서 text까지 56px
```

선호:
```text
Card 20
  Subtle group 12–16
    Row local 0–12
```

Nested surface가 독립 의미를 가질수록 inset을 가질 수 있지만,
부모와 child가 같은 역할의 padding을 반복하지 않는다.

---

# 26. Flush vs Inset Children

## Flush child

Card edge까지 뻗어도 되는 것:
- table
- divider
- chart plot area 일부
- full-width list

Header alignment은 card inset을 유지.

## Inset child

- explanatory callout
- evidence
- form
- empty state
- status notice

역할에 따라 semantic inset을 사용.

---

# 27. Box Density Modes

CHASM은 user-selectable density mode를 제공하지 않는다.

대신 component role별 density를 고정한다.

- Tag / tooltip: Micro
- Row / controls: Compact
- Notice / popover: Standard
- Card / evidence: Comfortable
- Empty/dialog: Spacious

“데이터가 많다”는 이유로 모든 container를 compact하게 만들지 않는다.

---

# 28. Responsive Inset

좁은 화면에서 무조건 모든 padding을 절반으로 줄이지 않는다.

기본:
- page horizontal padding 32 → 24 → 16
- top-level card 20은 가능한 유지
- spacious empty/dialog 24 → 20 또는 16 검토
- micro/notice/tag inset은 동일 유지

즉 page gutter가 줄고 component anatomy는 최대한 유지된다.

---

# 29. Audit of Current Prototype

2026-11 audit:

## Keep

- Tooltip: 8/10
- Event tag: 2/6
- Filter chip anatomy
- Standard card: 20
- KPI: 16
- Summary banner: 16/20
- Insight evidence: 16
- Empty state: 24
- Table cell: 16/20

## Adjust

### Data-state notice
Before:
```text
12 / 12
```

After:
```text
12 block / 16 inline
```

### Query / Filter popover
Before:
```text
12
```

After:
```text
16
```

### Insight interactive row
Before:
```text
12 block / 8 inline
```

After:
```text
10 block / 12 inline
```

### Insight footnote
Before:
```text
12
```

After:
```text
12 block / 16 inline
```

Artist context explanatory panel:
- 12 is acceptable because it is compact contextual UI, not long-form evidence.

---

# 30. Semantic CSS Tokens

Candidate:

```css
--inset-tag-block: 2px;
--inset-tag-inline: 6px;

--inset-tooltip-block: 8px;
--inset-tooltip-inline: 10px;

--inset-row-block: 10px;
--inset-row-inline: 12px;

--inset-notice-block: 12px;
--inset-notice-inline: 16px;

--inset-panel: 16px;

--inset-card-compact: 16px;
--inset-card-standard: 20px;
--inset-state-spacious: 24px;
```

Primitive values를 직접 쓰는 것을 금지하지는 않지만,
공통 역할이 있는 container는 semantic inset token을 우선한다.

---

# 31. Decision Checklist

새 box를 만들기 전:

1. 이 box가 정말 필요한가?
2. 역할은 tag / row / notice / panel / card / state / dialog 중 무엇인가?
3. interactive한가?
4. text length는 한 줄인가 여러 줄인가?
5. icon/action이 있는가?
6. parent padding과 중복되는가?
7. nested radius와 inset이 시각적으로 맞는가?
8. 좁은 화면에서 inset을 유지해도 되는가?

---

# 32. Decision Status

| 결정 | 상태 |
|---|---|
| Outer spacing / Inset / Stack / Inline gap 구분 | Stable |
| Parent owns sibling spacing | Stable |
| Nested inset 중복 방지 | Stable |
| 역할 기반 inset ladder | Stable |
| Notice 12/16 | Proposed → prototype 적용 |
| Popover 16 | Proposed → prototype 적용 |
| Interactive insight row 10/12 | Proposed → prototype 적용 |
| Tooltip 8/10 | Stable |
| Tag 2/6 | Stable |
| Standard card 20 | Proposed |
| Compact card 16 | Proposed |
| Empty state 24 | Proposed |
| Dialog 24 | Proposed |


# 33. Text Group Separation

CHASM의 heading/supporting copy는 line-height만으로 붙여놓지 않는다.

기본:
- Kicker → Title: 2px
- Title → supporting description: 4px
- Description → distinct content group: 16–20px
- Body → button/action group: 12px

Lab specimen에서도 같은 원칙을 사용한다.

특히:
```text
CASE LABEL
Title
Description
[Specimen]
```

구조는:
- Label → Title: 2px
- Title → Description: 4px
- Description → Specimen: 20px

을 기본으로 한다.

# 34. Overlap Prevention

Grid/Flex 안에서 긴 한국어 text가 sibling control을 밀어 겹치지 않도록:
- text column에 `min-width: 0`
- 필요한 설명문에 `overflow-wrap: anywhere`
- action/close target은 독립 column/row
- 좁은 화면에서는 축소보다 reflow 우선

를 적용한다.

Absolute positioning은 chart/tooltip/overlay처럼 실제 overlay 의미가 있을 때만 사용한다.
