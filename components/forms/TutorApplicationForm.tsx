"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  tutorApplicationSchema,
  type TutorApplicationValues,
} from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { Field, Honeypot, inputClass } from "@/components/forms/FormField";

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export function TutorApplicationForm() {
  const [state, setState] = useState<SubmissionState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TutorApplicationValues>({
    resolver: zodResolver(tutorApplicationSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (values: TutorApplicationValues) => {
    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/tutor-application", {
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
            "Something went wrong. Please email us directly at ask.studyhive@gmail.com or try again.",
        });
        return;
      }
      setState({ status: "success" });
      reset();
    } catch {
      setState({
        status: "error",
        message:
          "Something went wrong. Please email us directly at ask.studyhive@gmail.com or try again.",
      });
    }
  };

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-cream p-8 text-center">
        <h2 className="font-display text-2xl font-semibold text-cocoa-900">
          Thanks for applying.
        </h2>
        <p className="mt-3 text-base text-cocoa-900">
          Bee will be in touch shortly.
        </p>
        <button
          type="button"
          onClick={() => setState({ status: "idle" })}
          className="mt-6 text-sm font-semibold text-cocoa-800 underline hover:text-cocoa-900"
        >
          Send another application
        </button>
      </div>
    );
  }

  const isSubmitting = state.status === "submitting";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <Honeypot register={register("website")} />

      <Field
        label="Title / Subject *"
        htmlFor="tutor-title"
        error={errors.titleSubject?.message}
      >
        <input
          id="tutor-title"
          type="text"
          autoComplete="off"
          placeholder="e.g. Maths tutor application"
          {...register("titleSubject")}
          className={inputClass(!!errors.titleSubject)}
        />
      </Field>

      <Field
        label="Name *"
        htmlFor="tutor-name"
        error={errors.name?.message}
      >
        <input
          id="tutor-name"
          type="text"
          autoComplete="name"
          {...register("name")}
          className={inputClass(!!errors.name)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Email *"
          htmlFor="tutor-email"
          error={errors.email?.message}
        >
          <input
            id="tutor-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            {...register("email")}
            className={inputClass(!!errors.email)}
          />
        </Field>
        <Field
          label="Phone"
          htmlFor="tutor-phone"
          error={errors.phone?.message}
        >
          <input
            id="tutor-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            {...register("phone")}
            className={inputClass(!!errors.phone)}
          />
        </Field>
      </div>

      <Field
        label="Your application *"
        htmlFor="tutor-application"
        error={errors.application?.message}
      >
        <textarea
          id="tutor-application"
          rows={8}
          placeholder="Please be as detailed as possible. Mention your teaching experience (months / years), the subjects you tutor and your qualifications."
          {...register("application")}
          className={inputClass(!!errors.application)}
        />
      </Field>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Submit"}
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
