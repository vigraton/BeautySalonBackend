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
            time: new Date(`${newBooking.step3.day}T${newBooking.step3.time}:00.000Z`)
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
      }
    });

    // Por padrão o prisma retorna os campos do próprio Appointment, não os resgistros
    // relacionados, por isso o include é necessário.

    // Dentro de data tem que estar espelhado exatamente como está no schema.prisma de Appointment,
    // ou seja, user_id, schedule_id, stylist_id e service_id. O prisma não sabe o que é
    // "step1" ou "step2", isso é apenas um  agrupamento do zod.
    // ------------------------------------------------------------------------------------------------------
    // Sobre o step3.time:
    // Ficou nesse formato de Date porque é uma exigência do JavaScript. Ele precisa receber uma data
    // e hora completas para criar um objeto Date completo. "10:00" sozinho não representa um instante
    // completo para o JS. O campo é declarado como DateTime @db.Time(0). No cliente Prisma, ele é 
    // representado por um Date, embora a coluna no PostgreSQL guarde apenas a hora. Por isso o código 
    // combina os campos do body.

    // O fluxo é, crio data (yyy-mm-dd) e hora (hh:mm) separados, 
    // e depois transformo a hora em um objeto Date completo.

    return ResponseHandler.toSuccess(201, {
      message: "Agendamento criado!",
      createdBooking
    });
  }
}
