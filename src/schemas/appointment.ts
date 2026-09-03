import { z } from "zod";

const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  duration: z.string(),
  price: z.string(),
});

const stylistSchema = z.object({
  id: z.string(),
  name: z.string(),
  specialistIn: z.string(),
  description: z.string(),
});

const dateTimeSchema = z.object({
  date: z.iso.datetime(),
});

const userDetailsSchemas = z.object({
  fullname: z.string(),
  email: z.email(),
  telephone: z.string(),
  observations: z.string().optional(),
});

const appointmentSchema = z.object({
  step1: serviceSchema.pick({ id: true }),
  step2: stylistSchema.pick({ id: true }),
  step3: dateTimeSchema,
  step4: userDetailsSchemas,
});

type Step1 = z.infer<typeof serviceSchema>;
type Step2 = z.infer<typeof stylistSchema>;
type Step3 = z.infer<typeof dateTimeSchema>;
type Step4 = z.infer<typeof userDetailsSchemas>;
type AppointmentSchema = z.infer<typeof appointmentSchema>;

export {
  serviceSchema,
  type Step1,
  stylistSchema,
  type Step2,
  dateTimeSchema,
  type Step3,
  userDetailsSchemas,
  type Step4,
  appointmentSchema,
  type AppointmentSchema,
};
