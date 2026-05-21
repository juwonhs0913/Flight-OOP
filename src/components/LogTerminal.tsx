"use client";
import { useEffect, useRef } from "react";

export interface LogEntry {
  id: number;
  text: string;
  type: "info" | "success" | "warning" | "system";
  timestamp: string;
}

interface LogTerminalProps {
  entries: LogEntry[];
}

export function LogTerminal({ entries }: LogTerminalProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  const colors = {
    info: "text-teal-300",
    success: "text-emerald-400",
    warning: "text-amber-300",
    system: "text-blue-300",
  };

  const prefixes = {
    info: "→",
    success: "✓",
    warning: "!",
    system: "$",
  };

  return (
    <div className="glass-panel rounded-2xl p-4 flex flex-col gap-2 h-full">
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-1">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-amber-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="font-mono text-xs text-gray-500 ml-2">flight_simulator.py — output</span>
      </div>

      {/* Log content */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-1 min-h-0">
        {entries.length === 0 && (
          <div className="text-xs font-mono text-gray-600 italic pt-2">
            # 클래스 노드를 클릭하여 시뮬레이션을 시작하세요...
          </div>
        )}
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="log-entry flex gap-2 font-mono text-xs leading-relaxed"
          >
            <span className="text-gray-600 shrink-0 w-16 text-right">
              {entry.timestamp}
            </span>
            <span className={`shrink-0 ${colors[entry.type]}`}>
              {prefixes[entry.type]}
            </span>
            <span className={colors[entry.type]}>{entry.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
