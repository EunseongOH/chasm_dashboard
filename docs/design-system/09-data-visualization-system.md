# CHASM Data Visualization System — v0.1

> 상태: Proposed v0.1  
> 목적: 음악 데이터의 규모·추이·비교·구성·이벤트 맥락을 정확하게 전달하면서도, 데이터 초심자가 같은 시각 문법을 반복적으로 학습할 수 있도록 한다.

---

## 0. System Principle

CHASM은 “차트 종류별 컴포넌트”보다 먼저 **공통 시각 문법 + 케이스별 variant**를 정의한다.

같은 Axis / Legend / Tooltip이라도 데이터 관계와 질문이 다르면 표현이 달라질 수 있다.

따라서 시스템은 다음 순서로 판단한다.

1. 사용자가 답하려는 질문은 무엇인가?
2. 값의 단위와 정의는 서로 비교 가능한가?
3. 절대 규모 / 변화 / 구성 / 순위 / 관계 중 무엇을 읽어야 하는가?
4. 공통 chart anatomy 중 무엇이 필요한가?
5. Axis / Scale / Legend / Annotation의 variant는 무엇인가?
6. 좁은 화면이나 데이터 밀도가 높은 경우 어떻게 degrade/reflow할 것인가?

---

# 1. 참고 시스템에서 가져온 원칙

## Carbon Design System

Carbon은 대부분의 rectangular chart를 공통 anatomy로 설명한다.

- title
- axes
- ticks
- axis title
- legend
- toolbar
- zoom
- graph frame
- tooltip

또한:
- bar / area처럼 절대 크기 비교가 중요한 chart는 numeric axis를 0에서 시작
- line / scatter처럼 추세 방향이 핵심이면 non-zero focused domain을 허용
- time axis tick 간격은 데이터 유무에 맞춰 임의로 바꾸지 않음
- 가능하면 legend보다 direct label을 우선
- tooltip에는 양 축의 값과 필요한 context를 보여줌

References:
- https://www.carbondesignsystem.com/building-blocks/data-visualization/chart-anatomy
- https://www.carbondesignsystem.com/building-blocks/data-visualization/axes-and-labels
- https://www.carbondesignsystem.com/building-blocks/data-visualization/legends
- https://www.carbondesignsystem.com/building-blocks/data-visualization/color-palettes

## CHASM 해석

Carbon의 규칙을 그대로 복사하지 않고 음악 데이터에 맞게 확장한다.

특히 CHASM에서는 다음이 중요하다.

- DSP마다 metric definition이 다름
- 이벤트(발매/공연/콘텐츠)가 time-series 해석에 매우 중요함
- 데이터 누락과 갱신 주기가 플랫폼마다 다를 수 있음
- cross-platform 비교 시 raw value보다 indexed comparison이 더 정직한 경우가 있음

---

# 2. Visualization Grammar

모든 chart module은 아래 slot을 조합한다.

## Common slots

- title
- optional description
- optional primary metric
- comparison context
- controls
- legend OR direct labels
- plot
- axes
- optional reference/baseline
- optional event annotation
- tooltip
- optional insight/action
- optional source/freshness

모든 slot이 항상 필요한 것은 아니다.

### 최소 chart anatomy

```text
Title
Optional description

Plot
+ 필요한 axis
+ 필요한 legend/direct label

Optional tooltip
```

### 금지

단순히 “완성된 카드 모양”을 재사용하기 위해 필요 없는 axis, legend, divider, tooltip을 넣지 않는다.

---

# 3. Encoding Priority

정확한 비교가 필요한 경우 다음 순서를 우선한다.

1. aligned position
2. length
3. position on unaligned scales
4. area / size
5. color intensity

CHASM에서는 가능한 한:
- precise comparison → position / length
- composition → stacked length
- matrix → color intensity
- identity → categorical color + label

을 사용한다.

색상만으로 정확한 차이를 읽게 하지 않는다.

---

# 4. Axis System

Axis는 하나의 스타일이 아니라 **역할별 variant**로 정의한다.

---

## 4.1 X Axis — Time

