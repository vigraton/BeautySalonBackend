import prisma from "../src/lib/prisma.js";

async function seeder() {
  try {
    const stylists = [
      {
        name: "Elena Marchetti",
        specialistIn: "Especialista em corte de cabelo",
        description: "Precisão em cortes & cor",
      },
      {
        name: "James Okafor",
        specialistIn: "Especialista em finalização",
        description: "Cachos & textura capilar",
      },
      {
        name: "Sofia Reyes",
        specialistIn: "Especialista em manicure & pedicure",
        description: "Manicure, pedicure & nail art",
      },
    ];

    const services = [
      {
        name: "Tratamento capilar",
        description: "Corte, lavagem, hidratação e estilização",
        duration: "45 minutos",
        price: 100.0,
      },
      {
        name: "Pedicure",
        description: "Tratamento e unhas, esfoliação e massagem",
        duration: "1 hora",
        price: 30.0,
      },
      {
        name: "Manicure",
        description: "Cuidado com acutícula, unhas postiças",
        duration: "30 minutos",
        price: 25.0,
      },
      {
        name: "Glow facial",
        description: "Limpeza profunda, esfoliação e hidratação",
        duration: "40 minutos",
        price: 150.0,
      },
    ];

    await prisma.$transaction(
      stylists.map((stylist) =>
        prisma.stylist.upsert({
          where: { name: stylist.name },
          update: {
            name: stylist.name,
            specialistIn: stylist.specialistIn,
            description: stylist.description,
          },
          create: {
            name: stylist.name,
            specialistIn: stylist.specialistIn,
            description: stylist.description,
          },
        }),
      ),
    );

    await prisma.$transaction(
      services.map((service) =>
        prisma.service.upsert({
          where: { name: service.name },
          update: {
            name: service.name,
            description: service.description,
            duration: service.duration,
            price: service.price,
          },
          create: {
            name: service.name,
            description: service.description,
            duration: service.duration,
            price: service.price,
          },
        }),
      ),
    );

    console.log("[DATABASE] Seeds planted <3");
    process.exit(0);
  } catch (error) {
    console.log("[DATABASE] Could not plant seeds: ", error);
    process.exit(1);
  }
}

await seeder();
