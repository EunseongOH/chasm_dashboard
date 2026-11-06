# CHASM Insight & Annotation System — v0.1

> 상태: Proposed v0.1  
> 목적: 데이터가 직접 보여주는 사실과 비교, 패턴, 해석, 추천을 명확히 구분해 사용자가 과도하게 신뢰하거나 인과관계를 오해하지 않으면서도 “지금 무엇을 보고 무엇을 확인해야 하는지” 빠르게 판단하도록 한다.

---

# 0. Core Principle

CHASM의 Insight는 단순한 요약 문장이 아니다.

기본 흐름:

```text
관찰 → 비교 → 맥락 → 패턴 → 해석 → 확인 → 행동
```

하지만 이 모든 단계가 항상 존재하는 것은 아니다.

중요한 것은 **statement의 근거 수준을 숨기지 않는 것**이다.

예:

```text
확인된 변화
최근 4주 평균 대비 스트리밍 +42.3%
```

과

```text
가능한 해석
신곡 발매가 증가에 영향을 줬을 가능성이 있습니다.
```

는 같은 수준의 문장이 아니다.

---

# 1. 참고 시스템에서 가져온 원칙

## Carbon Data Visualization

Carbon은 annotation을 사용해 trend, average, peak, valley 등 데이터 해석에 도움이 되는 맥락을 제공하되, annotation이 데이터 자체를 가리지 않도록 권장한다.

또한 dashboard는 불필요한 metric과 정보량을 줄이고, 사용자가 중요한 변화를 해석하기 쉽게 만들어야 한다.

References:
- https://www.carbondesignsystem.com/building-blocks/data-visualization/dashboards
- https://www.carbondesignsystem.com/building-blocks/data-visualization/chart-anatomy

## Fluent 2

Fluent Message Bar는:
- information
- success
- warning
- error

를 “사용자에게 알려야 하는 상태/피드백”으로 구분한다.

중요한 메시지는 제목에서 명확하고 구체적으로 요약하고, 필요한 경우 action을 제공한다.

CHASM에서는 이 alert/status 패턴을 analytical insight와 구분한다.

Reference:
- https://fluent2.microsoft.design/components/web/react/core/messagebar/usage

## Shopify Polaris

Polaris Banner는 중요한 상태나 필요한 action을 전달하기 위한 feedback component다.

이는 analytical insight와 동일하지 않다.

예:
- 데이터 연결 끊김 → Banner
- 스트리밍이 전 기간보다 18% 증가 → Insight

Reference:
- https://shopify.dev/docs/api/app-home/latest/web-components/feedback-and-status-indicators/banner

## Google PAIR

AI/추천 output에서는:
- 사용자가 언제 시스템을 신뢰하고 언제 직접 판단해야 하는지 알 수 있어야 함
- 데이터 source와 explanation을 제공하면 trust calibration에 도움
- 숫자 confidence는 초심자가 해석하기 어려울 수 있으므로 반드시 필요한지 검증해야 함
- explanation은 완전한 내부 논리를 모두 보여주기보다 의사결정에 필요한 정보 중심으로 제공

References:
- https://pair.withgoogle.com/guidebook-v2/chapter/explainability-trust/
- https://pair.withgoogle.com/guidebook-v2/patterns

## Carbon for AI

AI-generated content가 존재하는 경우 AI의 존재와 explainability 경로를 일관되게 표시하는 것을 권장한다.

CHASM에서 향후 AI가 insight 문장을 생성하거나 추천을 작성하게 된다면, “데이터 기반 insight”와 “AI-generated interpretation”을 투명하게 구분해야 한다.

Reference:
- https://www.carbondesignsystem.com/building-blocks/foundations/carbon-for-ai

---

# 2. Four Independent Dimensions

다음 네 개를 서로 합치지 않는다.

## A. Direction

```text
↑ 증가
↓ 감소
— 유지
```

Direction은 단순 변화 방향이다.

```text
Direction != Evaluation
```

## B. Importance

사용자가 지금 봐야 하는 정도.

결정 요인 후보:
- 변화 크기
- 최근성
- 사용자 관심 metric
- business threshold
- 여러 metric 동시 변화

Importance는 future ranking logic이며 현재 세부 계산은 Deferred.

## C. Evidence Type

