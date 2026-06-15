import Image from "next/image";
import Link from "next/link";
import { HexCell } from "@/components/ui/HoneycombCells";

/**
 * Compact bee + honeycomb mark for the home page header
 * (full logo lives in the hero below).
 */
export function HomeBrandMark() {
  const hexes: Array<{ cx: number; cy: number; filled: boolean }> = [
    { cx: 36, cy: 28, filled: true },
    { cx: 62, cy: 43, filled: false },
    { cx: 36, cy: 58, filled: true },
    { cx: 10, cy: 43, filled: false },
  ];

  return (
    <Link
      href="/"
      prefetch={false}
      aria-label="The Study Hive — home"
      className="group relative block h-14 w-[4.5rem] shrink-0 md:h-16 md:w-20"
    >
      <svg
        viewBox="0 0 72 72"
        className="h-full w-full text-honey-500 transition-transform duration-200 group-hover:scale-[1.03]"
        aria-hidden="true"
      >
        {hexes.map((h, i) => (
          <HexCell
            key={i}
            cx={h.cx}
            cy={h.cy}
            size={14}
            filled={h.filled}
            className={
              h.filled
                ? "opacity-90"
                : "text-cocoa-700/35 opacity-100"
            }
          />
        ))}
      </svg>
      <Image
        src="/bee-mark.png"
        alt=""
        width={120}
        height={120}
        className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 drop-shadow-sm md:h-10 md:w-10"
      />
    </Link>
  );
}
