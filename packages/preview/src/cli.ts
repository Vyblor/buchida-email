#!/usr/bin/env node
import { createPreviewServer } from "./server.js";

const port = Number(process.env.PORT) || 3333;
const templatesDir = process.argv[2] || "./templates";

const server = createPreviewServer({ port, templatesDir });
server.start();
