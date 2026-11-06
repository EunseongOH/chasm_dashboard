# CHASM Content & Microcopy System — v0.1

> 상태: Proposed v0.1  
> 목적: 데이터 초심자도 수치·비교·상태·다음 행동을 빠르게 이해할 수 있도록, CHASM 전반의 용어·문체·문장 구조·CTA·상태 메시지를 일관되게 정의한다.

---

# 0. Core Principle

CHASM의 문구는 장식이 아니라 데이터 해석의 일부다.

같은 숫자라도 다음 표현은 서로 다른 의미를 만든다.

```text
스트리밍이 올랐어요.
스트리밍이 증가했습니다.
이전 30일 대비 스트리밍이 18.4% 증가했습니다.
```

CHASM은 가능한 한 마지막 형태처럼 **값 + 비교 기준 + 의미**를 명확히 한다.

기본 원칙:

```text
짧게
구체적으로
평이하게
근거 수준에 맞게
행동 결과가 예측 가능하게
```

---

# 1. 참고 시스템에서 가져온 원칙

## Microsoft Fluent 2

Fluent Content Design은:
- plain language
- 짧은 문장
- 빠르게 핵심 전달
- 현재형/능동형 우선
- action과 next step을 명확하게
- 상황에 맞는 tone

을 강조한다.

Dashboard에서는 friendly할 수 있지만 navigation/header는 사실 중심으로 간결하게 쓰는 것을 권장한다.

Reference:
- https://fluent2.microsoft.design/content-design

## Carbon

Carbon은:
- simple language
- sentence case
- 일상적인 단어
- 짧고 직접적인 문장
- 제품 용어 목록을 별도로 유지

하도록 권장한다.

Data Table column title도 가능하면 1–2개의 짧은 단어로 유지한다.

References:
- https://www.carbondesignsystem.com/building-blocks/foundations/content
- https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines

## Carbon Empty States

Empty state는 단순히 “데이터 없음”이라고 끝내지 않고:
1. 무엇이 없는지
2. 왜 그런지 알 수 있다면 이유
3. 사용자가 다음에 할 수 있는 행동

을 제공하는 것이 좋다.

Empty state는 원래 콘텐츠가 나타날 공간 자체를 대체한다.

Reference:
- https://www.carbondesignsystem.com/building-blocks/core/patterns/empty-states

---

# 2. Voice

CHASM voice:

- 차분함
- 명확함
- 분석적이지만 어렵지 않음
- 과장하지 않음
- 사용자 판단을 존중
- 결과보다 근거를 우선

피함:
- 지나친 친근함
- 마케팅 문구
- 감탄사
- 평가적 표현
- 데이터가 말하지 않은 인과

예:

좋음:
```text
최근 30일 스트리밍이 이전 30일보다 18.4% 증가했습니다.
```

피함:
```text
스트리밍이 엄청나게 성장했어요!
```

---

# 3. Korean Tone

CHASM 기본 문체는 다음과 같이 구분한다.

## Labels / headings / controls

명사형 또는 짧은 구절.

예:
- 전체 성과
- 최근 30일
- 전체 스트리밍
- 플랫폼별 보기
- 근거 보기

마침표 없음.

## Full explanatory sentences

`-합니다 / -됩니다 / -있습니다`

예:
- 데이터가 아직 충분하지 않습니다.
- 이전 30일보다 18.4% 증가했습니다.
- 일부 플랫폼의 데이터 갱신이 지연되고 있습니다.

## Avoid mixed speech level

같은 analytical surface 안에서:
- `~해요`
- `~합니다`

를 섞지 않는다.

Onboarding이나 교육성 안내에서 더 conversational한 tone이 필요하면 별도 pattern으로 정의한다.

현재 Dashboard analytical surfaces는 **합니다체**를 기본으로 한다.

---

# 4. Sentence Structure

기본 insight 문장:

```text
[대상] + [무슨 변화] + [비교 기준]
```

예:
```text
전체 스트리밍이 이전 30일보다 18.4% 증가했습니다.
```

또는 UI hierarchy로 분리:

```text
전체 스트리밍 +18.4%
이전 30일 대비
```

두 방식을 한 surface에서 중복 사용하지 않는다.

---

# 5. Comparison Copy

## 이전 기간 대비

현재 선택 기간과 바로 앞의 동일 길이 기간을 비교할 때.

예:
```text
최근 30일
vs
그 이전 30일
```

UI:
```text
이전 30일 대비
```

## 직전 기간 대비

