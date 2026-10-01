import prisma from "../lib/prisma.js";
import ResponseHandler from "../utils/response-handler.js";

export default class ServiceUsecase {
  public async list() {
    const services = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        duration: true,
        price: true,
      },
    });

    return ResponseHandler.toSuccess(200, services);
  }
}