이 문장이 얼마나 직접적으로 데이터에서 나온 것인가.

아래 statement taxonomy를 사용한다.

## D. Status / Alert Severity

시스템/데이터 상태가 사용자의 작업을 방해하는가.

예:
- 데이터 연결 오류
- 일부 플랫폼 갱신 지연
- 수집 실패

이는 Insight가 아니라 Alert/Data State다.

---

# 3. Statement Taxonomy

CHASM은 insight 내부 문장을 다섯 유형으로 구분한다.

---

## 3.1 Observation — 관찰된 사실

원 데이터 또는 deterministic aggregation에서 직접 확인되는 내용.

예:
- 최근 30일 Spotify 스트리밍은 1,284,392회입니다.
- 10월 21일 Instagram 프로필 방문이 18,240회였습니다.

허용:
- exact value
- peak/min/max
- count
- directly observed event/date

금지:
- 원인 추정
- 의도 추정

UI label 후보:
```text
변화
관찰
```

모든 observation에 label을 강제로 붙이지는 않는다.

---

## 3.2 Comparison — 계산된 비교

명시된 baseline과의 deterministic comparison.

예:
- 이전 4주 평균 대비 +42.3%
- 지난 30일 대비 신규 팔로워 +6.1%

필수 context:
- 비교 대상
- 기간
- unit

좋음:
```text
전체 스트리밍 +42.3%
발매 전 4주 평균 대비
```

나쁨:
```text
스트리밍이 크게 올랐어요.
```

baseline이 숨겨져 있다.

---

## 3.3 Pattern / Signal — 패턴 또는 신호

둘 이상의 관찰값 사이에 반복/순서/동시 변화가 관찰된 상태.

예:
- Instagram 반응 상승이 스트리밍 상승보다 4일 먼저 나타났습니다.
- Spotify와 YouTube Music에서 같은 주에 상승이 나타났습니다.

중요:
```text
Signal != Cause
```

“함께 나타남”, “먼저 나타남”, “같은 방향으로 움직임”처럼 관찰 가능한 관계만 표현한다.

UI label:
```text
신호
함께 나타난 변화
```

---

## 3.4 Interpretation / Hypothesis — 가능한 해석

관찰/비교/신호를 바탕으로 한 설명 가설.

예:
- 발매 시점과 겹쳐 나타난 상승일 가능성이 있습니다.
- 공연 직후 신규 청취자가 유입됐을 가능성이 있습니다.

필수:
- uncertainty language
- evidence path
- 가능하면 대안 설명 고려

권장 표현:
- ~일 가능성이 있습니다.
- ~와 관련됐을 수 있습니다.
- ~인지 확인해볼 수 있습니다.

피해야 할 표현:
- ~때문입니다.
- ~의 영향입니다.
- 반드시 ~해야 합니다.

근거가 충분하지 않은 인과 단정 금지.

---

## 3.5 Recommendation / Action — 다음 행동

사용자가 다음에 할 수 있는 확인/탐색/실행.

Action은 두 종류로 구분한다.

### Exploration Action

제품 내부에서 더 확인.

예:
- 해당 기간 자세히 보기
- 플랫폼별 증가분 비교
- 발매 전후 4주 보기
- 해당 곡 필터링

### Operational Recommendation

제품 밖 행동을 제안.

예:
- 해당 콘텐츠 형식을 다시 활용해보세요.

Operational recommendation은 exploration action보다 높은 근거를 요구한다.

MVP에서는 **Exploration Action을 기본**으로 한다.

---

# 4. Evidence Ladder

숫자형 confidence score 대신 statement type과 evidence path를 사용한다.

```text
Direct data
    ↓
Derived comparison
    ↓
Observed pattern
    ↓
Possible interpretation
    ↓
Recommendation
```

아래로 내려갈수록 추가 설명과 사용자의 판단이 더 필요하다.

이 ladder는 “정확도 점수”가 아니다.

UI에 Level 1 / Level 2 같은 숫자를 그대로 노출하지 않는다.

---

# 5. Why Not Numeric Confidence by Default

예:

```text
신뢰도 82%
```

는 초심자에게:
- 82%가 높은지 낮은지
- 무엇에 대한 82%인지
- 어떤 행동 차이를 만들어야 하는지

불명확할 수 있다.

