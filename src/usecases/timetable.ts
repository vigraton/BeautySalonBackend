import type { Timetable } from "../types/timetable.js";
import ResponseHandler from "../utils/response-handler.js";
import prisma from "../lib/prisma.js";

const timetable: Timetable[] = [
  {
    id: "09:00",
    time: "09:00",
  },
  {
    id: "10:00",
    time: "10:00",
  },
  {
    id: "11:00",
    time: "11:00",
  },
  {
    id: "12:00",
    time: "12:00",
  },
  {
    id: "13:30",
    time: "13:30",
  },
  {
    id: "14:30",
    time: "14:30",
  },
  {
    id: "15:30",
    time: "15:30",
  },
  {
    id: "16:30",
    time: "16:30",
  },
  {
    id: "17:30",
    time: "17:30",
  },
  {
    id: "18:30",
    time: "18:30",
  },
];

export class TimetableUsecase {
  public async list() {
    const agenda = timetable.map((time) => time.time);

    return ResponseHandler.toSuccess(201, agenda);
  }
}
