# CHASM Filter, Search, Date & Query Control System — v0.1

> 상태: Stable principles + Proposed UI patterns  
> 목적: 사용자가 “지금 어떤 데이터 범위를 보고 있는지”, “그 안에서 무엇만 걸러봤는지”, “어떤 기준과 비교하고 있는지”를 혼동하지 않도록 조회 문맥과 제어 방식을 일관되게 만든다.
>
> 실제 기본 기간, 서버 query parameter, URL serialization, timezone boundary, API debounce 값은 실제 데이터 파이프라인/라우팅 구조 확인 전까지 Deferred다.

---

# 0. Core Principle

CHASM에서 모든 선택 UI가 Filter는 아니다.

다음을 명확히 구분한다.

```text
Query Context
Filter
Search
Comparison Context
View Control
Sort
```

각각 데이터 의미에 미치는 영향이 다르다.

---

# 1. External References

## Carbon — Filtering

Carbon은 filtering을 미리 정의된 속성을 선택해 표시 데이터셋을 좁히는 행위로 정의하고,
single selection / multiselection / multiple categories를 구분한다.

Reference:
- https://www.carbondesignsystem.com/building-blocks/core/patterns/filtering

## Carbon — Search

Carbon은 search를:
- global
- page-level
- component-level

scope로 구분한다.

Component-level search는 data table 등 현재 component 안의 데이터를 찾는 데 사용한다.

Active search는 입력과 함께 결과를 좁히고 clear action을 제공한다.

References:
- https://www.carbondesignsystem.com/building-blocks/core/components/search/guidelines
- https://www.carbondesignsystem.com/building-blocks/core/patterns/search

## Carbon — Date Picker

Carbon은:
- 기억하기 쉬운 정확한 날짜 → simple input
- 날짜 간 관계를 보며 선택 → calendar/range picker

를 구분한다.

Range는 start/end가 명확히 labeling되어야 하고,
32 / 40 / 48px control size 중 40px을 기본 크기로 둔다.

Reference:
- https://www.carbondesignsystem.com/building-blocks/core/components/date-picker/guidelines

## Fluent — Searchbox

Fluent는 search field에서:
- 입력이 있을 때 clear action 제공
- 필요에 따라 filter control 결합
- 좁은 화면/400% zoom에서도 기능 유지

를 권장한다.

Reference:
- https://fluent2.microsoft.design/components/web/react/core/searchbox/usage

---

# 2. Control Taxonomy

---

## 2.1 Query Context

전체 분석 결과의 의미 범위를 바꾼다.

예:
- 아티스트
- 조회 기간
- 날짜 범위
- 향후 account/workspace

질문:

```text
“어떤 데이터 세계를 보고 있는가?”
```

Global scope를 기본으로 한다.

---

## 2.2 Filter

현재 Query Context 안에서 일부 subset만 남긴다.

예:
- Spotify / Apple Music만 보기
- 특정 곡만 보기
- 이벤트 유형
- 국가

질문:

```text
“그 데이터 중 무엇만 보고 있는가?”
```

Global 또는 module-local일 수 있다.

---

## 2.3 Search

이름/keyword로 resource를 찾거나 목록을 좁힌다.

예:
- 곡명 검색
- 국가 검색
- 플레이리스트 검색

질문:

```text
“이 목록 안에서 무엇을 찾고 있는가?”
```

Search는 일반적으로 component/page-local이며
global dashboard meaning을 바꾸는 query context와 구분한다.

---

## 2.4 Comparison Context

현재 값과 무엇을 비교하는지 결정한다.

예:
- 이전 동일 기간
- 비교 안 함
- 전월
- 발매 전 4주 평균
- 향후 benchmark

질문:

```text
“현재 숫자의 상대적 의미를 무엇과 비교하는가?”
```

Comparison은 filter가 아니다.

---

## 2.5 View Control

데이터셋은 유지하면서 표현 방식만 바꾼다.

예:
- 일간 / 주간
- 절대값 / 변화율
- 차트 / 표

질문:

```text
“같은 데이터를 어떻게 볼 것인가?”
```

Segmented control이 적합한 경우가 많다.

---

## 2.6 Sort

같은 결과의 순서만 바꾼다.

예:
- 스트리밍 높은 순
- 최근 변화 큰 순
- 최신 발매 순

Sort는 Filter가 아니며 result count를 바꾸지 않는다.

---

# 3. Scope Hierarchy