따라서 CHASM 기본 UI에서는 arbitrary confidence score를 사용하지 않는다.

향후 실제 statistical model이:
- calibrated probability를 제공하고
- 사용자 의사결정에 실질적으로 필요하며
- 사용자 테스트에서 해석 가능성이 확인된 경우

에만 별도 confidence pattern을 설계한다.

---

# 6. Insight Anatomy

기본 Insight item:

```text
[Type / optional]

Headline
Supporting basis

Optional evidence disclosure
Optional action
```

예:

```text
신호

Instagram 반응이 스트리밍보다 먼저 상승했습니다.
4일 선행 · 최근 8주 기준

[근거 보기]   [해당 기간 보기]
```

---

# 7. Compact Insight

Overview / side panel에서는 compact하게 유지한다.

```text
[icon] Headline
       Context
                        →
```

기본:
- headline 13–14 / 20
- supporting context 12 / 16
- row target >= 48px
- icon은 type을 보조하지만 icon만으로 type을 전달하지 않음

가능하면 3–5개까지만 노출한다.

더 많으면:
- 우선순위 정렬
- “전체 인사이트 보기”
- group

을 사용한다.

---

# 8. Expanded Insight

사용자가 “근거 보기”를 선택하면 다음을 보여줄 수 있다.

```text
Headline

근거
- Spotify +38.1%
- YouTube Music +21.4%
- 발매 전 4주 평균 대비
- 이벤트: 싱글 발매 9.18

해석
발매 시점과 가까운 상승입니다.
인과관계는 확정되지 않았습니다.

다음 확인
[플랫폼별 보기]
[발매 전후 비교]
```

모든 내부 계산 상세를 보여주는 것이 목적은 아니다.

사용자가 판단하는 데 필요한 근거만 progressive disclosure한다.

---

# 9. Evidence Disclosure

버튼 label:

```text
근거 보기
비교 기준 보기
사용한 데이터 보기
```

피함:

```text
자세히
더보기
정보
```

어디로 가는지 예측하기 어렵다.

Evidence disclosure에 포함 가능한 내용:
- metric
- source/platform
- period
- baseline
- calculation
- related event
- data freshness

실제 source/freshness 필드는 data schema 확정 후 연결한다.

---

# 10. Insight → Visualization Linking

Insight는 가능한 경우 근거 chart와 연결한다.

사용자가 insight를 선택하면:

1. 관련 chart/card로 이동하거나
2. 해당 series 강조
3. 해당 기간 highlight
4. 관련 event annotation 강조

중 적절한 interaction을 제공한다.

예:

```text
Insight:
“Spotify 증가분이 가장 큽니다.”

click
→ Spotify series emphasis
→ comparison period highlight
```

Insight가 별도의 텍스트 세계에 고립되지 않도록 한다.

---

# 11. Highlight Behavior

Linked insight가 active일 때:

Relevant:
- original color
- stronger stroke/value emphasis

Non-relevant:
- muted

Period:
- subtle background band 또는 selection range

Event:
- annotation emphasis

Highlight는 temporary exploration state이며 데이터 자체를 변경하지 않는다.

---

# 12. Insight Type Visual Language

Evidence level을 강한 semantic color로 표현하지 않는다.

초기 제안:

## Observation / Comparison
- neutral or brand
- 별도 badge 불필요한 경우 많음

## Pattern / Signal
- neutral informative icon
- optional label “신호”

## Interpretation
- subtle neutral-purple/slate 계열을 검토할 수 있으나
- 현재는 색보다 explicit label “가능한 해석”을 우선

## Recommendation
- action icon / CTA
- brand color 사용 가능

중요:
```text
Color != confidence
```

---

# 13. Alert vs Insight

다음은 Insight가 아니다.

## Data/system issue

예:
- Spotify 데이터가 2일째 갱신되지 않음
- YouTube 연결이 끊김
- 일부 데이터 수집 실패

→ Message/Banner/Data State

## Analytical change

예:
- Spotify 스트리밍 +18.4%

→ Insight

Alert tone(red/amber)을 분석 변화에 사용하지 않는다.

---

# 14. Annotation Types

Chart annotation과 insight card를 구분한다.

## 14.1 Event Annotation

사실적 이벤트.

예:
- 싱글 발매 · 9.18
- 단독 공연 · 10.12