용도:
- streaming trend
- follower trend
- listener trend
- event impact
- release lifecycle

### Common

- label은 horizontal 유지
- 의미 없는 모든 날짜를 노출하지 않음
- 첫 날짜와 최신 날짜는 가능한 한 유지
- 같은 chart 안에서는 일정한 시간 간격 유지
- 데이터가 없다고 tick 간격 자체를 왜곡하지 않음

### Tick density

초기 기준:
- compact: 3–5 labels
- standard: 5–7 labels
- wide/dense: 6–9 labels

단, type size를 줄여 더 많은 tick을 강제로 넣지 않는다.

### Korean date formats

Short axis:
- `8. 1.`
- `9. 1.`
- `10. 1.`

Tooltip/detail:
- `2026. 9. 18.`

Week:
- `9월 1주`
- `9월 3주`

Month:
- `2026. 8.`
- `9월`
- `10월`

연도가 바뀌는 지점은 landmark label로 더 명확하게 표시한다.

### Dense daily data

90일 이상의 daily series에서 모든 날짜를 label하지 않는다.

데이터 point는 유지하고 tick label만 줄인다.

---

## 4.2 X Axis — Category

용도:
- tracks
- platforms
- countries
- playlists
- traffic sources

### Common

- 가능한 한 horizontal label
- semantic order가 없다면 comparison 목적에 맞춰 sort
- rank 목적이면 descending
- 시간/트랙 번호 등 semantic order가 있으면 유지

### Long labels

우선순위:

1. Horizontal bar로 전환
2. 최대 2줄 wrap
3. ellipsis + full accessible label
4. 정말 필요한 경우에만 angled label

한국어 곡명/아티스트명 때문에 font-size를 줄이지 않는다.

---

## 4.3 X Axis — Rank

순위 자체를 quantitative scale로 표현해야 하는 상황과 단순 ranking list를 구분한다.

Top tracks처럼 단순 순위 확인이면:
- ranked list
- horizontal bar

를 우선한다.

1, 2, 3 순위 숫자를 categorical axis처럼 시각화하는 것은 지양한다.

---

# 5. Y Axis / Numeric Scale Variants

---

## 5.1 Absolute Comparison

예:
- 곡별 스트리밍 수 bar
- 플랫폼별 증가량 bar
- 국가별 청취자 수 bar

### Rule

```text
numeric axis starts at zero
```

Bar의 길이가 절대 규모를 표현하므로 non-zero domain을 사용하지 않는다.

상태:
**Stable**

---

## 5.2 Absolute Time-Series Trend

예:
- 일별 streaming count
- follower count trend

Line chart에서는 두 variant를 허용한다.

### A. Full magnitude

질문:
“실제 규모가 어떻게 변했는가?”

- zero 포함을 우선
- absolute magnitude를 정직하게 보여줌

### B. Focused trend

질문:
“작은 변화의 방향을 자세히 보고 싶은가?”

- non-zero domain 허용
- line only
- axis가 잘린 사실이 명확해야 함
- 절대 크기 비교처럼 오해되지 않도록 함

CHASM 기본 Overview에서는 Full magnitude를 우선한다.

Detail analysis에서 Focused trend를 허용한다.

---

## 5.3 Percentage / Rate

### Part-to-whole

예:
- platform share
- playlist contribution share

```text
0–100%
```

전체 범위를 사용한다.

### Rate trend

예:
- save rate
- completion rate

변화 방향 분석이 목적이고 실제 값 범위가 좁으면 focused domain을 허용할 수 있다.

단:
- % 단위 명시
- axis truncation으로 변화가 과장될 수 있음을 고려
- KPI value와 함께 실제 수준을 읽을 수 있어야 함

---

## 5.4 Signed Delta

예:
- 이전 기간 대비 증감
- 이벤트 전후 변화량
- variance

반드시:

```text
0 baseline visible
```

positive / negative가 zero에서 갈라져야 한다.

색상은 자동으로 green/red를 사용하지 않는다.

---

## 5.5 Indexed Comparison

서로 절대값 scale이 다르거나 metric magnitude가 지나치게 다른 series를 비교할 때 사용한다.

