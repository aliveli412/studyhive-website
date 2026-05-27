import Image from "next/image";

/**
 * The Study Hive logo (bee with microscope and flask, arched text).
 * The image already contains the wordmark, so don't pair this with
 * an extra "The Study Hive" text label.
 *
 * File location: /public/logo.png
 */

type Props = {
  /** Rendered size in pixels (logo is square) */
  size?: number;
  className?: string;
  /** Set true on above-the-fold logos (hero) for LCP optimisation */
  priority?: boolean;
};

export function Logo({ size = 48, className = "", priority = false }: Props) {
  return (
    <Image
      src="/logo.png"
      alt="The Study Hive"
      width={size}
      height={size}
      priority={priority}
      className={className}
    />
  );
}
