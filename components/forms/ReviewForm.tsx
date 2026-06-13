"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewFormSchema, type ReviewFormValues } from "@/lib/schemas";
import { reviewFormEndpoint } from "@/lib/form-endpoints";
import { footer } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Field, Honeypot, inputClass } from "@/components/forms/FormField";

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

type ReviewFormProps = {
  onSuccess?: () => void;
};

export function ReviewForm({ onSuccess }: ReviewFormProps) {
  const [state, setState] = useState<SubmissionState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (values: ReviewFormValues) => {
    setState({ status: "submitting" });
    try {
      const res = await fetch(reviewFormEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setState({
          status: "error",
          message:
            data.error ||
            `Something went wrong. Please email us directly at ${footer.email} or try again.`,
        });
        return;
      }
      setState({ status: "success" });
      reset();
      onSuccess?.();
    } catch {
      setState({
        status: "error",
        message: `Something went wrong. Please email us directly at ${footer.email} or try again.`,
      });
    }
  };

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-cream p-8 text-center">
        <h2 className="font-display text-2xl font-semibold text-cocoa-900">
          Thanks - your review is on its way.
        </h2>
        <p className="mt-3 text-base text-cocoa-900">
          We appreciate your feedback.
        </p>
        <button
          type="button"
          onClick={() => setState({ status: "idle" })}
          className="mt-6 text-sm font-semibold text-cocoa-800 underline hover:text-cocoa-900"
        >
          Write another review
        </button>
      </div>
    );
  }

  const isSubmitting = state.status === "submitting";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <Honeypot register={register("website")} />

      <Field label="Name *" htmlFor="review-name" error={errors.name?.message}>
        <input
          id="review-name"
          type="text"
          autoComplete="name"
          {...register("name")}
          className={inputClass(!!errors.name)}
        />
      </Field>

      <Field
        label="Email *"
        htmlFor="review-email"
        error={errors.email?.message}
      >
        <input
          id="review-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          {...register("email")}
          className={inputClass(!!errors.email)}
        />
      </Field>

      <Field
        label="Tutor name"
        htmlFor="review-tutor"
        error={errors.tutorName?.message}
      >
        <input
          id="review-tutor"
          type="text"
          autoComplete="off"
          placeholder="e.g. Bee"
          {...register("tutorName")}
          className={inputClass(!!errors.tutorName)}
        />
      </Field>

      <Field
        label="Your review *"
        htmlFor="review-message"
        error={errors.review?.message}
      >
        <textarea
          id="review-message"
          rows={6}
          placeholder="Share your experience with your tutor..."
          {...register("review")}
          className={inputClass(!!errors.review)}
        />
      </Field>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Submit review"}
        </Button>
        {state.status === "error" && (
          <p className="text-sm text-red-700 sm:text-right" role="alert">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