예:
- Spotify / YouTube / Melon의 발매 후 성장 궤적
- 발매일을 기준으로 각 플랫폼의 상대 변화 비교

기본:

```text
Baseline = 100
```

예:
- 발매 전 7일 평균 = 100
- 발매일 = Day 0

표시:
- baseline 100 reference line
- index임을 title/subtitle에 명시
- tooltip에는 index와 가능하면 원 값 모두 제공

Raw metric과 Indexed metric을 같은 axis에 섞지 않는다.

---

## 5.6 Dual Axis

원칙:
**Default로 사용하지 않는다.**

두 축은 scale manipulation으로 잘못 읽힐 위험이 높다.

우선 대안:

1. Small multiples
2. Indexed comparison
3. 별도 chart
4. 동일 단위로 변환 가능한 경우 normalization

Dual axis를 허용할 수 있는 경우:
- 서로 단위가 다름
- 시간 정렬 자체가 핵심 질문
- 둘의 동시 움직임을 보는 것이 분석 목적
- 좌/우 축과 series mapping이 명확
- 사용자가 scale 차이를 이해할 수 있음

예:
- 공연 티켓 판매량 + streaming trend

하지만 MVP Overview에서는 지양한다.

---

# 6. Axis Titles

## 생략 가능

다음이 모두 명확하면 생략한다.

- chart title에서 metric이 드러남
- tick label에서 단위가 명확
- x-axis가 일반적인 time/category

예:
`플랫폼별 스트리밍 추이`

Y tick:
`30K / 60K / 90K`

별도 `스트리밍 수` axis title이 없어도 된다.

## 반드시 표시

- scatter처럼 양 축 metric이 모두 중요
- unit이 비직관적
- index
- 서로 다른 dimension 비교
- scale interpretation에 설명이 필요

---

# 7. Tick System

## Numeric Y

기본:
- 4–6 major ticks
- compact card: 3–5
- zero line 포함 시 zero는 반드시 label 가능

Axis label은 compact notation 허용:
- 1.2K
- 84K
- 1.2M

한국어 UI에서는 최종 사용자 테스트 후:
- 1.2천 / 8.4만
- 1.2K / 84K

중 최종 표기법을 결정한다.

현재 chart axis에서는 compact notation을 허용하되 tooltip은 exact value를 사용한다.

## Category

중간 label을 임의로 생략해 의미가 사라지는 경우:
- horizontal bar
- wrap
- scroll
- fewer categories

로 해결한다.

---

# 8. Grid Line System

Grid는 data를 읽기 위한 guide다.

장식이 아니다.

## Time-series / line

기본:
- horizontal major grid: ON
- vertical grid: OFF

이유:
Y magnitude 비교에 도움이 되고 시간축을 과도하게 칸으로 나누지 않는다.

## Bar

Horizontal/vertical bar 방향에 따라 numeric axis guide만 제공한다.

## Scatter / matrix

두 축의 위치 비교가 중요하면 양방향 grid 허용.

## Zero line

signed chart에서는 일반 grid보다 강하게 표시한다.

## Reference line

benchmark / baseline은 grid보다 강하지만 data mark보다 약하게 표시한다.

---

# 9. Grid Visual Tokens

초기안:

```css
--chart-grid-major: #E5EAF0;
--chart-grid-minor: #F1F4F8;
--chart-axis-line: #D5DCE5;
--chart-reference: #7C8796;
```

- major grid: 1px
- minor grid: 기본 OFF
- axis anchor: 필요한 경우 1px
- reference: 1–1.5px dashed/solid variant

---

# 10. Mark System — Line

## Stroke

기본:
- standard: 2px
- selected/emphasized: 2.5–3px
- muted comparator: 1.5–2px

Thickness 자체를 카테고리 encoding으로 사용하지 않는다.

## Point marker

### Dense time series
Default OFF.

Hover/focus point만 표시한다.

### Sparse series
5–12 points 정도면 marker 표시 가능.

### Important discrete checkpoints
release day / monthly checkpoint 등 의미가 있는 point에만 marker를 둘 수 있다.

