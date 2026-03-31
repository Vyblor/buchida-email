import { readdir, stat } from "node:fs/promises";
import { type IncomingMessage, type ServerResponse, createServer } from "node:http";
import { join, resolve } from "node:path";

export interface PreviewServerOptions {
	port?: number;
	templatesDir?: string;
}

export function createPreviewServer(options: PreviewServerOptions = {}) {
	const { port = 3333, templatesDir = "./templates" } = options;

	const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
		const url = new URL(req.url || "/", `http://localhost:${port}`);

		if (url.pathname === "/" || url.pathname === "") {
			// List available templates
			const templates = await listTemplates(templatesDir);
			const mobileParam = url.searchParams.get("device") === "mobile";

			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.end(renderIndex(templates, mobileParam));
			return;
		}

		if (url.pathname.startsWith("/preview/")) {
			const templateName = url.pathname.replace("/preview/", "");
			const isMobile = url.searchParams.get("device") === "mobile";
			const width = isMobile ? 375 : 600;

			try {
				const templatePath = resolve(templatesDir, templateName);
				const module = await import(join(templatePath, "dist", "index.js"));
				const { render } = await import("@buchida/render");
				const { createElement } = await import("react");
				const html = render(createElement(module.default));

				res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
				res.end(wrapPreview(html, templateName, width));
			} catch (error) {
				res.writeHead(500, { "Content-Type": "text/plain" });
				res.end(`Error rendering template: ${error}`);
			}
			return;
		}

		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Not found");
	});

	return {
		start: () => {
			server.listen(port, () => {
				console.log(`buchida preview server running at http://localhost:${port}`);
			});
		},
		stop: () => {
			server.close();
		},
	};
}

async function listTemplates(dir: string): Promise<string[]> {
	try {
		const resolvedDir = resolve(dir);
		const entries = await readdir(resolvedDir);
		const templates: string[] = [];

		for (const entry of entries) {
			const entryPath = join(resolvedDir, entry);
			const entryStat = await stat(entryPath);
			if (entryStat.isDirectory()) {
				templates.push(entry);
			}
		}

		return templates;
	} catch {
		return [];
	}
}

function renderIndex(templates: string[], _isMobile: boolean): string {
	const templateLinks = templates
		.map(
			(t) =>
				`<li style="margin:8px 0">
					<a href="/preview/${t}" style="color:#0066ff">${t}</a>
					<a href="/preview/${t}?device=mobile" style="color:#999;margin-left:8px">[mobile]</a>
				</li>`,
		)
		.join("\n");

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>buchida Email Preview</title>
	<style>
		body { font-family: system-ui, sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; }
		h1 { color: #111; }
		ul { list-style: none; padding: 0; }
	</style>
</head>
<body>
	<h1>buchida Email Preview</h1>
	<p>Available templates:</p>
	<ul>${templateLinks}</ul>
</body>
</html>`;
}

function wrapPreview(html: string, templateName: string, width: number): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Preview: ${templateName}</title>
	<style>
		body { margin: 0; background: #f0f0f0; font-family: system-ui; }
		.toolbar { background: #111; color: #fff; padding: 12px 20px; display: flex; align-items: center; gap: 16px; }
		.toolbar a { color: #fff; text-decoration: none; }
		.toolbar .toggle { background: #333; padding: 4px 12px; border-radius: 4px; }
		.frame { max-width: ${width}px; margin: 20px auto; background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
		iframe { width: 100%; height: 80vh; border: none; }
	</style>
</head>
<body>
	<div class="toolbar">
		<a href="/">&larr; Back</a>
		<span>${templateName}</span>
		<a class="toggle" href="/preview/${templateName}?device=desktop">Desktop</a>
		<a class="toggle" href="/preview/${templateName}?device=mobile">Mobile</a>
	</div>
	<div class="frame">
		<iframe srcdoc="${html.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}"></iframe>
	</div>
</body>
</html>`;
}