인과 표현 금지.

## 14.2 Data Annotation

data point/period의 사실.

예:
- 기간 최고점
- 8주 평균
- 이전 기간 평균

## 14.3 Reference Annotation

baseline/benchmark/target label.

예:
- 발매 전 4주 평균
- Index 100

## 14.4 Insight Annotation

plot 안에서 꼭 필요한 경우에만 짧은 interpretation.

예:
- “2주간 높은 수준 유지”

단:
- 근거가 plot에서 직접 읽혀야 함
- 긴 해석은 card/side panel로 이동
- plot을 가리지 않음

---

# 15. Annotation Priority

plot에 동시에 모두 표시하지 않는다.

Priority:

1. selected annotation
2. user-hover/focus
3. critical reference/baseline
4. primary event
5. secondary annotation

나머지는:
- cluster
- tooltip
- detail

로 이동.

---

# 16. Annotation Copy

좋음:
- 싱글 발매 · 9.18
- 최근 8주 최고
- 이전 4주 평균
- +3 events

나쁨:
- 발매 대성공!
- 콘텐츠가 터졌습니다
- 공연 효과
- 알고리즘 영향

평가/인과/감정 표현을 annotation에 넣지 않는다.

---

# 17. Summary Insight

페이지 상단 summary는 여러 insight를 한 문단으로 다시 나열하는 곳이 아니다.

목적:
```text
이번 화면에서 가장 먼저 봐야 할 한 가지
```

구조:

```text
Primary statement
Supporting evidence/context
Optional action
```

예:

```text
신곡 발매 이후 스트리밍이 이전 수준보다 높게 유지되고 있습니다.
Spotify와 YouTube Music의 증가분이 가장 큽니다.

[근거 보기]
```

Summary가 interpretation을 포함하면 uncertainty language를 유지한다.

---

# 18. Insight Feed Prioritization

미래 insight engine이 많은 candidate를 만들 경우 다음 요소로 ranking할 수 있다.

- recency
- magnitude
- persistence
- cross-metric recurrence
- user-selected metric importance
- unusualness
- actionable follow-up availability

구체적 scoring logic은 actual product analytics 요구와 data quality 확인 후 결정한다.

현재는 Deferred.

중요:
사용자에게 내부 priority score를 그대로 노출하지 않는다.

---

# 19. Duplicate Insight Suppression

같은 현상을 다른 문장으로 반복하지 않는다.

예:

```text
Spotify +38%
Spotify 증가량이 가장 큼
전체 증가의 46%가 Spotify
```

셋이 같은 핵심 현상을 가리키면 한 insight bundle로 묶을 수 있다.

예:

```text
Spotify가 이번 증가를 가장 크게 이끌었습니다.
+38% · 전체 증가분의 46%
```

---

# 20. Contradictory Signals

여러 metric이 같은 방향으로 움직이지 않을 수 있다.

예:
- streams 증가
- listeners 정체
- saves 감소

이 경우 억지로 하나의 긍정/부정 conclusion을 만들지 않는다.

표현:

```text
지표가 서로 다른 방향으로 움직이고 있습니다.
스트리밍은 증가했지만 저장률은 낮아졌습니다.

[세부 지표 비교]
```

Contradiction 자체가 유용한 insight일 수 있다.

---

# 21. Insufficient Evidence

근거가 부족하면 insight를 억지로 만들지 않는다.

표현 예:

```text
현재 데이터만으로 원인을 판단하기 어렵습니다.
발매 이후 상승은 확인되지만 비교 가능한 이전 발매 데이터가 부족합니다.

[비교 데이터 보기]
```

Google PAIR의 graceful failure 원칙처럼 결과를 줄 수 없는 이유와 다음 경로를 함께 제공한다.

---

# 22. Recommendation Threshold

Recommendation을 생성하려면 최소한 다음을 확인한다.

1. 관련 evidence가 있음
2. 사용자에게 실제로 실행 가능한 action임
3. 예상 결과를 과장하지 않음
4. action cost/risk가 지나치게 크지 않음
5. 가능하면 exploration evidence를 먼저 제공

MVP에서는:

```text
“~하세요”
```

보다

```text
“~을 확인해볼 수 있습니다”
“~과 비교해보세요”
```

를 우선한다.

---

