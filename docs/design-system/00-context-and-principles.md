# CHASM Dashboard Design System — 제품 맥락과 원칙

> 상태: v0.1 / MVP Foundation  
> 서비스 언어: 한국어 우선  
> 핵심 사용자: 데이터 활용에 익숙하지 않을 수 있는 국내 인디 아티스트, 레이블, 유통사

## 1. 제품 맥락

CHASM Dashboard는 Spotify, Apple Music, Melon, YouTube 등 서로 분리되어 있는 아티스트 성과 데이터를 한곳에 통합하고, 사용자가 단순 수치 확인을 넘어 **현재 상황을 이해하고 다음 행동을 판단할 수 있도록** 돕는 것을 목표로 한다.

이 제품은 또 하나의 Raw-data browser가 되어서는 안 된다.

사용자가 각 DSP 관리자 페이지를 돌아다니며 직접 숫자를 비교하고 해석하는 부담을 줄이고, 여러 플랫폼의 신호를 통합하여 **의미 → 근거 → 세부 데이터**의 순서로 전달해야 한다.

## 2. 핵심 제품 원칙

### 2.1 Meaning First — 숫자보다 의미

숫자를 단독으로 보여주는 것을 기본 단위로 보지 않는다.

CHASM의 기본 정보 단위는 다음과 같다.

**Value + Context + Comparison**

예시:

- 청취자 84,291명
- +12.4%
- 지난 28일 대비

상황에 따라 Evidence와 Insight가 뒤에 붙을 수 있다.

### 2.2 Curated, not Dumped — 수합보다 선별

확보 가능한 모든 지표를 같은 시각적 우선순위로 노출하지 않는다.

먼저 사용자가 현재 상황을 이해하는 데 중요한 정보를 보여주고, 세부 데이터와 Raw data는 필요할 때 내려갈 수 있도록 한다.

### 2.3 Beginner-friendly Korean — 데이터 초심자 우선

기본 UI에서는 분석 전문용어보다 자연스러운 한국어를 우선한다.

예:

- WoW → 지난주 대비 / 이전 7일 대비
- MoM → 지난달 대비
- Contribution → 전체 증가량 중 ~가 차지한 비중
- Anomaly → 평소와 다른 움직임
- Baseline → 평소 수준 / 비교 기준

전문 용어가 필요한 경우 보조 설명이나 상세 정보에서 제공한다.

### 2.4 Context before Judgment — 평가보다 맥락

증가했다고 자동으로 좋은 것이 아니고 감소했다고 자동으로 나쁜 것이 아니다.

수치의 방향과 수치에 대한 평가는 분리한다.

먼저 기간, 비교 기준, 이벤트 등 해석에 필요한 맥락을 제공하고, 충분한 근거가 있을 때만 Positive / Warning / Critical 같은 평가를 붙인다.

### 2.5 Progressive Disclosure — 단계적으로 보여주기

권장 정보 노출 순서:

1. Signal / Summary
2. Context
3. Evidence
4. Detail
5. Raw data / Metadata

첫 화면에서 모든 세부 정보를 동시에 보여주지 않는다.

### 2.6 Consistent Interpretation — 같은 의미는 같은 표현

같은 의미의 증감률, 기간, 플랫폼, 단위, 상태는 제품 전체에서 같은 시각·언어 규칙으로 표현한다.

### 2.7 Actionable when Supported — 근거가 있을 때 행동으로 연결

충분한 근거가 있다면 Insight를 다음 탐색이나 행동으로 연결한다.

예:
- “Spotify에서 최근 증가 폭이 가장 큽니다.”
- → 증가에 기여한 곡 확인

다만 데이터만으로 인과를 확정할 수 없는 경우 원인을 단정하지 않는다.

## 3. 정보 위계

### L1. Primary Signal
가장 먼저 알아야 하는 현재 값이나 변화.

예:
- 청취자 +18.2%
- 특정 곡 급상승

### L2. Supporting Context
L1을 해석하기 위해 반드시 필요한 정보.

예:
- 지난 28일 대비
- Spotify 기준
- 발매 후 14일

### L3. Evidence
변화를 설명하거나 확인하는 근거.

예:
- 시계열
- 플랫폼별 기여도
- 곡별 변화
- 이벤트 annotation

### L4. Detail
추가 탐색을 위한 세부 breakdown.

예:
- 국가
- 곡
- 플랫폼
- 기간

### L5. Metadata
데이터 자체에 관한 정보.

예:
- 데이터 출처
- 업데이트 시점
- 지표 정의

**주의:** Supporting Context와 Metadata를 단순히 둘 다 작은 회색 텍스트로 처리하지 않는다. 비교 기준처럼 해석에 필수적인 정보는 Meta보다 높은 위계를 가져야 한다.

