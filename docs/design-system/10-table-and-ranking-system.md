# CHASM Table & Ranking System — v0.1

> 상태: Proposed v0.1  
> 목적: 곡·앨범·플랫폼·국가·플레이리스트처럼 음악 데이터에서 반복적으로 등장하는 “정확한 조회”와 “빠른 순위 파악”을 서로 다른 패턴으로 정의한다.

---

# 0. Core Principle

CHASM에서는 다음을 구분한다.

## Data Table
정확한 값을 행/열 기준으로 비교하고, 정렬·탐색·필터링해야 할 때.

## Resource Table
곡/앨범처럼 artwork + primary label + metadata가 함께 있는 데이터.

## Ranking Preview
Top-N을 빠르게 훑고 “누가 큰가”를 즉시 이해하는 요약 모듈.

## Comparison Matrix
여러 entity와 여러 metric을 동시에 비교해야 할 때.

같은 데이터를 표현한다고 해서 항상 같은 table UI를 쓰지 않는다.

---

# 1. 참고 디자인 시스템에서 가져온 원칙

## Carbon

Carbon Data Table은:
- title / description
- toolbar
- column header
- rows
- optional pagination

을 기본 anatomy로 둔다.

또한 row density를 여러 단계로 제공하고, 일반적인 default를 40px 전후로 두며 두 줄 콘텐츠가 필요한 경우 64px까지 허용한다.

Data table은 페이지의 주요 콘텐츠 영역에 충분한 폭을 확보해 배치하고, 작은 컨테이너 안에 중첩해 억지로 잘라 쓰지 않는 것을 권장한다.

Sorting은 column header에서 수행할 수 있으며, 정렬 중인 column만 persistent indicator를 유지한다.

Reference:
- https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines
- https://www.carbondesignsystem.com/building-blocks/core/components/data-table/specifications

## Shopify Polaris

Polaris Index Table은:
- search
- filter
- sort
- selection
- pagination
- bulk action

을 하나의 collection-management pattern으로 본다.

특히 narrow layout에서는 table header가 사라질 수 있으므로:
- primary
- secondary
- inline
- labeled

같은 정보 우선순위를 정의해 list 형태로 재구성한다.

정렬 상태는 column header 자체가 아니라 하나의 shared state/source of truth로 유지한다.

References:
- https://shopify.dev/docs/api/app-home/latest/patterns/compositions/index-table
- https://shopify.dev/docs/apps/build/app-home/migrate-from-polaris-react/data-table
- https://shopify.dev/docs/apps/build/app-home/migrate-from-polaris-react/index-table

## WAI / W3C

가능하면 native HTML `table`, `th`, `td` semantics를 사용한다.

Sortable column에는 `aria-sort`를 적용한다.

Table이 실제 spreadsheet-style interactive grid가 아니라면 굳이 ARIA grid keyboard model을 구현하지 않는다.

References:
- https://www.w3.org/WAI/tutorials/tables/
- https://www.w3.org/WAI/ARIA/apg/patterns/table/
- https://www.w3.org/WAI/ARIA/apg/practices/grid-and-table-properties/

---

# 2. Pattern Selection

## Data Table을 사용

질문:
- 정확한 값을 찾아야 하는가?
- 여러 column을 비교해야 하는가?
- 정렬/필터가 중요한가?
- row detail로 이동해야 하는가?

예:
- 전체 곡 성과 목록
- 국가별 청취자
- Playlist 유입 목록
- 플랫폼별 세부 KPI

## Ranking Preview를 사용

질문:
- 상위 5개 정도를 빠르게 보고 싶은가?
- 한 metric 기준 순위가 핵심인가?
- 정확한 전체 dataset 탐색은 별도 화면에 있는가?

예:
- 최근 성장 기여 Top 5 곡
- 청취자 Top 5 국가
- 스트리밍 유입 Top 5 Playlist

## Comparison Matrix를 사용

질문:
- 한 entity를 여러 metric으로 비교해야 하는가?

