# CHASM Iconography System — v0.1

> 상태: Proposed v0.1  
> 목적: 아이콘을 장식이 아니라 의미·상태·행동을 보조하는 제품 언어로 사용하고, 크기·stroke·색상·상태·접근성을 제품 전체에서 일관되게 유지한다.

---

# 0. Core Principle

CHASM에서 아이콘은 정보를 더 빠르게 찾고 행동 결과를 예측하게 하는 **보조 언어**다.

기본 원칙:

```text
Icon supports meaning.
Icon does not replace meaning by default.
```

특히 데이터 초심자를 대상으로 하므로:

- 익숙하지 않은 개념을 아이콘 하나로만 전달하지 않는다.
- 단순 장식을 위해 각 카드 제목마다 아이콘을 붙이지 않는다.
- 같은 의미에는 항상 같은 아이콘을 사용한다.
- Emoji / Unicode symbol / 서로 다른 icon family를 섞지 않는다.

---

# 1. 참고 디자인 시스템에서 가져온 원칙

## Microsoft Fluent 2

Fluent는 System Icon을 UI 내부의 navigation, command, status에 사용한다.

Regular:
- 기본 wayfinding
- 사용 가능한 action
- 일반 navigation

Filled:
- selected state
- 작은 크기에서 더 강한 가독성이 필요한 경우

또한 12px icon은 정보 보조에는 사용할 수 있지만 interaction에는 너무 작다고 명시한다.

Icon color는 가능하면 단색을 유지하고, 색상을 지나치게 추가하지 않는다.

Reference:
- https://fluent2.microsoft.design/iconography

## SEED

SEED Action Button은:
- text + icon
- icon only

layout을 구분한다.

icon-only는 아이콘만으로 의미를 전달하기 때문에 접근성이 낮으며, 꼭 필요한 경우에만 접근성 label과 함께 사용하는 것을 권장한다.

SEED의 현재 Button specification에서는 대략:
- compact icon: 14–16px
- medium icon: 16–18px
- large icon: 22px

수준을 사용한다.

Reference:
- https://v3.seed-design.io/components/action-button
- https://v3.seed-design.io/components/contextual-floating-button

## Shopify Polaris

Polaris는 icon을:
- action outcome 보조
- technical concept 설명
- status 표시

에 사용하며 순수 장식은 지양한다.

icon-only action에는 accessibility label이 필요하고, 같은 action에는 제품 전반에서 같은 icon을 사용해야 한다.

Reference:
- https://shopify.dev/docs/apps/design/visual-design
- https://shopify.dev/docs/api/customer-account-ui-extensions/latest/web-components/media-and-visuals/icon

## Accessibility

Fluent Accessibility guidance는 interactive/non-text component도 인접 색상 대비 약 3:1 이상을 확보하도록 권장한다.

현재 CHASM light surface 기준 대비:

| Color | White 대비 | Canvas #F7F9FC 대비 | 용도 |
|---|---:|---:|---|
| neutral-400 #AAB4C0 | 약 2.10:1 | 약 1.99:1 | decorative only |
| neutral-500 #7C8796 | 약 3.64:1 | 약 3.45:1 | low-priority informative |
| neutral-600 #5E6978 | 약 5.57:1 | 약 5.28:1 | default functional icon |
| neutral-700 #46515F | 약 8.07:1 | 약 7.65:1 | strong action/status |
| blue-500 #1393FD | 약 3.17:1 | 약 3.01:1 | vivid accent |
| blue-700 #075FBA | 약 6.26:1 | 약 5.93:1 | selected/action |

Reference:
- https://fluent2.microsoft.design/accessibility

---

# 2. Icon Roles

모든 아이콘은 다음 역할 중 하나로 분류한다.

## 2.1 Navigation

페이지/섹션의 목적을 빠르게 식별.

예:
- Dashboard
- Music
- Audience
- Content
- Event
- Report
- Settings

규칙:
- label과 함께 사용
- icon rail에서는 visible text가 없어도 accessible name 유지
- 동일 depth에서는 동일 size/weight

---

## 2.2 Action

