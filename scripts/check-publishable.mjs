#!/usr/bin/env node
/**
 * Refuse to publish a package whose manifest contains a dependency spec that
 * consumers cannot resolve.
 *
 * Task 1.62. Two of nine published @buchida packages were uninstallable:
 *
 *   @buchida/cjk-components@0.3.0  "@buchida/email": "workspace:*"
 *   @buchida/email-cli@0.1.0       "@buchida/preview": "workspace:*"
 *                                  "@buchida/render":  "workspace:*"
 *
 * `pnpm publish` rewrites workspace: protocols to real ranges at pack time.
 * `npm publish` does not — it ships the manifest verbatim. These were published
 * with npm, so the protocol went out as-is and every external install failed
 * with ERR_PNPM_WORKSPACE_PKG_NOT_FOUND. Nothing caught it because the packages
 * install fine from inside the monorepo, where the protocol resolves.
 *
 * email-cli additionally depended on @buchida/preview, which had never been
 * published at all — a 404.
 *
 * Only consumer-facing fields are checked. devDependencies are listed in the
 * published manifest but never installed by consumers, so a workspace: there is
 * harmless (@buchida/render has one and installs fine).
 *
 * Usage:
 *   node scripts/check-publishable.mjs                 # all non-private packages
 *   node scripts/check-publishable.mjs packages/cli    # one package
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const CONSUMER_FIELDS = ["dependencies", "peerDependencies", "optionalDependencies"];
const UNRESOLVABLE = /^(workspace:|link:|file:)/;

function findPackages(root) {
	const out = [];
	for (const group of ["packages", "templates"]) {
		const dir = join(root, group);
		if (!existsSync(dir)) continue;
		for (const name of readdirSync(dir)) {
			const manifest = join(dir, name, "package.json");
			if (existsSync(manifest)) out.push(manifest);
		}
	}
	return out;
}

const args = process.argv.slice(2);
const manifests = args.length
	? args.map((a) => (a.endsWith("package.json") ? a : join(a, "package.json")))
	: findPackages(process.cwd());

let failures = 0;
let checked = 0;

for (const manifest of manifests) {
	const pkg = JSON.parse(readFileSync(manifest, "utf8"));

	// Private packages are never published, so their protocols are irrelevant.
	if (pkg.private) continue;
	checked += 1;

	const problems = [];
	for (const field of CONSUMER_FIELDS) {
		for (const [dep, range] of Object.entries(pkg[field] ?? {})) {
			if (typeof range === "string" && UNRESOLVABLE.test(range)) {
				problems.push(`${field}.${dep} = "${range}"`);
			}
		}
	}

	if (problems.length) {
		failures += 1;
		console.error(`FAIL  ${pkg.name}@${pkg.version}  (${manifest})`);
		for (const p of problems) console.error(`        ${p}`);
	} else {
		console.log(`ok    ${pkg.name}@${pkg.version}`);
	}
}

console.log();
if (failures) {
	console.error(
		`${failures} of ${checked} publishable package(s) would ship an unresolvable dependency.\n` +
			"Replace the protocol with a real version range, e.g. \"^0.3.0\". pnpm still links\n" +
			"the local workspace copy when the range matches, so local development is unaffected.",
	);
	process.exit(1);
}

console.log(`${checked} publishable package(s) checked, all dependency specs resolvable.`);
