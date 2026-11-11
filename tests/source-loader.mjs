import { createRequire } from "node:module";
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const requirePackage = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const modules = new Map();

/** Loads production TS through the existing compiler; no browser-test framework is required. */
export function loadSource(relative) {
  let filename = resolve(root, relative);
  if (!existsSync(filename)) {
    filename = [filename + ".ts", filename + ".tsx"].find(existsSync);
  }
  if (!filename) throw new Error("Source module not found: " + relative);
  if (modules.has(filename)) return modules.get(filename).exports;
  const module = { exports: {} };
  modules.set(filename, module);
  const source = readFileSync(filename, "utf8").replaceAll("import.meta.env.VITE_API_BASE_URL", '"/api/v1"');
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    fileName: filename,
  }).outputText;
  const requireSource = (specifier) => {
    if (specifier.startsWith("@hmo/")) return loadSource("src/modules/hmo/" + specifier.slice(5));
    if (specifier.startsWith("@/")) return loadSource("src/" + specifier.slice(2));
    if (specifier.startsWith("@doctor-shared/")) return loadSource("src/pages/doctor/shared/" + specifier.slice(15));
    if (specifier.startsWith(".")) return loadSource(resolve(dirname(filename), specifier));
    return requirePackage(specifier);
  };
  new Function("require", "module", "exports", output)(requireSource, module, module.exports);
  return module.exports;
}
