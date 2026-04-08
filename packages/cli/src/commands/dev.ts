import { createPreviewServer } from "@buchida/preview";

export interface DevOptions {
	port: number;
	templatesDir: string;
}

/**
 * `buchida-email dev`
 *
 * Start a local preview server for email templates.
 * Press Ctrl+C to stop.
 */
export async function devCommand(options: DevOptions): Promise<void> {
	const { port, templatesDir } = options;

	console.log(`Starting buchida email preview server...`);
	console.log(`Templates directory: ${templatesDir}`);

	const server = createPreviewServer({ port, templatesDir });
	server.start();

	console.log(`\n  Preview: http://localhost:${port}\n`);
	console.log(`Press Ctrl+C to stop.`);

	// Keep the process alive until killed
	process.on("SIGINT", () => {
		console.log("\nStopping preview server...");
		server.stop();
		process.exit(0);
	});

	process.on("SIGTERM", () => {
		server.stop();
		process.exit(0);
	});
}
