import { TimetableUsecase } from "../usecases/timetable.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import ResponseHandler from "../utils/response-handler.js";

export class TimetableController {
  constructor(private service: TimetableUsecase) {}

  public async getTimetable(req: FastifyRequest, res: FastifyReply) {
    try {
      const response = await this.service.list()

      return res.status(response.status).send(response.body)
    } catch (error) {
      if (error instanceof ResponseHandler) {
        return res.status(error.status).send(error.body)
      }
      console.log("[TIMETABLE - CONTROLLER] Could not list timetable: ", error)

      return res.status(500).send({error: "Erro ao buscar os horários"})
    }
  }
}
