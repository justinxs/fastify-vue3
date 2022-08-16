import path from "node:path";
import fastifyStatic from "@fastify/static";
import { compatMJSModule } from "../utils/index.js";

const { dirname } = compatMJSModule(import.meta.url);

export default function staticResource(fastify) {
  fastify.register(fastifyStatic, {
    root: path.join(dirname, "../../dist"),
    prefix: "/",
    cacheControl: true,
    etag: true,
    lastModified: true,
    maxAge: 0,
  });
}
