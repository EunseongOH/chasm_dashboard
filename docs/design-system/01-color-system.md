# CHASM Dashboard Color System — v0.1

> 상태: Proposed v0.1  
> 목표: 데이터가 주인공이 되는 차분한 한국어 분석 화면. 색은 장식이 아니라 위계와 의미를 전달하는 도구로 사용한다.

## 1. 방향

### 권장 브랜드 방향: Blue + Cool Neutral

메인 브랜드 계열은 파란색을 권장한다.

이유:

1. 초록은 Positive / Success 의미로 남겨두는 편이 안전하다.
2. Spotify와 Melon 모두 강한 초록색 브랜드 연상이 있어, 제품 브랜드까지 초록이면 플랫폼 색·Semantic color와 충돌하기 쉽다.
3. 파랑은 여러 DSP를 통합해서 보는 “독립적인 분석 기준색”으로 사용하기 좋다.
4. 기존 랩캐즘에서 사용한 `#1393FD`를 버리지 않고 시각적 연속성을 유지할 수 있다.

대시보드에서는 색이 먼저 보이면 안 된다.

기본 인상:
- 밝은 Cool-neutral canvas
- White / near-white surface
- 짙은 Neutral text
- Brand blue는 핵심 interaction, selected state, focus, 주요 분석 series 등에 제한
- Categorical colors는 가급적 Chart 내부에서 사용
- Semantic colors는 실제 의미가 있을 때만 사용

## 2. Brand Palette — Chasm Blue

| Token | Hex | 역할 후보 |
|---|---|---|
| blue-50 | `#F4F9FF` | Selected / subtle background |
| blue-100 | `#E8F3FF` | Soft highlight |
| blue-200 | `#CFE7FF` | Subtle stroke / background |
| blue-300 | `#A7D4FF` | Decorative/data fill |
| blue-400 | `#6DB8FF` | Secondary visualization |
| blue-500 | `#1393FD` | CHASM vivid identity / chart highlight |
| blue-600 | `#0B78DB` | Strong accent |
| blue-700 | `#075FBA` | Primary solid UI candidate |
| blue-800 | `#0A4D93` | Pressed / strong |
| blue-900 | `#0E3F74` | High emphasis |
| blue-950 | `#09284C` | Deepest brand tone |

### `#1393FD`의 역할

기존 랩캐즘의 대표 Blue는 유지한다.

하지만 이 색을 모든 Primary button의 배경으로 바로 사용하지 않는다.

흰색 일반 텍스트와의 대비가 충분하지 않을 수 있기 때문에, Solid UI에서는 `blue-700`처럼 더 짙은 단계를 우선 검토한다.

즉:

- Brand identity / chart highlight → `blue-500 #1393FD`
- Solid primary interaction → `blue-700 #075FBA`

브랜드 대표색과 접근성에 적합한 UI 색을 반드시 동일하게 만들 필요는 없다.

## 3. Cool Neutral Palette

| Token | Hex | 역할 후보 |
|---|---|---|
| neutral-0 | `#FFFFFF` | Primary surface |
| neutral-25 | `#FCFDFE` | Elevated/light surface |
| neutral-50 | `#F7F9FC` | App canvas |
| neutral-100 | `#F1F4F8` | Subtle fill |
| neutral-200 | `#E5EAF0` | Default border / grid |
| neutral-300 | `#D5DCE5` | Strong border |
| neutral-400 | `#AAB4C0` | Disabled / low emphasis |
| neutral-500 | `#7C8796` | Tertiary text |
| neutral-600 | `#5E6978` | Secondary text candidate |
| neutral-700 | `#46515F` | Strong secondary |
| neutral-800 | `#2E3743` | High-emphasis text |
| neutral-900 | `#171D26` | Primary text |
| neutral-950 | `#0D1117` | Maximum emphasis |

대시보드 화면 대부분은 Brand color가 아니라 이 Neutral scale이 담당하도록 한다.

## 4. Semantic Color

Semantic color는 브랜드 장식용이 아니다.

예상 역할:

- Positive → Green family
- Warning → Amber family
- Critical → Red family
- Informative → Brand blue family

### 핵심 원칙: Direction ≠ Evaluation

`↑ +12.4%`라고 자동으로 Green을 붙이지 않는다.

`↓ -8.0%`라고 자동으로 Red를 붙이지 않는다.

예를 들어 발매 직후 자연스럽게 감소하는 지표는 “감소”이지만 반드시 “문제”는 아니다.

따라서:

- 방향은 Neutral text + icon/sign으로 표현 가능
- 제품이 실제로 긍정/위험을 판단할 근거가 있을 때만 Semantic color 적용

기존 랩캐즘의 `#18D85F`는 Vivid green reference로 남길 수 있으나, 실제 text/solid UI에서는 접근성을 고려한 더 짙은 단계를 사용할 수 있다.

## 5. Data Visualization Color

### 5.1 DSP Brand color와 Chart series color를 분리한다

Spotify = Green, Melon = Green처럼 플랫폼 브랜드 컬러를 그대로 차트 series에 쓰지 않는다.

통합 대시보드에서는 오히려 혼란을 만들 수 있다.

플랫폼 정체성은 다음을 우선 활용한다.

- Logo
- Platform name
- Tag / Chip
- Direct label

차트 series는 CHASM의 Data Visualization palette를 사용한다.

