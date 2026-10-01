import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import AppointmentUsecase from "../usecases/appointments.js";
import AppointmentController from "../controllers/appointments.js";
import {
  FASTIFY_CREATE_APPOINTMENT_SCHEMA,
  type AppointmentSchema,
} from "../schemas/appointment.js";

export function AppointmentRoutes(app: FastifyInstance) {
  const service = new AppointmentUsecase();
  const controller = new AppointmentController(service);

  app.post(
    "/",
    FASTIFY_CREATE_APPOINTMENT_SCHEMA,
    (req: FastifyRequest<{ Body: AppointmentSchema }>, res: FastifyReply) =>
      controller.postAppointment(req, res),
  );
}
