import Fastify from "fastify";
import { AppointmentRoutes } from "./routes/routes.js";

const app = Fastify({ logger: true });

app.register(AppointmentRoutes, {prefix: "/appointments"})

async function start() {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log("We are running! http://localhost:3000")
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();
