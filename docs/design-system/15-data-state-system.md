# CHASM Data State System — v0.1

> 상태: Stable principles + Proposed visual patterns  
> 목적: 사용자가 “숫자가 있는가?”만이 아니라 **이 데이터가 지금 얼마나 최신이고, 완전하며, 실제 관측값인지**를 판단할 수 있게 한다.
>
> 실제 플랫폼별 수집 주기, freshness threshold, source coverage schema는 실제 DSP 데이터 구조 확인 전까지 Deferred다.

---

# 0. Core Principle

CHASM의 Data State는 단순한 로딩 화면이 아니다.

사용자가 숫자를 해석하려면 최소한 다음을 알아야 한다.

```text
데이터가 있는가?
얼마나 최신인가?
필요한 source가 모두 포함됐는가?
실제 값인가, 추정값인가?
문제가 있다면 어느 범위까지 영향을 주는가?
```

따라서:

```text
Data state = trust context
```

이며, 분석 결과와 별개의 제품 정보다.

---

# 1. Reference Principles

## Carbon — Loading

Carbon은:
- 초기 구조가 알려진 content loading에는 skeleton을 우선
- user action 처리에는 inline loading
- full-page spinner를 여러 개 동시에 사용하지 않음
- loading 상태도 assistive technology에 전달

하도록 권장한다.

References:
- https://www.carbondesignsystem.com/building-blocks/core/patterns/loading
- https://www.carbondesignsystem.com/building-blocks/core/components/loading/guidelines
- https://www.carbondesignsystem.com/building-blocks/core/components/inline-loading/guidelines

## Fluent — Wait UX / Skeleton

Fluent는:
- 1초 미만의 짧은 기다림에는 불필요한 animation을 넣지 않음
- wait 상태에서도 사용자의 현재 context를 유지
- structure를 알고 있는 경우 skeleton
- 짧고 불확정적인 action wait는 spinner
- 장시간 작업은 진행률을 알 수 있으면 progress bar

를 권장한다.

References:
- https://fluent2.microsoft.design/wait-ux
- https://fluent2.microsoft.design/components/web/react/core/skeleton/usage/

## Carbon — Empty State / Notification

Carbon은 empty state를 하나의 “데이터 없음”으로 처리하지 않고:
- first use
- no results
- error/unavailable

같은 원인을 구분하고, 가능한 경우 가장 중요한 next action 하나를 제공하도록 권장한다.

Notification도 문제를 설명한 뒤 다음 행동을 빠르게 파악할 수 있게 작성한다.

References:
- https://www.carbondesignsystem.com/building-blocks/core/patterns/empty-states
- https://www.carbondesignsystem.com/building-blocks/core/components/notification/guidelines

---

# 2. Four Independent Data-State Dimensions

CHASM은 data state를 하나의 enum으로 저장/표현한다고 가정하지 않는다.

---

## 2.1 Availability — 데이터 가용성

질문:

```text
표시할 수 있는 데이터가 있는가?
```

상태 후보:
- Ready
- Not connected
- No data yet
- No results
- Unsupported
- Error / unavailable

---

## 2.2 Freshness — 최신성

질문:

```text
현재 기대되는 갱신 주기에 맞는 데이터인가?
```

상태:
- Fresh
- Refreshing
- Stale

중요:

```text
Stale != Error
```

마지막 정상 데이터가 있다면 stale 상태에서도 데이터를 보여줄 수 있다.

---

## 2.3 Completeness — 완전성

질문:

```text
이 값 계산에 필요한 source / 기간 / entity가 모두 포함됐는가?
```

상태:
- Complete
- Partial

예:
- 4개 플랫폼 중 3개만 수집 완료
- 기간 중 일부 날짜 누락
- 한 플랫폼의 특정 metric만 미지원

---

## 2.4 Value Origin — 값의 성격

질문:

```text
이 값은 직접 관측한 값인가?
```

상태:
- Observed
- Estimated

Estimated는 confidence score가 아니다.

예:
- 보간
- 추정 집계
- 모델 기반 예상

실제 제품에 추정값이 존재할 때만 사용한다.

---

# 3. Why Dimensions Matter

한 module이 동시에 다음 상태일 수 있다.

```text
Availability = Ready
Freshness = Stale
Completeness = Partial
Value origin = Observed
```

