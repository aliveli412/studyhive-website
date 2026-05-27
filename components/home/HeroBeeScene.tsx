import { Logo } from "@/components/ui/Logo";
import { HexCell } from "@/components/ui/HoneycombCells";

/** Honeycomb ring around the Study Hive logo — home hero visual */
const RING: Array<{ cx: number; cy: number; filled: boolean; opacity: string }> =
  [
    { cx: 200, cy: 72, filled: true, opacity: "opacity-95" },
    { cx: 288, cy: 123, filled: false, opacity: "opacity-50" },
    { cx: 288, cy: 225, filled: true, opacity: "opacity-75" },
    { cx: 200, cy: 276, filled: false, opacity: "opacity-45" },
    { cx: 112, cy: 225, filled: true, opacity: "opacity-85" },
    { cx: 112, cy: 123, filled: false, opacity: "opacity-55" },
    { cx: 248, cy: 72, filled: false, opacity: "opacity-40" },
    { cx: 152, cy: 72, filled: true, opacity: "opacity-70" },
    { cx: 72, cy: 174, filled: false, opacity: "opacity-35" },
    { cx: 328, cy: 174, filled: true, opacity: "opacity-65" },
  ];

const INNER: Array<{ cx: number; cy: number; filled: boolean }> = [
  { cx: 200, cy: 148, filled: false },
  { cx: 248, cy: 174, filled: true },
  { cx: 200, cy: 200, filled: true },
  { cx: 152, cy: 174, filled: false },
];

export function HeroBeeScene() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[420px]"
      aria-hidden="true"
    >
      <div className="absolute inset-[6%] rounded-[2rem] bg-gradient-to-br from-honey-100 via-cream to-honey-200 shadow-md ring-1 ring-cocoa-800/10" />

      <svg
        viewBox="0 0 400 400"
        className="relative z-[1] h-full w-full text-honey-500"
      >
        {RING.map((h, i) => (
          <HexCell
            key={`ring-${i}`}
            cx={h.cx}
            cy={h.cy}
            size={36}
            filled={h.filled}
            className={h.opacity}
          />
        ))}
        <g className="text-cocoa-700/25">
          {INNER.map((h, i) => (
            <HexCell
              key={`inner-${i}`}
              cx={h.cx}
              cy={h.cy}
              size={22}
              filled={h.filled}
              className={h.filled ? "opacity-60" : "opacity-100"}
            />
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 z-[2] flex items-center justify-center p-[18%]">
        <div className="rounded-full bg-cream/90 p-3 shadow-lg ring-2 ring-honey-500/25 md:p-4">
          <Logo
            size={280}
            priority
            className="h-auto w-full max-w-[220px] md:max-w-[260px]"
          />
        </div>
      </div>
    </div>
  );
}
