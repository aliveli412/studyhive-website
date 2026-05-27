import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { footer, nav } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-cocoa-800/10 bg-honey-100">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
          <div>
            <Link
              href="/"
              aria-label="The Study Hive — home"
              className="inline-block"
            >
              <Logo size={56} className="h-auto w-14" />
            </Link>
            <p className="mt-3 text-sm text-cocoa-700">{footer.tagline}</p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-cocoa-800">
              Pages
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cocoa-900 transition-colors hover:text-cocoa-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-cocoa-800">
              Contact
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${footer.email}`}
                  className="text-cocoa-900 transition-colors hover:text-cocoa-700"
                >
                  {footer.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-cocoa-800/10 pt-6 text-xs text-cocoa-700">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
