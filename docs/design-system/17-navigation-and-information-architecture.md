# CHASM Navigation & Information Architecture System — v0.1

> 상태: Stable navigation principles + Proposed IA  
> 목적: 사용자가 **현재 어떤 아티스트의 어느 영역을 보고 있는지**, 다음에 어디로 이동할 수 있는지, 상세 화면에서 어떻게 상위 맥락으로 돌아가는지를 일관되게 이해하도록 한다.
>
> 실제 route path, 권한별 메뉴, account/workspace 구조, 모바일 제품 범위는 개발 아키텍처와 사용자 검증 전까지 Deferred다.

---

# 0. Core Model

CHASM navigation은 다음 네 층을 구분한다.

```text
Product
→ Artist Context
→ Primary Section
→ Page / Detail
```

예:

```text
CHASM
→ 샘플 아티스트
→ 음원 성과
→ 곡 상세 / 늦은 여름
```

이 네 층을 하나의 메뉴 트리로 끝없이 중첩하지 않는다.

---

# 1. External References

## Fluent 2 — Nav

Fluent Nav는 앱의 주요 영역을 이동하는 high-level wayfinding이다.

핵심:
- 짧고 명확한 label
- 쉽게 scan
- 사용자 목표 중심
- 한 단계 nesting
- 더 깊은 hierarchy는 별도 구조 사용

Reference:
- https://fluent2.microsoft.design/components/web/react/core/nav/usage/

## Fluent 2 — Breadcrumb

Breadcrumb는 복잡한 앱/site에서 hierarchy와 상위 위치를 이해하게 하는 secondary navigation이다.

Breadcrumb만 단독 navigation으로 쓰지 않고 sidebar/top navigation과 함께 사용한다.

Reference:
- https://fluent2.microsoft.design/components/web/react/core/breadcrumb/usage

## Carbon — UI Shell / Side Navigation

Carbon UI Shell은 제품의 공통 navigation framework를 제공한다.

Side nav:
- secondary navigation 역할
- 한 단계 nested navigation 권장
- 세 번째 tier가 필요하면 page tabs 등으로 해결
- current page는 aria-current="page"

좁은 화면에서는 persistent side nav를 collapsed/mobile menu로 전환한다.

References:
- https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-left-panel/guidelines
- https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-left-panel/accessibility
- https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-header/guidelines

## Carbon — Breadcrumb

Breadcrumb는 hierarchy가 2단계를 넘어가는 상세 구조에서 효과적이다.

상단 navigation 아래, page title 위에 배치한다.

Reference:
- https://www.carbondesignsystem.com/building-blocks/core/components/breadcrumb/guidelines

---

# 2. CHASM IA Candidate

현재 제품 이해 기준의 L1 IA 후보:

```text
대시보드
음원 성과
오디언스
콘텐츠
이벤트
리포트
```

Utilities:

```text
데이터 연결/업로드
설정
```

상태:
**Proposed**

이 명칭/순서는 실제 사용자 task frequency와 MVP 기능 범위를 보고 조정할 수 있다.

---

# 3. Why This IA

CHASM의 핵심 사용자 질문을 제품 영역으로 나눈다.

## 대시보드

```text
지금 가장 먼저 봐야 할 변화가 무엇인가?
```

Cross-domain overview.

## 음원 성과

```text
곡과 플랫폼에서 어떤 청취 변화가 있었나?
```

## 오디언스

```text
누가 듣고 있고 관계가 어떻게 변하고 있나?
```

실제 DSP/SNS entity definition 확인 필요.

## 콘텐츠

```text
콘텐츠 활동과 반응을 어떻게 확인할까?
```

## 이벤트

```text
발매·공연·프로모션 활동과 데이터 변화를 어떤 시간 흐름으로 볼까?
```

## 리포트

```text
분석 결과를 저장·정리·공유하려면?
```

실제 MVP scope 확인 필요.

---

# 4. Artist Context Is Not Navigation

Artist switcher는 다른 기능 페이지로 이동하는 nav가 아니다.

```text
Navigation = 어디를 보는가
Artist Context = 누구의 데이터를 보는가
```

따라서 sidebar에서 시각적으로 primary nav와 분리한다.

