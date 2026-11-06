# CHASM Feedback, Notification & Confirmation System — v0.1

> 상태: Stable principles + Proposed visual/behavior values  
> 목적: 사용자 행동 결과, 시스템 상태, 주의가 필요한 문제, 파괴적 행동의 확인을 **필요한 만큼만 방해하면서** 명확하게 전달한다.
>
> 데이터 자체의 Fresh/Stale/Partial/Error 의미는 `15-data-state-system.md`를 따른다. 이 문서는 그 상태나 사용자 행동 결과를 **어떤 feedback surface로 전달할지** 정의한다.

---

# 0. Core Principle

Feedback surface의 강도는 정보의 중요도와 사용자의 다음 행동 필요성에 맞춰야 한다.

```text
작은 확인
→ Toast / live status

현재 영역의 문제
→ Inline notification

항상 알아야 할 맥락
→ Callout

페이지 전체 영향
→ Page message bar

즉시 결정이 필요한 위험
→ Dialog / confirmation
```

모든 메시지를 Toast로 만들지 않는다.

---

# 1. External References

## Carbon Notification

Carbon은 notification을:
- Inline
- Toast
- Actionable
- Callout

으로 구분하고, 메시지 priority에 따라 방해 정도를 달리한다.

Error는 문제뿐 아니라 사용자가 취할 다음 행동을 포함해야 한다.

Inline은 관련 item 가까이에 배치하고, Toast는 짧고 비모달이며, Callout은 page content와 함께 로드되는 persistent contextual information이다.

References:
- https://www.carbondesignsystem.com/building-blocks/core/components/notification/guidelines
- https://www.carbondesignsystem.com/building-blocks/core/components/notification/specifications
- https://www.carbondesignsystem.com/building-blocks/core/patterns/notifications

## Fluent Toast

Fluent는 toast 위치를 앱 전체에서 일관되게 유지하고 main content를 가리지 않는 위치를 선택하도록 한다.

한 toaster에 너무 많은 toast를 쌓지 않고 최대 4개, 16px 간격을 권장한다.

Reference:
- https://fluent2.microsoft.design/components/web/react/core/toast/usage

## Fluent Message Bar

Message bar는 영향 범위에 따라:
- page
- container/card
- tab
- form
- drawer

수준에서 배치할 수 있다.

Card-level message는 card header 아래에 두고, long content는 truncate하지 않고 reflow한다.

Reference:
- https://fluent2.microsoft.design/components/web/react/core/messagebar/usage

## Dialog / Modal

Fluent와 Carbon 모두 dialog/modal을 interruption으로 본다.

특히:
- destructive/irreversible action
- urgent decision
- consequence acknowledgement

에서만 사용한다.

References:
- https://fluent2.microsoft.design/components/web/react/core/dialog/usage
- https://www.carbondesignsystem.com/building-blocks/core/components/modal/guidelines

---

# 2. Feedback Taxonomy

CHASM은 다음 surface를 구분한다.

| Surface | 사용 상황 |
|---|---|
| Field message | 특정 input 문제 |
| Inline notification | 현재 card/form/section의 상태 |
| Callout | 행동 전 알아야 할 contextual info |
| Toast | 이미 끝난 행동의 짧은 feedback |
| Page message bar | page 여러 영역에 영향을 주는 상태 |
| Dialog | 중요한 결정 / 파괴적 행동 |
| Live status | 시각적 surface 없이 필요한 AT feedback |

---

# 3. Status vs Surface

```text
Status = 무엇을 의미하는가
Surface = 어디서/얼마나 강하게 보여주는가
```

Status:
- Information
- Success
- Warning
- Error

Surface:
- Inline
- Toast
- Callout
- Message bar
- Dialog

예:

```text
Error + Inline
Success + Toast
Warning + Message bar
Information + Callout
```

---

# 4. Status Color Is Not Metric Direction

중요한 Stable 원칙:

```text
Feedback semantic color != Data direction color
```

Green:
- 작업 성공

Red:
- 시스템/입력 오류

Amber:
- 주의/잠재 문제

Blue:
- 정보

스트리밍 증가/감소를 success/error semantic color로 표현하지 않는다.

---

# 5. Inline Notification

