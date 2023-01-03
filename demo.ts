import express from 'express';
import serve from 'express-static';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import icongen from 'icon-gen';
import { resolve } from "path";

import * as TJS from "typescript-json-schema";

// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
  required: true,
};

// optionally pass ts compiler options
const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true,
};

// optionally pass a base path
const basePath = "./schema";

const program = TJS.getProgramFromFiles(
  [resolve("src/source/source-data.ts")],
  compilerOptions,
  basePath
);
const generator = TJS.buildGenerator(program, settings);
const schema = generator?.getSchemaForSymbol("SourceData");
if (!fs.existsSync("schema")) {
  fs.mkdirSync("schema", { recursive: true });
}
if (fs.existsSync("schema/schema.json")) {
  fs.unlinkSync("schema/schema.json");
}
fs.writeFile("schema/schema.json", JSON.stringify(schema, null, "  "), { flag: 'wx', }, (error) => {
  if (error) throw error;
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.promises.readFile(`${__dirname}/public/index.html`).then(html => {
    res.write(html);
    res.end();
  });
});
// @ts-ignore
app.use(serve(`${__dirname}/public`, null));


icongen('icon.png', './public')
  .then((results) => {
    console.log(`${results.length} icons generated.`);
  })
  .catch((err) => {
    console.error(err)
  })


const server = app.listen(PORT, () => {
  console.log('Demo running at %s', PORT);
});