---

# 5. Artist Switch Rules

아티스트를 전환하면 가능한 경우 현재 section을 유지한다.

예:

```text
아티스트 A / 음원 성과
→ 아티스트 B 선택
→ 아티스트 B / 음원 성과
```

단 현재 detail entity가 새 artist에 존재하지 않으면:

```text
곡 상세 / A의 늦은 여름
→ B로 전환
→ 음원 성과 landing
```

처럼 가장 가까운 valid parent로 이동한다.

---

# 6. Artist Switch and Query State

아티스트 변경 시 무조건 모든 상태를 보존하지 않는다.

Preserve candidate:
- current L1 section
- period preset
- comparison mode

Reset candidate:
- selected track
- track-local filter
- entity search
- artist-specific event selection

실제 persistence rule은 route/data architecture 이후 확정한다.

---

# 7. Artist Switch Transition

중요:

```text
New artist label + Old artist data = 금지
```

Query System의 원칙과 동일하다.

아티스트 변경 중:
- 기존 artist context 유지 + loading
또는
- context/result 함께 commit

한다.

---

# 8. Primary Navigation

Primary nav는 현재 제품의 가장 중요한 분석 영역만 포함한다.

원칙:
- 5–7개 수준을 초기 목표로 유지
- 짧은 명사 중심
- 같은 abstraction level
- feature와 task label을 무작위 혼합하지 않음
- utility action을 primary analysis nav와 섞지 않음

---

# 9. Primary Navigation Label

현재 후보:

좋음:
- 대시보드
- 음원 성과
- 오디언스
- 콘텐츠
- 이벤트
- 리포트

피함:
- 음원 데이터를 확인해보세요
- 팬 관리 및 인사이트
- 콘텐츠 관리 시스템

Nav label은 페이지 title보다 짧게 유지할 수 있다.

---

# 10. Current Location

현재 L1 destination은:
- selected background
- stronger text/icon
- `aria-current="page"`

를 사용한다.

Hover / Focus / Current를 구분한다.

```text
Current != Focus
```

---

# 11. Sidebar Grouping

Full sidebar anatomy:

```text
CHASM brand

Artist Context

Primary Navigation
- 대시보드
- 음원 성과
- 오디언스
- 콘텐츠
- 이벤트
- 리포트

Utility Navigation
- 데이터 연결/업로드
- 설정
```

Primary와 Utility 사이에는 spacing/divider로 hierarchy를 분리한다.

---

# 12. Avoid Deep Side Navigation

CHASM sidebar는 기본적으로 L1 navigation을 담당한다.

Nested nav가 필요한 경우에도 **한 단계까지만** 허용한다.

예:

가능:
```text
설정
  데이터 연결
  계정
```

피함:
```text
음원 성과
  곡
    상세
      플랫폼
```

더 깊은 분석 hierarchy는 page tabs / drill-down / breadcrumb로 해결한다.

---

# 13. Page Tabs

Tabs는 같은 L1 page 안의 관련 view를 전환할 때 사용한다.

예 후보:

```text
음원 성과
[전체] [곡] [플랫폼]
```

또는:

```text
오디언스
[개요] [플랫폼별]
```

실제 tab 구조는 real data use case 확인 후 결정.

---

# 14. Tabs Are Not Sidebar

Sidebar:
- 다른 major product section

Tabs:
- 같은 page context 안의 related view

예:

```text
음원 성과 → 오디언스
= Sidebar navigation

음원 성과 / 전체 → 곡
= Page tab
```

---

# 15. Tabs Are Not Filters

```text
곡 / 플랫폼
```

이 서로 다른 정보 view라면 Tab.

```text
Spotify / Apple Music
```

이 같은 chart의 data subset이라면 Filter.

Control semantics는 Interaction/Query System을 따른다.

---

# 16. Drill-down

Detail page는 사용자가 overview에서 특정 entity를 더 깊게 볼 때 사용한다.

예:

```text
음원 성과
→ 곡 〈늦은 여름〉
```

```text
이벤트
→ 2026. 10. 12. 단독 공연
```

---

# 17. Drill-down Trigger

Clickable row/card에 별도의 의미가 있어야 한다.