## Curve

기본:
```text
straight segments
```

데이터가 없는 중간 값을 부드러운 곡선으로 암시하지 않는다.

Smoothing은 실제 interpolation 의미가 있을 때만 허용한다.

---

# 11. Mark System — Area

Area는 line을 예쁘게 채우기 위한 장식이 아니다.

사용:
- magnitude-to-zero가 중요
- 누적 규모 느낌이 중요
- composition over time

피함:
- 여러 independent trend 비교
- 작은 변화 비교
- fill overlap이 해석을 방해하는 경우

Single area의 baseline은 zero를 기본으로 한다.

---

# 12. Mark System — Bar

## Absolute comparison

- zero baseline
- consistent width
- same chart 안 radius 통일

## Orientation

Vertical:
- 짧은 category label
- 시간 순서
- category 수가 적음

Horizontal:
- 긴 곡명
- artist/playlist/country 이름
- ranking

## Sort

semantic order가 없다면:
- descending by value

semantic order가 있으면 유지:
- track order
- time
- funnel stage

## Radius

Chart bar는 UI card처럼 과도하게 둥글게 만들지 않는다.

초기:
- 2–4px 정도의 작은 radius
- 매우 짧은 bar에서 pill처럼 보이지 않게 주의

---

# 13. Stacked Bar / Stacked Area

## Absolute stacked

질문:
“전체 규모와 구성 모두 보고 싶은가?”

사용:
- additive categories만
- denominator/total이 의미 있음

## 100% stacked

질문:
“구성 비율만 비교하고 싶은가?”

- total magnitude는 숨겨짐
- 별도 total value가 필요하면 함께 제공

## 제한

내부 segment의 정확한 길이 비교는 어렵다.

특정 series 간 trajectory 비교가 핵심이면 stacked 대신:
- line
- small multiples

사용.

---

# 14. Sparkline

KPI card 안에서만 제한적으로 사용한다.

목적:
- 방향
- 최근 shape

Sparkline은:
- full chart가 아님
- axis/legend 생략 가능
- exact value lookup 용도가 아님

KPI value와 comparison context가 반드시 함께 있어야 한다.

---

# 15. Legend System

Carbon의 원칙처럼 direct label이 가능하면 legend보다 우선한다.

## 1 series

Legend 없음.

## 2–4 series

우선:
- end direct label

단, label collision이 발생하면 compact top legend.

## 4–6 series

기본:
- top legend

필요 시 hover/selection interaction 제공.

## 7+ series

기본적으로 한 chart에 모두 넣지 않는다.

대안:
- top-N + Other
- filter
- small multiples
- search/select
- table

단 additive하지 않은 series를 억지로 Other로 합치지 않는다.

---

# 16. Direct Label

Direct label은 legend lookup cost를 줄인다.

적합:
- line 끝점 공간이 충분
- bar label
- single/low-series chart

부적합:
- label collision
- end values가 매우 가까움
- 좁은 mobile width

좁은 화면에서는:
```text
Direct Label → Legend
```

로 degrade할 수 있다.

---

# 17. Tooltip System

Tooltip은 axis의 compact value를 exact value로 확장한다.

## Time-series comparative tooltip

한 날짜에 여러 series를 비교해야 한다면:

```text
2026. 9. 18.

Spotify        132,482
YouTube Music  58,231
Apple Music     39,114
Melon           44,092
```

규칙:
- visible series만 노출
- current focus/hover series를 위로 올릴 수 있음
- 날짜는 full format
- 숫자는 exact formatting
- additive total이 의미 있을 때만 total 표시

## Single mark tooltip

Bar / scatter:
- category
- exact value
- 필요한 comparison context

## Event

Event와 data point tooltip을 억지로 하나로 합치지 않는다.

같은 위치라면:
- event label
- data values

를 구조적으로 분리한다.

## Accessibility

hover뿐 아니라 keyboard focus에서도 동일 정보에 접근 가능해야 한다.

---

# 18. Event Annotation System

음악 데이터에서 핵심적인 CHASM 고유 문법이다.

Event categories 예:
- release
- concert
- content
- promotion
- playlist
- media

