import AvailabilityUsecase from "../usecases/availability.js";
import ResponseHandler from "../utils/response-handler.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { type ListAvailabilitySchema } from "../schemas/availability.js";

export default class AvailabilityController {
  constructor(private service: AvailabilityUsecase) {}

  public async getAvailability(
    req: FastifyRequest<{ Params: ListAvailabilitySchema }>,
    res: FastifyReply,
  ) {
    try {
      const {day, stylist_id} = req.params
      const response = await this.service.list(day, stylist_id);
      return res.status(response.status).send(response.body);
    } catch (error) {
      if (error instanceof ResponseHandler) {
        return res.status(error.status).send(error.body);
      }
      console.error(
        "[AVAILABILITY - CONTROLLER] Could not list availability: ",
        error,
      );

      return res
        .status(500)
        .send({ error: "Não foi possível buscar a disponibilidade da agenda" });
    }
  }
}