예:
- 곡별 Streams / Saves / Listeners / Completion
- 국가별 Spotify / YouTube / Apple 비중

단 metric 정의가 서로 comparable한지 먼저 확인한다.

---

# 3. Table Anatomy

```text
Table Module
├─ Header
│  ├─ Title
│  ├─ Description
│  └─ Optional actions
│
├─ Optional toolbar
│  ├─ Search
│  ├─ Filters
│  └─ Sort / View options
│
├─ Table
│  ├─ Column headers
│  └─ Rows
│
└─ Optional footer
   ├─ Pagination
   ├─ Result count
   └─ Show more
```

Toolbar, pagination, selection은 데이터와 task가 필요할 때만 추가한다.

---

# 4. Table Types

## 4.1 Standard Data Table

주로 숫자/텍스트 중심.

기본 row:
```text
40–48px
```

예:
- 국가
- 청취자 수
- 스트리밍
- 변화율

## 4.2 Rich Resource Table

Artwork + 두 줄 metadata가 있는 음악 resource.

기본 row:
```text
64px
```

예:
- album cover
- track title
- album/release metadata

Header는 40px 수준으로 유지할 수 있다.

이 variant는 일반 dense data table과 row height를 동일하게 강제하지 않는다.

## 4.3 Ranking Preview

기본:
```text
5–6 rows
```

하나의 핵심 metric만 강조.

가능:
- horizontal bar
- rank number
- primary label
- exact/compact value
- optional delta

전체 탐색이 필요하면 “전체 보기”로 table 화면에 연결한다.

## 4.4 Comparison Matrix

여러 numeric columns를 가진 dense table.

화면 폭을 충분히 확보하고, 작은 card 안에 넣지 않는다.

---

# 5. Column Roles

Column을 단순 width가 아니라 역할로 분류한다.

## Identity / Primary
예:
- 곡
- 앨범
- 국가
- 플랫폼

정렬:
```text
left
```

가능하면 가장 넓은 flexible column.

## Numeric
예:
- 4,832,101
- 38.4%
- 126일

정렬:
```text
right
```

이유:
자리수를 세로로 정렬해 크기 비교를 쉽게 한다.

`font-variant-numeric: tabular-nums` 사용.

## Delta
예:
- ↑ 12.4%
- -2.3%

정렬:
```text
right
```

Direction ≠ Evaluation 원칙 유지.

## Rank
예:
- 1
- 2
- 3

작은 고정 폭.

정렬:
- right 또는 center 가능
- 같은 table 내 일관되게 유지

CHASM 기본은 right alignment를 제안한다.

## Date
예:
- 2026. 9. 18.

기본:
```text
left
```

날짜끼리 exact comparison이 핵심인 dense table에서는 tabular numerals 사용 가능.

## Status / Tag
짧은 상태 label.

정렬:
- left 기본
- numeric column 사이에 애매하게 center하지 않음

## Action
row 끝.

너비 최소화.
Icon button / overflow menu 사용.

---

# 6. Column Width Strategy

모든 column에 고정 px을 지정하지 않는다.

## Primary identity

```text
minmax(180px, 1.5–2fr)
```

긴 제목이 들어올 가능성이 높아 가장 유연해야 한다.

## Numeric

```text
min-width: 88–120px
```

단위와 최대 자리수에 따라 결정.

## Delta

```text
80–96px
```

## Rank

```text
40–48px
```

## Artwork

```text
32–40px
```

row height와 함께 결정한다.

---

# 7. Row Density

CHASM은 세 가지 density만 둔다.

## Compact

```text
40px
```

용도:
- 숫자 중심
- metadata 한 줄
- 고밀도 detail 화면

## Standard

```text
48px
```

용도:
- 일반 data table
- interaction이 조금 더 필요한 행

## Rich

```text
64px
```

용도:
- artwork
- title + secondary metadata
- track / album resource

