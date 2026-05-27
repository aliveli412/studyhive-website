/**
 * Reusable flat-top honeycomb hex cells for decorative SVG layouts.
 */

type HexProps = {
  cx: number;
  cy: number;
  size?: number;
  filled?: boolean;
  className?: string;
};

/** Flat-top hexagon; `size` = distance from centre to vertex */
export function HexCell({
  cx,
  cy,
  size = 28,
  filled = false,
  className = "",
}: HexProps) {
  const points = [0, 60, 120, 180, 240, 300]
    .map((deg) => {
      const rad = ((deg - 90) * Math.PI) / 180;
      return `${cx + size * Math.cos(rad)},${cy + size * Math.sin(rad)}`;
    })
    .join(" ");

  return (
    <polygon
      points={points}
      fill={filled ? "currentColor" : "transparent"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      className={className}
    />
  );
}

/** Axial honeycomb grid offsets (flat-top, odd rows shifted by half width) */
export function hexPosition(
  col: number,
  row: number,
  size: number
): { cx: number; cy: number } {
  const w = Math.sqrt(3) * size;
  const h = size * 1.5;
  const cx = col * w + (row % 2 === 1 ? w / 2 : 0);
  const cy = row * h;
  return { cx, cy };
}
