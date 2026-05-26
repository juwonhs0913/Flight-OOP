# ✈️ Aircraft OOP Visualization Web App

객체지향 프로그래밍(OOP)의 핵심 개념인 **상속(Inheritance)**과 **다형성(Polymorphism)**을 웹 환경에서 직관적으로 확인할 수 있는 인터랙티브 시각화 프로젝트입니다. 

자료구조 과제 2 (OOP 설계 기반 인터랙티브 웹앱 구현 및 풀사이클 배포)의 일환으로 제작되었습니다.

🔗 https://flight-oop.vercel.app/

---

## 🌟 주요 기능 및 디테일 (Details)

### 1. 상속 구조 시각화 (Hierarchy Visualization)
- `FlightADT` (추상/인터페이스) ➡️ `CommercialAircraft` (Base) ➡️ `PassengerAircraft`, `CargoAircraft` (Derived)로 이어지는 4단계 계층 구조를 트리(Tree) 형태로 깔끔하게 시각화했습니다.
- 상단의 클래스 노드 클릭 시 해당 클래스의 **명세서(Properties & Methods)**를 로그 창에서 조회할 수 있습니다.

### 2. 다형성 인터랙션 (Polymorphism Interaction)
- 하단의 인스턴스(객체) 노드를 클릭하면 각 타입에 맞게 **오버라이딩(Overridden)**된 `boarding()`, `take_off()` 메서드가 호출되어 다형성의 원리를 실시간 로그로 확인할 수 있습니다.
- 여객기(Passenger)와 화물기(Cargo) 객체의 속성에 따라 터미널(시작 위치)과 택싱 경로가 다르게 분기됩니다.

### 3. 상태 기반 사운드 이펙트 제어 
- 각 비행 단계와 객체 타입에 맞는 커스텀 오디오가 재생됩니다.
- 우측 상단의 토글(🔊/🔇) 버튼을 통해 재생 중인 모든 오디오를 제어할 수 있습니다.

### 4. 반응형 레이아웃  
- 화면 사이즈에 맞게 넓은 화면에서는 좌우 분할 뷰로 넓게 시각화하고, 모바일 등 작은 화면인 환경에서는 수직 스택 레이아웃과 가로 스와이프 다이어그램으로 자동 변환되도록 Tailwind CSS를 적용했습니다.

### 5. 인천공항 위성 지도 및 독립적인 커스텀 택싱 루트
- 단순한 단색 배경이 아닌 실제 인천국제공항 위성 사진을 적용하여 현실성과 시각적 완성도를 높였습니다.
- 객체의 타입(`PassengerAircraft` vs `CargoAircraft`)에 따라 생성 위치(제1 터미널 vs 화물청사)가 다르게 분기되며, 각기 다른 웨이포인트(Waypoints) 배열을 따라 활주로 진입점까지 이동하는 디테일한 커스텀 노선을 구축했습니다.
---

## 🛠 기술 스택 (Tech Stack)

- **Frontend:** HTML5, CSS3 (Tailwind CSS CDN), Vanilla JavaScript (ES6+)
- **Deployment:** GitHub, Vercel (풀사이클 배포)
- **Architecture:** Option B (단일 파일 구성 기반 웹앱)

---

## 📂 프로젝트 구조 (Project Structure)

\`\`\`text
- Flight-OOP/
- ├── index.html               # 메인 UI, 애니메이션 및 OOP 로직
- └── data/                    # 정적 에셋(Assets) 디렉터리
-    ├── airport.jpg          # 배경 위성 지도 이미지
-    ├── base_airport.mp3     # 공항 앰비언스 사운드
-    ├── taxiing.mp3          # 엔진 시동 및 택싱 사운드
-    └── takeoff.mp3          # 이륙 풀파워 가속 사운드
\`\`\`

---

## 💻 객체지향 설계 명세 (OOP Design)

| Class | Type | Description / Added Features |
| :--- | :--- | :--- |
| `FlightADT` | Interface | `location`, `callsign` / `boarding()`, `taxiing()`, `take_off()` |
| `CommercialAircraft` | Base Class | 인터페이스 구현 및 기본 위치 초기화 |
| `PassengerAircraft` | Derived Class | `passengerNum` 속성 추가 및 승객 탑승/이륙 로직 오버라이딩 |
| `CargoAircraft` | Derived Class | `cargoWeightKg` 속성 추가 및 화물 적재/이륙 로직 오버라이딩 |

---