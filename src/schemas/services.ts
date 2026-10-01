import type { FastifySchema } from "fastify";
import { z } from "zod";

const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  duration: z.string(),
  price: z.string(),
});

type ServiceSchema = z.infer<typeof serviceSchema>;

const FASTIFY_GET_SERVICES_SCHEMA = {
  schema: {
    body: serviceSchema,
    response: {
      400: z.object({ error: z.string() }),
      500: z.object({ error: z.string() }),
    },
  } as FastifySchema,
};

export { serviceSchema, type ServiceSchema, FASTIFY_GET_SERVICES_SCHEMA };
