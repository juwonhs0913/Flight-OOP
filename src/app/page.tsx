"use client";

import { useState, useCallback, useEffect } from "react";
import { StarsBackground } from "@/components/StarsBackground";
import { ClassNode } from "@/components/ClassNode";
import { AirportScene } from "@/components/AirportScene";
import { MethodPanel } from "@/components/MethodPanel";
import { LogTerminal, LogEntry } from "@/components/LogTerminal";
import {
  classHierarchy,
  fleetData,
  FlightNode,
  AircraftInstance,
  AnimationPhase,
} from "@/lib/flightData";

let logId = 0;
function makeLog(text: string, type: LogEntry["type"] = "info"): LogEntry {
  return {
    id: logId++,
    text,
    type,
    timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
  };
}

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<FlightNode | null>(null);
  const [selectedAircraft, setSelectedAircraft] = useState<AircraftInstance | null>(null);
  const [phase, setPhase] = useState<AnimationPhase>("idle");
  const [logs, setLogs] = useState<LogEntry[]>([
    makeLog("Flight OOP Simulator 초기화 완료", "system"),
    makeLog("클래스 노드를 클릭하여 다형성 시뮬레이션을 시작하세요", "system"),
  ]);
  const [gateNumber, setGateNumber] = useState(7);
  const [isSimulating, setIsSimulating] = useState(false);

  const addLog = useCallback((...entries: LogEntry[]) => {
    setLogs((prev) => [...prev.slice(-60), ...entries]);
  }, []);

  const addLogText = useCallback((text: string, type: LogEntry["type"] = "info") => {
    setLogs((prev) => [...prev.slice(-60), makeLog(text, type)]);
  }, []);

  // Run the flight simulation sequence
  const runSimulation = useCallback(
    async (aircraft: AircraftInstance, gate: number) => {
      if (isSimulating) return;
      setIsSimulating(true);
      setPhase("idle");

      const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
      const isPassenger = aircraft.type === "passenger";

      // System log: class instantiation
      addLog(
        makeLog(`>>> ${aircraft.nodeId}("${aircraft.model}", "${aircraft.callsign}"${isPassenger ? `, passenger_num=${aircraft.passengerNum}` : `, cargo_weight_kg=${aircraft.cargoWeightKg}`})`, "system"),
        makeLog(`위치: Hangar → 시뮬레이션 시작`, "info"),
      );

      await delay(800);

      // ── BOARDING ──
      setPhase("boarding");
      addLog(
        makeLog(`[${aircraft.callsign} / ${aircraft.model}] ${gate}번 GATE에서 보딩을 시작합니다.`, "info"),
      );

      if (isPassenger && aircraft.passengerNum) {
        addLogText(
          `[${aircraft.callsign} / ${aircraft.model}] 승객 ${aircraft.passengerNum.toLocaleString()}명이 탑승 게이트를 통해 탑승 중입니다.`,
          "success"
        );
      } else if (!isPassenger && aircraft.cargoWeightKg) {
        addLogText(
          `[${aircraft.callsign} / ${aircraft.model}] ${aircraft.cargoWeightKg.toLocaleString()}kg 화물을 적재 공간에 싣습니다.`,
          "warning"
        );
      }

      await delay(2800);

      // ── TAXIING ──
      setPhase("taxiing");
      addLogText(
        `[${aircraft.callsign} / ${aircraft.model}] GATE에서 활주로로 이동합니다.`,
        "info"
      );
      addLogText(`taxiing() 호출 → location = "Runway"`, "system");

      await delay(2200);

      // ── TAKE OFF ──
      setPhase("takeoff");
      addLogText(
        `[${aircraft.callsign} / ${aircraft.model}] Runway에서 이륙하여 출발합니다.`,
        "info"
      );

      if (isPassenger && aircraft.passengerNum) {
        addLogText(
          `[${aircraft.callsign} / ${aircraft.model}] ${aircraft.passengerNum.toLocaleString()}명의 승객과 함께 이륙합니다. 🛫`,
          "success"
        );
      } else if (!isPassenger && aircraft.cargoWeightKg) {
        addLogText(
          `[${aircraft.callsign} / ${aircraft.model}] ${aircraft.cargoWeightKg.toLocaleString()}kg의 화물을 싣고 이륙합니다. 🛫`,
          "success"
        );
      }

      await delay(2500);

      // ── AIRBORNE ──
      setPhase("airborne");
      addLogText(`[${aircraft.callsign}] 성공적으로 이륙 완료. `, "success");

      await delay(1500);
      setPhase("idle");
      setIsSimulating(false);
      addLogText("─────────────────────────────", "system");
    },
    [isSimulating, addLog, addLogText]
  );

  const handleNodeClick = useCallback(
    (node: FlightNode) => {
      setSelectedNode(node);

      if (node.type === "passenger" || node.type === "cargo") {
        // Pick a random aircraft of this type
        const fleet = fleetData.filter((a) => a.nodeId === node.id);
        const aircraft = fleet[Math.floor(Math.random() * fleet.length)];
        const gate = Math.floor(Math.random() * 30) + 1;
        setSelectedAircraft(aircraft);
        setGateNumber(gate);
        addLog(
          makeLog(`━━━ ${node.label} 선택됨 ━━━`, "system"),
          makeLog(`항공기: ${aircraft.model} (${aircraft.callsign})`, "info"),
          makeLog(`배정 게이트: ${gate}번`, "info"),
        );
        if (!isSimulating) {
          setTimeout(() => runSimulation(aircraft, gate), 300);
        }
      } else {
        // ADT or base — just show info
        setSelectedAircraft(null);
        setPhase("idle");
        addLog(
          makeLog(`━━━ ${node.label} 선택됨 ━━━`, "system"),
          makeLog(
            node.isAbstract
              ? "추상 클래스: 직접 인스턴스화 불가. 메서드 구현체 없음."
              : "기반 클래스: 공통 구현을 제공. 하위 클래스에서 오버라이딩 가능.",
            "info"
          ),
        );
      }
    },
    [isSimulating, addLog, runSimulation]
  );

  // Pick aircraft that matches selected node for scene display
  const sceneAircraft =
    selectedAircraft ??
    fleetData.find((a) => a.nodeId === "PassengerAircraft")!;

  // Build hierarchy layout: row 1 = ADT, row 2 = Base, row 3 = Passenger + Cargo
  const adtNode = classHierarchy.find((n) => n.id === "FlightADT")!;
  const baseNode = classHierarchy.find((n) => n.id === "CommercialAircraft")!;
  const passengerNode = classHierarchy.find((n) => n.id === "PassengerAircraft")!;
  const cargoNode = classHierarchy.find((n) => n.id === "CargoAircraft")!;

  return (
    <div className="min-h-screen relative" style={{ background: "var(--sky-deep)" }}>
      <StarsBackground />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 py-8 flex flex-col gap-8">

        {/* ─── Header ─── */}
        <header className="text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 mb-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            2026 자료구조 과제 2 · OOP 다형성 시각화
          </div>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider shimmer-text mb-2">
            FLIGHT OOP
          </h1>
          <p className="text-gray-400 font-body text-sm max-w-lg mx-auto">
            Python 상속 구조를 공항 씬으로 시각화한 인터랙티브 데모.{" "}
            <span className="text-amber-300">클래스 노드를 클릭</span>하면 다형성 메서드가 실행됩니다.
          </p>
        </header>

        {/* ─── Main Layout ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">

          {/* Left: hierarchy + scene */}
          <div className="flex flex-col gap-6">

            {/* ─── Hierarchy diagram ─── */}
            <section className="glass-panel rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-5 rounded-full bg-blue-500" />
                <h2 className="font-mono text-sm text-gray-300 uppercase tracking-widest">Class Hierarchy</h2>
                <div className="flex gap-3 ml-auto text-[10px] font-mono text-gray-500 flex-wrap">
                  <span>⬚ abstract</span>
                  <span>↑ @override</span>
                  <span>• def</span>
                </div>
              </div>

              {/* Tree layout */}
              <div className="flex flex-col items-center gap-0">

                {/* Row 1: ADT */}
                <div className="flex justify-center">
                  <ClassNode
                    node={adtNode}
                    isSelected={selectedNode?.id === adtNode.id}
                    onClick={() => handleNodeClick(adtNode)}
                  />
                </div>

                {/* Connector: ADT → Base */}
                <div className="flex flex-col items-center gap-0 my-1">
                  <div className="w-px h-6 bg-blue-500/40" />
                  <div className="text-blue-400 text-[10px] font-mono px-2 py-0.5 rounded border border-blue-500/20 bg-blue-500/5">
                    extends
                  </div>
                  <div className="w-px h-6 bg-blue-500/40" />
                </div>

                {/* Row 2: Commercial */}
                <div className="flex justify-center">
                  <ClassNode
                    node={baseNode}
                    isSelected={selectedNode?.id === baseNode.id}
                    onClick={() => handleNodeClick(baseNode)}
                  />
                </div>

                {/* Connector: Base → children */}
                <div className="relative flex items-start justify-center w-full" style={{ height: 60 }}>
                  {/* Vertical stem */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-6 bg-emerald-500/40" />
                  {/* Horizontal bar */}
                  <div className="absolute top-6 w-[45%] h-px bg-emerald-500/40" style={{ left: "27.5%" }} />
                  {/* Left branch */}
                  <div className="absolute w-px bg-emerald-500/40" style={{ left: "27.5%", top: 24, height: 36 }} />
                  {/* Right branch */}
                  <div className="absolute w-px bg-emerald-500/40" style={{ right: "27.5%", top: 24, height: 36 }} />
                  {/* Labels */}
                  <span className="absolute text-[9px] font-mono text-emerald-500/60 top-7" style={{ left: "18%" }}>@override</span>
                  <span className="absolute text-[9px] font-mono text-emerald-500/60 top-7" style={{ right: "14%" }}>@override</span>
                </div>

                {/* Row 3: Passenger + Cargo */}
                <div className="flex justify-center gap-8 md:gap-16 w-full">
                  <ClassNode
                    node={passengerNode}
                    isSelected={selectedNode?.id === passengerNode.id}
                    onClick={() => handleNodeClick(passengerNode)}
                  />
                  <ClassNode
                    node={cargoNode}
                    isSelected={selectedNode?.id === cargoNode.id}
                    onClick={() => handleNodeClick(cargoNode)}
                  />
                </div>
              </div>

              {/* Fleet quick-pick */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-widest">Fleet Quick Launch</div>
                <div className="flex flex-wrap gap-2">
                  {fleetData.map((aircraft) => (
                    <button
                      key={aircraft.id}
                      onClick={() => {
                        const node = classHierarchy.find((n) => n.id === aircraft.nodeId)!;
                        setSelectedNode(node);
                        setSelectedAircraft(aircraft);
                        const gate = Math.floor(Math.random() * 30) + 1;
                        setGateNumber(gate);
                        if (!isSimulating) runSimulation(aircraft, gate);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:scale-105"
                      style={{
                        background: aircraft.type === "passenger" ? "#a78bfa15" : "#f59e0b15",
                        border: `1px solid ${aircraft.type === "passenger" ? "#a78bfa40" : "#f59e0b40"}`,
                        color: aircraft.type === "passenger" ? "#c4b5fd" : "#fcd34d",
                      }}
                      disabled={isSimulating}
                    >
                      {aircraft.type === "passenger" ? "✈" : "📦"} {aircraft.callsign}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── Airport Scene ─── */}
            {(selectedNode?.type === "passenger" || selectedNode?.type === "cargo") && selectedAircraft && (
              <section>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1 h-5 rounded-full bg-amber-500" />
                  <h2 className="font-mono text-sm text-gray-300 uppercase tracking-widest">Airport Simulation</h2>
                  <div className="ml-auto flex items-center gap-2">
                    {isSimulating && (
                      <span className="text-xs font-mono text-teal-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                        실행 중...
                      </span>
                    )}
                  </div>
                </div>
                <AirportScene
                  phase={phase}
                  aircraftType={sceneAircraft.type}
                  callsign={sceneAircraft.callsign}
                  model={sceneAircraft.model}
                  gateNumber={gateNumber}
                  passengerNum={sceneAircraft.passengerNum}
                  cargoWeightKg={sceneAircraft.cargoWeightKg}
                />
              </section>
            )}

            {/* Placeholder when no subclass selected */}
            {(!selectedNode || selectedNode.type === "adt" || selectedNode.type === "base") && (
              <div className="glass-panel rounded-2xl flex items-center justify-center" style={{ height: 200 }}>
                <div className="text-center text-gray-600 font-mono text-sm">
                  <div className="text-4xl mb-3 opacity-30">✈️</div>
                  <div>PassengerAircraft 또는 CargoAircraft를</div>
                  <div>클릭하면 공항 시뮬레이션이 실행됩니다</div>
                </div>
              </div>
            )}
          </div>

          {/* Right column: Method panel + log */}
          <div className="flex flex-col gap-4" style={{ minHeight: 0 }}>

            {/* Method details */}
            <div style={{ flex: "0 0 auto" }}>
              {selectedNode ? (
                <MethodPanel node={selectedNode} />
              ) : (
                <div className="glass-panel rounded-2xl p-6 flex items-center justify-center" style={{ height: 200 }}>
                  <p className="font-mono text-xs text-gray-600 text-center">
                    클래스 노드를 클릭하면<br />메서드 상세 정보가 표시됩니다
                  </p>
                </div>
              )}
            </div>

            {/* Log terminal */}
            <div style={{ flex: "1 1 0", minHeight: 260 }}>
              <LogTerminal entries={logs} />
            </div>
          </div>
        </div>

        {/* ─── Footer legend ─── */}
        <footer className="flex flex-wrap gap-4 justify-center text-[11px] font-mono text-gray-600 pb-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-blue-500/60" style={{ borderTop: "1px dashed" }} />
            FlightADT (ABC)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-emerald-500/60" />
            CommercialAircraft
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-violet-500/60" />
            PassengerAircraft
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-amber-500/60" />
            CargoAircraft
          </span>
          <span className="text-gray-700">·</span>
          <span>OOP 과제 2 · 2026 1학기</span>
        </footer>
      </div>
    </div>
  );
}