의미는 정확하지만 일반 사용자에게 다소 분석 도구처럼 들릴 수 있어 기본 용어로 쓰지 않는다.

필요한 전문 화면에서만 고려.

## 전월 대비

달력 월(calendar month)을 비교할 때만.

예:
```text
2026년 10월 vs 2026년 9월
```

최근 30일 비교에 `전월 대비`를 쓰지 않는다.

## 전주 대비

달력/정의된 주 단위 비교일 때.

## 발매 전 N주 평균 대비

이벤트 baseline.

예:
```text
발매 전 4주 평균 대비
```

event impact 맥락에서는 일반 `이전 기간 대비`보다 이 표현을 우선한다.

---

# 6. Increase / Decrease Vocabulary

## 증가 / 감소

수량·횟수·사용자 수 같은 양(quantity)에 기본 사용.

예:
- 스트리밍이 증가했습니다.
- 신규 팔로워가 감소했습니다.
- 청취자 수가 증가했습니다.

## 상승 / 하락

비율·지수·순위·수준·추세에 사용.

예:
- 저장률이 상승했습니다.
- 순위가 5위에서 3위로 상승했습니다.
- 지수가 기준선보다 높게 유지됩니다.

## 성장

평가적/해석적 의미가 섞일 수 있다.

따라서 generic metric direction 용어로는 제한한다.

피함:
- 성장 중인 곡
- 성장 플랫폼

대안:
- 스트리밍 증가 곡
- 증가 기여 플랫폼
- 최근 상승 곡 — 실제 metric이 rate/trend라면

`성장률`처럼 실제 metric name일 때는 사용 가능.

---

# 7. Stable / No Change

정확히 0이면:

```text
변화 없음
```

threshold 안의 작은 변화라면 실제 threshold가 정의되기 전까지:

```text
비슷한 수준
```

을 자동 생성하지 않는다.

`유지`, `보합` 등은 metric별 threshold가 정의된 후 사용한다.

---

# 8. Trend Vocabulary

## 실제 최근 방향

- 증가 추세
- 감소 추세
- 상승 추세
- 하락 추세

단 point 2개만으로 `추세`라고 쓰지 않는다.

## High level 유지

예:
```text
발매 이후 이전 수준보다 높은 상태가 이어지고 있습니다.
```

`유지`는 실제 기간 동안 일정한 수준이 관찰됐을 때만 사용한다.

---

# 9. Ranking Vocabulary

좋음:
- 1위
- 순위 상승
- 2계단 상승
- 순위 유지

피함:
- +2위

이 표현은 현재 순위가 2 증가했다는 것인지 2계단 개선됐다는 것인지 혼동될 수 있다.

UI compact:
```text
↑ 2
```

Accessible/detail copy:
```text
2계단 상승
```

---

# 10. Percentage Vocabulary

## %

비율 자체 또는 상대 변화율.

예:
```text
저장률 12.4%
스트리밍 +18.4%
```

## %p

두 비율의 차이.

예:
```text
저장률 12.4% → 10.1%
2.3%p 하락
```

`2.3% 감소`와 혼용하지 않는다.

---

# 11. Metric Naming

Metric name은 가능한 한 사용자가 바로 이해하는 한국어를 우선한다.

예:
- Streams → 스트리밍
- Listeners → 청취자
- Followers → 팔로워
- Saves → 저장
- Playlist adds → 플레이리스트 추가

단 실제 DSP 공식 metric 정의와 한국어 명칭을 확인한 뒤 final glossary를 확정한다.

Metric translation은 현재 **Proposed / schema validation required**.

---

# 12. Technical Terms

분석 전문 용어는 UI에서 가능한 한 자연어로 바꾼다.

| 내부/전문 용어 | 기본 UI 표현 |
|---|---|
| WoW | 이전 주 대비 |
| MoM | 이전 달 대비 / 전월 대비* |
| baseline | 비교 기준 |
| anomaly | 평소와 다른 변화 |
| contribution | 기여도 / 증가분 비중 |
| correlation | 함께 움직인 관계 |
| leading signal | 먼저 나타난 신호 |
| normalization | 기준값에 맞춰 비교 |
| index | 지수 / 기준 100 |

* 실제 calendar month 비교인지 확인 필요.

Tooltip/detail에서는 전문 용어를 함께 표시할 수 있다.

---

# 13. Avoid Jargon When It Adds No Value

피함:
```text
MoM growth
WoW delta
anomaly detected
normalized index
correlated uplift
```

