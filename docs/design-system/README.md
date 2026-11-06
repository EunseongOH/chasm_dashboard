# CHASM Dashboard Design System

이 폴더는 CHASM 대시보드의 제품·디자인 의사결정을 팀원이나 이후의 AI 작업 세션에서도 그대로 이어갈 수 있도록 기록하는 공간입니다.

## 문서

1. `00-context-and-principles.md`
   - 제품 맥락과 타깃 사용자
   - 핵심 제품 원칙
   - 정보 위계
   - 숫자 표현 원칙
   - 차트/시각화 문법

2. `01-color-system.md`
   - 컬러 방향
   - 브랜드/무채색 팔레트
   - Semantic color / Data visualization color 분리
   - 토큰 구조
   - SEED / Fluent / Polaris 참고 원칙

3. `02-dashboard-ui-sample.md`
   - 코드 기반 Dashboard UI sample의 목적
   - 음악 데이터 특성을 고려한 정보 구조
   - 실제 화면에서 검증할 컬러·KPI·Insight·Event 규칙
   - Prototype에서 다음 단계로 가져갈 질문

4. `03-brand-assets.md`
   - 공식 CHASM 로고 source of truth
   - 로고 크기·색상·접근성 사용 원칙
   - Prototype/preview에서 로고를 참조하는 방식

5. `04-spacing-and-radius.md`
   - 카드 내부 padding/gap 체계
   - spacing primitive/semantic token
   - radius hierarchy
   - 중첩 rounded surface의 Concentric Radius 원칙

6. `05-typography-and-card-anatomy.md`
   - 한국어 중심 Typography ramp
   - Data typography와 Text typography 분리
   - line-height를 포함한 vertical rhythm
   - KPI / Analysis / Insight / Table card anatomy

7. `06-surface-border-elevation.md`
   - Canvas / Default / Subtle / Floating surface 위계
   - Card border와 shadow 사용 기준
   - nested surface / divider 규칙
   - Tooltip·Popover·Modal elevation 기준

8. `07-layout-and-grid.md`
   - 12-column dashboard grid
   - content max-width / gutter / sidebar mode
   - breakpoint별 reflow 규칙
   - chart / insight / KPI 최소 폭 검증

9. `08-interaction-states-and-controls.md`
   - Default / Hover / Pressed / Focus / Selected / Disabled 상태 체계
   - Button / Tabs / Segmented / Filter Chip / Select 의미 구분
   - Focus ring 및 target-size 접근성 기준
   - keyboard interaction 원칙

10. `09-data-visualization-system.md`
   - 공통 Visualization Grammar와 케이스별 Axis/Scale variant
   - Grid / Legend / Direct Label / Tooltip / Reference 규칙
   - Missing / Estimated / Indexed / Signed delta 표현
   - 음악 이벤트 annotation 및 cross-DSP 비교 원칙

## 코드 프로토타입

`prototype/dashboard-sample/`

- `index.html`
- `styles.css`
- `app.js`

외부 라이브러리 없이 실행 가능한 초기 UI sample입니다. 현재 목적은 제품 코드 확정이 아니라 디자인 시스템과 Visualization Grammar를 실제 데이터 화면 맥락에서 검증하는 것입니다.

### Design System Lab

`prototype/design-system-lab/interaction-controls.html`

Button, Tabs, Segmented control, Filter chip, Focus, Disabled 등 interaction state를 한 화면에서 비교하는 검증용 페이지입니다. VS Code Live Server에서 열어 실제 hover/focus/keyboard 상태를 확인합니다.

`prototype/design-system-lab/data-visualization.html`

Axis/Scale/Legend/Direct label/Missing/Event annotation 등 데이터 시각화 문법을 케이스별로 비교하는 Chart Lab입니다.

## 상태 표기

- **Stable**: 넓게 적용해도 되는 확정 원칙
- **Proposed**: 현재 권장안. 실제 화면 검증 후 확정 필요
- **Deferred**: 데이터 구조·사용자 검증 등 선행 조건 때문에 보류
- **Deprecated**: 신규 작업에서 사용하지 않음

## 현재 상태

- 제품 원칙: **Stable**
- 차트 자체보다 시각화 정보 문법을 먼저 시스템화하는 방향: **Stable**
- Typography의 텍스트/데이터 역할 분리: **Stable**
- 세부 Typography 수치: **Proposed**
- 숫자 표현 원칙: **Stable**
- 지표별 반올림·축약 허용 규칙: 실제 Metric 정의 단계에서 결정
- 컬러 구조: **Stable**
- 컬러 값: **Proposed v0.1**
- Dashboard UI sample: **Proposed v0.1**
- Data State 정의: DSP 스키마/수집 주기 확인 후 **Deferred**

## 작업 원칙

디자인 시스템은 "예쁜 화면을 만드는 규칙"이 아니라, 데이터에 익숙하지 않은 국내 인디 아티스트·레이블·유통사도 데이터를 이해하고 다음 행동을 판단할 수 있게 하는 제품 언어를 만드는 작업으로 본다.

따라서 새로운 화면이나 컴포넌트를 추가할 때는 항상 다음을 확인한다.

1. 사용자가 무엇을 가장 먼저 봐야 하는가?
2. 수치의 의미를 이해하는 데 필요한 맥락이 충분한가?
3. Raw data를 그대로 던지고 있지는 않은가?
4. 전문 분석 용어 없이도 의미가 전달되는가?
5. 같은 의미가 제품 전체에서 같은 방식으로 표현되는가?
