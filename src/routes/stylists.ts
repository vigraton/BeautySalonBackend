import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import StylistUsecase from "../usecases/stylists.js";
import StylistController from "../controllers/stylists.js";

export function StylistRoutes(app: FastifyInstance) {
  const service = new StylistUsecase();
  const controller = new StylistController(service);

  app.get("/", (req: FastifyRequest, res: FastifyReply) =>
    controller.getStylists(req, res),
  );
}
