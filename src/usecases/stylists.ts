import prisma from "../lib/prisma.js";
import ResponseHandler from "../utils/response-handler.js";

export default class StylistUsecase {
  public async list() {
    const stylists = await prisma.stylist.findMany({
      select: {
        id: true,
        name: true,
        specialistIn: true,
        description: true,
      },
    });

    return ResponseHandler.toSuccess(200, stylists);
  }
}
