import prisma from "../lib/prisma.js";
import type { AppointmentSchema } from "../schemas/appointment.js";

export default class AppointmentUsecase {
  public async save(newBooking: AppointmentSchema) {
    console.log("APPOINTMENT USECASE BODY: ", newBooking);

    const createdBooking = await prisma.appointment.create({
      data: {
        service_id: newBooking.step1.id,
        stylist_id: newBooking.step2.id,
        schedule_id: newBooking.step3.date,
        user_id: newBooking.step4.id,
      },
    });
    // Dentro de data tem que estar espelhado exatamente como está no schema.prisma de Appointment,
    // ou seja, user_id, schedule_id, stylist_id e service_id. O prisma não sabe o que é
    // "step1" ou "step2", isso é apenas um  agrupamento do zod.

    console.log("APPOINTMENT USECASE RESPONSE: ", createdBooking);

    return createdBooking;
  }
}
