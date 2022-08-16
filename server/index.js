import { readFile } from "node:fs/promises";
import path from "node:path";
import Fastify from "fastify";
import pino from "pino";
import { compatMJSModule } from "./utils/index.js";
import plugins from "./plugins/index.js";

const { require, dirname } = compatMJSModule(import.meta.url);
const CONFIG = require("../config/server.json");
const destOpt = {
  dest: path.resolve(dirname, "../logs/log.log"),
  sync: false
}
const log = pino(
  {
    name: "my-logger",
    level: "info",
  },
  pino.destination(1)
);

const fastify = Fastify({
  logger: log,
});

plugins(fastify);

fastify.get("/", async (request, reply) => {
  const template = await readFile(path.resolve(dirname, "../dist/index.html"), {
    encoding: "utf-8",
  });
  reply.type("text/html").code(200);
  return template;
});

fastify.listen({ port: CONFIG.port, host: CONFIG.host }, (err, address) => {
  if (err) throw err;
  fastify.log.info(`Server is now listening on ${address}`);
  console.log(`Server is now listening on ${address}`);
});
