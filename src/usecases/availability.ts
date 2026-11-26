import { DateTime } from "luxon";
import { timetable } from "./timetable.js";
import prisma from "../lib/prisma.js";
import ResponseHandler from "../utils/response-handler.js";

export default class AvailabilityUsecase {
  public async list(day: string, stylistId: string) {
    const bookings = await prisma.appointment.findMany({});

    return ResponseHandler.toSuccess(200, bookings);
  }
}
