import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import AvailabilityUsecase from "../usecases/availability.js";
import AvailabilityController from "../controllers/availability.js";
import type { ListAvailabilitySchema } from "../schemas/availability.js";

// Preciso depois perguntar pra quê essa instância do fastify como argumento
export function AvailabilityRoute(app: FastifyInstance) {
  const service = new AvailabilityUsecase();
  const controller = new AvailabilityController(service);

  app.get(
    "/:stylist_id/:date",
    (
      req: FastifyRequest<{ Params: ListAvailabilitySchema }>,
      res: FastifyReply,
    ) => controller.getAvailability(req, res),
  );
}