컨트롤은 scope를 명확하게 가진다.

## Global Query Context

페이지 전체에 적용.

위치:
- page header 아래 query bar

예:
- 기간
- exact date range
- global comparison

## Section / Card Filter

특정 module에만 적용.

위치:
- 해당 card header / toolbar

예:
- chart platform series
- table search
- ranking metric

## Presentation Control

해당 visualization 표현만 변경.

예:
- 일간 / 주간

---

# 4. Scope Must Be Visible

사용자가 control의 적용 범위를 추측하게 하지 않는다.

좋음:

```text
[페이지 상단]
기간: 최근 3개월

[차트 내부]
플랫폼: 2개
일간 | 주간
```

나쁨:
페이지 위쪽의 “Spotify” chip이
Dashboard 전체인지 차트만인지 알 수 없음.

---

# 5. Query Bar Anatomy

Global query bar 후보:

```text
조회 조건

기간        날짜 범위                 비교 기준
최근 3개월  2026.8.1.–10.31.          이전 동일 기간

[non-default active query/filter summary if needed]
```

기본:
- page title보다 시각적 위계 낮음
- card처럼 과도하게 띄우지 않음
- controls 사이 관계는 spacing으로 구분
- label을 숨기지 않고 명확히 제공

---

# 6. Query Context vs Active Filter Chips

Global 기본값은 chip으로 반복하지 않는다.

예:

기본:
```text
기간 최근 3개월
플랫폼 전체
```

→ active chip 없음.

사용자가 chart에서 2개 플랫폼만 선택:

```text
Spotify ×
YouTube Music ×
[플랫폼 초기화]
```

처럼 해당 local scope 안에서 active constraint를 보여줄 수 있다.

---

# 7. Default State

Default를 “선택된 Filter”처럼 과장하지 않는다.

예:
```text
전체 플랫폼
```

이 기본이면 active chip 4개를 만들지 않는다.

Active summary는 **default에서 벗어난 제약**을 보여주는 데 사용한다.

---

# 8. Filter Selection Model

## Single Select

하나만 가능.

예:
- 한 ranking metric

Control:
- Select
- Radio
- 작은 option set이면 Segmented

## Multi Select

여러 개 가능.

예:
- 플랫폼
- 국가

Control:
- Filter button + checkbox popover
- option 수가 적고 공간이 충분하면 chips/checkbox group

## Multiple Categories

예:
- Platform
- Country
- Release type

Filter panel/drawer를 고려.

모든 category를 chip으로 horizontal 나열하지 않는다.

---

# 9. Immediate Apply vs Explicit Apply

모든 control에 “적용” 버튼을 넣지 않는다.

## Immediate Apply

적합:
- single select
- segmented view control
- 작은 local dataset의 search
- 단일 chip toggle
- query 비용이 낮고 결과가 빠름

예:
```text
일간 → 주간
```

즉시 변경.

## Explicit Apply

적합:
- multi-category filter
- 여러 checkbox를 조합
- remote query 비용이 큼
- 선택 과정 중 결과가 계속 바뀌면 산만함

Pattern:

```text
Applied state
↓
Filter 열기
↓
Draft selection
↓
[적용]
↓
Applied state commit
```

---

# 10. Draft vs Applied State

복합 filter 안의 checkbox를 클릭했다고
Dashboard query가 즉시 바뀌었다고 가정하지 않는다.

명시적으로:

```text
draft filters
applied filters
```

를 분리할 수 있다.

Popover를 닫으면:
- Apply 전 draft 폐기
또는
- 명확한 정책에 따라 유지

한다.

CHASM 기본 제안:
**Apply 전 닫힘 → applied state로 복원**

사용자가 적용하지 않은 선택이 나중에 갑자기 반영되는 것을 막는다.

---

# 11. Query Transition vs Background Refresh

중요한 Stable 원칙.

## Background Refresh

Query는 동일.
데이터 최신값만 다시 가져옴.

→ 기존 데이터 유지 가능.

## Query Transition

기간/filter/comparison 자체가 바뀜.

→ 이전 query의 숫자를 새 query label 아래 정상 데이터처럼 보여주면 안 됨.

따라서:

1. old result + old query context를 유지한 채 loading
2. 또는 affected module skeleton/loading
3. 새 query + 새 result를 함께 commit

중 하나를 사용한다.

```text
New label + Old data = 금지
```

---

# 12. Period Presets

현재 prototype candidate:

