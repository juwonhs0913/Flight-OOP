"use client";

interface PlaneProps {
  color?: string;
  size?: number;
  className?: string;
  direction?: "right" | "left" | "up";
}

export function PassengerPlaneIcon({ color = "#a78bfa", size = 48, className = "" }: PlaneProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fuselage */}
      <ellipse cx="32" cy="32" rx="22" ry="8" fill={color} fillOpacity="0.9" />
      {/* Nose */}
      <path d="M54 32 C60 31, 63 32, 60 33 Z" fill={color} />
      {/* Tail */}
      <path d="M10 32 C6 28, 4 24, 8 25 L10 32 Z" fill={color} />
      <path d="M10 32 C6 36, 4 40, 8 39 L10 32 Z" fill={color} />
      {/* Main wings */}
      <path d="M36 32 L44 14 L46 14 L42 32 Z" fill={color} fillOpacity="0.85" />
      <path d="M36 32 L44 50 L46 50 L42 32 Z" fill={color} fillOpacity="0.85" />
      {/* Small tail wings */}
      <path d="M12 31 L8 24 L10 24 L14 31 Z" fill={color} fillOpacity="0.7" />
      <path d="M12 33 L8 40 L10 40 L14 33 Z" fill={color} fillOpacity="0.7" />
      {/* Windows */}
      <rect x="22" y="29.5" width="3" height="3" rx="1" fill="white" fillOpacity="0.6" />
      <rect x="28" y="29.5" width="3" height="3" rx="1" fill="white" fillOpacity="0.6" />
      <rect x="34" y="29.5" width="3" height="3" rx="1" fill="white" fillOpacity="0.6" />
      <rect x="40" y="29.5" width="3" height="3" rx="1" fill="white" fillOpacity="0.6" />
      {/* Engine nacelle */}
      <ellipse cx="38" cy="20" rx="4" ry="2.5" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="0.5" />
      <ellipse cx="38" cy="44" rx="4" ry="2.5" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="0.5" />
    </svg>
  );
}

export function CargoPlaneIcon({ color = "#f59e0b", size = 48, className = "" }: PlaneProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bulky fuselage */}
      <ellipse cx="32" cy="32" rx="22" ry="11" fill={color} fillOpacity="0.85" />
      {/* Cargo nose (upswept) */}
      <path d="M54 30 C62 27, 64 32, 60 35 L54 34 Z" fill={color} />
      {/* Tail */}
      <path d="M10 29 C5 22, 3 18, 8 20 L10 29 Z" fill={color} />
      <path d="M10 35 C5 42, 3 46, 8 44 L10 35 Z" fill={color} />
      {/* High wings */}
      <path d="M34 25 L44 8 L46 8 L40 25 Z" fill={color} fillOpacity="0.8" />
      <path d="M34 39 L44 56 L46 56 L40 39 Z" fill={color} fillOpacity="0.8" />
      {/* Cargo door outline */}
      <rect x="18" y="26" width="16" height="12" rx="1" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="26" y1="26" x2="26" y2="38" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
      {/* Four engines */}
      <ellipse cx="36" cy="14" rx="4" ry="2" fill={color} fillOpacity="0.55" stroke={color} strokeWidth="0.5" />
      <ellipse cx="41" cy="11" rx="3" ry="1.8" fill={color} fillOpacity="0.55" stroke={color} strokeWidth="0.5" />
      <ellipse cx="36" cy="50" rx="4" ry="2" fill={color} fillOpacity="0.55" stroke={color} strokeWidth="0.5" />
      <ellipse cx="41" cy="53" rx="3" ry="1.8" fill={color} fillOpacity="0.55" stroke={color} strokeWidth="0.5" />
      {/* Company stripe */}
      <line x1="12" y1="32" x2="52" y2="32" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
    </svg>
  );
}