현재 category set은 실제 DB와 활동 taxonomy가 확정되면 정리한다.

## Single event

Time-series 위:

```text
event label
    │
    │ dashed vertical guide
    │
data
```

## Multiple events near same date

우선순위:

1. user-selected event
2. 현재 hover/focus event
3. 주요 event marker
4. 나머지는 cluster/count

모든 이벤트 label을 한꺼번에 띄워 plot을 덮지 않는다.

예:
`+3 events`

클릭/hover 시 상세 list.

## Event lanes

이벤트 밀도가 높은 분석 화면에서는 plot 내부 label 대신 별도 event lane을 사용할 수 있다.

```text
[Event lane]
[Plot]
[X axis]
```

## Causality

Annotation은 사실을 표시한다.

Good:
- `싱글 발매 · 9.18`
- `단독 공연 · 10.12`

Avoid:
- `발매로 인해 스트리밍 증가`

인과는 별도 evidence/insight layer에서만 다룬다.

---

# 19. Reference / Baseline System

Reference line 종류를 명시적으로 구분한다.

## Zero baseline
signed delta의 기준.

## Index baseline
`100`

## Benchmark
예:
- 아티스트 최근 12개월 평균
- 이전 4주 평균

## Goal/Target
실제 사용자/팀이 설정한 target이 있을 때만.

## Visual distinction

초기안:

- zero: neutral strong solid
- index baseline: neutral dashed
- benchmark: slate dashed + label
- target: distinct marker + explicit label

Reference line을 categorical series color로 표현하지 않는다.

---

# 20. Highlight / Muting

사용자가 한 series에 집중하면:

Selected:
- original categorical color
- 2.5–3px line
- direct label / point emphasis

Others:
- same identity color 유지
- opacity 약 25–40%
- line 1.5–2px

모든 comparator를 회색 하나로 바꾸면 identity를 잃으므로 기본적으로 피한다.

Hover는 temporary.
Selected는 persistent.

---

# 21. Categorical Color

현재 CHASM starting palette:

1. Blue #1393FD
2. Teal #278F63
3. Purple #9D6ADE
4. Coral #E5484D
5. Amber #B7790D
6. Slate #5C6F8A

## Stable entity mapping

동일 entity가 제품 곳곳에서 반복될 경우 stable mapping을 검토한다.

예:
- Spotify
- YouTube Music
- Apple Music
- Melon

현재 prototype mapping은 **Proposed**이며 실제 플랫폼 수/접근성 검증 후 확정한다.

## Generic categories

entity identity가 중요하지 않으면 palette sequence 사용.

## 제한

categorical series가 6개를 넘으면 색을 계속 추가하는 것보다 chart 구조 변경을 우선한다.

---

# 22. Sequential / Diverging Color

## Sequential

예:
- heatmap intensity
- 지역별 강도

한 hue의 밝기/농도 변화 사용.

## Diverging

명확한 midpoint가 있을 때만.

예:
- signed change centered at 0
- deviation from baseline 100

Green/Red를 기본 diverging pair로 쓰지 않는다.

중립 midpoint를 명확히 한다.

---

## Accessibility contrast note

Categorical line colors are meaningful graphical objects이므로 light background에서 최소 3:1 대비를 확보한다.

2026-11 accessibility audit에서:
- 기존 Teal #2EAD75 → 약 2.86:1
- 기존 Amber #D99A13 → 약 2.45:1

로 확인되어 Proposed palette를:
- Teal #278F63
- Amber #B7790D

로 조정했다.

또한 11px axis label은 normal text contrast 기준을 적용해 chart-axis-text를 neutral-600 #5E6978로 올렸다.

색상 대비를 통과해도 series 구분을 색 하나에만 의존하지 않는 원칙은 유지한다.

# 23. DSP Brand Identity

DSP brand color를 chart series color의 유일한 identity로 사용하지 않는다.

플랫폼 정체성은:
- name
- logo
- direct label
- optional stable CHASM series mapping

으로 전달한다.

Spotify/Melon처럼 동일 green 계열이 있는 상황에서도 구분 가능해야 한다.

