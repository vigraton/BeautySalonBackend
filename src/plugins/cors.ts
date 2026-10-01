import fp from "fastify-plugin";
import cors, { type FastifyCorsOptions } from "@fastify/cors";

const allowedOriginsByEnv: Record<string, string[]> = {
  local: ["http://localhost:5173"],
};

export default fp(async (fastify) => {
  const env = process.env.NOCE_ENV ?? "local";
  const allowedOrigins = allowedOriginsByEnv[env] ?? allowedOriginsByEnv.local;

  const options: FastifyCorsOptions = {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins?.includes(origin)) {
        return callback(null, true);
      }

      fastify.log.warn({ origin }, "CORS: origin bloqueada");
      return callback(new Error(`Origin '${origin}' not allowed`), false);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };

  await fastify.register(cors, options)
});
