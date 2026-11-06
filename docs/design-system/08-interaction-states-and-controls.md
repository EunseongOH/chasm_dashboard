# CHASM Interaction States & Controls — v0.1

> 상태: Proposed v0.1  
> 목적: Dashboard 전반의 버튼·필터·탭·선택 컨트롤이 같은 상태 언어를 사용하고, 마우스와 키보드 모두에서 현재 상태를 명확히 인지할 수 있도록 한다.

## 1. 참고 시스템에서 가져온 원칙

### SEED

SEED의 Button / Toggle / Pagination 계열은 Enabled, Hover, Focus, Pressed, Selected, Disabled 등을 명시적으로 구분한다.

특히:
- Button은 Space / Enter로 실행
- Toggle/Chip은 Selected와 Unselected를 구분
- Disabled는 상호작용할 수 없음
- Chip 계열은 좌우 방향키 탐색을 지원하는 패턴을 사용

References:
- https://v3.seed-design.io/components/pagination
- https://v0.seed-design.io/component/box-button/usage/
- https://v0.seed-design.io/component/chip-radio-group/usage/

### Microsoft Fluent 2

Fluent는 Focus를 Hover/Pressed와 구분한다.

Focus에서는 단순 색상 변경보다 더 명확한 stroke/focus indicator를 사용하며, 색만으로 상태를 전달하지 않는 것을 권장한다.

Reference:
- https://fluent2.microsoft.design/color

### Shopify Polaris

Polaris는:
- 한 scope 안에서 명확한 Primary action을 제한적으로 사용
- persistent state에는 일반 action button의 pressed 상태를 남용하지 않고 적절한 choice/switch control 사용
- icon-only button에는 accessibility label 제공
- loading / disabled / success / failure 상태를 실제 interaction flow에서 테스트

하도록 안내한다.

References:
- https://shopify.dev/docs/apps/build/app-home/migrate-from-polaris-react/button
- https://shopify.dev/docs/api/app-home/latest/web-components

### WCAG 2.2

CHASM은 최소한:
- keyboard focus가 보일 것
- focus된 요소가 sticky/overlay에 완전히 가려지지 않을 것
- interactive target은 가능한 한 24×24 CSS px 이상일 것

을 기본 접근성 원칙으로 둔다.

CHASM의 기본 control 높이는 40px이므로 target-size 최소 기준보다 여유가 있다.

References:
- https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance
- https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum

---

# 2. State Model

CHASM의 interactive control은 기본적으로 다음 상태를 고려한다.

1. Default
2. Hover
3. Pressed
4. Focus-visible
5. Selected
6. Disabled
7. Loading — action control에서 필요한 경우

모든 컴포넌트가 모든 상태를 가지는 것은 아니다.

예:
- Button: Default / Hover / Pressed / Focus / Disabled / Loading
- Tab: Default / Hover / Focus / Selected / Disabled
- Filter chip: Default / Hover / Pressed / Focus / Selected / Disabled
- Select: Default / Hover / Focus / Disabled
- Segmented item: Default / Hover / Focus / Selected / Disabled

---

# 3. State Meaning

## Default
아직 사용자가 상호작용하지 않은 기본 상태.

## Hover
마우스 pointer가 위에 있음을 알린다.

Hover는:
- 약한 background 변화
- border 강화
- text 강조

정도로 표현한다.

Hover가 elevation을 의미하지는 않는다.

## Pressed
pointer down / activation 순간.

Hover보다 한 단계 더 강한 feedback을 제공하되, persistent selected state처럼 보이지 않아야 한다.

## Focus-visible
키보드 등 비-pointer 입력으로 현재 interaction 위치가 된 상태.

Focus는 Hover/Selected와 반드시 시각적으로 구분한다.

CHASM 기본 focus:

```css
outline: 2px solid #075FBA;
outline-offset: 2px;
```

Focus ring은 component fill 자체를 바꾸기보다 외곽 indicator로 제공한다.

## Selected
현재 선택된 option/view/filter를 의미한다.

Selected는 focus와 별개다.

예:
- Selected tab이 focus를 받지 않았을 수 있음
- 선택되지 않은 tab이 keyboard focus를 받을 수 있음

## Disabled
현재 사용할 수 없음을 의미한다.

Disabled는:
- cursor feedback 제거
- interaction 제거
- explicit disabled colors 사용

을 기본으로 한다.

전체 opacity를 무조건 낮추는 방식은 지양한다.

## Loading
Action이 진행 중이며 중복 실행을 막아야 하는 상태.

Loading은:
- button width를 가능하면 유지
- 중복 activation 방지
- action 완료 후 성공/실패 feedback 제공

한다.

---

# 4. Interaction Tokens

## Focus

```css
--focus-ring-color: #075FBA;
--focus-ring-width: 2px;
--focus-ring-offset: 2px;
```