24px row 같은 extreme density는 CHASM 기본 사용자가 데이터 전문가가 아니라는 점에서 기본값으로 사용하지 않는다.

---

# 8. Cell Padding

기본 horizontal:
```text
16px
```

Rich table이 card header와 맞아야 하는 경우:
```text
20px
```

Column 간 실제 시각적 공간은 cell padding으로 관리한다.

Column마다 임의 margin을 넣지 않는다.

---

# 9. Header

## Visual

- subtle surface
- 12px / 16
- semibold
- neutral secondary/tertiary
- body row보다 높은 contrast가 아니라 구조를 보여줄 정도

## Alignment

Header는 해당 column data alignment와 일치한다.

Numeric column:
- header도 right

Identity:
- left

## Sortable header

정렬 가능한 column만 button/interactive affordance를 가진다.

### Unsorted
기본 상태에서는 지나친 icon noise를 만들지 않는다.

가능:
- hover/focus에서 sort icon 노출

### Sorted
persistent direction indicator.

`aria-sort="ascending|descending"`

를 해당 `th`에 적용한다.

한 번에 하나의 primary sort만 `aria-sort`로 표현한다.

---

# 10. Sorting

## Default sort

사용자의 기본 질문과 맞아야 한다.

예:
“최근 성과가 좋은 곡”
→ 최근 변화 descending

“전체 스트리밍”
→ streams descending

단순히 첫 numeric column을 기본 sort로 쓰지 않는다.

## Sort label

Sort state는 화면 narrow 여부와 관계없이 유지되어야 한다.

Wide:
- column header sort 허용

Narrow:
- separate sort select/menu 필요

정렬 source of truth를 둘로 만들지 않는다.

## Multi-sort

MVP 기본 지원하지 않는다.

실제 분석 workflow에서 필요성이 확인되면 추가한다.

---

# 11. Ranking System

Ranking은 table보다 빠른 scan을 목표로 한다.

## Basic anatomy

```text
1  Track title                4.83M
   ███████████████

2  Track title                3.92M
   ████████████
```

또는 bar와 row를 같은 line에 배치할 수 있다.

## Rank number

- 1, 2, 3...
- decorative medal/gold/silver/bronze 사용 기본 금지
- 순위 자체가 semantic status이지 “성공/실패” 색상은 아님

## Bar

Ranking bar는 zero baseline에서 길이 비교.

모든 bar는 같은 scale 사용.

## Value

Preview:
- compact 허용

Detail tooltip/table:
- exact

---

# 12. Rank Change

순위 변화와 metric 변화는 구분한다.

예:

```text
현재 순위 3위
지난 기간 5위
순위 +2
```

표현:
- ↑ 2
- ↓ 1
- — 유지

주의:
순위 숫자는 작아질수록 좋아지는 방향이기 때문에 일반 metric delta formatter와 같은 로직을 그대로 쓰면 안 된다.

즉:
```text
rank delta != metric delta
```

## Color

rank 상승을 자동 green, 하락을 red로 표시하지 않는다.

arrow + number로 방향을 먼저 전달한다.

---

# 13. Resource Identity

곡/앨범 row에서 identity block은:

```text
[Artwork] Track Title
          Album · Release date
```

## Artwork

- 32–40px
- R6–8
- decorative이면 alt empty
- artwork 자체가 primary navigation target이 되지 않도록 함

## Title

- 13–14px / 20
- semibold
- primary text

## Metadata

- 12px / 16
- tertiary
- album / type / release date 중 필요한 정보만

metadata를 한 줄에 너무 많이 넣지 않는다.

---

# 14. Long Labels

음악 데이터에서는 긴 제목이 정상적인 case다.

## Wide table

Primary identity는 가능한 한 1줄 유지 + ellipsis 허용.

단 사용자가 전체 title을 확인할 수 있는:
- tooltip
- row detail
- accessible name

중 하나를 제공.

## 중요도가 높은 비교 화면

2-line clamp 허용.

## 금지

