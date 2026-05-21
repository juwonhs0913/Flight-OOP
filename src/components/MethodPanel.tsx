"use client";
import { FlightNode, nodeColors } from "@/lib/flightData";

interface MethodPanelProps {
  node: FlightNode;
}

export function MethodPanel({ node }: MethodPanelProps) {
  const colors = nodeColors[node.type];

  return (
    <div className="glass-panel rounded-2xl p-5 h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div>
          <div className="font-mono text-xs text-gray-400 mb-0.5">
            class
          </div>
          <h2
            className="font-mono text-xl font-bold"
            style={{ color: colors.text }}
          >
            {node.label}
          </h2>
          {node.parentId && (
            <div className="font-mono text-xs text-gray-400 mt-0.5">
              extends{" "}
              <span style={{ color: nodeColors["base"].text }}>
                {node.parentId}
              </span>
            </div>
          )}
          {node.isAbstract && (
            <div className="font-mono text-xs text-blue-400 mt-0.5">
              (ABC — 직접 인스턴스화 불가)
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div
        className="text-xs font-mono leading-relaxed p-3 rounded-lg whitespace-pre-line"
        style={{
          background: colors.border + "10",
          borderLeft: `2px solid ${colors.border}`,
          color: "#9ca3af",
        }}
      >
        {node.description}
      </div>

      {/* Methods */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">
          Methods & Properties
        </div>
        {node.methods.map((method) => (
          <div
            key={method.name}
            className="rounded-lg p-3 transition-all"
            style={{
              background: colors.border + "0d",
              border: `0.5px solid ${colors.border}30`,
            }}
          >
            <div className="flex items-center gap-2 flex-wrap">
              {/* Badge */}
              <span
                className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                style={{
                  background: method.isAbstract
                    ? "#3b82f620"
                    : method.isOverridden
                    ? "#10b98120"
                    : "#6b728020",
                  color: method.isAbstract
                    ? "#93c5fd"
                    : method.isOverridden
                    ? "#6ee7b7"
                    : "#9ca3af",
                }}
              >
                {method.isAbstract ? "abstract" : method.isOverridden ? "@override" : "def"}
              </span>

              {/* Signature */}
              <code className="text-xs" style={{ color: colors.text }}>
                {method.name}
                {method.params ? `(${method.params})` : "()"}
                {" → "}
                <span className="text-teal-400">{method.returnType}</span>
              </code>
            </div>
            <p className="text-[11px] text-gray-500 mt-1 ml-0.5">
              {method.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
