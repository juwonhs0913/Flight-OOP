# ✈️ Flight OOP Visualizer

> 2026 자료구조 과제 2 — OOP 상속 구조 시각화 + 다형성 인터랙티브 웹앱

## 데모

Vercel 배포 URL: _배포 후 추가_

## 소개

Python OOP 클래스 계층구조(`FlightADT → CommercialAircraft → PassengerAircraft / CargoAircraft`)를 Next.js + Tailwind CSS로 인터랙티브하게 시각화한 웹앱입니다.

### 주요 기능

- **상속 구조 시각화**: 비행기 아이콘을 활용한 계층형 UML 다이어그램
- **다형성 인터랙션**: 클래스 노드 클릭 시 오버라이딩된 메서드가 호출되어 각각 다른 애니메이션 실행
- **공항 시뮬레이션**: 보딩 → 택시잉 → 이륙 단계별 실시간 애니메이션
- **로그 터미널**: Python 출력과 동일한 형식의 실시간 실행 로그

### OOP 구조

```
FlightADT (ABC — 추상 기반 클래스)
└── CommercialAircraft (구현 클래스)
    ├── PassengerAircraft (@override boarding, take_off)
    └── CargoAircraft     (@override boarding, take_off)
```

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: CSS keyframes + React state
- **Language**: TypeScript

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## Vercel 배포

1. GitHub에 이 저장소 push
2. [vercel.com](https://vercel.com)에서 GitHub 저장소 import
3. 별도 환경변수 없이 바로 배포 가능

## 파일 구조

```
src/
├── app/
│   ├── layout.tsx       # 루트 레이아웃
│   ├── page.tsx         # 메인 페이지 (인터랙션 로직)
│   └── globals.css      # 글로벌 스타일 + 애니메이션
├── components/
│   ├── AirportScene.tsx     # 공항 시뮬레이션 씬
│   ├── ClassNode.tsx        # 클래스 계층 노드 카드
│   ├── HierarchyConnectors.tsx  # SVG 연결선
│   ├── LogTerminal.tsx      # 실시간 로그 터미널
│   ├── MethodPanel.tsx      # 메서드 상세 패널
│   ├── PlaneIcons.tsx       # 비행기 SVG 아이콘
│   └── StarsBackground.tsx  # 별 배경 효과
└── lib/
    └── flightData.ts    # OOP 데이터 모델
```

---

Made with Next.js + Tailwind CSS