### 5.2 Categorical starting palette

현재 제안:

| 순서 | 이름 | Hex |
|---|---|---|
| 1 | Blue | `#1393FD` |
| 2 | Green / Teal | `#2EAD75` |
| 3 | Purple | `#9D6ADE` |
| 4 | Coral | `#E5484D` |
| 5 | Amber | `#D99A13` |
| 6 | Slate | `#5C6F8A` |

기존 콘텐츠 색:

- `#1393FD`
- `#18D85F`
- `#EA69FF`
- `#FB2E46`

은 “그대로 복사할 UI palette”가 아니라 **CHASM visual heritage**로 취급한다.

대시보드에서는 다중 series가 함께 있을 때 충돌을 줄이기 위해 채도를 조정할 수 있다.

### 5.3 색 외의 구분을 함께 사용한다

Color만 기억해야 데이터를 읽을 수 있는 차트를 지양한다.

필요에 따라:
- Direct label
- Marker
- Line style
- Ordering
- Annotation
- Legend + clear label

을 함께 사용한다.

## 6. Token Architecture

SEED와 Microsoft Fluent의 Layered token 구조를 참고한다.

### Layer 1 — Palette / Global Token

Raw value.

예:

- `color.palette.blue.500`
- `color.palette.neutral.900`

### Layer 2 — Semantic / Alias Token

색이 제품에서 수행하는 의미.

예:

- `color.bg.canvas`
- `color.bg.surface`
- `color.bg.subtle`
- `color.bg.brandSolid`
- `color.bg.brandSubtle`
- `color.fg.primary`
- `color.fg.secondary`
- `color.fg.tertiary`
- `color.fg.brand`
- `color.stroke.subtle`
- `color.stroke.default`
- `color.stroke.strong`
- `color.fg.positive`
- `color.fg.warning`
- `color.fg.critical`

실제 제품 컴포넌트에서는 Raw Hex보다 Semantic token을 사용한다.

### Layer 3 — Component Token

Component에서 별도 의미가 생길 때만 추가한다.

예:

- `button.primary.bg`
- `tab.selected.fg`
- `chart.grid.stroke`

Component token을 불필요하게 많이 만들지 않는다.

## 7. Initial Semantic Mapping

| Alias | Initial value |
|---|---|
| `bg.canvas` | neutral-50 `#F7F9FC` |
| `bg.surface` | neutral-0 `#FFFFFF` |
| `bg.subtle` | neutral-100 `#F1F4F8` |
| `fg.primary` | neutral-900 `#171D26` |
| `fg.secondary` | neutral-700 `#46515F` |
| `fg.tertiary` | neutral-500 `#7C8796` |
| `fg.brand` | blue-700 `#075FBA` |
| `bg.brandSubtle` | blue-50 `#F4F9FF` |
| `bg.brandSolid` | blue-700 `#075FBA` |
| `stroke.subtle` | neutral-100 `#F1F4F8` |
| `stroke.default` | neutral-200 `#E5EAF0` |
| `stroke.strong` | neutral-300 `#D5DCE5` |

이 값은 실제 Dashboard 화면에서 KPI Card, Filter, Table, Chart 등을 조합해본 후 Stable로 승격한다.

## 8. 참고 디자인 시스템에서 가져오는 원칙

### 8.1 당근 SEED

가져올 부분:
- Palette token과 Semantic token 분리
- 역할 중심 naming
- Foreground / Background / Stroke 구분
- 디자이너와 개발자가 같은 Token 언어 사용

References:
- https://seed-design.io/foundations/color/color-role
- https://v2.seed-design.io/foundation/color/color-system/

### 8.2 Microsoft Fluent 2

가져올 부분:
- Neutral이 화면의 대부분을 구성
- Brand color는 중요한 interaction과 anchoring에 사용
- Status/Semantic color는 실제 의미 전달에만 사용
- Global token → Alias token 구조

References:
- https://fluent2.microsoft.design/color
- https://fluent2.microsoft.design/design-tokens/

### 8.3 Shopify Polaris

가져올 부분:
- Semantic tone과 visual 표현의 강도를 구분
- 컴포넌트 사용 자유도를 지나치게 열어두지 않고 일관성 유지
- Accessibility를 individual screen보다 component/system에서 해결하는 방향

References:
- https://shopify.dev/docs/api/polaris/using-polaris-web-components
- https://shopify.dev/docs/api/app-home/latest/web-components

## 9. MVP Scope

현재 MVP에서는:

- Light theme 우선
- Token naming은 추후 theme 확장이 가능하도록 설계
- 실제 요구가 없는 상태에서 Dark palette 제작에 시간을 쓰지 않음
- Dashboard module, KPI card, Table, Filter, Time-series chart에서 palette를 검증한 뒤 Stable 지정

## 10. 다음 검증 항목

다음 단계에서 실제 화면 sample을 만들어 확인한다.

1. Neutral contrast가 너무 약하지 않은가?
2. `blue-700` primary interaction이 너무 무겁지 않은가?
3. `blue-500` chart highlight와 UI brand가 충분히 같은 제품처럼 느껴지는가?
4. 4~6개 categorical series가 동시에 있을 때 구분 가능한가?
5. 데이터가 많은 화면에서도 Color가 정보 위계를 방해하지 않는가?
6. 초심자가 Platform identity와 series identity를 혼동하지 않는가?
