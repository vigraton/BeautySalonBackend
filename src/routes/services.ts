import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ServiceUsecase from "../usecases/services.js";
import ServiceController from "../controllers/services.js";

export function ServiceRoute(app: FastifyInstance) {
  const service = new ServiceUsecase();
  const controller = new ServiceController(service);

  app.get("/", (req: FastifyRequest, res: FastifyReply) =>
    controller.getServices(req, res),
  );
}
