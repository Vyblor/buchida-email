import { readdir, mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { existsSync } from "node:fs";

export interface ExportOptions {
	templatesDir: string;
	outDir: string;
	/** If set, only export this specific template */
	template?: string;
}

/**
 * `buchida-email export`
 *
 * Export all templates (or a specific one) as standalone HTML files.
 * Unlike `build`, this writes flat files directly to outDir without subdirectories.
 *
 * Output: {outDir}/{templateName}.html
 */
export async function exportCommand(options: ExportOptions): Promise<void> {
	const { templatesDir, outDir, template } = options;
	const resolvedTemplates = resolve(templatesDir);
	const resolvedOut = resolve(outDir);

	if (!existsSync(resolvedTemplates)) {
		console.error(`Error: Templates directory not found: ${resolvedTemplates}`);
		process.exit(1);
	}

	await mkdir(resolvedOut, { recursive: true });

	if (template) {
		// Export a single template
		await exportSingle(resolvedTemplates, resolvedOut, template);
	} else {
		// Export all templates
		await exportAll(resolvedTemplates, resolvedOut);
	}
}

async function exportAll(templatesDir: string, outDir: string): Promise<void> {
	const entries = await readdir(templatesDir);
	const { stat } = await import("node:fs/promises");

	let successCount = 0;
	let failCount = 0;

	console.log(`Exporting all templates to ${outDir}\n`);

	for (const entry of entries) {
		const entryPath = join(templatesDir, entry);
		const entryStat = await stat(entryPath);
		if (!entryStat.isDirectory()) continue;

		const success = await exportSingle(templatesDir, outDir, entry);
		if (success) successCount++;
		else failCount++;
	}

	console.log(`\nExport complete: ${successCount} exported, ${failCount} failed.`);

	if (failCount > 0) {
		process.exit(1);
	}
}

async function exportSingle(
	templatesDir: string,
	outDir: string,
	templateName: string,
): Promise<boolean> {
	const templatePath = join(templatesDir, templateName);
	const distEntry = join(templatePath, "dist", "index.js");
	const outputFile = join(outDir, `${templateName}.html`);

	if (!existsSync(templatePath)) {
		console.error(`  ✗ Template not found: ${templateName}`);
		return false;
	}

	if (!existsSync(distEntry)) {
		console.error(
			`  ✗ ${templateName}: no compiled output at dist/index.js. Run "pnpm build" first.`,
		);
		return false;
	}

	try {
		const { render } = await import("@buchida/render");
		const { createElement } = await import("react");
		const module = await import(distEntry);

		if (!module.default) {
			console.error(`  ✗ ${templateName}: no default export.`);
			return false;
		}

		const html = render(createElement(module.default));
		await writeFile(outputFile, html, "utf-8");

		console.log(`  ✓ ${templateName} → ${outputFile}`);
		return true;
	} catch (err) {
		console.error(`  ✗ ${templateName}: ${err instanceof Error ? err.message : String(err)}`);
		return false;
	}
}