export function AbstractPlaneIcon({ color = "#3b82f6", size = 48, className = "" }: PlaneProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dashed outline — abstract */}
      <ellipse cx="32" cy="32" rx="22" ry="8" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M54 32 C60 31, 63 32, 60 33" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M10 32 C6 28, 4 24, 8 25 L10 32 Z" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" fill="none"/>
      <path d="M10 32 C6 36, 4 40, 8 39 L10 32 Z" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" fill="none"/>
      <path d="M36 32 L44 14 L46 14 L42 32" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" fill="none"/>
      <path d="M36 32 L44 50 L46 50 L42 32" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" fill="none"/>
      {/* Center abstract dot */}
      <circle cx="32" cy="32" r="4" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1" />
    </svg>
  );
}

export function CommercialPlaneIcon({ color = "#10b981", size = 48, className = "" }: PlaneProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="32" cy="32" rx="22" ry="8" fill={color} fillOpacity="0.7" />
      <path d="M54 32 C60 31, 63 32, 60 33 Z" fill={color} />
      <path d="M10 32 C6 28, 4 24, 8 25 L10 32 Z" fill={color} fillOpacity="0.7" />
      <path d="M10 32 C6 36, 4 40, 8 39 L10 32 Z" fill={color} fillOpacity="0.7" />
      <path d="M36 32 L44 14 L46 14 L42 32 Z" fill={color} fillOpacity="0.6" />
      <path d="M36 32 L44 50 L46 50 L42 32 Z" fill={color} fillOpacity="0.6" />
      <path d="M12 31 L8 24 L10 24 L14 31 Z" fill={color} fillOpacity="0.5" />
      <path d="M12 33 L8 40 L10 40 L14 33 Z" fill={color} fillOpacity="0.5" />
      {/* Window stripe */}
      <line x1="18" y1="31" x2="50" y2="31" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
      {/* Engine */}
      <ellipse cx="39" cy="20" rx="4" ry="2.2" fill={color} fillOpacity="0.5" />
      <ellipse cx="39" cy="44" rx="4" ry="2.2" fill={color} fillOpacity="0.5" />
    </svg>
  );
}

// Large scene plane for the airport view
export function ScenePlane({ type, phase, className = "" }: { type: "passenger" | "cargo"; phase: string; className?: string }) {
  const isPassenger = type === "passenger";
  const color = isPassenger ? "#c4b5fd" : "#fcd34d";

  return (
    <svg
      width="200"
      height="80"
      viewBox="0 0 200 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fuselage */}
      <ellipse cx="100" cy="40" rx="75" ry={isPassenger ? 16 : 20} fill={color} fillOpacity="0.9" />

      {/* Nose */}
      <path d="M175 40 C195 38, 200 40, 196 42 Z" fill={color} />

      {/* Tail fins */}
      <path d="M28 37 C18 20, 14 12, 22 15 L28 37 Z" fill={color} fillOpacity="0.8" />
      <path d="M28 43 C18 60, 14 68, 22 65 L28 43 Z" fill={color} fillOpacity="0.8" />

      {/* Wings */}
      <path d="M115 40 L145 4 L150 4 L135 40 Z" fill={color} fillOpacity="0.8" />
      <path d="M115 40 L145 76 L150 76 L135 40 Z" fill={color} fillOpacity="0.8" />

      {/* Windows (passenger only) */}
      {isPassenger && [60, 75, 90, 105, 120, 135, 150].map((x) => (
        <rect key={x} x={x} y="36" width="8" height="7" rx="2" fill="white" fillOpacity="0.5" />
      ))}

      {/* Cargo door */}
      {!isPassenger && (
        <>
          <rect x="55" y="28" width="40" height="22" rx="2" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="75" y1="28" x2="75" y2="50" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
        </>
      )}

      {/* Engines */}
      <ellipse cx="128" cy="13" rx="10" ry="5" fill={color} fillOpacity="0.6" />
      <ellipse cx="128" cy="67" rx="10" ry="5" fill={color} fillOpacity="0.6" />

      {/* Engine exhaust when taxiing/takeoff */}
      {(phase === "taxiing" || phase === "takeoff") && (
        <>
          <circle cx="18" cy="40" r="6" fill="#ef4444" fillOpacity="0.4" />
          <circle cx="10" cy="40" r="4" fill="#f97316" fillOpacity="0.3" />
          <circle cx="4" cy="40" r="2" fill="#fbbf24" fillOpacity="0.2" />
        </>
      )}
    </svg>
  );
}
