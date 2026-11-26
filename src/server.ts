import "dotenv/config";
import Fastify from "fastify";
import corsPlugin from "./plugins/cors.js";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { AppointmentRoute } from "./routes/appointment.js";
import { ServiceRoute } from "./routes/services.js";
import { StylistRoute } from "./routes/stylists.js";
import { TimetableRoute } from "./routes/timetable.js";
import { AvailabilityRoute } from "./routes/availability.js";

const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(corsPlugin);

app.register(AppointmentRoute, { prefix: "/appointments" });
app.register(ServiceRoute, { prefix: "/services" });
app.register(StylistRoute, { prefix: "/stylists" });
app.register(TimetableRoute, { prefix: "/timetable" });
app.register(AvailabilityRoute, {prefix: "/availability"})

async function start() {
  try {
    const isLocalDevelopment = process.env.NODE_ENV === "local";
    const handleHost = isLocalDevelopment ? "localhost" : "0.0.0.0";

    console.log("[SERVER] Initiating server...");
    await app.listen({ port: 3000, host: handleHost });
    console.log("We are running! http://localhost:3000");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();