예:

```text
Spotify / YouTube / Apple 값은 있음
Melon 수집 실패
Spotify 마지막 갱신도 늦음
```

이를 억지로:

```text
status = Warning
```

하나로 축약하면 어떤 문제가 있는지 알 수 없다.

---

# 4. Display Priority

내부 상태는 여러 개일 수 있지만 화면에 badge를 여러 개 나열하지 않는다.

기본 우선순위:

```text
Blocking error
↓
Unsupported / unavailable
↓
Partial / Stale
↓
Refreshing
↓
Ready / Fresh
```

단 이 순서는 “심각도 점수”가 아니라 **표현 우선순위**다.

---

# 5. Scope

Data state는 가능한 한 **가장 작은 영향 범위**에서 표시한다.

## Page scope

전체 화면을 사용할 수 없을 때만.

예:
- artist data 전체 load 실패
- 권한 없음
- 핵심 API 전체 장애

Page 전체를 한 source 실패로 막지 않는다.

## Section / Card scope

특정 module만 사용할 수 없음.

예:
- Audience API failure
- 한 chart query 실패

## Metric scope

특정 metric만 상태가 다름.

예:
- 저장률은 해당 DSP가 미지원
- 한 KPI만 estimated

## Source scope

플랫폼별 상태.

예:
- Spotify fresh
- Melon stale

---

# 6. Localization Principle

```text
Smallest affected scope wins.
```

한 플랫폼 수집 오류 때문에:
- Dashboard 전체 Error banner
- 모든 KPI skeleton

을 만들지 않는다.

가능한 데이터는 계속 보여준다.

---

# 7. Ready / Fresh

정상 상태는 가장 조용하게 표현한다.

기본적으로:
- green success badge를 모든 카드에 붙이지 않음
- “정상”을 반복 표시하지 않음

필요한 meta만 제공:

```text
4개 플랫폼
마지막 갱신 11. 7. 00:30
```

source / freshness가 분석 신뢰에 중요할 때만 노출한다.

---

# 8. Initial Loading

처음 진입했고 아직 content가 한 번도 없는 상태.

## Structure known

Skeleton 사용.

예:
- KPI cards
- table rows
- chart card body

Skeleton은 실제 layout을 대략적으로 반영한다.

### 하지 않는 것
- 모든 icon/button까지 skeleton 처리
- 실제 content보다 더 복잡한 fake skeleton
- 여러 independent spinner 동시 노출

## Structure unknown / compact action

Spinner 또는 inline loading.

---

# 9. Skeleton Rules

Skeleton은 “데이터가 아직 없음”이 아니라:

```text
곧 같은 구조의 content가 들어옴
```

을 의미한다.

따라서:

좋음:
```text
KPI label skeleton
KPI value skeleton
comparison skeleton
```

피함:
```text
Empty state를 skeleton으로 표현
Unsupported metric에 skeleton 유지
```

실제 request가 끝나면 반드시:
- content
- empty
- error

중 하나로 종료한다.

---

# 10. Short Wait Threshold

초기 guidance:

- 아주 짧은 wait에는 loading indicator를 즉시 깜빡이지 않음
- 1초 이상 구조 loading → skeleton 후보
- 약 3초 이상의 indeterminate process → 명시적 loading feedback 필요

정확한 delay threshold는 실제 성능 측정 후 조정한다.

현재 값은 구현 guideline이지 SLA가 아니다.

---

## Query transition과의 구분

Query transition의 loading은 `16-filter-search-date-query-system.md`를 따른다. 기간/filter/comparison이 바뀐 경우 새 query label 아래 old-query data를 정상값처럼 유지하지 않는다. 이 문서의 Refreshing 규칙은 **같은 query의 background refresh**에 적용한다.

# 11. Refreshing

기존 데이터가 있고 background refresh 중.

핵심:

```text
Do not blank the dashboard.
```

기존 숫자를 그대로 유지하고:

```text
갱신 중
마지막 갱신 00:30
```

처럼 상태만 보조한다.

## Why

사용자는:
- 기존 context 유지
- 새 데이터가 오는 중임을 인지
- 숫자가 갑자기 사라지는 혼란 방지

할 수 있다.

---

# 12. Refreshing Visual

