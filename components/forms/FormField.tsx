import type { ReactNode } from "react";

/**
 * Shared form field components — used by ContactForm and TutorApplicationForm.
 */

export function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-semibold text-cocoa-900"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function inputClass(hasError: boolean): string {
  const base =
    "block w-full rounded-lg border-2 bg-cream px-4 py-3 text-base text-cocoa-900 placeholder:text-cocoa-700/60 transition-colors focus:outline-none focus-visible:border-cocoa-800";
  return hasError
    ? `${base} border-red-400 focus-visible:border-red-700`
    : `${base} border-cocoa-800/20`;
}

/**
 * Honeypot — a hidden input that bots fill but humans don't see.
 * If the field comes back non-empty, the API treats the submission as spam.
 */
export function Honeypot({
  register,
}: {
  register: { name: string; ref: React.Ref<HTMLInputElement>; onChange: React.ChangeEventHandler<HTMLInputElement>; onBlur: React.FocusEventHandler<HTMLInputElement> };
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      <label>
        Leave this empty
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register}
        />
      </label>
    </div>
  );
}
