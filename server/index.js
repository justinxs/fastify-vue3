import { readFile } from "node:fs/promises";
import path from "node:path";
import Fastify from "fastify";
import { compatMJSModule, getLocalIP } from "./utils/index.js";
import plugins from "./plugins/index.js";
import getLogger from "./utils/logger.js";

const { require, dirname } = compatMJSModule(import.meta.url);
const { port, host } = require("../config/server.json");
const fastify = Fastify({
  logger: getLogger(),
});

plugins(fastify);

fastify.get("/", async (request, reply) => {
  const template = await readFile(path.resolve(dirname, "../dist/index.html"), {
    encoding: "utf-8",
  });
  reply.type("text/html").code(200);
  return template;
});

fastify.listen({ port, host }, (err, address) => {
  if (err) throw err;
  fastify.log.info("listening http://localhost:" + port);
  fastify.log.info(`listening http://${getLocalIP()}:` + port);
});