제목을 맞추기 위해 11px 이하로 축소.

---

# 15. Responsive Column Priority

모든 column에 우선순위를 둔다.

## P0 — Identity
항상 유지.

예:
- 곡명
- 국가명
- 플랫폼

## P1 — Primary metric
현재 화면의 핵심 metric.

항상 유지.

## P2 — Comparison/context
가능하면 유지.

예:
- 변화율
- rank change
- secondary metric

## P3 — Supporting metadata
좁은 화면에서:
- row secondary line으로 이동
- detail로 이동
- 필요 시 숨김

예:
- 발매일
- album type
- 낮은 우선순위 metric

---

# 16. Narrow Layout

단순히 column display:none만 반복하지 않는다.

Wide:
```text
Track | Streams | Delta | Saves | Release date
```

Narrow:
```text
[Cover] Track title
        Album · 2026. 9. 18.

4,832,101 streams      ↑36.8%
```

즉 row 자체가 list item처럼 재구성될 수 있다.

Sort control은 table header가 없어져도 사용할 수 있어야 한다.

---

# 17. Horizontal Scroll

가능하면 reflow / column priority를 우선한다.

Horizontal scroll 허용:
- comparison matrix
- 실제로 여러 exact metric을 동시에 봐야 하는 detail workspace

이때:
- identity column sticky 검토
- scroll area임을 시각적으로 알 수 있어야 함
- keyboard 접근 가능해야 함

Overview card에서 horizontal scroll은 지양한다.

---

# 18. Sticky Header

다음 조건에서 사용을 검토한다.

- table이 viewport에서 길게 이어짐
- 15–20 rows 이상
- 사용자가 column 의미를 잊을 가능성이 있음

Sticky header:
- surface default/subtle
- bottom divider
- shadow는 실제 overlay가 생길 때만 low를 검토

짧은 preview table에는 사용하지 않는다.

---

# 19. Row Hover / Navigation

## Static table
row hover 없음.

## Navigable resource table
row hover:
- subtle surface

Primary title은 실제 link semantics를 권장한다.

전체 row click을 사용할 경우:
- checkbox/action button과 충돌하지 않게 설계
- keyboard user도 동일 destination에 접근 가능해야 함

---

# 20. Row Actions

기본적으로 action icon을 항상 여러 개 노출하지 않는다.

우선:
- primary row navigation
- optional overflow action

Hover에서만 action을 보여줄 수 있지만 keyboard focus 시에도 나타나야 한다.

Critical action은 overflow 내부에서도 명확히 구분한다.

---

# 21. Selection

Selection은 실제 bulk/single action이 있을 때만 추가한다.

Selection 없는 분석 table에 checkbox를 습관적으로 넣지 않는다.

Multi-select:
- checkbox
- selected count
- bulk action toolbar

Selection state는 DOM checkbox 자체만 source of truth로 사용하지 않는다.

---

# 22. Pagination vs Show More

## Ranking Preview

기본:
- 5–6 rows
- “전체 보기”

Pagination 사용하지 않음.

## Long Data Table

사용자 목적이 browsing/search라면:
- pagination 또는 cursor navigation

을 사용.

정확한 page size는 데이터량과 backend 방식 확정 후 결정한다.

SEED의 Table Pagination처럼:
- rows per page
- current range
- previous
- next

구조를 사용할 수 있다.

## Infinite Scroll

정확한 위치/재탐색이 중요한 analytics table에서는 기본 사용하지 않는다.

---

# 23. Search / Filter / Toolbar

Table 자체와 toolbar를 구분한다.

Toolbar가 필요한 경우:
- search
- filter
- sort
- view setting
- export

모든 table에 toolbar를 넣지 않는다.

검색/필터 변경 시:
- pagination/cursor reset
- selection 정책 명확화

실제 data layer 확정 후 상세 state logic을 정한다.

---

# 24. Exact vs Compact Numbers

## Table
정확값 우선.

예:
```text
4,832,101
```

