import Fastify from "fastify";

const fastify = Fastify({ logger: true });

fastify.get("/", async () => {
  return { hello: "world" };
});

async function start() {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("We are running! http://localhost:3000")
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

start();