## 4. Typography 방향

일반 텍스트와 데이터 숫자의 역할을 분리한다.

### Text typography 역할
- Page heading
- Section heading
- Card / module heading
- Body
- Supporting context
- Label
- Meta

### Data typography 역할
- Hero KPI
- Card KPI
- Medium data
- Table data
- Delta

표나 숫자 열처럼 세로 비교가 중요한 곳에서는 tabular numerals 사용을 우선 검토한다.

세부 font-size, weight, line-height, letter-spacing 값은 실제 대시보드 화면 검증 후 확정한다.

## 5. 숫자 표현 원칙

### 5.1 표현이 의미를 바꾸면 안 된다

반올림과 축약은 시각적 표현 방식일 뿐 데이터 자체를 변경하는 규칙이 아니다.

모든 지표에 일괄적으로 반올림 또는 축약을 적용하지 않는다.

향후 각 Metric에는 표시 관련 metadata를 둘 수 있도록 설계한다.

예:
- `unit`
- `precision`
- `canRound`
- `canAbbreviate`
- `comparisonType`

### 5.2 Exact vs Compact

정확한 값이 중요한 경우 Exact value를 유지한다.

Compact notation은 해당 지표가 축약되어도 의미가 훼손되지 않는 경우에만 사용한다.

예:
- 카드: 128만
- Tooltip / 상세: 1,284,392
- Export: 1,284,392

### 5.3 %와 %p 구분

상대 변화율과 퍼센트포인트 변화를 혼용하지 않는다.

- 18% → 21% = +3%p
- 기존 값 대비 상대 증가율은 별도 계산

### 5.4 한국어 숫자 표기

한국어 기본 UI에서 `128만`과 같은 표기와 `1.28M` 같은 글로벌 표기 중 어느 쪽이 실제 사용자에게 더 읽기 쉬운지는 사용자 검증이 필요하다.

초기 원칙:
- 한국어 사용자에게 즉시 읽히는 방식 우선
- 정확값은 상세 화면/Tooltip/Export에서 유지

## 6. 차트 자체보다 Visualization Grammar를 시스템화한다

현재 단계에서 Spotify용 차트, Melon용 차트처럼 완성 차트를 무리하게 컴포넌트화하지 않는다.

실제 DSP 데이터 유형과 업무 질문이 확정되기 전에는 **차트를 구성하는 정보 체계와 문법**을 먼저 시스템화한다.

차트/데이터 모듈에서 고려할 수 있는 Slot:

- title
- description / question
- primary value
- comparison context
- controls
- visualization
- legend
- event / annotation
- interpretation / insight
- action
- source / freshness

모든 Slot이 항상 필요한 것은 아니다.

실제 데이터 유형과 대시보드 차트가 정해진 후, 각 차트가 어떤 Slot을 가져야 하는지 판단해 조립한다.

## 7. 아직 보류하는 것

다음 항목은 DSP 스키마와 실제 수집 데이터를 확인한 뒤 결정한다.

- Data state 상세 정의
- 지표별 정확한 precision
- 지표별 canRound / canAbbreviate
- 기본 비교 기간
- 실제 탭 구조
- 최종 차트 유형
- 이상치 판단 규칙
- 이벤트 효과 분석 UI
- DSP 간 비교 방식

## 8. 참고: Channel Talk Notebook 사례에서 가져온 교훈

채널톡 Notebook 사례의 핵심은 “차트를 컴포넌트화하지 말라”가 아니다.

가져올 핵심 교훈:

1. 디자인 시스템 컴포넌트를 조립하는 것과 실제 정보 밀도를 설계하는 것은 별개의 작업이다.
2. 분석 도구에서는 정보의 순서, 상태, 밀도, 멘탈 모델을 별도로 설계해야 한다.
3. 반복 생성은 자동화할 수 있지만, 차트 유형·색·정보 구조를 정의하는 판단은 제품 맥락을 이해한 사람이 해야 한다.
4. 기능이 동작하는 것과 데이터에 익숙하지 않은 사람이 실제로 쓸 수 있는 것은 다르다.

Reference:
https://tech.channel.io/kr/articles/6e4434b8

## 9. 현재 Decision Status

| 항목 | 상태 |
|---|---|
| Meaning First | Stable |
| Value + Context + Comparison | Stable |
| Beginner-friendly Korean | Stable |
| Progressive Disclosure | Stable |
| Text/Data typography 역할 분리 | Stable |
| Typography 세부 수치 | Proposed |
| 숫자 formatter 중앙화 방향 | Stable |
| Metric별 반올림/축약 허용 | Deferred |
| Visualization Grammar 우선 | Stable |
| Data State | Deferred |
