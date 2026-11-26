import type { FastifySchema } from "fastify";
import { z } from "zod";

const listAvailabilityByDate = z.object({
  day: z.iso.date().nonempty("Data é obrigatória"),
  stylist_id: z.string().nonempty("Profissional é obrigatório"),
});

const listAvailabilityByDateOutput = z.object({
  timetable: z.array(z.iso.time({ precision: -1 })),
  isAvailable: z.boolean(),
}); // acho que isso nem tô usando

type ListAvailabilitySchema = z.infer<typeof listAvailabilityByDate>;

const FASTIFY_GET_AVAILABILITY_SCHEMA = {
  schema: {
    response: {
      200: z.array(listAvailabilityByDateOutput),
      500: z.object({ error: z.string() }),
    },
  } as FastifySchema,
};

export {
  listAvailabilityByDate,
  type ListAvailabilitySchema,
  FASTIFY_GET_AVAILABILITY_SCHEMA,
};