사용:
- 특정 card query 실패
- form submit error summary
- data connection issue
- 현재 section 안에서 해결 가능한 warning

위치:
- 영향 받는 container header 바로 아래
- form에서는 관련 field error를 보완하는 summary

기본 anatomy:

```text
[Icon] Title                       [Close?]
       Body
       [Optional one action]
```

---

# 6. Inline Spacing

Content Spacing System 적용:

- inset: 12 block / 16 inline
- icon → content: 12
- title → body: 2–4
- body → action: 12
- action button 간: 8

Long text가 2줄 이상 계속 필요하면 상세 page/dialog/link로 넘긴다.

---

# 7. Inline Persistence

Inline notification은 기본적으로 자동으로 사라지지 않는다.

해결되거나:
- 사용자가 dismiss
- 상태가 정상화

될 때 제거한다.

Critical한 정보를 반드시 읽어야 한다면 close button을 제공하지 않을 수 있다.

---

# 8. Toast

Toast는 **행동이 끝난 뒤의 짧은 확인**에 사용한다.

좋음:
- 리포트를 생성했습니다.
- CSV 내보내기를 시작했습니다.
- 필터 설정을 저장했습니다.

피함:
- Spotify 연결이 실패했고 재인증이 필요합니다.
- 일부 데이터가 3일째 갱신되지 않았습니다.

후자는 persistent inline/message bar가 더 적합하다.

---

# 9. Toast Placement

CHASM desktop 초기안:

```text
bottom-right
24px viewport inset
16px stack gap
max 4
```

이유:
- top area의 page header/query controls와 충돌 감소
- sidebar navigation과 반대편

상태:
**Proposed / visual validation required**

Narrow screen:
- inline edge 16px
- 거의 full width

---

# 10. Toast Anatomy

```text
[Icon] Title              [Close]
       Optional short body
       Optional one action
```

기본:
- width: 320–360px candidate
- inset: 16
- icon → copy: 12
- title → body: 2–4
- action separation: 12

Korean copy line length를 고려해 Carbon 288px보다 조금 넓게 시작하되 실제 화면에서 검증한다.

---

# 11. Toast Dismissal

No action:
- auto-dismiss 가능
- 초기 후보: 약 5초
- close button 제공 가능

Action 포함:
- 자동 dismiss하지 않음
- 사용자가 action 또는 dismiss할 때까지 유지

정확한 timeout은 Proposed.

중요한 정보는 toast가 사라진 뒤 다시 찾을 수 있는 별도 경로가 있어야 한다.

---

# 12. Toast Queue

- 최대 4개
- newest closest to viewport edge
- 16px stack gap
- 같은 성공 메시지를 반복 생성하지 않음

Batch action이면:
```text
3개 리포트를 생성했습니다.
```

처럼 하나로 합친다.

---

# 13. Callout

Callout은 **사용자 행동 결과가 아니라 미리 알아야 할 정보**다.

예:
- 이 비교는 동일 source coverage에서만 계산됩니다.
- Melon에서는 이 지표를 제공하지 않습니다.
- 데이터 연결 후 첫 수집에는 시간이 걸릴 수 있습니다.

기본:
- persistent
- dismiss 없음
- related content 가까이
- 정보/주의 tone

Success/Error callout은 기본적으로 사용하지 않는다.

---

# 14. Callout Spacing

- inset: 16
- title → body: 4
- body → link: 8–12
- icon이 있다면 icon → copy: 12

같은 page에서 callout을 여러 개 연속 stacking하지 않는다.

일반 설명 text로 충분하면 callout을 만들지 않는다.

---

# 15. Page Message Bar

여러 card/module에 공통 영향을 주는 상태.

예:
```text
일부 플랫폼의 데이터 갱신이 지연되고 있습니다.
```

위치:
- page header/query context 아래
- main content 위

Side navigation 위에 띄우지 않는다.

---

# 16. Container Message Bar

한 card/section에만 영향.

예:
```text
Melon 데이터를 불러오지 못했습니다.
다른 플랫폼은 정상적으로 표시됩니다.
```

위치:
- card header 아래
- affected body 위

Card 전체를 red background로 만들지 않는다.

---

# 17. Message Bar Reflow

한 줄을 강제하지 않는다.