기본:
- small inline spinner 또는 animated progress cue
- meta text
- card 전체 opacity 감소 없음
- skeleton으로 되돌리지 않음

예:

```text
Spotify · 갱신 중
마지막 정상 데이터 00:30
```

관련 control의 repeated request만 필요 시 잠깐 제한한다.

---

# 13. Refresh Success

refresh가 끝났을 때 매번 large success toast를 띄우지 않는다.

필요한 경우:
- status text 업데이트
- subtle live announcement

```text
최신 데이터로 갱신했습니다.
```

사용자가 직접 “새로고침”을 눌렀을 때만 feedback을 조금 더 명시적으로 보여줄 수 있다.

---

# 14. Empty State Taxonomy

Empty는 원인별로 분리한다.

---

## 14.1 Not Connected

source가 연결되지 않음.

```text
아직 연결된 데이터가 없습니다.
사용 중인 플랫폼을 연결하면 성과 변화를 확인할 수 있습니다.

[데이터 연결]
```

Primary action 가능.

---

## 14.2 Connected, No Data Yet

연결은 되었지만 첫 수집 전.

```text
아직 수집된 데이터가 없습니다.
첫 데이터가 수집되면 이곳에 성과가 표시됩니다.
```

불필요한 retry button을 만들지 않는다.

현재 실제 polling/sync 상태가 있다면:
```text
첫 데이터를 가져오는 중입니다.
```

로 표현할 수 있다.

---

## 14.3 No Results

사용자의 filter/search 결과가 없음.

```text
조건에 맞는 결과가 없습니다.
기간이나 필터를 바꿔보세요.

[필터 초기화]
```

Underlying table/header를 그대로 남겨 screen reader가 빈 table을 먼저 읽게 하지 않는다.

---

## 14.4 Unsupported

source 자체가 metric을 제공하지 않음.

```text
이 지표는 현재 플랫폼에서 제공되지 않습니다.
```

값을:
- 0
- —
- N/A

만으로 표시하지 않는다.

Compact table cell 등 공간이 제한되면:
```text
지원 안 함
```

+ accessible detail을 사용한다.

---

# 15. Zero vs Empty

```text
0 != No data
```

0은 실제 관측값이다.

예:
- 신규 팔로워 0명

No data는 관측 자체가 없거나 사용할 수 없는 상태다.

절대 동일한 placeholder로 표현하지 않는다.

---

# 16. Partial

일부 source / 기간 / entity만 포함.

기존 데이터는 보여주되 **무엇이 빠졌는지** 알려야 한다.

예:

```text
일부 플랫폼 데이터만 포함되어 있습니다.
Melon 데이터가 아직 반영되지 않았습니다.
```

Compact:

```text
3/4 플랫폼 포함
```

---

# 17. Partial Aggregate Rule

CHASM의 중요한 Stable 원칙:

```text
Coverage changed → comparison validity must be rechecked.
```

예:

현재 기간:
```text
Spotify + YouTube + Apple
```

이전 기간:
```text
Spotify + YouTube + Apple + Melon
```

이라면 단순 aggregate delta:

```text
-12.4%
```

를 그대로 보여주지 않는다.

가능한 처리:

1. 동일 source coverage로 재계산
2. 비교값 숨김
3. Partial context와 함께 별도 계산 정의 제공

어떤 방식이 가능한지는 실제 schema 이후 결정한다.

---

# 18. Partial Visualization

Card 전체를 warning yellow로 칠하지 않는다.

기본:
- 정상 content 유지
- card header/meta 근처 status line
- 필요 시 warning/info icon
- source detail disclosure

예:

```text
일부 데이터만 포함
3/4 플랫폼 · Melon 미반영
[상세 보기]
```

---

# 19. Stale

마지막 정상 데이터는 있으나 기대 갱신 주기를 벗어남.

```text
Stale data can still be useful.
```

따라서 기본은 삭제하지 않는다.

표시:

```text
최신 상태가 아닙니다.
마지막 갱신: 11. 5. 18:20
```

---

# 20. Freshness Threshold

```text
stale threshold != one global duration
```

플랫폼마다:
- expected refresh cadence
- API delay
- batch schedule

가 다를 수 있다.

따라서:

```text
is_stale = now - last_success_at > source-specific threshold
```

개념으로 다루되 exact threshold는 actual DSP pipeline 확인 후 결정한다.