사용자가 실행할 행동을 보조.

예:
- export
- download
- add
- edit
- more
- close
- search

규칙:
- text button에서는 action label이 우선
- icon-only는 의미가 매우 익숙하거나 공간이 제한된 경우만
- icon-only에는 `aria-label` 필수

---

## 2.3 Direction / Disclosure

정보의 이동/펼침/정렬을 보조.

예:
- chevron down
- arrow right
- sort ascending
- disclosure

규칙:
- 자체 의미보다 control state를 보조
- decorative이면 screen reader에서 숨김

---

## 2.4 Status

시스템 또는 데이터 상태를 표현.

예:
- info
- warning
- error
- success
- unavailable

규칙:
- status icon만으로 의미 전달 금지
- text label/message 동반
- semantic color는 실제 status 의미가 있을 때만

---

## 2.5 Data / Analytical Cue

데이터 유형이나 insight type을 빠르게 구분.

예:
- trend
- event
- track
- audience

규칙:
- 데이터 값 자체를 icon으로 표현하지 않음
- 분석 의미보다 먼저 보이지 않게 낮은 visual weight 유지
- 같은 insight type에 일관된 icon

---

## 2.6 Decorative

의미 없는 시각 장식.

규칙:
- 최소화
- `aria-hidden="true"`
- functional contrast requirement를 적용할 필요 없음
- 의미 있는 아이콘과 혼동될 형태는 피함

---

# 3. Icon Family Strategy

현재 prototype은 외부 package dependency를 두지 않는다.

따라서 v0.1에서는:

```text
one internal SVG style
+ shared size/stroke tokens
```

을 사용한다.

중요:
- Unicode glyph (⌂ ♪ ◉ ▣ ⚙ ⇩ 등)를 production UI icon으로 사용하지 않는다.
- Emoji 사용 금지.
- icon font 사용 지양.
- 서로 다른 icon libraries를 섞지 않는다.

향후 실제 프론트엔드 stack 확정 후:
- Fluent System Icons
- 또는 다른 단일 SVG icon library

도입 여부를 검토한다.

Fluent System Icons는 Regular / Filled theme가 명시적이라는 점에서 현재 CHASM state model과 잘 맞는 후보지만, 최종 library adoption은 Proposed다.

---

# 4. Style

CHASM System Icon 기본 스타일:

```text
Outline / Regular
Rounded joins/caps
Single color
Simple geometry
```

초기 stroke:

```text
1.75px at 20px canvas
```

허용 range:
- 16px icon: 1.5–1.75px
- 20px icon: 1.75px
- 24px icon: 1.75–2px

매 size마다 기계적으로 같은 stroke만 scale하지 않고 optical weight를 확인한다.

---

# 5. Regular vs Filled

## Regular — 기본

사용:
- navigation unselected
- action
- disclosure
- standard information

## Filled — 제한

사용:
- selected navigation
- selected toggle 상태에서 identity를 강화해야 할 때
- 매우 작은 상태 marker에서 Regular가 흐릿할 때

하지 않는 것:
- hover 때 filled로 변경
- 모든 selected control에 filled icon 강제
- Filled를 “더 중요한 기능”이라는 이유만으로 남용

Selected는 이미 fill/background/text color로도 전달할 수 있으므로 Filled는 보조 수단이다.

---

# 6. Size Scale

CHASM icon primitive:

| Token | Size | 용도 |
|---|---:|---|
| icon-xs | 12px | non-interactive metadata only |
| icon-sm | 16px | compact action / inline / status |
| icon-md | 20px | default navigation/action |
| icon-lg | 24px | emphasized navigation / empty state support |
| icon-xl | 32px | rare illustration-like cue |

기본:
```text
20px
```

을 가장 흔한 system icon size로 둔다.

---

# 7. Component Mapping

## Sidebar navigation

```text
Icon: 20px
Target row: 42–48px
Gap icon-label: 10px
```

Icon rail에서도 icon 자체를 24px 이상으로 무작정 키우지 않는다.
Target 영역을 크게 유지한다.

## Default Button

```text
40px button
Icon: 16px
Gap: 8px
```

