"use client";

import { useEffect, useId, useRef, useState } from "react";
import { testimonyFeedback } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { ReviewForm } from "@/components/forms/ReviewForm";

export function TestimonyFeedback() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <>
      <div className="mt-12 rounded-2xl bg-honey-100 p-6 text-center md:mt-16 md:p-10">
        <p className="text-base text-cocoa-900 md:text-lg">
          {testimonyFeedback.prompt}
        </p>
        <div className="mt-6">
          <Button type="button" onClick={() => setOpen(true)}>
            {testimonyFeedback.cta}
          </Button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="w-[min(100%,32rem)] max-h-[90vh] overflow-y-auto rounded-2xl border-0 bg-cream p-0 text-cocoa-900 shadow-xl backdrop:bg-cocoa-900/50"
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <h3
              id={titleId}
              className="font-display text-2xl font-semibold text-cocoa-900"
            >
              Write a review
            </h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-1 text-sm font-semibold text-cocoa-700 hover:bg-honey-100 hover:text-cocoa-900"
              aria-label="Close review form"
            >
              Close
            </button>
          </div>
          <p className="mt-2 text-sm text-cocoa-700">
            Your feedback will be emailed to us directly.
          </p>
          <div className="mt-6">
            <ReviewForm onSuccess={() => setOpen(false)} />
          </div>
        </div>
      </dialog>
    </>
  );
}