대안:
```text
이전 달보다 증가
평소와 다른 변화가 나타남
발매 전 평균을 100으로 비교
두 지표가 같은 시기에 상승
```

---

# 14. Data Source Naming

서비스 이름은 공식 표기를 따른다.

예:
- Spotify
- YouTube Music
- Apple Music
- Melon

한글 음차와 영문명을 화면마다 섞지 않는다.

DSP 공식 명칭과 source mapping은 실제 integration 확정 후 검증한다.

---

# 15. Date & Time

## Date axis
짧게:
```text
9. 18.
10. 12.
```

## Detail / tooltip
```text
2026. 9. 18.
```

## Range
```text
2026. 8. 1. – 10. 31.
```

## Relative
`오늘`, `어제`는 freshness가 중요한 UI에서만.

Analytics에서는 재현 가능한 해석을 위해 absolute date를 우선한다.

---

# 16. Number + Unit

숫자와 단위는 의미상 한 덩어리지만 hierarchy는 분리할 수 있다.

예:
```text
2,498만 회
4,820명
```

Column header에 unit이 있으면 row마다 반복하지 않을 수 있다.

피함:
```text
2,498 만 회
```

숫자와 한국어 단위 사이에 불필요한 띄어쓰기를 만들지 않는다.

정확한 Korean number abbreviation rule은 Metric System 확정 단계에서 별도 검증한다.

---

# 17. Titles

## Page title
대상이 무엇인지.

예:
- 전체 성과
- 음원 성과
- 오디언스

## Card title
무엇을 보여주는지.

예:
- 플랫폼별 스트리밍 추이
- 최근 성과가 좋은 곡
- 플랫폼별 증가 기여

## Question title
사용자 질문 중심 탐색 화면에서 가능.

예:
- 어떤 플랫폼에서 가장 많이 증가했나요?

Dashboard의 모든 card title을 질문형으로 만들지는 않는다.

---

# 18. Descriptions

Description은 title을 반복하지 않는다.

나쁨:
```text
플랫폼별 스트리밍 추이
플랫폼별 스트리밍 추이를 보여줍니다.
```

좋음:
```text
플랫폼별 스트리밍 추이
플랫폼마다 변화 시점과 이벤트 전후 흐름을 비교합니다.
```

Description이 새로운 context를 주지 못하면 생략한다.

---

# 19. Button Labels

## Verb first / outcome clear

좋음:
- 데이터 연결
- 리포트 생성
- CSV 내보내기
- 플랫폼별 보기
- 근거 보기
- 필터 초기화

피함:
- 확인
- 실행
- 계속
- 자세히
- 처리

맥락만으로 결과를 예측할 수 있을 때만 짧은 generic label을 허용한다.

---

# 20. Link / Text Action

Destination 중심.

좋음:
- 전체 곡 보기
- 데이터 정의 보기
- 발매 전후 비교
- 사용한 데이터 보기

피함:
- 더보기
- 자세히
- 확인하기

---

# 21. Destructive Actions

명확한 object 포함.

좋음:
- 연결 해제
- 리포트 삭제
- 필터 초기화

피함:
- 삭제
- 해제

대상이 ambiguous한 경우.

Confirmation은 action risk에 따라 별도 pattern에서 정의한다.

---

# 22. Tooltip Copy

Tooltip은 label을 반복하지 않고 **정의 / 이유 / 제한**을 제공한다.

예:

Label:
```text
전체 스트리밍
```

Tooltip:
```text
합산 가능한 플랫폼의 재생 수만 포함합니다.
```

피함:
```text
전체 스트리밍입니다.
```

Metric definition이 아직 확정되지 않은 prototype에서는 `샘플 지표`임을 명시한다.

---

# 23. Empty State Taxonomy

“데이터 없음” 하나로 통일하지 않는다.

---

## 23.1 First-use / Not connected

상황:
source 자체가 아직 연결되지 않음.

Copy:

```text
아직 연결된 데이터가 없습니다.
Spotify 등 사용 중인 플랫폼을 연결하면 성과 변화를 확인할 수 있습니다.

[데이터 연결]
```

---

## 23.2 Connected but no data yet

상황:
연결은 완료됐지만 아직 수집된 데이터가 없음.

```text
아직 수집된 데이터가 없습니다.
데이터가 들어오면 이곳에 최근 성과가 표시됩니다.
```

불필요한 action이 없으면 버튼을 만들지 않는다.

---

## 23.3 No results after filter/search

```text
조건에 맞는 결과가 없습니다.
기간이나 필터를 바꿔보세요.

[필터 초기화]
```

---