좋음:
- 곡 제목 link
- 명확한 “곡 상세 보기”
- table row가 실제 selectable/navigation resource pattern일 때

피함:
- 카드 어디를 눌러도 뜻밖에 상세로 이동
- hover만 보고 클릭 가능성을 추측
- 분석 control click과 row navigation 충돌

---

# 18. Breadcrumb Use

Breadcrumb는 모든 top-level page에 사용하지 않는다.

## No breadcrumb

```text
대시보드
음원 성과
오디언스
콘텐츠
이벤트
```

Sidebar + page title로 위치가 충분하다.

## Breadcrumb

실제 hierarchy/drill-down:

```text
음원 성과 / 늦은 여름
```

또는 더 깊은 설정 hierarchy.

---

# 19. Breadcrumb Anatomy

예:

```text
음원 성과  /  늦은 여름
```

원칙:
- page title 위
- parent는 link
- current entity는 text
- separator는 interactive하지 않음
- 너무 긴 track name은 필요 시 truncate
- breadcrumb가 page title을 대체하지 않음

---

# 20. Breadcrumb vs Back

Breadcrumb와 Browser Back은 역할이 다르다.

Breadcrumb:
```text
정보 구조상 상위 parent
```

Back:
```text
사용자의 실제 navigation history
```

예:

```text
검색 결과 → 곡 상세
```

Back은 검색 결과로 돌아가야 하지만,
breadcrumb parent는 음원 성과일 수 있다.

따라서:
- browser back을 임의 parent link로 덮어쓰지 않음
- breadcrumb를 “뒤로”라고 labeling하지 않음

---

# 21. Deep Link

곡 상세 URL을 직접 열어도:
- Artist context
- L1 current nav
- Breadcrumb
- Page title

만으로 현재 위치를 이해할 수 있어야 한다.

사용자가 이전 화면을 반드시 거쳤다고 가정하지 않는다.

---

# 22. Cross-page Drill-down

Overview insight에서 다른 page의 detail/context로 이동할 수 있다.

예:

```text
Dashboard Insight
→ 음원 성과 / 늦은 여름
```

이 경우 destination page에:
- 관련 entity
- 관련 period/query context
- 가능하면 evidence focus

를 전달한다.

정확한 URL/query contract는 Deferred.

---

# 23. Navigation State vs Query State

Navigation state와 Query state를 분리한다.

예:

```text
Navigation = 음원 성과
Query = 최근 30일 / 이전 동일 기간
Filter = Spotify, Apple
```

URL을 설계할 때도 개념적으로 구분한다.

---

# 24. Page Title

Page title은 current destination을 사용자 언어로 명확히 설명한다.

예:

```text
Sidebar: 음원 성과
Page H1: 음원 성과
```

Detail:

```text
Breadcrumb: 음원 성과 / 늦은 여름
H1: 늦은 여름
Description: 2026. 9. 18. 발매 · 싱글
```

Sidebar nav label과 H1이 반드시 다른 문구일 필요는 없다.

---

# 25. Page Kicker

현재 Dashboard의:
```text
ARTIST PERFORMANCE
```

같은 kicker는 visual hierarchy 보조다.

위치 이해의 primary mechanism이 아니다.

스크린리더와 사용자에게 실제 위치를 전달하는 것은:
- nav current
- page title
- breadcrumb/detail context

다.

---

# 26. Landing vs Detail

## Landing

- section overview
- filters/query
- 여러 resources/modules
- breadcrumb 없음

## Detail

- 단일 track/event/report 등
- entity identity 중심
- breadcrumb 가능
- local tabs/actions 가능

두 anatomy를 구분한다.

---

# 27. Sidebar Full Mode

현재 Proposed:

```text
>= 1280px: 232px full sidebar
```

내용:
- brand
- artist context
- icon + text nav
- utility

Layout System 기준과 연결한다.

---

# 28. Icon Rail

현재 Proposed:

```text
768–1279px: 72px icon rail
```

원칙:
- label을 단순 제거했다고 끝나지 않음
- icon-only nav에 accessible name 유지
- hover/focus tooltip 또는 equivalent visible label 필요
- current state가 icon color 하나에만 의존하지 않음