blue-500 #1393FD는 white 대비가 약 3.17:1이며, blue-50 #F4F9FF 위에서는 약 3.00:1로 경계선에 가깝다.

blue-700 #075FBA는:
- white 대비 약 6.26:1
- canvas #F7F9FC 대비 약 5.93:1
- blue-50 #F4F9FF 대비 약 5.91:1
- inset #F1F4F8 대비 약 5.67:1

으로 현재 light surface들에서 focus indicator로 더 안정적이다.

따라서 CHASM focus ring은 blue-700 #075FBA를 사용한다.

## Neutral Control

Default:
- bg: white
- text: neutral-700
- border: neutral-200

Hover:
- bg: neutral-50
- border: neutral-300

Pressed:
- bg: neutral-100
- border: neutral-300

Disabled:
- bg: neutral-50
- text: neutral-400
- border: neutral-100

## Brand Selected

Selected:
- bg: blue-50
- text: blue-700
- border: blue-200 when boundary is needed

Pressed selected:
- bg: blue-100

## Primary Action

Default:
- bg: blue-700
- text: white

Hover:
- bg: blue-800

Pressed:
- use darker brand tone than hover when available

Focus:
- keep primary fill
- add external focus ring with separation from fill

Disabled:
- neutral disabled treatment
- do not use brand blue at reduced opacity as the only treatment

---

# 5. Control Sizes

CHASM dashboard에서는 두 density만 허용한다.

## Default

```text
height: 40px
horizontal padding: 12–16px
radius: 8px
label: 13px / 18
```

용도:
- page header controls
- main actions
- date range
- select
- standard button

## Compact

```text
height: 32px
horizontal padding: 8–12px
radius: 8px
label: 12–13px
```

용도:
- chart local controls
- segmented control
- table toolbars
- filter chips

32px보다 작은 interactive control을 기본 dashboard UI에 새로 만들지 않는다.

Icon-only control의 visual icon은 작아도 clickable target은 최소 32px, 기본은 40px을 유지한다.

---

# 6. Button Hierarchy

## Primary Button

현재 scope의 가장 중요한 실행 action.

예:
- 데이터 연결
- 저장
- 리포트 생성

한 card/header scope 안에서 Primary button이 여러 개 경쟁하지 않게 한다.

## Secondary Button

일반 실행 action.

예:
- 내보내기
- 설정 열기
- 비교 추가

Default dashboard control의 대부분은 Secondary에 해당한다.

## Tertiary / Text Action

낮은 위계의 보조 action.

예:
- 전체 곡 보기
- 근거 보기
- 자세히 보기

단순 text action을 bordered button으로 과도하게 승격하지 않는다.

## Critical

삭제·연결 해제 등 되돌리기 어렵거나 파괴적인 action에서만 사용한다.

빨간색을 일반 경고나 감소 지표와 공유하지 않는다.

---

# 7. Icon Button

기본:
- 40×40
- icon 16–20px
- R8

Compact:
- 32×32

규칙:
- icon-only이면 반드시 accessible name 제공
- icon 모양만으로 action 의미가 불명확하면 tooltip 제공
- decorative icon과 interactive icon을 혼동하지 않는다

---

# 8. Tabs vs Segmented Control

## Tabs

서로 다른 view / section을 이동한다.

예:
- 전체
- 음원
- 오디언스
- 콘텐츠

특성:
- navigation semantics
- selected tab = 현재 view
- 보통 underline 또는 label emphasis 사용
- 서로 다른 콘텐츠 영역으로 전환

## Segmented Control

같은 데이터/콘텐츠의 표현 mode를 전환한다.

예:
- 일간 / 주간
- 스트리밍 / 청취자
- 절대값 / 변화율

특성:
- small mutually exclusive options
- 같은 문맥에서 mode만 바뀜
- 2–4개 정도를 기본으로 함

Tabs와 Segmented를 외형만 보고 바꿔 쓰지 않는다.

---

> Filter/Search/Date/Query의 제품 의미·scope·적용 방식은 `16-filter-search-date-query-system.md`를 따른다. 이 문서는 개별 control의 interaction state를 정의한다.

# 9. Filter Chip

Filter chip은 현재 data subset을 변경한다.

예:
- Spotify
- YouTube Music
- 최근 발매
- 국내 / 해외

Single-select 또는 multi-select 여부를 데이터 구조에서 명확히 정의한다.

Selected:
- blue-50 fill
- blue-700 label
- 필요한 경우 check/selected marker

색만으로 selected를 전달하지 않는다.

많은 필터가 필요한 경우 chip을 끝없이 나열하지 않고 Filter button + Popover를 고려한다.

---

# 10. Select vs Menu

## Select
하나의 값/option을 선택해 현재 상태를 바꾼다.