## 23.4 Not applicable

```text
이 지표는 현재 플랫폼에서 제공되지 않습니다.
```

“0”으로 표시하지 않는다.

---

# 24. Loading Copy

짧은 로딩에서는 text 없이 skeleton/spinner 가능.

시간이 길어지는 작업만 명확한 진행 상태 제공.

좋음:
- 데이터를 불러오는 중입니다.
- 리포트를 생성하는 중입니다.

피함:
- 처리 중...
- 잠시만 기다려주세요.

가능하면 무엇을 하고 있는지 object를 명시한다.

---

# 25. Error Copy

기본 anatomy:

```text
무슨 문제가 생겼는가
현재 영향
사용자가 할 수 있는 다음 행동
```

예:

```text
Spotify 데이터를 불러오지 못했습니다.
다른 플랫폼 데이터는 계속 확인할 수 있습니다.

[다시 시도]
```

피함:
- 오류가 발생했습니다.
- Error 500
- 문제가 생겼습니다.

Technical detail은 필요하면 secondary detail로 제공한다.

Carbon도 error state에서는 경제적이고 직접적인 tone을 권장한다.

---

# 26. Partial / Stale Data Copy

실제 Data State 상세 시스템은 아직 Deferred지만 copy vocabulary를 예약한다.

## Partial

```text
일부 플랫폼 데이터만 포함되어 있습니다.
```

## Stale

```text
Spotify 데이터가 아직 최신 상태가 아닙니다.
마지막 갱신: 2026. 11. 5.
```

## Estimated

```text
일부 값은 추정치입니다.
```

이 세 상태를 `데이터 오류` 하나로 묶지 않는다.

---

# 27. Success Feedback

작업 완료 feedback은 짧게.

예:
- 저장했습니다.
- 연결했습니다.
- 리포트를 생성했습니다.

불필요하게:
- 성공적으로 저장되었습니다!
- 축하합니다!

같은 표현을 쓰지 않는다.

---

# 28. Insight Copy

Insight System을 그대로 따른다.

## Observation / Comparison
단정형 가능.

```text
이전 30일보다 18.4% 증가했습니다.
```

## Signal
관계만 표현.

```text
Instagram 반응 상승이 스트리밍보다 먼저 나타났습니다.
```

## Interpretation
불확실성 포함.

```text
발매 시점과 관련됐을 가능성이 있습니다.
```

## Recommendation
과도한 명령 대신 exploration 우선.

```text
플랫폼별 증가분을 비교해볼 수 있습니다.
```

---

# 29. Avoid Evaluative Adjectives

기본 금지/제한:

- 좋은
- 나쁜
- 성공적인
- 실패한
- 폭발적인
- 압도적인
- 뛰어난
- 심각한

실제 threshold / benchmark / user goal이 정의돼 있을 때만 semantic evaluation을 고려한다.

예:

피함:
```text
이번 곡의 성과가 매우 좋습니다.
```

대안:
```text
최근 5개 발매 중 스트리밍이 가장 높습니다.
```

---

# 30. Avoid False Precision in Language

숫자가 정확해도 해석까지 정확한 것은 아니다.

피함:
```text
공연 때문에 스트리밍이 27.1% 증가했습니다.
```

좋음:
```text
공연 주간 스트리밍이 이전 주보다 27.1% 높았습니다.
```

---

# 31. Labels Should Not Explain Everything

Label:
```text
최근 변화
```

Tooltip/description:
```text
현재 선택 기간과 바로 이전의 동일 길이 기간을 비교합니다.
```

Label을 지나치게 길게 만들지 않는다.

---

# 32. Consistent Object Naming

한 entity는 같은 화면/제품에서 이름을 바꾸지 않는다.

예:
```text
곡
트랙
음원
```

을 같은 의미로 임의 교체하지 않는다.

CHASM 기본:
- 사용자-facing resource: `곡`
- technical/schema context: `track` 가능

Album:
- 앨범
- 발매작(release)는 더 넓은 개념이 필요할 때만

최종 entity glossary는 실제 DB entity model 확정 후 Stable로 승격한다.

---

# 33. Provisional Product Glossary

