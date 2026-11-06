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

11. `10-table-and-ranking-system.md`
   - Data Table / Resource Table / Ranking Preview / Comparison Matrix 구분
   - numeric alignment / sort / density / responsive column priority
   - rank change / exact value / artwork row 규칙
   - selection / pagination / wide comparison table 기준

12. `11-insight-and-annotation-system.md`
   - Observation / Comparison / Signal / Interpretation / Recommendation 구분
   - evidence disclosure와 insight→chart linking
   - Alert와 analytical insight 분리
   - annotation copy / contradiction / insufficient evidence 원칙

13. `12-iconography-system.md`
   - Navigation / Action / Status / Data cue / Decorative 역할 분리
   - 12/16/20/24/32px size와 SVG stroke 원칙
   - icon-only 접근성 및 target 규칙
   - System icon / DSP logo / artwork / avatar 구분

14. `13-content-and-microcopy-system.md`
   - 한국어 문체와 분석 카피 원칙
   - 증가/상승/성장, 이전 기간/전월/baseline 용어 구분
   - CTA / Tooltip / Empty / Error / Stale 문장 패턴
   - Proposed metric/entity glossary

15. `14-accessibility-system.md`
   - WCAG 2.2 AA 제품 기준선
   - keyboard / focus / contrast / reflow / reduced motion
   - tooltip / live status / semantic structure
   - chart summary + accessible data table
   - 현재 prototype accessibility audit

16. `15-data-state-system.md`
   - Availability / Freshness / Completeness / Value Origin 분리
   - Loading / Refreshing / Empty / Partial / Stale / Estimated / Error
   - 상태의 page/card/metric/source scope 규칙
   - source coverage가 달라질 때 comparison 재검증 원칙

17. `16-filter-search-date-query-system.md`
   - Query / Filter / Search / Comparison / View / Sort 역할 분리
   - global vs local control scope
   - period preset + exact date + custom range
   - draft/applied multi-filter, active chips, search/no-results
   - query transition과 background refresh 분리

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

`prototype/design-system-lab/table-ranking.html`

Rich music resource table, exact numeric table, ranking preview, rank change, narrow reflow, selection, wide comparison matrix를 검증하는 Table Lab입니다.

`prototype/design-system-lab/insight-annotation.html`

사실·비교·신호·해석·행동의 근거 수준, 근거 펼침, chart linking, contradiction, insufficient evidence, alert와 insight 구분을 검증하는 Insight Lab입니다.

`prototype/design-system-lab/iconography.html`

아이콘 size/stroke, navigation state, icon button target, status, contrast, insight cue, icon-only 접근성을 검증하는 Iconography Lab입니다.

`prototype/design-system-lab/content-microcopy.html`

문체, 비교 기준, 증가/상승/성장 용어, CTA, Tooltip, Empty/Error/Stale 상태, 제품 용어 사전을 검증하는 Content Lab입니다.

`prototype/design-system-lab/accessibility.html`

Keyboard/focus, contrast, tooltip, live status, chart alternative, 320px reflow, manual QA 항목을 검증하는 Accessibility Lab입니다.

`prototype/design-system-lab/data-states.html`

Ready/Loading/Refreshing/Partial/Stale/Error 상태 전환, Empty taxonomy, Estimated, source health, coverage mismatch를 검증하는 Data State Lab입니다.

`prototype/design-system-lab/query-controls.html`

Global query, date preset/custom range, comparison, draft/applied multi-filter, active filter, component search, sort, query-transition을 검증하는 Query Control Lab입니다.

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
- Data State 원칙·시각 문법: **Stable**
- source별 refresh cadence / stale threshold / health aggregation: 실제 DSP 파이프라인 확인 후 **Deferred**
- Query/Filter/Search 역할 구분과 scope 원칙: **Stable**
- 기본 기간 / timezone / URL serialization 구현: 실제 product/data architecture 확인 후 **Deferred**
- 접근성 기준선: **WCAG 2.2 AA / Stable**
- 실제 browser zoom·screen reader·forced-colors QA: **Required before production**

## 작업 원칙

디자인 시스템은 "예쁜 화면을 만드는 규칙"이 아니라, 데이터에 익숙하지 않은 국내 인디 아티스트·레이블·유통사도 데이터를 이해하고 다음 행동을 판단할 수 있게 하는 제품 언어를 만드는 작업으로 본다.

따라서 새로운 화면이나 컴포넌트를 추가할 때는 항상 다음을 확인한다.

1. 사용자가 무엇을 가장 먼저 봐야 하는가?
2. 수치의 의미를 이해하는 데 필요한 맥락이 충분한가?
3. Raw data를 그대로 던지고 있지는 않은가?
4. 전문 분석 용어 없이도 의미가 전달되는가?
5. 같은 의미가 제품 전체에서 같은 방식으로 표현되는가?