## Compact Button

```text
32px button
Icon: 16px
Gap: 6px
```

## Icon-only Button

Default:
```text
Target: 40×40
Icon: 18–20px
```

Compact:
```text
Target: 32×32
Icon: 16px
```

## Inline text

Body 14px:
```text
Icon: 16px
```

Meta 12px:
```text
Icon: 12–14px
```

단 12px icon은 interaction에 사용하지 않는다.

## Insight

```text
Visual container: 28–32px
Icon glyph: 16px
```

Container 자체가 clickable target이라는 뜻은 아니다.

---

# 8. Icon Target vs Glyph

```text
Icon size != Hit target size
```

예:

```text
18px download icon
inside
40×40 icon button
```

아이콘을 크게 만들어 접근성을 해결하지 않는다.

target size는 Interaction System을 따른다.

---

# 9. Optical Alignment

Icon box와 실제 path는 다르다.

따라서 단순 CSS center만으로 항상 시각적 center가 맞는다고 가정하지 않는다.

검증할 것:
- chevron이 baseline보다 아래로 처져 보이지 않는가?
- play/arrow처럼 비대칭 icon이 optical center에서 벗어나지 않는가?
- text와 함께 있을 때 cap-height와 균형이 맞는가?

필요 시 icon asset 자체의 viewBox에서 optical correction을 한다.

개별 component에 `top: 1px` 같은 보정값을 반복하지 않는다.

---

# 10. Icon + Text

기본적으로 text와 함께 있는 icon은:

```text
Icon → Label
```

순서.

예:
- 내보내기
- 설정
- 데이터 업로드

Icon은 label보다 시각적으로 강하지 않게 한다.

기본 color:
```text
icon = currentColor
```

즉 text와 같은 semantic color를 상속한다.

---

# 11. Prefix vs Suffix

## Prefix icon

행동/대상의 종류를 설명.

예:
```text
[download] 내보내기
[plus] 비교 추가
```

## Suffix icon

방향/추가 interaction을 설명.

예:
```text
아티스트 선택 [chevron-down]
근거 보기 [arrow-right]
```

한 control에 prefix + suffix를 둘 다 넣는 것은 특별한 이유가 없으면 피한다.

---

# 12. Icon-only Usage

허용하기 쉬운 familiar action:
- close
- search
- overflow
- previous/next
- download/export when surrounding context is clear

주의가 필요한 action:
- 데이터 연결
- 비교 추가
- insight 해석
- AI recommendation
- 복잡한 music analytics concept

이 경우 visible label을 우선한다.

Tooltip은 accessible name을 대체하지 않는다.

---

# 13. Color

## Default functional

```text
neutral-600 #5E6978
```

## Strong / Hover

```text
neutral-700 #46515F
```

## Selected / Brand action

```text
blue-700 #075FBA
```

## Low-priority metadata

```text
neutral-500 #7C8796
```

기능 아이콘의 최소선으로 사용 가능하지만 작은 아이콘에서는 optical validation 필요.

## Decorative

neutral-400 가능.

## Vivid blue

blue-500 #1393FD는 white/canvas에서 약 3:1이므로 큰/명확한 graphic accent에는 쓸 수 있지만 아주 얇은 16px action icon의 기본색으로는 blue-700을 우선한다.

---

# 14. Semantic Status Color

Status icon color는 실제 status 의미와 연결한다.

예:
- success → positive semantic
- warning → warning semantic
- error → critical semantic
- info → info semantic

하지 않는 것:
- 증가 arrow = success green
- 감소 arrow = critical red
- 높은 rank = success
- 낮은 rank = error

```text
Metric direction != system status
```

---

# 15. Navigation

## Unselected

- Regular icon
- neutral-600
- label neutral-700

## Hover

- Regular icon 유지
- color/background state만 변화

## Selected

기본:
- blue-700 icon + label
- blue-50 background

Filled icon variant는 library를 채택했을 때 보조적으로 검증.

현재 prototype에서는 selection을 color/background로 충분히 전달하므로 Regular icon을 유지한다.

---