- 최근 30일
- 최근 3개월
- 사용자 지정

실제 MVP default 및 추가 preset:
- 7일
- 6개월
- 1년

등은 usage/data volume 확인 후 결정한다.

현재:
**Proposed / not Stable**

---

# 13. Preset + Exact Range

기간 preset만 보여주지 않는다.

예:

```text
최근 3개월
2026. 8. 1. – 10. 31.
```

이유:
- rolling range인지 calendar period인지 알 수 있음
- report를 다시 볼 때 재현 가능
- data freshness로 end date가 달라질 경우 인지 가능

Preset과 exact range는 서로 일치해야 한다.

---

# 14. “최근 N일” Boundary

실제 제품에서는 다음을 결정해야 한다.

- 오늘 포함 여부
- 최신 complete day 기준인지
- timezone
- DSP batch cutoff

이는 data pipeline과 직접 연결된다.

따라서 exact calculation은:
**Deferred**

UI 원칙만 Stable:

```text
relative preset → resolved exact dates visible
```

---

# 15. Custom Date Range

사용자가 직접 범위를 지정하는 경우:

- 시작일
- 종료일
- 명확한 label
- 적용
- 취소/닫기 정책

을 제공한다.

Prototype에서는 native date input으로 behavior를 검증할 수 있다.

Production calendar picker 도입 시 WAI-ARIA/선택 library의 keyboard pattern을 따른다.

---

# 16. Custom Range Validation

최소 validation:

- start <= end
- 지원 가능한 data min/max
- 미래 날짜 제한이 필요한지
- 최대 조회 기간

지원 범위는 actual data retention 확인 후 결정한다.

오류 예:

```text
종료일은 시작일보다 빠를 수 없습니다.
```

---

# 17. Comparison Context

Global candidate:

```text
이전 동일 기간
비교 안 함
```

상황별 local comparison:
- 발매 전 4주 평균
- 이전 발매
- 이전 주

를 사용할 수 있다.

Event-specific baseline을 모든 dashboard metric의 global comparison으로 만들지 않는다.

---

# 18. Equal-period Comparison

“이전 동일 기간”은 현재 범위와 동일 길이의 직전 구간을 의미한다.

단:
- source coverage
- metric definition
- missing data

가 동일/비교 가능해야 한다.

Data State System의 comparison validity rule을 먼저 통과해야 한다.

---

# 19. Comparison Off

`비교 안 함`을 선택하면:

- delta
- comparison sentence
- comparison-dependent insight

를 숨기거나 비활성화한다.

`0%`로 바꾸지 않는다.

Comparison-dependent module이 있다면 상태를 명확히 한다.

---

# 20. Platform Filter — CHASM Rule

DSP platform filter는 특히 주의한다.

플랫폼 subset이 바뀌면:
- chart series
- 합산 가능 metric
- contribution
- insight evidence

의 의미가 함께 변할 수 있다.

```text
Filter != simply hide a colored line
```

Global platform filter라면 모든 관련 aggregate가 같은 subset으로 다시 계산돼야 한다.

따라서 현재 Dashboard sample에서는 platform filter를 **chart-local filter**로 시각화하고,
global aggregate filter 도입은 실제 metric aggregation contract 이후 확정한다.

---

# 21. Filter and Invalid Aggregation

Filter를 사용했다고 invalid cross-DSP aggregation이 합법이 되지 않는다.

Metric definition이 다르면:
- 합산 금지
- 동일 metric끼리만 비교
- platform separate view

원칙을 유지한다.

---

# 22. Filter Button Label

기본:

```text
플랫폼
```

Active:

```text
플랫폼 2개
```

또는:
```text
플랫폼 · 2
```

선택된 항목을 button label에 모두 이어붙이지 않는다.

Detail은 popover/chips에서 확인한다.

---

# 23. Active Filter Chips

Chip anatomy:

```text
[Spotify ×]
```

또는 여러 개면:

```text
Spotify ×   YouTube Music ×
[플랫폼 초기화]
```

Rules:
- remove target >= 24px
- x만으로 의미 전달하지 않고 chip accessible name 제공
- chip 삭제 즉시 적용 가능한 local filter에서 사용
- 많은 chip은 wrapping

---

# 24. Reset

## Local Reset

해당 filter category만 default로.

예:
```text
플랫폼 초기화
```

## Global Reset

여러 query/filter를 초기값으로.

예:
```text
조회 조건 초기화
```