현재 prototype은 accessible name은 있지만 hover/focus label UI를 추가 검증한다.

---

# 29. Mobile Navigation

768px 미만에서는 side nav를 화면에서 삭제만 하지 않는다.

Pattern:

```text
Top app bar
[CHASM]                 [메뉴]

메뉴 열기
→ primary navigation panel
→ artist context
→ utility navigation
```

Menu trigger:
- aria-expanded
- accessible name
- Escape close
- close 후 trigger focus return

---

# 30. Mobile Menu Behavior

Open:
- navigation visible
- trigger aria-expanded=true
- first relevant navigation item로 focus 이동 가능

Close:
- menu action 선택
- Escape
- explicit close trigger

Close 후:
- menu trigger로 focus return

실제 modal/drawer 여부는 mobile scope 확정 후 결정.

---

# 31. Mobile Page Context

모바일에서도 최소:
- current page title
- artist context
- navigation access

를 잃지 않는다.

현재 artist name을 top app bar에 항상 넣을지 여부는 공간/사용자 테스트 후 결정.

---

# 32. Navigation and Responsive Reflow

Breakpoint 때문에 IA 자체가 바뀌면 안 된다.

Desktop:
```text
Sidebar
```

Mobile:
```text
Menu panel
```

이어도 같은 L1 destinations와 current state를 유지한다.

---

# 33. Disabled / Unavailable Navigation

향후 기능이 아직 없는 경우 production에서는:
- 노출하지 않거나
- 실제 접근 가능한 상태가 된 후 노출

을 기본으로 한다.

Prototype에서는 디자인 검증 목적상:
```text
aria-disabled
+ explicit disabled visual
```

로 표시 가능.

“곧 제공”을 너무 많은 메뉴에 나열하지 않는다.

---

# 34. Permissions

권한별로 접근 불가능한 page가 생길 경우:
- 단순 disabled인지
- 숨김인지
- 접근 후 permission message인지

는 정보 발견성/보안 요구에 따라 결정한다.

현재:
**Deferred**

---

# 35. Data Connection as Utility

“데이터 업로드/연결”은 분석 destination보다 setup/management 성격이 강하다.

따라서 primary analysis nav보다 Utility 영역이 적합하다.

최종 naming:
- 데이터 연결
- 데이터 소스
- 데이터 업로드

중 무엇이 맞는지는 실제 input method 확인 후 결정.

상태:
**Deferred naming**

---

# 36. Settings

Settings는 분석 page와 분리한다.

Settings 내부 candidate:
- 데이터 연결
- 계정
- 알림
- 접근 권한

실제 scope 확인 전 메뉴를 확정하지 않는다.

---

# 37. Report Position

리포트가:
- 분석 결과를 반복 방문하는 주요 destination인지
- export action에 가까운지

에 따라 L1 유지 여부가 달라질 수 있다.

현재 Sidebar L1:
**Proposed**

실제 리포트 기능 정의 후 재검증.

---

# 38. Navigation Label Consistency

같은 destination을:
- 음원
- 음원 분석
- 음원 성과

로 화면마다 바꾸지 않는다.

Primary nav label을 하나 정하면:
- breadcrumb parent
- page title 기본
- link copy

에서도 같은 entity concept을 유지한다.

---

# 39. Resource Naming

User-facing:
- 곡

기술/schema:
- track 가능

따라서 navigation/page에서는:
```text
곡
```

을 우선한다.

Content/Microcopy System glossary와 연결한다.

---

# 40. Navigation Action Placement

Global navigation 안에 page-local action을 넣지 않는다.

예:

피함:
```text
Sidebar
- 대시보드
- CSV 내보내기
- 음원 성과
```

내보내기는 page/header action.

---

# 41. Persistent vs Contextual Navigation

Persistent:
- L1 sidebar
- artist context access

Contextual:
- breadcrumb
- page tabs
- detail local navigation
- “관련 분석 보기”

Persistent와 contextual navigation의 visual hierarchy를 다르게 한다.

---

# 42. Current Prototype IA Visualization

Dashboard sample에서:

- Full sidebar = L1 navigation
- Artist switcher = context control
- Utility section = disabled prototype items
- active destination = Dashboard
- Mobile = menu trigger + collapsible panel
- section anchor jump는 routing이 없는 static prototype의 visualization only

중요:

```text
현재 static prototype의 #music / #audience anchor
!= production route definition
```

실제 app에서는 page route로 교체한다.

---

# 43. Navigation Lab Cases

Navigation Lab에서 최소 검증:

1. Full sidebar anatomy
2. Active / hover / disabled
3. Artist context switcher
4. Icon rail + tooltip/label
5. Mobile menu
6. Landing page no breadcrumb
7. Detail page breadcrumb
8. Breadcrumb vs Back distinction
9. Page tabs below L1
10. Deep-link orientation
11. Cross-page drill-down
12. Persistent vs contextual navigation
13. Utility vs primary nav
14. Long Korean/artist/track names

---

# 44. URL / Route Candidate

개념 예시일 뿐 final route 아님.

```text
/artists/:artistId/dashboard
/artists/:artistId/music
/artists/:artistId/music/tracks/:trackId
/artists/:artistId/audience
/artists/:artistId/content
/artists/:artistId/events
```

Query candidate:

```text
?from=...
&to=...
&compare=previous
```

Filter/search serialization은 Query System 참조.

상태:
**Proposed direction / implementation Deferred**

---

# 45. Browser History

실제 page/detail navigation은 browser history에 남아야 한다.

따라서:
- anchor scroll만으로 app page navigation 흉내내지 않음
- Back/Forward가 예상 가능한 context 복원
- query state URL화 시 history policy(push vs replace) 정의 필요

현재:
**Deferred implementation**

---

# 46. Focus After Navigation

Full page navigation:
- 새 page의 main/H1로 focus 이동을 지원하는 routing framework pattern 검토

In-page drill-down/panel:
- opened destination에 logical focus

Mobile menu:
- close 후 trigger 또는 destination에 논리적 focus

Carbon left-nav accessibility에서도 navigation 후 main content top으로 focus를 돌려 orientation을 돕는 pattern을 제공한다.

---

# 47. Scroll Restoration

Back으로 돌아왔을 때:
- 이전 table/search/filter 상태
- scroll position

을 복원할 가치가 있다.

특히:
```text
곡 목록 → 곡 상세 → Back
```

에서 중요하다.

최종 구현은 router/state architecture 이후 결정.

---

# 48. Do / Don't

## Do

- Artist context와 navigation을 분리
- L1 sidebar depth를 얕게 유지
- detail hierarchy에서 breadcrumb 사용
- browser Back과 breadcrumb 역할 구분
- mobile에서도 같은 IA 유지
- current location을 aria-current + visual state로 전달
- drill-down link가 명확한 목적지를 갖게 함
- utility action과 analysis navigation 분리

## Don't

- sidebar 3–4단 중첩
- 모든 page에 breadcrumb 반복
- breadcrumb를 “뒤로” 버튼으로 사용
- artist 이름만 먼저 바꾸고 이전 artist data 유지
- mobile에서 navigation 자체를 삭제
- page-local action을 sidebar에 넣음
- anchor prototype을 final route로 간주

---

# 49. Decision Status

| 결정 | 상태 |
|---|---|
| Product → Artist Context → L1 Section → Detail 모델 | Stable |
| Artist switcher와 primary navigation 분리 | Stable |
| L1 nav는 얕은 구조 유지 | Stable |
| Breadcrumb는 detail/deep hierarchy에서만 | Stable |
| Breadcrumb vs browser Back 구분 | Stable |
| Desktop/sidebar와 mobile menu가 같은 IA 공유 | Stable |
| Current state aria-current + visual | Stable |
| Full sidebar / rail / mobile mode | Proposed, Layout System과 함께 검증 |
| 현재 L1 메뉴 이름/순서 | Proposed |
| 리포트 L1 유지 | Proposed |
| 데이터 연결/업로드 최종 naming | Deferred |
| Page tabs 구조 | Deferred per real use case |
| URL / route schema | Proposed direction / implementation Deferred |
| Permission-based nav | Deferred |
| Scroll restoration | Deferred implementation |
