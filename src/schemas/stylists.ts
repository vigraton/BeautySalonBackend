import type { FastifySchema } from "fastify";
import { z } from "zod";

const stylistSchema = z.object({
  id: z.string(),
  name: z.string(),
  specialistIn: z.string(),
  description: z.string(),
});

type StylistSchema = z.infer<typeof stylistSchema>;

const FASTIFY_GET_STYLISTS_SCHEMA = {
  schema: {
    body: stylistSchema,
    response: {
      400: z.object({ error: z.string() }),
      500: z.object({ error: z.string() }),
    },
  } as FastifySchema,
};

export { stylistSchema, type StylistSchema, FASTIFY_GET_STYLISTS_SCHEMA };
