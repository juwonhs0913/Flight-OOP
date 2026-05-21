"use client";

interface HierarchyConnectorProps {
  width?: number;
  height?: number;
}

// Draws the inheritance lines between nodes
export function HierarchyConnectors({ width = 800, height = 120 }: HierarchyConnectorProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="absolute inset-0 pointer-events-none"
    >
      <defs>
        <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6" fillOpacity="0.7" />
        </marker>
        <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#10b981" fillOpacity="0.7" />
        </marker>
        <filter id="glow-blue">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* FlightADT → CommercialAircraft: top center to center of level 2 */}
      <line
        x1={width / 2} y1={0}
        x2={width / 2} y2={height}
        stroke="#3b82f6"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        strokeDasharray="6 4"
        className="connector-line"
        markerEnd="url(#arrow-blue)"
        filter="url(#glow-blue)"
      />

      {/* CommercialAircraft → PassengerAircraft */}
      {/* from center-left of CommercialAircraft down-left */}
      <path
        d={`M ${width / 2} ${height / 2} L ${width * 0.25} ${height / 2} L ${width * 0.25} ${height}`}
        stroke="#10b981"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        strokeDasharray="6 4"
        fill="none"
        className="connector-line"
        markerEnd="url(#arrow-green)"
      />

      {/* CommercialAircraft → CargoAircraft */}
      <path
        d={`M ${width / 2} ${height / 2} L ${width * 0.75} ${height / 2} L ${width * 0.75} ${height}`}
        stroke="#10b981"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        strokeDasharray="6 4"
        fill="none"
        className="connector-line"
        markerEnd="url(#arrow-green)"
      />
    </svg>
  );
}
