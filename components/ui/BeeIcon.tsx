/**
 * Placeholder bee illustration.
 * Replace with Bee's real logo (PNG/SVG in /public) once provided —
 * see docs/BRAND.md section 2.
 */

type Props = {
  className?: string;
  size?: number;
};

export function BeeIcon({ className = "", size }: Props) {
  const sizeProps = size ? { width: size, height: size } : {};
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...sizeProps}
    >
      {/* Wings */}
      <ellipse
        cx="20"
        cy="22"
        rx="10"
        ry="14"
        fill="#FFFAF0"
        stroke="#2D1F0F"
        strokeWidth="2"
      />
      <ellipse
        cx="44"
        cy="22"
        rx="10"
        ry="14"
        fill="#FFFAF0"
        stroke="#2D1F0F"
        strokeWidth="2"
      />
      {/* Body */}
      <ellipse
        cx="32"
        cy="38"
        rx="16"
        ry="18"
        fill="#F0C46D"
        stroke="#2D1F0F"
        strokeWidth="2.5"
      />
      {/* Stripes */}
      <path
        d="M16 34 Q32 30 48 34"
        stroke="#2D1F0F"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M16 44 Q32 48 48 44"
        stroke="#2D1F0F"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Face */}
      <circle cx="27" cy="38" r="1.5" fill="#2D1F0F" />
      <circle cx="37" cy="38" r="1.5" fill="#2D1F0F" />
      <path
        d="M28 42 Q32 44 36 42"
        stroke="#2D1F0F"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
