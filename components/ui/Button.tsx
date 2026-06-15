import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cocoa-800 focus-visible:ring-offset-2 focus-visible:ring-offset-honey-300";

const variants: Record<Variant, string> = {
  primary: "bg-honey-500 text-cocoa-900 hover:bg-honey-600",
  secondary:
    "border-2 border-cocoa-800 text-cocoa-900 hover:bg-cocoa-800 hover:text-cream",
};

// ── ButtonLink: renders as <Link> for navigation ──────────────────────────

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
}: ButtonLinkProps) {
  return (
    <Link href={href} prefetch={false} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

// ── Button: renders as <button> for actions (form submit, etc.) ───────────

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  variant?: Variant;
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export function Button({
  type = "button",
  variant = "primary",
  children,
  disabled,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
