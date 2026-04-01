/**
 * Pre-render all email templates to static HTML files.
 * Output: dist/rendered/{template-slug}.html
 *
 * Usage: pnpm exec tsx scripts/render-all.tsx
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { render } from "../packages/render/src/index.js";

// Import all templates
import WelcomeKo from "../templates/welcome-ko/src/index.js";
import WelcomeJa from "../templates/welcome-ja/src/index.js";
import WelcomeZh from "../templates/welcome-zh/src/index.js";
import PasswordResetKo from "../templates/password-reset-ko/src/index.js";
import PasswordResetJa from "../templates/password-reset-ja/src/index.js";
import PasswordResetZh from "../templates/password-reset-zh/src/index.js";
import ReceiptKo from "../templates/receipt-ko/src/index.js";
import NewsletterJa from "../templates/newsletter-ja/src/index.js";
import ShippingKo from "../templates/shipping-ko/src/index.js";
import ShippingJa from "../templates/shipping-ja/src/index.js";
import ShippingZh from "../templates/shipping-zh/src/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "dist", "rendered");

interface TemplateEntry {
	slug: string;
	name: string;
	category: "transactional" | "marketing";
	locale: string;
	element: React.ReactElement;
}

const templates: TemplateEntry[] = [
	{ slug: "welcome-ko", name: "Welcome - Korean", category: "transactional", locale: "ko", element: React.createElement(WelcomeKo) },
	{ slug: "welcome-ja", name: "Welcome - Japanese", category: "transactional", locale: "ja", element: React.createElement(WelcomeJa) },
	{ slug: "welcome-zh", name: "Welcome - Chinese", category: "transactional", locale: "zh", element: React.createElement(WelcomeZh) },
	{ slug: "password-reset-ko", name: "Password Reset - Korean", category: "transactional", locale: "ko", element: React.createElement(PasswordResetKo) },
	{ slug: "password-reset-ja", name: "Password Reset - Japanese", category: "transactional", locale: "ja", element: React.createElement(PasswordResetJa) },
	{ slug: "password-reset-zh", name: "Password Reset - Chinese", category: "transactional", locale: "zh", element: React.createElement(PasswordResetZh) },
	{ slug: "receipt-ko", name: "Receipt - Korean", category: "transactional", locale: "ko", element: React.createElement(ReceiptKo) },
	{ slug: "newsletter-ja", name: "Newsletter - Japanese", category: "marketing", locale: "ja", element: React.createElement(NewsletterJa) },
	{ slug: "shipping-ko", name: "Shipping - Korean", category: "transactional", locale: "ko", element: React.createElement(ShippingKo) },
	{ slug: "shipping-ja", name: "Shipping - Japanese", category: "transactional", locale: "ja", element: React.createElement(ShippingJa) },
	{ slug: "shipping-zh", name: "Shipping - Chinese", category: "transactional", locale: "zh", element: React.createElement(ShippingZh) },
];

mkdirSync(outDir, { recursive: true });

let count = 0;
for (const { slug, element } of templates) {
	const html = render(element);
	writeFileSync(join(outDir, `${slug}.html`), html, "utf-8");
	count++;
	console.log(`✓ ${slug}.html`);
}

// Create manifest with metadata
const manifest = templates.map(({ slug, name, category, locale }) => ({
	slug,
	name,
	category,
	locale,
}));

writeFileSync(join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf-8");
console.log(`\n✅ Rendered ${count} templates to ${outDir}/`);
