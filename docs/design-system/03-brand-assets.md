# CHASM Brand Assets

> 상태: Stable

## 1. 공식 로고

CHASM Dashboard에서 사용하는 공식 로고 원본:

```text
assets/brand/chasm-logo.svg
```

사용자가 제공한 랩캐즘 공식 SVG를 그대로 저장한 파일이다.

현재 원본 SVG:
- ViewBox: `0 0 50 50`
- 기본 크기: `50 × 50`
- 원본 Fill: `#101010`

## 2. 사용 원칙

### 공식 에셋을 우선한다

대시보드, 로그인, 리포트 등 CHASM 브랜드가 노출되는 UI에서 로고가 필요하면 위 SVG를 사용한다.

다음 행동은 하지 않는다.

- CSS 도형으로 로고를 비슷하게 다시 제작
- AI로 유사 로고 생성
- 임의의 다른 아이콘으로 대체
- SVG path 변형
- 비율 왜곡

### 비율 유지

크기는 화면 맥락에 따라 조정할 수 있지만 원본 aspect ratio를 유지한다.

예:
- Sidebar navigation: 24 × 24
- Larger brand header: 필요에 따라 확대 가능

### 색상

현재 공식 로고 원본의 색상은 `#101010`이다.

Light theme에서는 이 원본을 기본으로 사용한다.

Dark theme 또는 다른 색상의 로고 variant는 아직 정의되지 않았다. 필요해질 때 별도 디자인 의사결정으로 추가한다.

임의로 Brand blue 등으로 recolor하지 않는다.

## 3. 접근성

로고 옆에 이미 "CHASM"이라는 텍스트가 표시된다면 중복 읽기를 막기 위해:

```html
<img src="..." alt="" aria-hidden="true" />
```

처럼 decorative image로 처리할 수 있다.

로고 단독으로 브랜드를 나타내는 경우에는 접근 가능한 이름을 제공한다.

## 4. Prototype 적용

현재 코드 프로토타입:

```text
prototype/dashboard-sample/
```

의 Sidebar에서 공식 로고를 사용한다.

개발용 `index.html`은:

```text
../../assets/brand/chasm-logo.svg
```

를 참조한다.

단일 파일 `preview.html`은 `scripts/build-preview.py` 실행 시 SVG가 data URI로 함께 내장된다.

따라서 `preview.html` 하나만 다운로드해도 로고가 깨지지 않아야 한다.

## 5. Source of truth

로고의 source of truth는:

```text
assets/brand/chasm-logo.svg
```

이다.

다른 화면에서 별도의 복사본을 만들기보다 이 에셋을 참조한다.
