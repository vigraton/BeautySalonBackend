import type { Timetable } from "../types/timetable.js";
import ResponseHandler from "../utils/response-handler.js";

export const timetable: Timetable[] = [
  {
    time: "09:00",
    isAvailable: true,
  },
  {
    time: "10:00",
    isAvailable: true,
  },
  {
    time: "11:00",
    isAvailable: true,
  },
  {
    time: "12:00",
    isAvailable: true,
  },
  {
    time: "13:30",
    isAvailable: true,
  },
  {
    time: "14:30",
    isAvailable: true,
  },
  {
    time: "15:30",
    isAvailable: true,
  },
  {
    time: "16:30",
    isAvailable: true,
  },
  {
    time: "17:30",
    isAvailable: true,
  },
  {
    time: "18:30",
    isAvailable: true,
  },
];

export class TimetableUsecase {
  public async list() {
    const agenda = timetable.map((time) => time.time);

    return ResponseHandler.toSuccess(201, agenda);
  }
}
