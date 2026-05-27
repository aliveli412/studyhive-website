import { z } from "zod";

/**
 * Shared base fields for both forms.
 * The honeypot `website` field must stay empty — bots typically fill all
 * fields, real users never see this field.
 */

const baseFields = {
  titleSubject: z
    .string()
    .trim()
    .min(2, "Please enter a short subject for your message.")
    .max(120, "Subject is too long."),
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .max(200, "Email is too long."),
  phone: z
    .string()
    .trim()
    .max(40, "Phone number is too long.")
    .optional()
    .or(z.literal("")),
  website: z.string().max(0).optional(), // honeypot
};

export const contactFormSchema = z.object({
  ...baseFields,
  message: z
    .string()
    .trim()
    .min(20, "Please give us a bit more detail (at least 20 characters).")
    .max(5000, "Your message is too long."),
});

export const tutorApplicationSchema = z.object({
  ...baseFields,
  application: z
    .string()
    .trim()
    .min(30, "Please tell us a bit more about your experience.")
    .max(5000, "Your application is too long."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type TutorApplicationValues = z.infer<typeof tutorApplicationSchema>;
