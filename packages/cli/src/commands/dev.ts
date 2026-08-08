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

	// createPreviewServer is async and calls listen() itself, returning the Node
	// http.Server. It has no start()/stop() — this command called both and so
	// never compiled, which is why `buchida-email dev` has been broken.
	const server = await createPreviewServer({ port, templatesDir });

	console.log(`Press Ctrl+C to stop.`);

	// Keep the process alive until killed
	const shutdown = () => {
		console.log("\nStopping preview server...");
		server.close(() => process.exit(0));
		// Do not wait forever on lingering keep-alive connections.
		setTimeout(() => process.exit(0), 3000).unref();
	};

	process.on("SIGINT", shutdown);
	process.on("SIGTERM", shutdown);
}