| Preferred | 피함/제한 | 비고 |
|---|---|---|
| 곡 | 트랙 | 사용자 UI 기본 |
| 앨범 | 릴리즈 | release가 더 넓은 entity면 별도 |
| 전체 스트리밍 | 총 재생 | 실제 DSP 정의 확인 필요 |
| 청취자 | 리스너 | 공식 정의 확인 필요 |
| 팔로워 | 구독자 | platform별 entity 다를 수 있음 |
| 이전 기간 대비 | 전기 대비 | 일반 사용자 우선 |
| 비교 기준 | baseline | tooltip에서 병기 가능 |
| 평소와 다른 변화 | anomaly | 전문 화면에서 병기 가능 |
| 증가분 비중 | contribution | 합산 가능한 경우만 |
| 먼저 나타난 신호 | leading signal | 인과 아님 |
| 데이터 없음 | - | 아래 taxonomy로 구체화 필요 |

---

# 34. Punctuation

## UI label / button / heading
마침표 없음.

## Full sentence
마침표 사용.

## Tooltip
완전한 문장이면 마침표.

## Exclamation mark
기본 사용하지 않는다.

## Ellipsis
loading을 표현하기 위해 `...`를 반복적으로 사용하지 않는다.

---

# 35. Parentheses

가능하면 본문 문장으로 설명한다.

피함:
```text
증가율 (이전 기간 대비)
```

선호:
```text
증가율
이전 기간 대비
```

괄호는 unit/약어처럼 짧은 보조 정보에 제한한다.

---

# 36. English & Korean Mixing

한국어 UI에서는 이해 가능한 한국어를 우선한다.

유지:
- Spotify
- YouTube Music
- Apple Music
- Instagram
- CSV

번역:
- Dashboard → 대시보드
- Audience → 오디언스 또는 청취자 — 정보 구조에 따라
- Performance → 성과
- Insight → 인사이트는 내부/업계 용어로 사용 가능하지만 사용자-facing에서는 `확인할 변화`, `분석` 등 검토

영문 대문자 kicker는 visual hierarchy 용도로 제한하고 의미 전달의 유일한 수단으로 사용하지 않는다.

---

# 37. Accessibility Writing

- link/button label만 읽어도 행동을 예측할 수 있어야 함
- `여기를 클릭` 사용 금지
- icon-only은 accessible name 제공
- 색상만 언급하지 않음

피함:
```text
빨간 항목을 확인하세요.
```

선호:
```text
갱신이 지연된 플랫폼을 확인하세요.
```

---

# 38. Content Length

## KPI label
1 line 권장.

## Card title
1–2 lines.

## Supporting description
가능하면 1–2 sentences 이내.

## Insight compact
headline 1–2 lines + context 1 line.

## Tooltip
1–3 short sentences.

긴 설명은 progressive disclosure/detail로 이동한다.

---

# 39. Current Prototype Copy Changes

현재 sample에서 다음을 정리한다.

Before:
```text
신곡 발매 이후 스트리밍이 평소보다 높은 수준을 유지하고 있어요.
```

After:
```text
신곡 발매 이후 스트리밍이 이전 수준보다 높게 유지되고 있습니다.
```

Before:
```text
성장 기여 플랫폼
```

After:
```text
스트리밍 증가 기여
```

Before:
```text
상승 중인 곡
```

After:
```text
스트리밍 증가 곡
```

단 실제 metric definition이 확정되면 final naming 재검증.

---

# 40. Validation Cases

Content Lab에서 최소 다음을 검증한다.

1. Label vs full sentence
2. 합니다체 일관성
3. 이전 기간 / 전월 / 발매 전 baseline
4. 증가 vs 상승 vs 성장
5. % vs %p
6. button/link CTA
7. tooltip definition
8. first-use empty
9. connected-no-data empty
10. no-filter-result
11. error
12. stale/partial/estimated
13. insight evidence level
14. evaluative vs descriptive copy
15. Korean/English terminology
16. long metric name
17. table column labels
18. accessible action labels

---

# 41. Decision Status

| 결정 | 상태 |
|---|---|
| Dashboard analytical copy는 합니다체 | Stable |
| Labels/buttons는 짧은 명사/동사구 | Stable |
| Plain Korean 우선 | Stable |
| 증가/감소 vs 상승/하락 역할 분리 | Proposed |
| 성장 generic direction 용어 제한 | Proposed |
| 이전 기간 / 전월 / 이벤트 baseline 구분 | Stable |
| % / %p 구분 | Stable |
| Generic CTA ‘자세히/확인’ 지양 | Stable |
| Empty state taxonomy 분리 | Stable |
| Error = 문제 + 영향 + 다음 행동 | Stable |
| Alert/Data state와 Insight copy 분리 | Stable |
| Evaluative adjective 기본 제한 | Stable |
| Provisional metric/entity glossary | Proposed / schema validation required |
| Number abbreviation Korean format | Deferred |