# 16. Data Visualization Icons

Chart 내부에 UI icon을 과도하게 넣지 않는다.

허용:
- tooltip action
- annotation category marker
- chart toolbar

금지/지양:
- 각 data point마다 icon
- platform마다 logo를 line marker로 사용
- 증가/감소 point마다 arrow icon

차트 자체의 visual encoding을 우선한다.

---

# 17. DSP / Brand Logos vs System Icons

Spotify / YouTube / Apple / Melon logo는 System Icon이 아니다.

구분:
- System icon → action/navigation/status
- Brand logo → entity identity

브랜드 로고:
- 임의 recolor 금지
- monochrome system icon처럼 변형하지 않음
- chart series identity를 브랜드 로고 하나에 의존하지 않음

---

# 18. Artwork / Avatar vs Icon

Album artwork와 artist avatar는 icon이 아니다.

아이콘 규칙을 그대로 적용하지 않는다.

예:
- artwork 36px
- nav icon 20px

가 같은 row에 있어도 동일한 visual primitive가 아니다.

---

# 19. Information Icon

`i` 문자 자체를 버튼 glyph로 사용하지 않는다.

기본:
- circle-info SVG
- 16px glyph
- 최소 24px target
- default functional color

Tooltip trigger는:
- hover
- keyboard focus

모두 지원한다.

---

# 20. Arrow Vocabulary

Arrow icon 의미를 통일한다.

## Arrow right
navigation / next destination.

예:
- 전체 곡 보기 →
- 근거 화면으로 이동

## Chevron right
hierarchical disclosure/navigation.

## Chevron down
menu/select/disclosure open direction.

## Trend arrow up/down
metric direction only.

Trend arrow는 navigation arrow와 동일 icon asset을 회전시켜 대충 사용하지 않는다.
역할이 다르면 semantic icon name도 분리한다.

---

# 21. Sort Icons

Unsorted:
- 기본적으로 icon 숨김 또는 매우 낮은 affordance
- hover/focus에서 reveal 가능

Sorted:
- ascending / descending icon persistent

Sort direction과 metric direction arrow는 같은 시각 family라도 context가 명확히 구분되어야 한다.

---

# 22. Status Icon + Text

좋음:

```text
[warning] Spotify 데이터 갱신 지연
```

나쁨:

```text
[warning]
```

만 단독 사용.

상태 메시지에서 icon은 scanning aid다.

---

# 23. Icon Containers

모든 아이콘에 colored square/circle background를 주지 않는다.

Container를 허용:
- insight cue
- summary cue
- avatar-like categorical marker
- icon button 자체

일반 navigation/action icon은 container 없이 사용.

```text
icon container != default icon style
```

---

# 24. Card Heading Icons

기본적으로 Card heading 앞에 icon을 넣지 않는다.

CHASM은:
- typography
- section kicker
- hierarchy

로 card 성격을 구분한다.

아이콘 heading 허용:
- 상태가 특별히 중요
- 특정 empty/error/onboarding surface
- insight type 구분이 실제로 도움이 됨

Dashboard 모든 카드에 아이콘을 붙여 decorative noise를 만들지 않는다.

---

# 25. Accessible Name

## Icon with visible text

SVG:
```html
<svg aria-hidden="true">...</svg>
<span>내보내기</span>
```

visible label이 accessible name을 제공한다.

## Icon-only

```html
<button aria-label="내보내기">
  <svg aria-hidden="true">...</svg>
</button>
```

SVG 자체에 중복 title을 넣어 이름이 두 번 읽히지 않게 한다.

## Meaningful standalone icon

상황에 따라:
- accessible text
- role="img" + label

사용.

하지만 가능하면 visible text를 제공한다.

---

# 26. Tooltip

Tooltip이 필요한 경우:
- icon-only 의미가 주변 context만으로 충분하지 않음
- 전문 용어 보조
- disabled reason

Tooltip은:
- mouse hover
- keyboard focus

둘 다 지원.

Tooltip은 `aria-label` 대체물이 아니다.

---

# 27. Icon Naming

