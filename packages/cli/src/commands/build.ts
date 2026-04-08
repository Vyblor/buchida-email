import { readdir, mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { existsSync } from "node:fs";

export interface BuildOptions {
	templatesDir: string;
	outDir: string;
}

/**
 * `buchida-email build`
 *
 * Render all templates in the templates directory and write their HTML output
 * to the output directory. Each template renders to `dist/{templateName}/index.html`.
 */
export async function buildCommand(options: BuildOptions): Promise<void> {
	const { templatesDir, outDir } = options;
	const resolvedTemplates = resolve(templatesDir);
	const resolvedOut = resolve(outDir);

	console.log(`Building email templates...`);
	console.log(`  Source: ${resolvedTemplates}`);
	console.log(`  Output: ${resolvedOut}\n`);

	if (!existsSync(resolvedTemplates)) {
		console.error(`Error: Templates directory not found: ${resolvedTemplates}`);
		process.exit(1);
	}

	const entries = await readdir(resolvedTemplates);
	const templateDirs = await filterDirectories(resolvedTemplates, entries);

	if (templateDirs.length === 0) {
		console.log("No templates found.");
		return;
	}

	await mkdir(resolvedOut, { recursive: true });

	let successCount = 0;
	let failCount = 0;

	for (const templateName of templateDirs) {
		const templatePath = join(resolvedTemplates, templateName);
		const outputPath = join(resolvedOut, templateName);

		try {
			const html = await renderTemplate(templatePath, templateName);
			await mkdir(outputPath, { recursive: true });
			await writeFile(join(outputPath, "index.html"), html, "utf-8");

			console.log(`  ✓ ${templateName}`);
			successCount++;
		} catch (err) {
			console.error(`  ✗ ${templateName}: ${err instanceof Error ? err.message : String(err)}`);
			failCount++;
		}
	}

	console.log(`\nBuild complete: ${successCount} succeeded, ${failCount} failed.`);

	if (failCount > 0) {
		process.exit(1);
	}
}

async function renderTemplate(templatePath: string, templateName: string): Promise<string> {
	// Templates must have a compiled dist/index.js entry
	const distEntry = join(templatePath, "dist", "index.js");

	if (!existsSync(distEntry)) {
		throw new Error(
			`Template "${templateName}" has no compiled output at dist/index.js. Run "pnpm build" inside the template first.`,
		);
	}

	const { render } = await import("@buchida/render");
	const { createElement } = await import("react");
	const module = await import(distEntry);

	if (!module.default) {
		throw new Error(`Template "${templateName}" has no default export.`);
	}

	return render(createElement(module.default));
}

async function filterDirectories(baseDir: string, entries: string[]): Promise<string[]> {
	const { stat } = await import("node:fs/promises");
	const results: string[] = [];

	for (const entry of entries) {
		const entryPath = join(baseDir, entry);
		const entryStat = await stat(entryPath);
		if (entryStat.isDirectory()) {
			results.push(entry);
		}
	}

	return results;
}
