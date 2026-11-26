import prisma from "../lib/prisma.js";
import type { AppointmentSchema } from "../schemas/appointment.js";
import ResponseHandler from "../utils/response-handler.js";

export default class AppointmentUsecase {
  public async save(newBooking: AppointmentSchema) {
    const createdBooking = await prisma.appointment.create({
      data: {
        service: {
          connect: { id: newBooking.step1.id },
        },
        stylist: {
          connect: { id: newBooking.step2.id },
        },
        schedule: {
          create: {
            day: new Date(newBooking.step3.day),
            time: new Date(
              `${newBooking.step3.day}T${newBooking.step3.time}:00.000Z`,
            ),
          },
        },
        userDetails: {
          create: {
            fullname: newBooking.step4.fullname,
            email: newBooking.step4.email,
            telephone: newBooking.step4.telephone,
            observations: newBooking.step4.observations!,
          },
        },
      },
      include: {
        service: true,
        stylist: true,
        schedule: true,
        userDetails: true,
      },
    });

    return ResponseHandler.toSuccess(201, {
      message: "Agendamento criado!",
      createdBooking,
    });
  }
}
