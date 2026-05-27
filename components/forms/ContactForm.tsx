"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { contactFormEndpoint } from "@/lib/form-endpoints";
import { Button } from "@/components/ui/Button";
import { Field, Honeypot, inputClass } from "@/components/forms/FormField";

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (values: ContactFormValues) => {
    setState({ status: "submitting" });
    try {
      const res = await fetch(contactFormEndpoint, {
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
          Thanks — your enquiry is on its way.
        </h2>
        <p className="mt-3 text-base text-cocoa-900">
          Bee will reply within 48 hours.
        </p>
        <button
          type="button"
          onClick={() => setState({ status: "idle" })}
          className="mt-6 text-sm font-semibold text-cocoa-800 underline hover:text-cocoa-900"
        >
          Send another message
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
        htmlFor="contact-title"
        error={errors.titleSubject?.message}
      >
        <input
          id="contact-title"
          type="text"
          autoComplete="off"
          placeholder="e.g. GCSE Maths tutoring"
          {...register("titleSubject")}
          className={inputClass(!!errors.titleSubject)}
        />
      </Field>

      <Field
        label="Name *"
        htmlFor="contact-name"
        error={errors.name?.message}
      >
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          {...register("name")}
          className={inputClass(!!errors.name)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Email *"
          htmlFor="contact-email"
          error={errors.email?.message}
        >
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            {...register("email")}
            className={inputClass(!!errors.email)}
          />
        </Field>
        <Field
          label="Phone"
          htmlFor="contact-phone"
          error={errors.phone?.message}
        >
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            {...register("phone")}
            className={inputClass(!!errors.phone)}
          />
        </Field>
      </div>

      <Field
        label="Your enquiry *"
        htmlFor="contact-message"
        error={errors.message?.message}
      >
        <textarea
          id="contact-message"
          rows={8}
          placeholder="Please be as detailed as possible. Mention your child's age, school year and exam board for booking enquiry. Please mention the dates and times that work for your child."
          {...register("message")}
          className={inputClass(!!errors.message)}
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