상태:
**Deferred**

---

# 21. Freshness Copy

가능하면 absolute date/time을 제공한다.

Overview meta:
```text
마지막 갱신 11. 7. 00:30
```

Detail:
```text
마지막 정상 갱신: 2026. 11. 7. 00:30
```

`2일 전`만 단독으로 사용하면 정확한 판단이 어려울 수 있다.

Relative time은 보조적으로 병기 가능.

---

# 22. Estimated

실제 측정값이 아니라 추정값인 경우 해당 값 가까이에 표시한다.

예:

```text
12.4만
추정치
```

또는:

```text
12.4만*
* 일부 값은 추정치입니다.
```

선호:
- explicit label
- tooltip/detail explanation

피함:
- 색상만 다르게
- 전체 card에 “AI” badge
- arbitrary confidence score

---

# 23. Estimated + Actual Mixed

한 chart에서 observed와 estimated가 이어질 경우:

- observed: solid line
- estimated: dashed line
- transition point 표시
- legend/detail에서 명시

이미 Visualization System의 Missing/Estimated grammar와 연결한다.

Estimated segment를 실제값처럼 solid line으로 연결하지 않는다.

---

# 24. Error

Error는 request/process가 실패했고 사용자가 기대한 data를 제공할 수 없는 상태.

기본 anatomy:

```text
무엇을 불러오지 못했는가
어디까지 영향을 주는가
다음 행동
```

예:

```text
Spotify 데이터를 불러오지 못했습니다.
다른 플랫폼 데이터는 계속 확인할 수 있습니다.

[다시 시도]
```

---

# 25. Error Scope

한 card query 실패:

→ Card-local error

한 source 실패:
→ source status + affected cards only

전체 artist load 실패:
→ page-level error

```text
Do not escalate a local failure to a page failure.
```

---

# 26. Error with Last Known Data

request는 실패했지만 last known data가 있으면:

```text
마지막 정상 데이터 유지
+
갱신 실패 상태
```

를 우선 검토한다.

예:

```text
최신 데이터를 가져오지 못했습니다.
11. 5. 18:20 기준 데이터를 표시하고 있습니다.

[다시 시도]
```

이 경우 blank error로 교체하지 않는다.

---

# 27. Retry

Retry는:
- 실제로 같은 request를 다시 시도할 수 있을 때만 제공
- action label은 `다시 시도`

피함:
- 해결 불가능한 unsupported state에 Retry
- 무한 retry loop
- repeated clicks 가능

retry 중에는 local inline loading state로 전환한다.

---

# 28. Unsupported vs Error

중요:

```text
Unsupported != Error
```

Unsupported:
- 시스템이 정상 작동 중
- source가 metric 자체를 제공하지 않음

Error:
- 제공 가능한 metric인데 request 실패

UI tone도 다르게 한다.

Unsupported는 neutral/info.
Error는 critical/error semantics.

---

# 29. Stale vs Error

```text
Stale != Error
```

Stale:
- usable last-known value 존재
- freshness 문제

Error:
- 요청 실패

둘이 동시에 존재할 수도 있다.

예:
```text
refresh failed
+
last known value is stale
```

화면에서는:
```text
최신 데이터를 가져오지 못했습니다.
11.5 기준 데이터를 표시합니다.
```

처럼 하나의 actionable message로 묶는다.

---

> Data State의 의미는 이 문서가 담당하고, 사용자에게 어떤 feedback surface로 전달할지는 `18-feedback-notification-confirmation.md`를 따른다.

# 30. State Surfaces

상태에 따라 visual surface를 다르게 사용한다.

## Meta / Quiet

사용:
- Ready freshness
- Refreshing
- Estimated label

위치:
- header meta
- metric label 옆
- source/detail row

## Inline Notice

사용:
- Partial
- Stale
- non-blocking source issue

위치:
- affected card 내부
- card header/body 사이

## Replacement State

사용:
- Initial loading
- Empty
- Unsupported
- card-local blocking error

기존 data area를 대체.

## Banner / Message Bar

사용:
- 여러 module에 걸친 영향
- page-wide limitation
- 중요한 data-quality warning

카드 하나 문제를 page banner로 올리지 않는다.

---

# 31. Visual Severity

Data state visual tone:

## Neutral
- Ready
- Refreshing
- Empty
- Unsupported

## Informative
- Estimated
- source detail

## Attention
- Partial
- Stale

## Critical
- Blocking Error

단:

```text
Attention color != analytical evaluation
```

warning amber는 metric 감소를 뜻하지 않는다.

---

# 32. Status Icon

필요한 경우:
- info
- refresh
- warning
- error

를 사용.

아이콘만으로 상태 전달 금지.

Ready state에 success check icon을 반복적으로 붙이지 않는다.

---

# 33. Status Chip

Chip/badge를 남발하지 않는다.

허용:
- compact source list
- metric-specific estimated state
- table cell state

예:
```text
추정치
지원 안 함
갱신 중
```

Page/card header에 badge 3개를 나열하는 대신 하나의 human-readable status line을 우선한다.

---

# 34. Data Health Meta

정상 dashboard에서 가장 일반적인 pattern:

```text
4개 플랫폼 · 마지막 갱신 11. 7. 00:30
```

문제가 없으면 별도 “정상” label은 생략 가능.

Prototype sample에서는 실제 data가 아니므로:

```text
샘플 데이터 · 4개 플랫폼 · 갱신 시각 예시
```

처럼 명확히 한다.

---

# 35. Source Detail Disclosure

사용자가 더 자세히 볼 필요가 있으면:

```text
데이터 상태 보기
```

를 통해 source별 상태 제공.

예:

| Source | 상태 | 마지막 정상 갱신 |
|---|---|---|
| Spotify | 최신 | 00:30 |
| YouTube Music | 최신 | 00:28 |
| Apple Music | 최신 | 00:26 |
| Melon | 지연 | 11.5 18:20 |

이 패턴은 실제 source metadata가 존재할 때 구현한다.

---

# 36. Data State and Insight

Insight가 생성될 때 data state를 무시하면 안 된다.

예:

Partial aggregate에서:
```text
전체 스트리밍 -12.4%
```

같은 insight를 그대로 생성하면 안 된다.

Insight engine은 최소:
- coverage
- freshness
- estimated flag

를 확인해야 한다.

가능한 처리:
- insight suppression
- evidence limitation copy
- same-coverage recalculation

실제 rule engine은 Deferred.

---

# 37. Data State and Comparison

비교는 양쪽 기간의 data quality가 유사한지 확인한다.

체크:
- source coverage
- missing dates
- metric definition
- timezone / aggregation boundary
- estimated vs observed

하나라도 materially 다르면 comparison context가 필요하다.

---

# 38. Loading Accessibility

loading feedback은 assistive technology에도 전달한다.

예:
```html
<div role="status" aria-live="polite">
  데이터를 불러오는 중입니다.
</div>
```

Skeleton 자체를 수십 개 screen reader item으로 노출하지 않는다.

Skeleton visual blocks는 `aria-hidden="true"`.

---

# 39. Refresh Accessibility

Background refresh는 focus를 이동시키지 않는다.

필요한 경우 완료 시:

```text
최신 데이터로 갱신했습니다.
```

polite live announcement.

자동 refresh마다 과도한 announcement를 하지 않는다.

---

# 40. Error Accessibility

Error title/body는 일반 text로 읽힐 수 있어야 한다.

Immediate user action이 필요한 error만:
- alert semantics

를 검토한다.

모든 data fetch error를 `role="alert"`로 만들지 않는다.

---

# 41. Reduced Motion

Skeleton shimmer/spinner는 `prefers-reduced-motion`을 존중한다.

Reduced motion:
- skeleton pulse/shimmer 제거
- static skeleton 유지 가능
- spinner는 상태 text와 함께 최소화

Loading 의미는 animation에만 의존하지 않는다.

---

# 42. Responsive

좁은 화면에서도 data state가 사라지면 안 된다.

우선순위:

```text
상태 의미
→ 마지막 갱신
→ source detail
```

작은 화면에서:
- 긴 source list는 disclosure로 이동 가능
- critical/partial message는 숨기지 않음
- badge만 남기고 설명을 제거하지 않음

---

# 43. Loading Layout Stability

Loading → Content 전환 시 큰 layout shift를 줄인다.

Skeleton:
- 실제 card height 근사
- table row 수 과도하게 많지 않게
- chart plot 영역 유지