Active change가 없으면 reset을 숨기거나 disabled.

“초기화”가 무엇을 초기화하는지 object를 표시한다.

---

# 25. Search Scope

Search placeholder/label은 scope를 알려야 한다.

좋음:
- 곡명 검색
- 국가 검색
- 플레이리스트 검색

피함:
- 검색

하나의 generic search가 어디까지 찾는지 사용자가 추측하게 하지 않는다.

---

# 26. Search Behavior

Local small dataset:

- 입력 즉시 result filter
- clear action
- result count/status

Remote large dataset:

- brief debounce 가능
- loading/result status 필요

정확한 debounce ms는 performance 측정 후 결정한다.

---

# 27. Search Clear

입력이 있을 때 clear affordance 제공.

Clear 후:
- 전체 local result 복원
- focus는 search field에 유지
- 필요하면 result count announcement

Fluent Searchbox도 content가 있을 때 clear/close action을 노출하는 패턴을 사용한다.

---

# 28. Search Result Count

필요한 경우:

```text
4곡
2곡
결과 없음
```

을 표시한다.

Screen reader status:

```text
2개의 곡을 찾았습니다.
```

매 keystroke마다 지나치게 장황한 announcement를 만들지 않는다.

---

# 29. Search No Results

Error가 아니다.

```text
“여름”과 일치하는 곡이 없습니다.
검색어를 바꿔보세요.

[검색어 지우기]
```

Filter no-result와 같은 Empty taxonomy 안에 있지만
원인을 search term으로 명확히 한다.

---

# 30. Search vs Filter

Search:
- user-entered keyword

Filter:
- predefined attribute

예:

```text
Search: “여름”
Filter: 발매 유형 = 싱글
```

둘이 동시에 적용될 수 있다.

Result count는 결합 조건의 결과를 반영한다.

---

# 31. Search vs Global Navigation Search

현재 CHASM MVP에서는:
- table/resource local search

를 우선한다.

전체 제품을 검색하는 global search는 실제 IA/resource 수가 커진 후 검토한다.

현재:
**Deferred**

---

# 32. Sort

Sort는 결과 subset을 바꾸지 않는다.

따라서 active filter chip에 sort를 넣지 않는다.

Table header 또는 sort select를 사용.

예:
```text
정렬: 스트리밍 높은 순
```

좁은 화면에서 header sort UI가 사라지면 별도 sort control로 같은 state를 유지한다.

---

# 33. Query Summary

복잡한 상세 화면에서는 current query를 한 줄로 요약할 수 있다.

예:

```text
2026.8.1.–10.31. · Spotify, YouTube Music · 이전 동일 기간과 비교
```

단 Dashboard 기본 화면에서 매번 문장형 summary를 반복하지 않는다.

controls 자체가 충분히 명확하면 생략.

---

# 34. Persistence

세 가지 수준을 구분한다.

## URL-shareable state candidate

- date range
- global filters
- comparison

사용자가 같은 분석 context를 다시 열거나 공유할 가치가 큼.

## Session state candidate

- local table search
- expanded detail
- sort

## Ephemeral state

- open popover
- draft unchecked/applied filter
- hover/focus

최종 routing/storage 방식:
**Deferred**

---

# 35. Back / Forward Navigation

URL query state를 도입한다면:
- browser back/forward로 분석 context가 복원되어야 함
- visual controls와 query result가 함께 복원

되어야 한다.

현재 plain prototype에서는 구현하지 않는다.

---

# 36. Query State and Data State

Query control은 Data State와 연결된다.

예:

사용자가 기간 변경
→ Query transition loading
→ Result ready / empty / error

Filter 적용
→ affected scope loading
→ result

Background refresh
→ query는 그대로
→ Refreshing

두 흐름을 섞지 않는다.

---

# 37. Query State and Insight

기간/filter/comparison이 바뀌면
insight도 같은 query context로 다시 계산되어야 한다.

Old insight를 새 filter 위에 유지하면 안 된다.

필요하면:
- insight skeleton
- “조건에 맞는 인사이트 없음”

상태를 사용한다.

---

# 38. Query State and Annotation

Event annotation도 현재 query range 밖이면 표시하지 않는다.

Filter가 특정 track에 제한되면:
- 관련 없는 event annotation을 줄일 수 있음

구체 rule은 actual event model 이후 결정한다.

---

# 39. Control Density

Global query bar:
- Default 40px controls

Card-local:
- Compact 32px 가능