---

# 24. Cross-Platform Comparison

## Raw line chart 허용

다음이 모두 충족될 때:
- metric definition이 동일하거나 충분히 comparable
- unit 동일
- aggregation grain 동일
- 기간 동일

## Raw comparison 금지

예:
- Monthly Listener vs Stream
- unique user vs play count
- 서로 다른 집계 방식

이 경우 대안:
- small multiples
- index=100
- % change
- normalized view

Metric definition을 UI convenience 때문에 합치지 않는다.

---

# 25. Missing Data

Missing은 0이 아니다.

## Line

Default:
- line break

표현:
```text
────●      ●────
       gap
```

Missing interval을 자동으로 직선 연결하지 않는다.

## Estimated / interpolated

실제로 추정값이면:
- dashed segment
- tooltip/label로 Estimated 명시

추정하지 않았는데 dashed line으로 연결하지 않는다.

## Zero

실제 0 observation이면 zero point를 표시한다.

```text
missing != zero
```

---

# 26. Sparse Data

2–3개 period밖에 없는 경우 line chart가 “추세”를 과도하게 암시할 수 있다.

대안:
- KPI
- slope
- grouped bar
- table

Point 수를 늘리기 위해 데이터를 임의 보간하지 않는다.

---

# 27. Dense Data

데이터 point가 많아질 때:

1. point marker 제거
2. x tick label 감소
3. hover ruler 사용
4. zoom/range selection 검토
5. aggregation granularity 전환

font-size 축소는 우선 해결책이 아니다.

---

# 28. Small Multiples

서로 다른 series를 한 chart에 겹치면 의미가 사라질 때 사용한다.

적합:
- DSP별 규모 차이가 매우 큼
- 여러 곡 trajectory 비교
- 국가별 변화 비교

## Magnitude comparison

동일 scale 사용.

## Shape comparison

independent scale을 허용할 수 있으나:
- 각 panel scale을 명확히 표시
- “각 series 내부 변화 비교” 목적이라고 명시

Independent scale로 절대 규모를 비교하지 않는다.

---

# 29. Chart Height

초기안:

## KPI sparkline
`32–48px`

## Compact chart
`220–260px`

## Standard analysis chart
`280–360px`

## Dense/event-heavy analysis
`360–440px`

height를 고정 디자인 토큰 하나로 강제하지 않는다.

Chart content density에 따라 variant를 선택한다.

---

# 30. Responsive Visualization

좁아질 때 다음 순서로 조정한다.

1. secondary control 줄이기/메뉴로 이동
2. tick density 감소
3. direct label → legend
4. legend wrap
5. chart + side insight stack
6. low-priority annotation cluster
7. 필요 시 horizontal scroll/detail view

하지 않는 것:
- font를 10px 이하로 축소
- chart 전체를 CSS scale-down
- 의미 있는 series를 조용히 숨김

---

# 31. Number Formatting

## Axis
compact 허용.

예:
- 30K
- 60K
- 1.2M

## Tooltip
exact value.

예:
- 132,482회

## Direct label
상황에 따라:
- compact
- exact

정확한 비교가 필요한 ranking/table에서는 exact value 우선.

%와 %p는 반드시 구분한다.

---

# 32. Data Labels

모든 point/bar에 숫자를 붙이지 않는다.

Data label을 사용하는 경우:
- Top-N bar
- end-of-line direct label
- highlighted point
- low-count category comparison

Label이 mark 자체보다 많아지면 tooltip/table로 이동한다.

---

# 33. Chart Title

기본:
**Descriptive**

예:
- 플랫폼별 스트리밍 추이
- 국가별 청취자 분포

가능:
**Question**

예:
- 어떤 플랫폼에서 가장 많이 성장했나요?

Insight title:
근거가 충분할 때만.

예:
- 발매 후 2주 동안 스트리밍이 높은 수준을 유지했습니다

원인을 단정하는 title은 evidence가 없으면 사용하지 않는다.

---

# 34. Accessibility

Chart는 색상 하나에 의존하지 않는다.

가능한 조합:
- color
- label
- line style
- marker
- ordering
- position

