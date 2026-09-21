import AppointmentUsecase from "../usecases/appointments.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { AppointmentSchema } from "../schemas/appointment.js";
import ResponseHandler from "../utils/response-handler.js";

export default class AppointmentController {
  constructor(private usecase: AppointmentUsecase) {}

  public async postAppointment(
    req: FastifyRequest<{ Body: AppointmentSchema }>,
    res: FastifyReply,
  ) {
    try {
      const response = await this.usecase.save(req.body);
      // O 'this' serve para acessar a propriedade da instância atual da classe,
      // ou seja, constructor(private usecase: AppointmentUsecase) {}.
      // Ele está dizendo: "Pegue o usecase que foi injetado nessa instância do AppointmentController"
      // e chame o método save().

      return res.status(response.status).send(response.body);
    } catch (error) {
      console.error(
        "[POST - CONTROLLER] Could not create appointment: ",
        error,
      );

      if (error instanceof ResponseHandler) {
        return res.status(error.status).send(error.body);
      }

      return res.status(500).send({ error: "Internal Server Error" });
    }
  }
}
