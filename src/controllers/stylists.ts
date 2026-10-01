import StylistsUsecase from "../usecases/stylists.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import ResponseHandler from "../utils/response-handler.js";

export default class StylistController {
  constructor(private service: StylistsUsecase) {}

  public async getStylists(req: FastifyRequest, res: FastifyReply) {
    try {
      const response = await this.service.list();

      return res.status(response.status).send(response.body);
    } catch (error) {
      if (error instanceof ResponseHandler) {
        return res.status(error.status).send(error.body);
      }
      console.log("[STYLISTS - CONTROLLER] Could not list stylists: ", error);

      return res
        .status(500)
        .send({ error: "Não foi possível buscar os profissionais" });
    }
  }
}
