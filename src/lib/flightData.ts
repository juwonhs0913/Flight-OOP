// OOP class hierarchy data
export type NodeType = "adt" | "base" | "passenger" | "cargo";
export type AnimationPhase = "idle" | "boarding" | "taxiing" | "takeoff" | "airborne";

export interface FlightNode {
  id: string;
  label: string;
  type: NodeType;
  description: string;
  methods: MethodInfo[];
  isAbstract?: boolean;
  parentId?: string;
}

export interface MethodInfo {
  name: string;
  isAbstract?: boolean;
  isOverridden?: boolean;
  returnType: string;
  params: string;
  description: string;
}

export interface AircraftInstance {
  id: string;
  nodeId: string;
  model: string;
  callsign: string;
  type: "passenger" | "cargo";
  passengerNum?: number;
  cargoWeightKg?: number;
}

// Class hierarchy definition
export const classHierarchy: FlightNode[] = [
  {
    id: "FlightADT",
    label: "FlightADT",
    type: "adt",
    description: "추상 기반 클래스 (Abstract Base Class)\nabc.ABC를 상속받아 모든 항공기 타입의\n공통 인터페이스를 정의합니다.",
    isAbstract: true,
    methods: [
      { name: "location", isAbstract: true, returnType: "str", params: "", description: "항공기 현재 위치 반환 (추상 프로퍼티)" },
      { name: "callsign", isAbstract: true, returnType: "str", params: "", description: "항공기 편명 반환 (추상 프로퍼티)" },
      { name: "boarding", isAbstract: true, returnType: "None", params: "gate_number: int", description: "승객 탑승 또는 화물 적재 (추상 메서드)" },
      { name: "taxiing", isAbstract: true, returnType: "None", params: "", description: "활주로로 이동 (추상 메서드)" },
      { name: "take_off", isAbstract: true, returnType: "None", params: "", description: "항공기 이륙 (추상 메서드)" },
    ],
  },
  {
    id: "CommercialAircraft",
    label: "CommercialAircraft",
    type: "base",
    description: "상업용 항공기 기본 클래스\nFlightADT를 구현하며 공통 로직을\n제공합니다. 위치와 편명을 캡슐화합니다.",
    parentId: "FlightADT",
    methods: [
      { name: "__init__", returnType: "None", params: "model, callsign", description: "항공기 초기화 (위치: Hangar)" },
      { name: "location", isOverridden: true, returnType: "str", params: "", description: "현재 위치 반환 (구현됨)" },
      { name: "callsign", isOverridden: true, returnType: "str", params: "", description: "편명 반환 (구현됨)" },
      { name: "boarding", isOverridden: true, returnType: "None", params: "gate_number: int", description: "GATE 위치로 이동 후 보딩 시작" },
      { name: "taxiing", isOverridden: true, returnType: "None", params: "", description: "Runway로 이동" },
      { name: "take_off", isOverridden: true, returnType: "None", params: "", description: "Runway에서 이륙" },
    ],
  },
  {
    id: "PassengerAircraft",
    label: "PassengerAircraft",
    type: "passenger",
    description: "여객기 클래스\n승객 수(passenger_num)를 추가로 관리하며\nboarding과 take_off를 오버라이딩합니다.",
    parentId: "CommercialAircraft",
    methods: [
      { name: "__init__", returnType: "None", params: "model, callsign, passenger_num", description: "여객기 초기화 (승객 수 포함)" },
      { name: "boarding", isOverridden: true, returnType: "None", params: "gate_number: int", description: "super().boarding() 호출 후 승객 탑승 메시지 출력" },
      { name: "take_off", isOverridden: true, returnType: "None", params: "", description: "super().take_off() 호출 후 승객 수와 함께 이륙 메시지" },
    ],
  },
  {
    id: "CargoAircraft",
    label: "CargoAircraft",
    type: "cargo",
    description: "화물기 클래스\n화물 무게(cargo_weight_kg)를 추가로 관리하며\nboarding과 take_off를 오버라이딩합니다.",
    parentId: "CommercialAircraft",
    methods: [
      { name: "__init__", returnType: "None", params: "model, callsign, cargo_weight_kg", description: "화물기 초기화 (화물 중량 포함)" },
      { name: "boarding", isOverridden: true, returnType: "None", params: "gate_number: int", description: "super().boarding() 호출 후 화물 적재 메시지 출력" },
      { name: "take_off", isOverridden: true, returnType: "None", params: "", description: "super().take_off() 호출 후 화물 중량 포함 이륙 메시지" },
    ],
  },
];

// Aircraft fleet instances
export const fleetData: AircraftInstance[] = [
  { id: "oz712", nodeId: "PassengerAircraft", model: "Boeing 747", callsign: "OZ712", type: "passenger", passengerNum: 416 },
  { id: "ke195f", nodeId: "CargoAircraft", model: "Airbus A330F", callsign: "KE195F", type: "cargo", cargoWeightKg: 70000 },
  { id: "7z1987", nodeId: "PassengerAircraft", model: "Boeing 737", callsign: "7Z1987", type: "passenger", passengerNum: 120 },
  { id: "ke085f", nodeId: "CargoAircraft", model: "Boeing 777F", callsign: "KE085F", type: "cargo", cargoWeightKg: 32400 },
];

export const nodeColors: Record<NodeType, { border: string; glow: string; text: string; badge: string }> = {
  adt:       { border: "#3b82f6", glow: "rgba(59,130,246,0.5)",   text: "#93c5fd", badge: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  base:      { border: "#10b981", glow: "rgba(16,185,129,0.5)",   text: "#6ee7b7", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  passenger: { border: "#a78bfa", glow: "rgba(167,139,250,0.5)",  text: "#c4b5fd", badge: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
  cargo:     { border: "#f59e0b", glow: "rgba(245,158,11,0.5)",   text: "#fcd34d", badge: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
};
