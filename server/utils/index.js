import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

export function compatMJSModule(meteUrl) {
  if (!meteUrl) return null;
  const filename = meteUrl.toString();
  const dirname = path.resolve(fileURLToPath(meteUrl), "../");
  const require = createRequire(meteUrl);
  return { filename, dirname, require };
}
