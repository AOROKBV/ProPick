# ProPick (프로픽) 🎲

> **프로그래머스(Programmers) 코딩 테스트 맞춤형 무작위 문제 추천 웹 서비스**

ProPick은 어떤 문제를 풀어야 할지 망설이는 개발자들을 위해 난이도, 언어 등 맞춤 필터 조건에 맞춰 프로그래머스 문제를 무작위로 추첨해 주는 웹 애플리케이션입니다.

---

## 🌟 주요 기능 (Key Features)

- **🎯 맞춤형 필터 설정 (Filter Configuration)**
  - **난이도 필터**: Level 0 ~ Level 5 다중 선택 지원 (미선택 시 전체 대상)
  - **언어 필터**: C, C++, Java, JavaScript, Python3 등 주요 언어 선택 지원
  - **필터 초기화**: 클릭 한 번으로 모든 필터를 기본값으로 리셋

- **🎲 공평한 랜덤 추첨 엔진 (Fair Randomizer Engine)**
  - 전체 페이지 수 및 문제 수를 실시간 계산하여 편향 없는 무작위(Page & Index) 문제 추첨
  - 클라이언트/서버 공용 `fetchRandomChallenge` 서비스 제공

- **✨ 감각적인 추첨 인터랙션 & 결과 카드 (Visual & Interaction)**
  - 슬롯머신 spin 애니메이션 연출로 몰입감 있는 추첨 경험 제공
  - 문제 정보(난이도 배지, 제목, 카테고리, 정답률, 완료자 수 등) 표시
  - **직접 이동 링크**: 선정된 문제의 프로그래머스 학습 페이지로 새 탭에서 즉시 이동
  - **다시 뽑기 (Reshuffle)**: 필터 조건을 유지한 채 새로운 무작위 문제 재추첨

- **⭐ 히스토리 및 즐겨찾기 (History & Bookmarks)**
  - 최근 추첨된 문제 목록 자동 저장 (`LocalStorage`) 및 즐겨찾기(북마크) 토글 기능
  - 우측 상단 드로어(`HistoryDrawer`)를 통한 이전 추첨 문제 재확인

---

## 🎨 디자인 시스템 (Design System)

ProPick은 세련되고 감각적인 컬러 팔레트와 모던 웹 aesthetics (Glassmorphism, 미세 인터랙션)를 적용했습니다.

| Token / Color | Code | Usage |
| :--- | :--- | :--- |
| **Brand Base** | `#FEFEFA` | Main Background (Soft Off-White) |
| **Brand Primary** | `#280003` | Primary Text & Headings (Deep Burgundy) |
| **Brand Accent** | `#002825` | Buttons & Accents (Deep Emerald Teal) |

- **Design System Details**:
  - `Glassmorphism`: backdrop-filter blur 기반의 `glass-card`, `glass-pill` UI
  - `Typography`: Plus Jakarta Sans (Main Font), JetBrains Mono (Code/Mono)
  - `Motion`: 슬롯머신 spin 애니메이션 (`animate-slot-spin`) 및 스켈레톤 로딩 UX

---

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: [SvelteKit](https://kit.svelte.dev/) (Svelte 5 Runes `$state`, `$derived` 적용)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- **Language**: TypeScript
- **Testing**: [Vitest](https://vitest.dev/) (엔진, 필터, 쿼리, 서비스, 스토리지 단위 테스트)
- **Deployment**: GitHub Pages (`gh-pages`)

---

## 📁 프로젝트 구조 (Project Structure)

```text
src/
├── lib/
│   ├── components/       # UI 컴포넌트 (FilterPanel, RandomizerCard, HistoryDrawer 등)
│   ├── randomizer/       # 비즈니스 로직 (engine, filters, query, service 및 단위 테스트)
│   ├── utils/            # 유틸리티 (storage 및 단위 테스트)
│   ├── types.ts          # TypeScript 인터페이스 정의
│   └── index.ts
└── routes/
    ├── +layout.svelte    # 공통 레이아웃
    ├── +page.svelte      # 메인 추첨 페이지 (Svelte 5 Runes)
    └── layout.css        # Tailwind v4 & 커스텀 디자인 시스템 / 애니메이션
```

---

## 🚀 시작하기 (Quick Start)

### 사전 요구사항
- Node.js (v18 이상 권장)
- npm / pnpm / yarn

### 설치 및 개발 서버 실행

```bash
# Repository 클론
git clone https://github.com/AOROKBV/ProPick.git
cd ProPick

# 의존성 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저 자동 오픈으로 실행 시
npm run dev -- --open
```

---

## 🧪 테스트 실행 (Testing)

ProPick의 비즈니스 로직(API URL 빌더, 랜덤 추첨 알고리즘, 필터 처리, 로컬 스토리지)은 Vitest 단위 테스트로 검증됩니다.

```bash
# 단위 테스트 1회 실행
npm run test

# 테스트 Watch 모드 실행
npm run test:unit
```

---

## 📦 빌드 및 배포 (Build & Deploy)

```bash
# 타입 체크 & SvelteKit Sync
npm run check

# 프로덕션 빌드
npm run build

# 프로덕션 결과물 미리보기
npm run preview

# GitHub Pages 배포
npm run deploy
```
