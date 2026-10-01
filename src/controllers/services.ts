import ServiceUsecase from "../usecases/services.js";
import ResponseHandler from "../utils/response-handler.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export default class ServiceController {
  constructor(private service: ServiceUsecase) {}

  public async getServices(req: FastifyRequest, res: FastifyReply) {
    try {
      const response = await this.service.list();

      return res.status(response.status).send(response.body);
      // Como que response (ou qualquer outra coisa) sabe a hora de usar o status,
      // body, toSuccess e o toError? Todos eles vem do ResponseHandler, mas como
      // ele sabe qual e quando usar?

    } catch (error) {
      if (error instanceof ResponseHandler) {
        return res.status(error.status).send(error.body);
      }
      console.error("[SERVICES - CONTROLLER] Could not list services: ", error);

      return res
        .status(500)
        .send({ error: "Não foi possível buscar os serviços" });
    }
  }
}
