# Lab CHASM 대시보드 — Local Preview

이 폴더는 Lab CHASM 대시보드 디자인 시스템을 실제 화면에서 검증하기 위한 코드 기반 프로토타입입니다.

## GitHub Pages 공개 주소

GitHub Pages를 활성화한 뒤에는 다음 주소에서 Lab CHASM 대시보드를 확인합니다.

`https://eunseongoh.github.io/chasm_dashboard/`

저장소의 `.github/workflows/pages.yml`이 `main`의 정적 prototype을 GitHub Pages로 배포합니다.

## 가장 빠르게 확인하는 방법

### 방법 A — `preview.html` 하나만 열기

`preview.html`에는 CSS와 JavaScript가 모두 포함되어 있습니다.

따라서 파일 하나만 다운로드해도 브라우저에서 바로 열 수 있습니다.

이 파일은 **빠른 중간 확인용**입니다.

---

## VS Code + Claude Code로 작업할 때 권장 방법

실제 수정은 아래 분리된 파일을 사용합니다.

- `index.html`
- `styles.css`
- `app.js`

이 구조가 Claude Code가 수정 범위를 파악하고, 디자인 토큰 / 마크업 / 인터랙션을 각각 관리하기에 더 좋습니다.

### 방법 B — VS Code Live Server

VS Code에서 프로젝트 폴더를 연 뒤:

1. `prototype/dashboard-sample/index.html` 열기
2. Live Server 확장이 있다면 우클릭
3. **Open with Live Server**

권장 이유:
- 파일 수정 시 브라우저 자동 새로고침
- 상대 경로가 정상 작동
- 이후 asset, module, fetch가 추가되어도 `file://` 방식보다 안정적

### 방법 C — Python 로컬 서버

프로젝트 루트에서 터미널을 열고:

```bash
python -m http.server 8000
```

그 다음 브라우저에서:

```text
http://localhost:8000/prototype/dashboard-sample/
```

Python이 `python` 명령으로 실행되지 않는 Windows 환경이면:

```bash
py -m http.server 8000
```

## 앞으로의 작업 규칙

### 개발용
분리 파일을 기준으로 수정합니다.

### 공유/빠른 확인용
중요한 체크포인트마다 `preview.html`도 최신 버전으로 갱신합니다.

즉:

```text
dashboard-sample/
├─ index.html      # 개발용 markup
├─ styles.css      # 개발용 style
├─ app.js          # 개발용 interaction / dummy data
├─ preview.html    # 단일 파일 로컬 확인용
└─ README.md
```

## Claude Code에게 작업을 맡길 때

Claude Code는 가능하면 저장소 루트에서 실행하고, 작업 전에 아래 문서를 읽도록 합니다.

- `docs/design-system/README.md`
- `docs/design-system/00-context-and-principles.md`
- `docs/design-system/01-color-system.md`
- `docs/design-system/02-dashboard-ui-sample.md`

예시:

```text
docs/design-system 문서를 먼저 읽고 현재 Lab CHASM 대시보드의 제품 원칙과 디자인 시스템을 유지해줘.
prototype/dashboard-sample의 기존 구조를 기반으로 수정하고,
결정된 디자인 원칙을 임의로 변경하지 말아줘.
수정 후 preview.html도 동일한 상태로 갱신해줘.
```

## 주의

현재 수치와 아티스트 데이터는 UI 검증을 위한 dummy data입니다.
실제 DSP 데이터 정의가 확정되기 전까지 KPI 의미나 합산 방식을 제품 요구사항으로 간주하지 않습니다.
