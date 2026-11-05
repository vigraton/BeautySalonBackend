import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { TimetableUsecase } from "../usecases/timetable.js";
import { TimetableController } from "../controllers/timetable.js";

export function TimetableRoutes(app: FastifyInstance) {
  const service = new TimetableUsecase();
  const controller = new TimetableController(service);

  app.get("/", (req: FastifyRequest, res: FastifyReply) =>
    controller.getTimetable(req, res),
  );
}
