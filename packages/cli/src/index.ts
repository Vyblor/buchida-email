#!/usr/bin/env node
/**
 * @buchida/email-cli
 *
 * Usage:
 *   buchida-email dev [--port 3333] [--dir ./templates]
 *   buchida-email build [--dir ./templates] [--out ./dist]
 *   buchida-email export [--dir ./templates] [--out ./export] [--template welcome-ko]
 *   buchida-email help
 */

import { devCommand } from "./commands/dev.js";
import { buildCommand } from "./commands/build.js";
import { exportCommand } from "./commands/export.js";

// ---------------------------------------------------------------------------
// Arg parser
// ---------------------------------------------------------------------------

interface ParsedArgs {
	command: string;
	flags: Record<string, string | boolean>;
	positional: string[];
}

function parseArgs(argv: string[]): ParsedArgs {
	const args = argv.slice(2); // strip "node" and script path
	const flags: Record<string, string | boolean> = {};
	const positional: string[] = [];
	let command = "";

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];

		if (arg.startsWith("--")) {
			const key = arg.slice(2);
			const next = args[i + 1];
			if (next && !next.startsWith("--")) {
				flags[key] = next;
				i++; // consume next
			} else {
				flags[key] = true;
			}
		} else if (!command) {
			command = arg;
		} else {
			positional.push(arg);
		}
	}

	return { command, flags, positional };
}

// ---------------------------------------------------------------------------
// Help text
// ---------------------------------------------------------------------------

function printHelp(): void {
	console.log(`
buchida-email — CLI for @buchida/email

USAGE

  buchida-email <command> [options]

COMMANDS

  dev       Start the local email preview server
  build     Render all templates to HTML in an output directory
  export    Export templates as standalone .html files
  help      Show this help message

OPTIONS (dev)

  --port    Port number for the preview server (default: 3333)
  --dir     Templates directory (default: ./templates)

OPTIONS (build)

  --dir     Templates directory (default: ./templates)
  --out     Output directory (default: ./dist)

OPTIONS (export)

  --dir       Templates directory (default: ./templates)
  --out       Output directory (default: ./export)
  --template  Export a single template by name (default: all)

EXAMPLES

  buchida-email dev
  buchida-email dev --port 4000 --dir ./my-templates
  buchida-email build --out ./dist
  buchida-email export --out ./html
  buchida-email export --template welcome-ko --out ./html

`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
	const { command, flags } = parseArgs(process.argv);

	switch (command) {
		case "dev": {
			const port = Number(flags["port"] ?? 3333);
			const templatesDir = String(flags["dir"] ?? "./templates");
			await devCommand({ port, templatesDir });
			break;
		}

		case "build": {
			const templatesDir = String(flags["dir"] ?? "./templates");
			const outDir = String(flags["out"] ?? "./dist");
			await buildCommand({ templatesDir, outDir });
			break;
		}

		case "export": {
			const templatesDir = String(flags["dir"] ?? "./templates");
			const outDir = String(flags["out"] ?? "./export");
			const template = flags["template"] ? String(flags["template"]) : undefined;
			await exportCommand({ templatesDir, outDir, template });
			break;
		}

		case "help":
		case "--help":
		case "-h":
		case "": {
			printHelp();
			break;
		}

		default: {
			console.error(`Unknown command: ${command}\n`);
			printHelp();
			process.exit(1);
		}
	}
}

main().catch((err) => {
	console.error(err instanceof Error ? err.message : String(err));
	process.exit(1);
});