Desktop:
```text
Icon | Copy | Action | Close
```

좁은 폭:
```text
Icon | Copy
       Action
```

Message text를 ellipsis로 잘라 중요한 상태를 숨기지 않는다.

---

# 18. Success Feedback

작업 성공은 짧게.

좋음:
- 저장했습니다.
- 연결했습니다.
- 내보내기를 시작했습니다.
- 리포트를 생성했습니다.

피함:
- 성공적으로 완료되었습니다!
- 축하합니다!

Success가 화면 content 변화로 이미 명확하다면 toast도 생략할 수 있다.

---

# 19. Warning Feedback

Warning은:
- 사용자는 계속 진행 가능
- 잠재적 결과를 알아야 함

예:
```text
현재 기간과 이전 기간의 플랫폼 구성이 다릅니다.
비교값이 정확하지 않을 수 있습니다.
```

가능한 경우 예방 action을 제공한다.

---

# 20. Error Feedback

Error anatomy:

```text
무엇을 하지 못했는가
어디까지 영향이 있는가
다음 행동
```

예:

```text
Spotify 데이터를 불러오지 못했습니다.
다른 플랫폼은 계속 확인할 수 있습니다.
[다시 시도]
```

“오류가 발생했습니다”만 단독 사용하지 않는다.

---

# 21. Field-level Error

특정 form field에 문제가 있다면:
- field outline/state
- field 가까운 error text

를 제공한다.

Page/inline summary만 보여주고 field 자체에는 아무 표시도 하지 않는 패턴을 피한다.

예:

```text
종료일
[2026-08-01]
종료일은 시작일보다 빠를 수 없습니다.
```

---

# 22. Confirmation Is Not Feedback

Confirmation은 행동 **전** 판단을 요구한다.

Toast/Inline은 행동 **후** 결과를 전달하는 경우가 많다.

따라서:
```text
Delete click
→ Confirmation dialog
→ Delete
→ Success feedback
```

처럼 연결될 수 있다.

---

# 23. When Confirmation Is Needed

Dialog confirmation 사용:

- irreversible delete
- disconnecting source with material consequence
- unsaved work loss
- destructive bulk action
- expensive action with significant consequence

사용하지 않음:

- 탭 변경
- filter reset
- search clear
- normal navigation
- 쉽게 되돌릴 수 있는 preference

---

# 24. Confirmation Copy

피함:
```text
정말 삭제하시겠습니까?
[취소] [확인]
```

선호:

```text
리포트를 삭제할까요?

삭제하면 이 리포트와 저장된 설정을 다시 확인할 수 없습니다.

[취소] [리포트 삭제]
```

Title과 action button에 **실제 object/action**을 넣는다.

---

# 25. Danger Confirmation

Destructive/irreversible:
- danger action color
- explicit consequence
- cancel 가능
- primary/destructive button이 무엇을 하는지 명확

Cancel에 danger styling을 사용하지 않는다.

---

# 26. Dialog Anatomy

```text
┌────────────────────────────
│ Title                  [X?]
│ Description
│
│ Body / consequence
│
│              Cancel  Action
└────────────────────────────
```

Spacing:
- dialog outer/content: 24
- title → description: 4
- description → body: 16
- body → footer: 24
- buttons: 8

---

# 27. Dialog Dismissal

일반 modal:
- Esc
- cancel
- close button if appropriate

Destructive alert-style confirmation:
- footer decision buttons 중심
- outside click dismissal은 실제 risk에 따라 제한

항상:
- focus containment
- initial focus
- close 후 trigger focus return

---

# 28. Default Focus in Danger Dialog

Destructive button을 자동 focus해 Enter 한 번으로 삭제되는 패턴은 피한다.

기본 후보:
- Cancel
또는
- dialog container / safe action

최종 behavior는 구현 component와 accessibility test 후 확정한다.

---

# 29. Undo vs Confirmation

행동이 **진짜로 완전히 되돌릴 수 있고** rollback을 제품이 보장한다면:

```text
Action
→ Toast
→ [실행 취소]
```

를 confirmation 대신 검토할 수 있다.

하지만 UI만 Undo처럼 보이고 실제 데이터 rollback이 불완전하면 사용하지 않는다.

현재:
**Pattern allowed / implementation dependent**

