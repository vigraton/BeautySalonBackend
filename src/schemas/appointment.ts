import type { FastifySchema } from "fastify";
import { z } from "zod";
import { timetable } from "../usecases/timetable.js";

const serviceSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  duration: z.string().nonempty(),
  price: z.string().nonempty(),
});

const stylistSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  specialistIn: z.string().nonempty(),
  description: z.string().nonempty(),
});

const scheduleSchema = z.object({
  day: z.iso.date().nonempty("Escolha uma data"),
  time: z.iso.time({ precision: -1 }).nonempty("Escolha um horário"),  
  isAvailable: z.boolean().default(true), // isso não parece fazer sentido, pq... o usuária teria de mandar se está disponível ou não? nada a ver
  stylist_id: z.string(),
});

const userDetailsSchemas = z.object({
  fullname: z.string().nonempty("Informe seu nome completo"),
  email: z.email().nonempty("Informe um email válido"),
  telephone: z.string().nonempty("Informe um telefone válido"),
  observations: z.string().optional(),
});

const appointmentSchema = z.object({
  step1: serviceSchema.pick({ id: true }),
  step2: stylistSchema.pick({ id: true }),
  step3: scheduleSchema,
  step4: userDetailsSchemas,
});

const FASTIFY_CREATE_APPOINTMENT_SCHEMA = {
  schema: {
    body: appointmentSchema,
    response: {
      400: z.object({ error: z.string() }),
      500: z.object({ error: z.string() }),
    },
  } as FastifySchema,
};

type Step1 = z.infer<typeof serviceSchema>;
type Step2 = z.infer<typeof stylistSchema>;
type Step3 = z.infer<typeof scheduleSchema>;
type Step4 = z.infer<typeof userDetailsSchemas>;
type AppointmentSchema = z.infer<typeof appointmentSchema>;

export {
  serviceSchema,
  type Step1,
  stylistSchema,
  type Step2,
  scheduleSchema,
  type Step3,
  userDetailsSchemas,
  type Step4,
  appointmentSchema,
  type AppointmentSchema,
  FASTIFY_CREATE_APPOINTMENT_SCHEMA,
};
