import Link from "next/link";
import { nav } from "@/lib/content";
import { HomeBrandMark } from "@/components/ui/HomeBrandMark";
import { Logo } from "@/components/ui/Logo";

type Props = {
  /**
   * On the home page the hero already shows the large logo,
   * so we hide the small header logo to avoid duplication
   * (per Bee's spec).
   */
  showLogo?: boolean;
};

export function Header({ showLogo = true }: Props) {
  return (
    <header className="border-b border-cocoa-800/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 md:px-8 md:py-5">
        {showLogo ? (
          <Link
            href="/"
            aria-label="The Study Hive — home"
            className="block"
          >
            <Logo size={64} className="h-auto w-14 md:w-16" />
          </Link>
        ) : (
          <HomeBrandMark />
        )}
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 md:gap-x-7 lg:gap-x-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-display text-base font-bold text-cocoa-900 transition-colors hover:text-cocoa-700 md:text-lg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
