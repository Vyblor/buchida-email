#!/usr/bin/env node
import { createPreviewServer } from "./server.js";

const port = Number(process.env.PORT) || 3001;
const templatesDir = process.argv[2] || "./templates";

await createPreviewServer({ templatesDir, port });
