import "dotenv/config";
import Fastify from "fastify";
import corsPlugin from "./plugins/cors.js";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { AppointmentRoutes } from "./routes/appointment.js";
import { ServiceRoutes } from "./routes/services.js";
import { StylistRoutes } from "./routes/stylists.js";
import { TimetableRoutes } from "./routes/timetable.js";

const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(corsPlugin)

app.register(AppointmentRoutes, { prefix: "/appointments" });
app.register(ServiceRoutes, { prefix: "/services" });
app.register(StylistRoutes, { prefix: "/stylists" });
app.register(TimetableRoutes, {prefix: "/timetable"})

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