---

# 30. Feedback and Data State

Data State:
```text
Spotify = Stale
```

Feedback surface:
```text
Container message bar
“Spotify 데이터가 최신 상태가 아닙니다.”
```

즉 Data State와 Notification은 같은 개념이 아니다.

---

# 31. Feedback and Query

Query control validation:
- field-level error 우선

Query result error:
- affected module inline notification

Background request success:
- 매번 Toast 사용하지 않음

필터 적용처럼 결과 변화가 화면에서 즉시 보이면 별도 success toast는 불필요하다.

---

# 32. Feedback and Navigation

Navigation 성공 자체:
- toast 없음

Route 실패/권한:
- destination page 상태 또는 message bar

“음원 성과로 이동했습니다” 같은 toast는 불필요하다.

---

# 33. Accessibility — Toast

Non-urgent success/info:
- `role=status`
- polite

Urgent error:
- `role=alert`을 제한적으로 사용

Toast가 나타났다고 keyboard focus를 자동으로 빼앗지 않는다.

Actionable toast만 별도 focus pattern을 검토한다.

---

# 34. Accessibility — Dialog

Dialog:
- accessible title
- aria-modal where appropriate
- focus containment
- Escape policy
- trigger focus return

Alert dialog는 매우 제한적으로 사용한다.

---

# 35. Motion

Toast entry/exit:
- 짧고 subtle
- 의미 이해에 animation 필수 아님
- reduced motion에서 즉시 appear/disappear 가능

Message bar/inline notification:
- layout shift를 과도하게 animation하지 않음

---

# 36. Content Length

Toast:
- title + 최대 1–2 short lines

Inline:
- title + 1–2 short sentences

Callout:
- 필요하면 조금 길 수 있으나 card 전체를 설명문으로 채우지 않음

Dialog:
- consequence 이해에 필요한 만큼

길어지면:
- 상세 page
- disclosure
- help content

로 이동한다.

---

# 37. Dismissibility Matrix

| Surface | Auto dismiss | Manual close |
|---|---|---|
| Field error | No | 상태 해결 |
| Inline | No | Optional |
| Callout | No | 기본 No |
| Success toast | Yes candidate | Yes |
| Actionable toast | No | Yes |
| Page message | No | 상황에 따라 |
| Dialog | No | decision/cancel |

---

# 38. Visual Priority

## Info
- subtle blue/info icon
- neutral text

## Success
- green semantic icon/accent
- success toast 등 짧은 결과 feedback

## Warning
- amber semantic accent
- 계속 진행 가능

## Error
- red semantic accent
- blocking/failed action

전체 surface를 진한 semantic color로 채우기보다
low-contrast background + icon/accent를 기본으로 한다.

---

# 39. Prototype Rules

Feedback Lab에서 다음을 검증한다.

1. Inline info/success/warning/error
2. Callout
3. Page message bar
4. Card-level message bar
5. Success toast
6. Actionable toast
7. Toast stack
8. Field error
9. Confirmation dialog
10. Danger confirmation
11. Undo candidate
12. Responsive reflow
13. reduced motion / accessibility semantics
14. spacing anatomy

Dashboard sample에는:
- feedback system을 보여주기 위해 임의 error를 상시 표시하지 않음
- 실제 prototype action에 최소한의 feedback만 연결

예:
- Export button → sample success toast
- destructive confirmation은 Lab에서만 검증

---

# 40. Decision Status

| 결정 | 상태 |
|---|---|
| Feedback status와 surface 분리 | Stable |
| Inline은 affected scope 가까이에 | Stable |
| Callout은 contextual/persistent | Stable |
| Toast는 완료된 짧은 feedback | Stable |
| Actionable toast 자동 dismiss 금지 | Stable |
| Page issue와 card issue scope 분리 | Stable |
| Destructive action에 explicit confirmation | Stable |
| Generic “확인” destructive button 금지 | Stable |
| Toast max 4 / gap 16 | Proposed |
| Desktop toast bottom-right | Proposed |
| Toast width 320–360 | Proposed |
| Success toast timeout 약 5초 | Proposed |
| Dialog inset 24 | Proposed |
| Undo는 실제 rollback 보장 시만 | Stable conditional |