예:
- 최근 30일 / 최근 3개월
- 아티스트
- 비교 기준

## Menu
action 목록을 제공한다.

예:
- CSV 다운로드
- 링크 복사
- 설정 열기

Menu item을 Select option처럼 지속 상태로 오용하지 않는다.

---

# 11. Date Range

Date range는 CHASM 분석에서 중요한 context다.

기본 control:
- height 40px
- date text
- optional calendar icon
- secondary control treatment

표시:
```text
2026. 8. 1. – 10. 31.
```

기간 preset과 custom range는 역할을 분리한다.

예:
- Select: 최근 30일 / 최근 3개월
- Date range: 실제 적용 날짜

두 값이 동시에 보일 경우 서로 모순되지 않도록 한다.

---

# 12. Focus Rule

모든 keyboard-focusable custom control에:

```css
:focus-visible {
  outline: 2px solid var(--focus-ring-color);
  outline-offset: 2px;
}
```

를 기본으로 사용한다.

중요:
- focus ring을 box-shadow만으로 구현하지 않는다
- selected border를 focus indicator로 대신하지 않는다
- focus를 outline: none으로 제거하지 않는다
- sticky header / popover 때문에 focused element가 완전히 가려지지 않게 한다

---

# 13. Keyboard Interaction

## Button
- Enter / Space: activate

## Tabs
- Tab: tablist 진입
- Arrow Left/Right: tab 이동
- Enter/Space 또는 automatic activation 정책에 따라 selection

CHASM은 초기에는 explicit activation을 권장한다.
데이터 로딩이 필요한 tab에서 arrow 이동만으로 요청이 연속 발생하는 것을 막기 쉽다.

## Segmented / Radio-like group
- Arrow Left/Right: option 이동
- Space: 선택

## Filter chip
- Tab: chip 이동
- Space / Enter: toggle

## Menu
- Trigger Enter/Space: open
- Arrow keys: item 이동
- Esc: close
- close 후 focus를 trigger로 반환

---

# 14. Disabled vs Unavailable

가능하면 단순히 disabled control만 남기지 말고 사용 불가 이유를 알 수 있게 한다.

예:
- tooltip
- helper text
- prerequisite message

특히 사용자가 “왜 클릭이 안 되는지” 추측해야 하는 상태를 피한다.

---

# 15. Current Prototype Mapping

현재 sample에 적용:

### Period Select
- Secondary/default control
- Hover / Pressed / Focus / Disabled tokens 적용

### Date Range
- Secondary button-like control
- 40px height
- Focus-visible 적용

### Export Icon Button
- 40×40
- accessible label 유지
- Focus-visible 적용

### Segmented 일간/주간
- Compact control
- outer inset surface
- selected = blue-50/blue-700
- focus = independent 2px ring
- JS에서 aria-pressed 동기화

### Text Actions
- low hierarchy
- Hover underline/color
- Focus-visible ring

### Insight Rows
- interactive row
- Hover = subtle surface
- Pressed = inset surface
- Focus-visible ring
- elevation 없음

---

# 16. State Matrix

| Component | Hover | Pressed | Focus | Selected | Disabled | Loading |
|---|---|---|---|---|---|---|
| Primary button | O | O | O | - | O | O |
| Secondary button | O | O | O | - | O | O |
| Icon button | O | O | O | optional | O | O |
| Tab | O | - | O | O | O | - |
| Segmented item | O | O | O | O | O | - |
| Filter chip | O | O | O | O | O | - |
| Select | O | O | O | value | O | optional |
| Insight row | O | O | O | optional | O | - |

---

# 17. Do / Don't

Do:
- Focus와 Selected를 별개 상태로 표현
- target area는 visual icon보다 크게 확보
- action과 persistent setting에 맞는 control 선택
- keyboard path를 함께 설계
- disabled 이유를 가능하면 설명

Don't:
- hover = selected
- selected = focus
- 모든 action을 primary button으로 표현
- icon-only action에 accessible label 생략
- opacity만 낮춰 disabled 처리
- outline: none
- 일반 button을 toggle state 저장용으로 남용

---

# 18. Decision Status

| 결정 | 상태 |
|---|---|
| State model 분리 | Stable |
| Focus와 Selected 분리 | Stable |
| 2px blue-700 focus ring | Proposed, contrast 기준 1차 검증 |
| Default control height 40px | Proposed |
| Compact control height 32px | Proposed |
| Icon-only minimum target 32px, default 40px | Proposed |
| Primary/Secondary/Tertiary/Critical hierarchy | Stable |
| Tabs vs Segmented 의미 분리 | Stable |
| Select vs Menu 의미 분리 | Stable |
| Disabled에 explicit color 사용 | Proposed |
| Keyboard interaction 원칙 | Stable |