Search:
- 기본 40px
- dense table toolbar 32–40px

중요한 date input을 28px 같은 별도 초소형 control로 만들지 않는다.

---

# 40. Responsive

좁은 화면에서 우선순위:

1. 현재 기간
2. active filter state
3. 핵심 comparison
4. 상세 filter controls

Global query bar:
- wrap / stack
- label 유지

많은 active chips:
- wrap
- collapse summary 후보

Search:
- 해당 table/card 폭으로 확장

Fluent Searchbox처럼 매우 좁은 context에서는 icon-triggered full-width search도 검토 가능하나,
MVP에서는 visible local search field를 우선한다.

---

# 41. Accessibility

## Labels

각 control은 visible label을 우선.

예:
```text
기간
비교 기준
시작일
종료일
```

placeholder를 label로 쓰지 않는다.

## Checkbox filter

native checkbox 우선.

## Popover

현재 prototype은 `details/summary`와 native form controls를 활용한다.

향후 custom popover/menu 도입 시:
- focus management
- Escape
- trigger return

을 Interaction/Accessibility System에 맞춘다.

## Search

`type="search"`
+ visible/sr label
+ clear button accessible name.

---

# 42. Filter Count Accessibility

```text
플랫폼 2개
```

라고 visible label이 있다면
accessible name도 같은 의미가 되도록 한다.

단순 red/blue dot이나 숫자 bubble만으로 active filter를 전달하지 않는다.

---

# 43. Query Change Feedback

즉시 결과가 바뀌고 focus 이동이 없으면 필요한 경우:

```text
조회 기간을 최근 30일로 변경했습니다.
플랫폼 2개를 적용했습니다.
```

polite live announcement.

검색은 매 글자마다 과도한 announcement를 피하고
result count를 적절히 전달한다.

---

# 44. Prototype Dashboard Mapping

현재 dashboard sample에 다음 역할을 시각화한다.

## Global Query

- 기간 preset
- exact date range
- 비교 기준 display/control candidate

## Local Chart Controls

- 일간 / 주간 = View control
- 플랫폼 = Local multi-select filter

## Track Table

- 곡명 search = Component-level search

## Active Filter

platform subset 적용 시 chart 안에 active chips 표시.

---

# 45. Prototype Lab Cases

Query Control Lab에서 최소 다음을 검증한다.

1. Global query bar
2. Preset period + exact date
3. Custom range
4. Comparison select
5. Local platform multi-filter
6. Draft vs applied filter
7. Active filter chips + remove
8. Category reset
9. Search + clear
10. Search result count
11. No search results
12. Sort vs filter distinction
13. Global vs local scope
14. Query transition loading
15. Background refresh comparison
16. Responsive stacked controls
17. URL/session/ephemeral state classification

---

# 46. Do / Don't

## Do

- query context와 filter를 분리
- scope를 control 위치와 label로 명확하게
- preset의 exact dates 표시
- non-default filter를 active summary로 보여줌
- 복합 filter는 draft/applied state 검토
- query change 시 old data/new label mismatch 방지
- search scope를 label에 포함
- comparison off일 때 delta를 0으로 만들지 않음
- platform filter가 aggregate meaning에 미치는 영향 검증

## Don't

- 모든 선택 UI를 filter chip으로 표현
- global/local filter scope를 섞음
- 기본 전체 선택을 active chip 여러 개로 나열
- query label만 바꾸고 old data 유지
- rolling 30일을 전월이라고 표현
- placeholder만으로 date/search label 제공
- sort를 filter로 표시
- filter로 invalid metric aggregation 문제를 숨김

---

# 47. Decision Status

| 결정 | 상태 |
|---|---|
| Query / Filter / Search / Comparison / View / Sort 역할 분리 | Stable |
| Global vs local scope 명시 | Stable |
| Query transition과 background refresh 분리 | Stable |
| New label + old data 금지 | Stable |
| Non-default filter만 active summary | Stable |
| Multi-filter draft/applied pattern | Stable |
| Preset + exact range 동시 제공 | Stable |
| Search scope label 필수 | Stable |
| Search clear + no-results pattern | Stable |
| Platform filter aggregation 재검증 | Stable |
| 현재 30일/3개월 preset | Proposed |
| 기본 기간 | Deferred |
| Custom range exact date boundary/timezone | Deferred |
| URL serialization | Proposed direction / implementation Deferred |
| Search debounce ms | Deferred |