# 23. AI-generated Insight Transparency

향후 AI/LLM이:
- interpretation 문장
- summary
- recommendation

을 생성하는 경우 반드시 생성 source를 식별할 수 있어야 한다.

가능한 pattern:

```text
AI 해석
```

또는 제품 전체의 일관된 AI marker.

단:
- 직접 계산된 metric까지 AI-generated처럼 표시하지 않음
- AI label 자체가 “정확함”을 의미하지 않음
- explanation path 제공

현재 제품에서 AI generation 여부가 확정되지 않았으므로 UI 구현은 Deferred.

원칙만 Stable로 기록한다.

---

# 24. Microcopy

## Observation

좋음:
- 증가했습니다.
- 감소했습니다.
- 가장 높았습니다.
- 4일 먼저 나타났습니다.

## Interpretation

좋음:
- 관련됐을 가능성이 있습니다.
- 영향을 받았을 수 있습니다.
- 함께 확인해볼 수 있습니다.

## Action

좋음:
- 플랫폼별 보기
- 발매 전후 비교
- 해당 기간 보기
- 관련 곡 확인

피함:
- 확인하기
- 자세히
- 분석하기

가능하면 destination/action을 구체화한다.

---

# 25. Tone

CHASM insight tone:

- 차분함
- 구체적
- 과장 없음
- 전문 분석 용어 최소화
- 사용자의 판단 여지 유지

피함:
- “대박”
- “폭발적 성장”
- “실패”
- “반드시”
- “명백히”
- 근거 없는 “성공적”

---

# 26. Insight Density

## Side Panel

권장:
```text
3–5 compact insights
```

## Overview Summary

```text
1 primary insight
```

## Dedicated Insight Page

필요하면:
- grouping
- filter
- period
- type

을 제공할 수 있음.

모든 candidate insight를 dashboard에 노출하지 않는다.

---

# 27. Layout Patterns

## Compact row

```text
Icon | Headline        →
       Context
```

## Expanded card

```text
Type

Headline
Context

Evidence
...

Action
```

## Summary banner

```text
Icon | Primary statement
       Supporting context

                         Action
```

## Inline chart annotation

```text
short factual label
      │
      │
    plot
```

---

# 28. Visual Tokens — Proposed

```css
--insight-observation-bg: transparent;
--insight-signal-bg: #F7F9FC;
--insight-interpretation-bg: #F8F6FA;
--insight-action-bg: #F4F9FF;

--insight-evidence-border: #E5EAF0;
--insight-link-color: #075FBA;

--annotation-event-bg: #FFFFFF;
--annotation-event-border: #E5EAF0;
--annotation-selected-bg: #F4F9FF;
--annotation-selected-border: #CFE7FF;
```

색상은 evidence confidence가 아니라 surface/type differentiation 용도다.

실제 optical validation 후 조정한다.

---

# 29. Validation Cases

Insight Lab에서 최소 다음을 검증한다.

1. Observation only
2. Comparison + baseline
3. Pattern / temporal signal
4. Interpretation with uncertainty
5. Exploration action
6. Operational recommendation
7. Evidence disclosure expanded
8. Insight linked to chart
9. Contradictory metrics
10. Insufficient evidence
11. Duplicate insight bundle
12. Single event annotation
13. Dense annotation cluster
14. Summary insight
15. Alert vs insight side-by-side
16. Optional AI-generated marker placeholder

---

# 30. Decision Status

| 결정 | 상태 |
|---|---|
| Observation / Comparison / Signal / Interpretation / Recommendation 분리 | Stable |
| Direction / Importance / Evidence / Alert severity 분리 | Stable |
| Numeric confidence 기본 미사용 | Stable |
| Evidence progressive disclosure | Stable |
| Insight → chart linking | Stable |
| Event annotation은 factual only | Stable |
| Alert와 analytical insight 분리 | Stable |
| Recommendation보다 exploration action 우선 | Stable |
| Contradictory signal을 억지로 단일 평가하지 않음 | Stable |
| 근거 부족 시 insight 생성 억제/설명 | Stable |
| AI-generated 해석은 향후 명시적 표시 | Stable principle / UI Deferred |
| Insight type별 subtle surface 색상 | Proposed |
| Side panel 3–5개 | Proposed |
| Summary는 1 primary insight | Proposed |
