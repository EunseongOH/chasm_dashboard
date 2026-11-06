# Dashboard UI Sample — v0.1

> Prototype: `prototype/dashboard-sample/`  
> 상태: Proposed / 실제 DSP 데이터 연결 전 UI·정보 구조 검증용

## 1. 이 샘플의 목적

이 화면은 최종 IA나 최종 KPI를 확정하기 위한 것이 아니다.

현재 단계에서 확인하려는 것은 다음이다.

1. Blue + Cool Neutral 컬러 시스템이 실제 데이터 화면에서 충분히 차분한가?
2. 데이터 초심자도 “무엇을 먼저 봐야 하는지” 알 수 있는가?
3. Value + Context + Comparison 원칙이 KPI에 자연스럽게 적용되는가?
4. 여러 DSP를 한 화면에서 볼 때 플랫폼별 색과 제품의 브랜드 색이 충돌하지 않는가?
5. 이벤트와 데이터 변화가 한 흐름에서 읽히는가?
6. Insight가 Raw chart보다 한 단계 위의 해석 진입점으로 작동하는가?

## 2. 화면의 정보 흐름

### 2.1 이번 기간 한눈에

페이지 상단에서 이번 기간의 핵심 변화 한 문장을 먼저 보여준다.

목적:
- 차트를 읽기 전에 무엇을 확인해야 할지 알려준다.
- 데이터 초심자의 진입 부담을 줄인다.

주의:
- 실제 제품에서는 근거가 충분한 문장만 노출한다.
- 인과관계가 확인되지 않았다면 원인을 단정하지 않는다.

### 2.2 핵심 KPI

샘플 카드:
- 전체 스트리밍
- 성장 기여 플랫폼
- 상승 중인 곡
- SNS 신규 팔로워

각 카드는 단독 Value가 아니라:
- Value
- Change
- Comparison context
를 함께 보여준다.

### 2.3 플랫폼별 시계열

Spotify / YouTube Music / Apple Music / Melon의 변화 흐름을 같은 chart 안에서 비교한다.

여기서는 DSP 공식 브랜드 컬러를 그대로 사용하지 않고 CHASM visualization palette를 사용한다.

이벤트:
- 신곡 발매
- 공연

을 vertical annotation으로 같은 차트에 표시한다.

### 2.4 지금 확인할 변화

Raw chart와 별도로 사용자가 확인해야 할 변화 후보를 제시한다.

예:
- 신곡 발매 후 스트리밍 증가
- 특정 곡의 성장 기여
- SNS 반응과 스트리밍의 시차

주의:
“Instagram 반응이 먼저 나타났다”는 시계열상 관찰일 뿐, Instagram이 스트리밍 증가의 원인이라고 단정하지 않는다.

### 2.5 플랫폼별 성장 기여

플랫폼 규모 자체가 아니라 “이번 증가분 중 어디에서 증가가 발생했는가”를 보여주는 예시다.

단순 총량 순위보다 현재 행동 판단에 더 직접적인 비교가 될 수 있다.

### 2.6 곡 성과

곡의 전체 규모와 최근 변화율을 함께 제공한다.

- 큰 곡인지
- 지금 성장하고 있는 곡인지

를 구분해서 판단할 수 있도록 한다.

정확한 스트리밍 값은 표에서 축약하지 않는다.

### 2.7 이벤트 타임라인

발매 / 공연 / 콘텐츠를 DSP·SNS 변화와 같은 시간 맥락에서 볼 수 있게 한다.

향후 실제 Event Impact 분석 UI의 기초 패턴 후보로 사용한다.

## 3. 음악 데이터 특성을 고려한 원칙

### 서로 다른 정의의 지표를 무리하게 합치지 않는다

DSP마다 Listener, Stream, Play 등의 정의가 다를 수 있다.

따라서 실제 제품에서는:
- 합산 가능한 지표
- 비교만 가능한 지표
- 플랫폼 내부에서만 해석해야 하는 지표

를 Metric metadata 수준에서 구분해야 한다.

현재 prototype의 수치는 UI 검증용 샘플이다.

### 전체 성과와 플랫폼 상세를 연결한다

사용자는 먼저:
“전체적으로 무슨 일이 일어나고 있지?”

를 이해한 뒤:
“어느 플랫폼 / 어느 곡 때문이지?”

로 내려갈 수 있어야 한다.

### Event context를 항상 고려한다

음악 데이터는 발매, 공연, 방송, SNS 콘텐츠 같은 이벤트에 의해 크게 움직인다.

따라서 단순 시계열만 보여주기보다 이벤트 annotation을 Visualization Grammar의 중요한 요소로 본다.

## 4. 컬러 적용

### 제품 UI
- Canvas: Cool neutral
- Surface: White
- Primary interaction: blue-700
- Selected/subtle: blue-50
- Primary text: neutral-900

### Chart
- Blue: #1393FD
- Teal: #2EAD75
- Purple: #9D6ADE
- Amber: #D99A13

Chart color는 DSP 브랜드 정체성이 아니라 series 구분을 위해 사용한다.

## 5. Semantic color 적용

이번 샘플에서는 증가/감소에 Green/Red를 자동 적용하지 않았다.

예:
- ↑ 18.4% → Brand/neutral accent
- ↓ 2.3% → Neutral

실제 “좋음 / 위험” 판단이 가능한 경우에만 semantic color를 별도로 적용한다.

## 6. 다음 검증 질문

실제 화면을 보고 다음을 검토한다.

1. 상단 Summary banner가 과하게 결론을 대신하고 있지는 않은가?
2. KPI 4개는 초기 사용자가 이해하기에 적절한 밀도인가?
3. Brand blue가 화면에서 너무 많이 보이지 않는가?
4. 시계열 4개가 동시에 있을 때 색 외의 식별 보조가 더 필요한가?
5. Insight Panel이 실제로 “다음에 어디를 볼지” 알려주는가?
6. 플랫폼별 기여도를 %로 표현할 수 있는 실제 데이터 정의가 가능한가?
7. Event annotation이 많아질 때 어떤 우선순위 규칙이 필요한가?

## 7. 구현 메모

현재 prototype은 의존성이 없는 HTML/CSS/Vanilla JS로 구성한다.

이유:
- Framework/DB 구조가 정해지기 전 빠르게 디자인 규칙을 검증
- Chart library의 기본 스타일에 의존하지 않고 Visualization Grammar를 직접 실험
- 브라우저에서 `index.html`을 열면 바로 확인 가능

추후 실제 앱 기술 스택이 결정되면 이 prototype을 그대로 제품 코드로 유지하기보다, 검증된 token과 component rule만 React 등의 실제 구현체로 이전한다.