## Ranking Preview
공간이 제한적이면:
```text
483만
4.83M
```

가능.

단 product 전체 number formatting rule을 따른다.

## Tooltip / Detail
exact value.

---

# 25. Units

Column header 또는 value 중 한 곳에서 unit이 명확해야 한다.

좋음:
```text
스트리밍
4,832,101회
```

또는:

```text
스트리밍(회)
4,832,101
```

같은 column에서 모든 row에 “회”를 반복할지 여부는 가독성에 따라 선택한다.

다른 unit이 섞이지 않게 한다.

---

# 26. Delta Formatting

metric delta:

```text
↑ 12.4%
↓ 2.3%
—
```

rank delta:

```text
↑ 2
↓ 1
—
```

%와 %p 구분.

평가 의미가 확실하지 않으면 semantic green/red 사용 금지.

---

# 27. Empty / Loading / Error

상세 Data State 시스템은 Deferred 상태다.

Table System에서는 현재 구조만 예약한다.

- loading → row skeleton 가능
- no results after filter → filter-specific empty
- no source data → source-level empty
- error → retry/action

구체적 copy와 visual state는 actual data pipeline 확정 후 별도 문서에서 정의한다.

---

# 28. Accessibility

가능하면 native HTML table 사용.

```html
<table>
  <caption>최근 성과가 좋은 곡</caption>
  <thead>
    <tr>
      <th scope="col">곡</th>
      <th scope="col">전체 스트리밍</th>
    </tr>
  </thead>
  <tbody>...</tbody>
</table>
```

Sortable:
- `aria-sort` on `th`
- sort button has accessible name

Interactive controls:
- normal Tab order 유지

단순 읽기용 table을 spreadsheet-style ARIA grid로 바꾸지 않는다.

---

# 29. Table vs Grid

## HTML Table
사용:
- 읽기
- 정렬
- row action
- link
- selection 정도

## ARIA Grid / Spreadsheet-like
사용:
- cell-by-cell keyboard navigation
- inline cell editing
- complex grid interaction

CHASM MVP analytics에서는 기본적으로 HTML Table을 우선한다.

---

# 30. Visual Tokens — Proposed

```css
--table-header-height: 40px;
--table-row-compact: 40px;
--table-row-standard: 48px;
--table-row-rich: 64px;

--table-cell-padding-x: 16px;
--table-cell-padding-rich-x: 20px;

--table-header-bg: var(--surface-subtle);
--table-row-bg: var(--surface-default);
--table-row-hover: var(--surface-subtle);
--table-divider: var(--border-subtle);

--table-artwork-size: 36px;
```

---

# 31. Validation Cases

Table Lab에서 최소 다음을 확인한다.

1. Rich track table
2. Numeric standard table
3. Sortable header
4. Ranking preview
5. Rank change
6. Long Korean track title
7. Very large exact number
8. 2-line resource metadata
9. Narrow list transformation
10. Column priority P0–P3
11. Row hover / focus
12. Selection + bulk action structure
13. Pagination structure
14. Table with 8+ columns / horizontal overflow
15. Sticky header behavior

---

# 32. Decision Status

| 결정 | 상태 |
|---|---|
| Data Table vs Ranking Preview 분리 | Stable |
| Native HTML table 우선 | Stable |
| Numeric value right alignment | Stable |
| Primary identity left alignment | Stable |
| Rank delta와 metric delta formatter 분리 | Stable |
| Compact 40 / Standard 48 / Rich 64 density | Proposed |
| Rich track row artwork 32–40px | Proposed |
| Responsive column priority P0–P3 | Stable |
| Narrow layout은 list reflow 우선 | Stable |
| Ranking preview 5–6 rows | Proposed |
| Long table pagination/cursor 사용 | Stable |
| Infinite scroll 기본 금지 | Proposed |
| Sticky header는 long table에서만 | Stable |
| Selection은 action이 있을 때만 | Stable |
| Exact value 우선 | Stable |