Asset/Component name은 모양보다 semantic usage가 명확해야 한다.

Base icon library에서는 literal name을 유지할 수 있다.

예:
```text
home
music-note
users
calendar
download
settings
chevron-down
info
```

제품 mapping은 별도 semantic alias를 둘 수 있다.

예:
```text
nav.dashboard → home
nav.music → music-note
nav.audience → users
action.export → download
action.settings → settings
```

이렇게 해야 나중에 asset을 바꿔도 제품 의미는 유지된다.

---

# 28. Semantic Icon Aliases — Proposed

```text
nav.dashboard
nav.music
nav.audience
nav.content
nav.events
nav.reports
nav.settings
nav.upload

action.export
action.add
action.more
action.close
action.search

disclosure.down
disclosure.right

status.info
status.warning
status.error
status.success

data.trend
data.track
data.event
data.audience
```

---

# 29. SVG Implementation

Prototype에서는 inline SVG를 사용한다.

기본:

```html
<svg
  class="ui-icon"
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  ...
</svg>
```

CSS:

```css
.ui-icon {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.75;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

장점:
- currentColor
- crisp scaling
- accessibility control
- external font dependency 없음

---

# 30. Motion

아이콘 자체의 decorative animation은 기본 사용하지 않는다.

허용:
- chevron disclosure rotation
- loading spinner
- progress state

Transition:
- 120–180ms 정도의 짧은 state transition 후보

Motion System을 별도로 구축하기 전까지 복잡한 morph animation은 사용하지 않는다.

---

# 31. Do / Don't

## Do
- 하나의 icon style 유지
- label과 함께 사용
- same meaning = same icon
- target과 glyph size 분리
- default functional icon은 충분한 contrast 확보
- currentColor 사용
- icon role을 문서화

## Don't
- Emoji/Unicode glyph로 production icon 대체
- 서로 다른 icon family 혼합
- 모든 카드 제목에 decorative icon 추가
- icon color로 metric evaluation 전달
- 작은 아이콘을 억지로 interaction target으로 사용
- tooltip만으로 accessible name 제공
- Spotify logo와 system icon을 같은 방식으로 스타일링

---

# 32. Prototype Cleanup

현재 dashboard prototype에서 다음 temporary glyph를 SVG icon으로 교체한다.

- ⌂ Dashboard
- ♪ Music
- ◉ Audience
- ▣ Content
- □ Events
- ≡ Reports
- ⇧ Upload
- ⚙ Settings
- ⇩ Export
- ⌄ Artist switcher
- i KPI info

Summary/Insight의 ✦, ↗, ◎ 등은 의미 역할 검증 후:
- semantic SVG icon으로 교체하거나
- decorative이면 aria-hidden 처리

한다.

---

# 33. Validation Cases

Iconography Lab에서 최소 다음을 검증한다.

1. 16 / 20 / 24px optical weight
2. regular navigation icons
3. selected navigation
4. 40px icon-only button
5. 32px compact icon button
6. icon + label
7. prefix vs suffix
8. info tooltip
9. status icon + text
10. insight icon container
11. 12px non-interactive icon
12. disabled icon
13. low contrast decorative vs functional icon
14. icon rail
15. long Korean label alignment

---

# 34. Decision Status

| 결정 | 상태 |
|---|---|
| Icon은 meaning-supporting language | Stable |
| Unicode/Emoji production icon 금지 | Stable |
| 한 icon family/style만 사용 | Stable |
| Regular outline 기본 | Stable |
| Filled는 selected/special case 제한 | Proposed |
| 12 / 16 / 20 / 24 / 32 size scale | Proposed |
| Default system icon 20px | Proposed |
| Default button icon 16px | Proposed |
| Icon-only target 40px, compact 32px | Stable via Interaction System |
| Default functional color neutral-600 | Proposed / contrast 검증 완료 |
| Selected/action blue-700 | Proposed / contrast 검증 완료 |
| Card heading decorative icon 기본 금지 | Stable |
| System icon vs brand logo 분리 | Stable |
| currentColor inline SVG pattern | Stable for prototype |
| Final external icon library | Deferred |
