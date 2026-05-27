/**
 * Honeycomb section divider — used on the home page between the hero
 * and the rest of the content (per Bee's spec: "a honeycomb or bee
 * with a trail for the top in the same yellow"). Decorative only.
 */

export function HoneycombDivider({ className = "" }: { className?: string }) {
  // 9 hexagons in a row, alternating filled / outline for rhythm
  const hexagons = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div
      className={`flex items-center justify-center px-6 py-8 ${className}`}
      aria-hidden="true"
    >
      <svg
        width="280"
        height="40"
        viewBox="0 0 280 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {hexagons.map((i) => {
          const x = i * 30 + 4;
          return (
            <polygon
              key={i}
              points={`${x + 14},4 ${x + 26},12 ${x + 26},24 ${x + 14},32 ${x + 2},24 ${x + 2},12`}
              fill={i % 2 === 0 ? "#E8A93C" : "transparent"}
              stroke="#5C3A1F"
              strokeWidth="1.5"
              opacity={i % 2 === 0 ? "0.85" : "0.5"}
            />
          );
        })}
      </svg>
    </div>
  );
}
