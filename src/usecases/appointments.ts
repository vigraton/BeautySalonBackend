import prisma from "../lib/prisma.js";
import type { AppointmentSchema } from "../schemas/appointment.js";

export default class AppointmentUsecase {
  public async save(data: AppointmentSchema) {
    console.log("APPOINTMENT USECASE BODY: ", data);

    const newAppointment = await prisma.appointment.create({
      data: {
        step1: {
          id_service: data.step1.id,
        },
        step2: {
          id_stylist: data.step2.id,
        },
        step3: {
          date: data.step3.date,
        },
        step4: {
          fullname: data.step4.fullname,
          email: data.step4.email,
          telephone: data.step4.telephone,
          observations: data.step4.observations,
        },
      },
    });

    console.log("APPOINTMENT USECASE RESPONSE: ", newAppointment);

    return newAppointment;
  }
}