## Screen reader / non-visual access

중요 chart에는:
- concise accessible summary
- 필요한 경우 data table/detail view

를 제공한다.

Carbon 역시 chart와 함께 accessible table alternative를 고려하도록 권장한다.

## Keyboard

interactive mark / legend / annotation은 keyboard focus로도 핵심 정보에 접근 가능해야 한다.

Tooltip은 mouse hover 전용 정보가 되지 않는다.

---

# 35. Chart Type Selection — CHASM MVP

현재 우선 구축:

## Trend
- line
- sparkline
- optional area

## Comparison
- vertical bar
- horizontal bar
- ranked list

## Composition
- stacked bar
- 100% stacked bar
- stacked area 제한적

## Relative movement
- indexed line

## Context
- event annotation
- benchmark/reference

향후 실제 데이터 요구가 확인되면:
- scatter
- heatmap
- map
- histogram
- box plot

등을 추가한다.

지원 가능한 chart library가 있다는 이유만으로 chart type을 추가하지 않는다.

---

# 36. Common vs Variant Matrix

| Element | 공통화 | Variant가 필요한 경우 |
|---|---|---|
| Font | 동일 type system | axis/meta role별 size |
| Grid color | 공통 neutral | zero/reference는 더 강함 |
| Axis label | 동일 typography | time/category/index format |
| Y domain | 공통 계산 구조 | absolute/bar, trend, %, delta, index |
| Legend | 공통 interaction | direct label 가능 여부, series count |
| Tooltip shell | 공통 surface | time comparative / single mark / event |
| Line stroke | 공통 width scale | selected/muted/estimated |
| Annotation | 공통 label/token | single / cluster / lane |
| Number formatter | 공통 formatter | axis compact / tooltip exact |
| Color palette | 공통 palette | categorical / sequential / diverging |
| Responsive logic | 공통 priority | direct label→legend, stack 등 |

---

# 37. Visualization Tokens — Proposed

```css
--chart-grid-major: #E5EAF0;
--chart-grid-minor: #F1F4F8;
--chart-axis-line: #D5DCE5;
--chart-axis-text: #5E6978;
--chart-reference: #7C8796;

--chart-line-standard: 2px;
--chart-line-emphasis: 2.75px;
--chart-line-muted: 1.5px;

--chart-marker-small: 4px;
--chart-marker-hit-target: 20px;

--chart-opacity-muted: .32;
--chart-opacity-area: .12;
```

실제 Canvas/SVG 렌더링에서 optical validation 후 조정한다.

---

# 38. Validation Cases

Chart Lab에서 최소 다음을 검증한다.

1. Single line / no legend
2. 4-series line + top legend
3. Focused line domain
4. Absolute bar / zero baseline
5. Horizontal ranking / long Korean title
6. Indexed line / baseline 100
7. Signed delta / zero reference
8. Missing data gap
9. Estimated dashed segment
10. Single event annotation
11. Event cluster
12. Dense x-axis
13. Narrow responsive width
14. Selected series + muted others
15. Direct label collision
16. Legend wrap
17. Tooltip exact values
18. 1 vs 4 vs 6 series

---

# 39. Decision Status

| 결정 | 상태 |
|---|---|
| Visualization Grammar first | Stable |
| Bar absolute axis starts at zero | Stable |
| Line chart focused domain 허용 | Stable, context 필요 |
| Signed delta zero baseline | Stable |
| Indexed baseline 100 pattern | Stable |
| Dual axis default 금지 | Stable |
| Horizontal major grid 기본 | Proposed |
| Vertical grid 기본 OFF | Proposed |
| Dense line marker OFF | Proposed |
| Missing data = line break | Stable |
| Estimated data = explicit dashed/label | Stable |
| 1 series legend 없음 | Stable |
| Direct label 우선, collision 시 legend | Stable |
| 7+ categorical series 구조 변경 우선 | Proposed |
| Event annotation factual only | Stable |
| Cross-DSP raw comparison은 metric comparability 필요 | Stable |
| Chart height variants | Proposed |
| Chart visual token values | Proposed |