단, CLS를 줄이려고 fixed height로 text clipping을 만들지 않는다.

---

# 44. State Combination Examples

## A. Fresh + Complete

```text
전체 스트리밍 2,498만 회
4개 플랫폼 · 마지막 갱신 00:30
```

## B. Refreshing

```text
전체 스트리밍 2,498만 회
갱신 중 · 마지막 정상 데이터 00:30
```

## C. Partial

```text
전체 스트리밍 1,982만 회
일부 데이터만 포함 · 3/4 플랫폼
```

## D. Stale

```text
전체 스트리밍 2,498만 회
최신 상태가 아닙니다 · 마지막 갱신 11.5 18:20
```

## E. Partial + Stale

```text
일부 데이터가 최신 상태가 아닙니다.
3/4 플랫폼 · Melon 미반영 · Spotify 11.5 기준
```

## F. Error + Last Known

```text
최신 데이터를 가져오지 못했습니다.
11.5 18:20 기준 데이터를 표시합니다.
[다시 시도]
```

---

# 45. Prototype Visualization Rules

## Dashboard Sample

정상 상태를 과장하지 않는 quiet meta pattern을 적용한다.

표현 예:

```text
샘플 데이터
4개 플랫폼
갱신 시각 예시 · 11. 7. 00:30
```

이는 실제 freshness 값이 아니라 prototype state visual을 검증하기 위한 sample임을 명시한다.

## Data State Lab

다음 상태를 동시에 비교할 수 있어야 한다.

1. Ready / Fresh
2. Initial loading / skeleton
3. Refreshing
4. Not connected
5. Connected, no data yet
6. No filter result
7. Unsupported
8. Partial
9. Stale
10. Partial + Stale
11. Estimated metric
12. Blocking card error
13. Error + last-known data
14. Page-wide error/banner
15. Source-level status table
16. Reduced-motion skeleton

---

# 46. What Remains Deferred

다음은 실제 data pipeline 확인 전 확정하지 않는다.

- source별 expected refresh cadence
- stale threshold
- retry policy / backoff
- data source health schema
- partial aggregation calculation
- source coverage comparison rules implementation
- estimated value source
- last_success_at / last_attempt_at final fields
- page-level health aggregation algorithm

---

# 47. Recommended Data Metadata — Product Contract Candidate

실제 DB/API 구현 전 product-level 후보:

```text
source
metric
period
last_success_at
last_attempt_at
availability
is_refreshing
is_partial
coverage
is_stale
is_estimated
error_code / error_reason
```

이는 DB schema 확정안이 아니다.

제품 UI가 어떤 context를 필요로 하는지 정리한 **interface requirement candidate**다.

실제 field naming/normalization은 data owner와 협의한다.

---

# 48. Do / Don't

## Do

- 가능한 last-known data 유지
- 문제 범위를 최소 단위에서 표시
- freshness를 실제 cadence 기준으로 판단
- partial coverage를 aggregate comparison 전에 검증
- zero와 no data 구분
- unsupported와 error 구분
- loading 상태를 AT에도 전달
- retry 가능한 경우만 retry 제공

## Don't

- background refresh마다 dashboard를 skeleton으로 되돌림
- 한 source 오류로 page 전체 차단
- stale data를 자동으로 삭제
- partial aggregate의 delta를 검증 없이 노출
- no data를 0으로 표시
- unsupported를 error red로 표시
- 모든 정상 카드에 green check badge
- arbitrary “데이터 품질 82점” 생성

---

# 49. Decision Status

| 결정 | 상태 |
|---|---|
| Data State를 Availability/Freshness/Completeness/Origin으로 분리 | Stable |
| smallest affected scope에서 상태 표시 | Stable |
| initial structured loading은 skeleton 우선 | Stable |
| background refresh에서 기존 데이터 유지 | Stable |
| Zero != Empty | Stable |
| Empty taxonomy 분리 | Stable |
| Unsupported != Error | Stable |
| Stale != Error | Stable |
| Partial aggregate comparison 재검증 | Stable |
| Estimated는 값 가까이에 명시 | Stable |
| Ready는 quiet meta로 표현 | Stable |
| source-specific stale threshold | Deferred |
| actual refresh cadence | Deferred |
| data health aggregation algorithm | Deferred |
| Proposed data metadata interface | Proposed |
