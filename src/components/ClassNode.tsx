"use client";
import { FlightNode, nodeColors } from "@/lib/flightData";
import { AbstractPlaneIcon, CommercialPlaneIcon, PassengerPlaneIcon, CargoPlaneIcon } from "./PlaneIcons";

interface ClassNodeProps {
  node: FlightNode;
  isSelected: boolean;
  onClick: () => void;
}

const planeIconMap = {
  adt: AbstractPlaneIcon,
  base: CommercialPlaneIcon,
  passenger: PassengerPlaneIcon,
  cargo: CargoPlaneIcon,
};

const typeLabels = {
  adt: "Abstract",
  base: "Base Class",
  passenger: "Subclass",
  cargo: "Subclass",
};

export function ClassNode({ node, isSelected, onClick }: ClassNodeProps) {
  const colors = nodeColors[node.type];
  const PlaneIcon = planeIconMap[node.type];

  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center gap-2 p-4 rounded-2xl
        cursor-pointer select-none transition-all duration-300
        node-${node.type}
        ${isSelected ? "scale-105" : "hover:scale-102"}
      `}
      style={{
        border: `1.5px solid ${isSelected ? colors.border : colors.border + "88"}`,
        boxShadow: isSelected
          ? `0 0 40px ${colors.glow}, 0 0 80px ${colors.glow.replace("0.5", "0.2")}, inset 0 0 20px ${colors.glow.replace("0.5", "0.08")}`
          : `0 0 20px ${colors.glow.replace("0.5", "0.2")}`,
        minWidth: 140,
      }}
    >
      {/* Abstract badge */}
      {node.isAbstract && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono px-2 py-0.5 rounded-full border bg-blue-900/50 text-blue-300 border-blue-500/40 whitespace-nowrap">
          «abstract»
        </span>
      )}

      {/* Type badge */}
      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${colors.badge} whitespace-nowrap`}>
        {typeLabels[node.type]}
      </span>

      {/* Plane icon */}
      <PlaneIcon color={colors.border} size={52} className={isSelected ? "animate-float" : ""} />

      {/* Class name */}
      <div className="text-center">
        <div
          className="font-mono text-sm font-semibold leading-tight"
          style={{ color: colors.text }}
        >
          {node.label}
        </div>
      </div>

      {/* Method count pill */}
      <div className="flex gap-1 flex-wrap justify-center">
        {node.methods.slice(0, 3).map((m) => (
          <span
            key={m.name}
            className="text-[8px] font-mono px-1.5 py-0.5 rounded"
            style={{
              background: colors.border + "18",
              color: colors.text,
              border: `0.5px solid ${colors.border}44`,
            }}
          >
            {m.isAbstract ? "⬚" : m.isOverridden ? "↑" : "•"} {m.name}()
          </span>
        ))}
        {node.methods.length > 3 && (
          <span className="text-[8px] font-mono text-gray-500">
            +{node.methods.length - 3}
          </span>
        )}
      </div>

      {/* Click hint */}
      {!isSelected && (
        <div className="text-[9px] text-gray-500 font-mono mt-1">클릭하여 실행</div>
      )}
      {isSelected && (
        <div className="text-[9px] font-mono mt-1" style={{ color: colors.text }}>
          ▶ 선택됨
        </div>
      )}
    </button>
  );
}
