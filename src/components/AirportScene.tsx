"use client";
import { useState, useEffect } from "react";
import { ScenePlane } from "./PlaneIcons";

interface AirportSceneProps {
  phase: "idle" | "boarding" | "taxiing" | "takeoff" | "airborne";
  aircraftType: "passenger" | "cargo";
  callsign: string;
  model: string;
  gateNumber?: number;
  passengerNum?: number;
  cargoWeightKg?: number;
  onPhaseComplete?: (nextPhase: string) => void;
}

export function AirportScene({
  phase,
  aircraftType,
  callsign,
  model,
  gateNumber = 7,
  passengerNum,
  cargoWeightKg,
  onPhaseComplete,
}: AirportSceneProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 100);
    return () => clearInterval(interval);
  }, []);

  // Runway dashes offset for animation
  const dashOffset = (tick * 8) % 60;

  const isPassenger = aircraftType === "passenger";

  // Plane position based on phase
  const planeX = phase === "idle" || phase === "boarding" ? 80 : phase === "taxiing" ? 200 : 350;
  const planeY = phase === "takeoff" ? 110 : phase === "airborne" ? 40 : 148;
  const planeRotate = phase === "takeoff" ? -12 : phase === "airborne" ? -20 : 0;
  const planeScale = phase === "airborne" ? 0.6 : 1;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ height: 320, background: "linear-gradient(to bottom, #050d1a 0%, #0a1628 35%, #0f2040 55%, #1a2744 70%, #1f2937 100%)" }}>

      {/* Sky gradient layers */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,13,26,0.9) 0%, rgba(10,22,40,0.6) 40%, transparent 100%)" }} />

      {/* City skyline silhouette */}
      <svg className="absolute bottom-[80px] left-0 w-full" height="100" viewBox="0 0 800 100" preserveAspectRatio="none">
        <path d="M0 100 L0 70 L30 70 L30 50 L50 50 L50 60 L70 60 L70 30 L90 30 L90 60 L110 60 L110 45 L130 45 L130 65 L160 65 L160 40 L175 40 L175 20 L190 20 L190 40 L210 40 L210 60 L230 60 L230 50 L250 50 L250 35 L265 35 L265 50 L290 50 L290 70 L320 70 L320 45 L340 45 L340 30 L355 30 L355 45 L375 45 L375 65 L400 65 L400 50 L425 50 L425 70 L450 70 L450 55 L470 55 L470 40 L485 40 L485 55 L510 55 L510 70 L535 70 L535 50 L555 50 L555 35 L570 35 L570 50 L600 50 L600 65 L630 65 L630 48 L650 48 L650 32 L665 32 L665 48 L690 48 L690 65 L720 65 L720 50 L745 50 L745 70 L780 70 L780 100 Z"
          fill="rgba(15,32,64,0.8)" />
      </svg>

      {/* Control tower */}
      <svg className="absolute bottom-[80px] right-[80px]" width="40" height="100" viewBox="0 0 40 100">
        <rect x="16" y="20" width="8" height="60" fill="#1e3a5f" />
        <rect x="10" y="15" width="20" height="8" rx="1" fill="#2563eb" fillOpacity="0.8" />
        <rect x="12" y="8" width="16" height="8" rx="1" fill="#1d4ed8" fillOpacity="0.7" />
        <circle cx="20" cy="4" r="3" fill="#f59e0b" fillOpacity="0.9" />
        {/* Blinking light */}
        <circle cx="20" cy="4" r="3" fill="#f59e0b" fillOpacity={tick % 10 < 5 ? 1 : 0} />
        <rect x="4" y="20" width="32" height="2" fill="#374151" />
      </svg>

      {/* Terminal building */}
      <svg className="absolute bottom-[80px] left-[10px]" width="120" height="80" viewBox="0 0 120 80">
        <rect x="0" y="20" width="120" height="60" fill="#0f2040" />
        <rect x="0" y="20" width="120" height="4" fill="#1e3a5f" />
        {/* Windows */}
        {[10, 25, 40, 55, 70, 85, 100].map((x) => (
          <rect key={x} x={x} y="28" width="10" height="8" rx="1" fill="#fbbf24" fillOpacity="0.3" />
        ))}
        {[10, 25, 40, 55, 70, 85, 100].map((x) => (
          <rect key={x + "b"} x={x} y="42" width="10" height="8" rx="1" fill="#93c5fd" fillOpacity="0.2" />
        ))}
        {/* Gate sign */}
        <rect x="10" y="58" width="40" height="16" rx="2" fill="#1e3a5f" />
        <text x="30" y="70" textAnchor="middle" fill="#fbbf24" fontSize="8" fontFamily="monospace">GATE {gateNumber}</text>
        {/* Jetbridge */}
        <rect x="52" y="50" width="35" height="6" rx="1" fill="#374151" />
      </svg>

      {/* Ground / tarmac */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px]" style={{ background: "linear-gradient(to bottom, #1f2937, #111827)" }} />

      {/* Runway markings */}
      <svg className="absolute bottom-0 left-0 w-full" height="80" viewBox="0 0 800 80" preserveAspectRatio="none">
        {/* Runway surface */}
        <rect x="0" y="20" width="800" height="40" fill="#1f2937" />
        <rect x="0" y="20" width="800" height="2" fill="#374151" />
        <rect x="0" y="58" width="800" height="2" fill="#374151" />
        {/* Center dashes — animated */}
        {Array.from({ length: 15 }, (_, i) => (
          <rect
            key={i}
            x={(i * 60) - dashOffset + 20}
            y="37"
            width="35"
            height="4"
            fill="white"
            fillOpacity="0.4"
          />
        ))}
        {/* Taxiway */}
        <line x1="0" y1="18" x2="800" y2="18" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="10 8" />
      </svg>

      {/* === Animations per phase === */}

      {/* BOARDING: People walking in */}
      {phase === "boarding" && isPassenger && (
        <div className="absolute bottom-[80px] left-[85px] flex gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              width="12"
              height="24"
              viewBox="0 0 12 24"
              className="walking-person"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: "1.4s" }}
            >
              {/* Head */}
              <circle cx="6" cy="4" r="3" fill="#fbbf24" />
              {/* Body */}
              <rect x="3" y="7" width="6" height="8" rx="1" fill="#93c5fd" />
              {/* Legs alternating */}
              <line x1="5" y1="15" x2={i % 2 === 0 ? 3 : 5} y2="23" stroke="#93c5fd" strokeWidth="2" />
              <line x1="7" y1="15" x2={i % 2 === 0 ? 9 : 7} y2="23" stroke="#93c5fd" strokeWidth="2" />
              {/* Luggage */}
              <rect x="8" y="12" width="5" height="4" rx="0.5" fill="#6b7280" />
            </svg>
          ))}
        </div>
      )}

      {/* BOARDING: Cargo boxes being loaded */}
      {phase === "boarding" && !isPassenger && (
        <div className="absolute bottom-[80px] left-[60px] flex items-end gap-1">
          {Array.from({ length: 4 }, (_, i) => (
            <svg
              key={i}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className="cargo-box"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <rect x="1" y="1" width="18" height="18" rx="2" fill="#f59e0b" fillOpacity="0.8" stroke="#fcd34d" strokeWidth="0.5" />
              <line x1="10" y1="1" x2="10" y2="19" stroke="#fcd34d" strokeWidth="0.5" strokeOpacity="0.5" />
              <line x1="1" y1="10" x2="19" y2="10" stroke="#fcd34d" strokeWidth="0.5" strokeOpacity="0.5" />
            </svg>
          ))}
          {/* Forklift */}
          <svg width="30" height="28" viewBox="0 0 30 28">
            <rect x="5" y="10" width="16" height="14" rx="1" fill="#374151" />
            <rect x="0" y="18" width="5" height="6" rx="0.5" fill="#4b5563" />
            <rect x="0" y="20" width="30" height="3" rx="0.5" fill="#6b7280" />
            <circle cx="8" cy="25" r="3" fill="#1f2937" stroke="#6b7280" strokeWidth="1" />
            <circle cx="20" cy="25" r="3" fill="#1f2937" stroke="#6b7280" strokeWidth="1" />
          </svg>
        </div>
      )}

      {/* Animated plane */}
      <div
        className="absolute transition-all"
        style={{
          left: planeX,
          bottom: planeY,
          transform: `rotate(${planeRotate}deg) scale(${planeScale})`,
          transition: phase === "taxiing"
            ? "left 1.5s ease-in-out, bottom 0.3s"
            : phase === "takeoff"
            ? "left 2s ease-in, bottom 2s ease-in, transform 2s ease-in, opacity 1s 1.5s"
            : "all 0.5s",
          opacity: phase === "airborne" ? 0 : 1,
        }}
      >
        <ScenePlane type={aircraftType} phase={phase} />
      </div>

      {/* Takeoff thrust fire */}
      {phase === "takeoff" && (
        <div
          className="absolute"
          style={{ left: planeX - 20, bottom: planeY + 34 }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 8 - i * 2,
                height: 8 - i * 2,
                background: ["#ef4444", "#f97316", "#fbbf24"][i],
                left: -i * 6,
                top: "50%",
                transform: "translateY(-50%)",
                opacity: 0.8 - i * 0.2,
                filter: "blur(1px)",
              }}
            />
          ))}
        </div>
      )}

      {/* Phase label overlay */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <div className="glass-panel rounded-lg px-3 py-1.5 text-xs font-mono text-amber-300 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          {callsign} · {model}
        </div>
        <div className="glass-panel rounded-lg px-3 py-1.5 text-xs font-mono">
          <span className={
            phase === "idle" ? "text-gray-400"
            : phase === "boarding" ? "text-violet-300"
            : phase === "taxiing" ? "text-teal-300"
            : "text-red-300"
          }>
            {phase === "idle" ? "🛫 HANGAR"
              : phase === "boarding" ? "🚪 BOARDING"
              : phase === "taxiing" ? "🛣️ TAXIING"
              : phase === "takeoff" ? "🚀 TAKE OFF"
              : "✈️ AIRBORNE"}
          </span>
        </div>
      </div>

      {/* Stat badges */}
      <div className="absolute bottom-[88px] right-4 flex flex-col gap-1 items-end">
        {isPassenger && passengerNum && (
          <div className="glass-panel rounded px-2 py-1 text-xs font-mono text-violet-300">
            👤 {passengerNum.toLocaleString()} PAX
          </div>
        )}
        {!isPassenger && cargoWeightKg && (
          <div className="glass-panel rounded px-2 py-1 text-xs font-mono text-amber-300">
            📦 {cargoWeightKg.toLocaleString()} kg
          </div>
        )}
      </div>

    </div>
  );
}
