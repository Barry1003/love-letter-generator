"use client";
import { useEffect, useState } from "react";

/** Ambient floating hearts. Rendered only on the client to avoid hydration noise. */
export function Hearts({ count = 14, color = "#e8779a" }: { count?: number; color?: string }) {
  const [items, setItems] = useState<{ left: number; size: number; dur: number; delay: number; op: number }[]>([]);
  useEffect(() => {
    setItems(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 10 + Math.random() * 22,
        dur: 8 + Math.random() * 10,
        delay: Math.random() * 8,
        op: 0.08 + Math.random() * 0.3,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {items.map((h, i) => (
        <span
          key={i}
          className="absolute bottom-[-30px]"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            color,
            opacity: h.op,
            animation: `rise ${h.dur}s linear ${h.delay}s infinite`,
          }}
        >
          ❤
        </span>
      ))}
      <style>{`@keyframes rise{to{transform:translateY(-110vh) rotate(360deg);opacity:0}}`}</style>
    </div>
  );
}
