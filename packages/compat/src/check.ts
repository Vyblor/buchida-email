/**
 * HTML compatibility checker for email templates.
 * Scans HTML strings and returns a list of compatibility issues
 * with affected clients, severity levels, and remediation suggestions.
 */

export interface CompatIssue {
	severity: "error" | "warning" | "info";
	client: string;
	message: string;
	suggestion: string;
}

/** Approximate UTF-8 byte length of a string without Node.js globals. */
function byteLength(str: string): number {
	let bytes = 0;
	for (let i = 0; i < str.length; i++) {
		const code = str.charCodeAt(i);
		if (code < 0x80) bytes += 1;
		else if (code < 0x800) bytes += 2;
		else if (code < 0xd800 || code >= 0xe000) bytes += 3;
		else {
			// surrogate pair → 4 bytes (emoji etc.)
			i++;
			bytes += 4;
		}
	}
	return bytes;
}

/**
 * checkCompatibility — scans an HTML email string and returns compatibility issues.
 *
 * @param html - The full HTML string of the email
 * @returns Array of CompatIssue sorted by severity (errors first)
 */
export function checkCompatibility(html: string): CompatIssue[] {
	const issues: CompatIssue[] = [];

	// ─── Style block detection ───────────────────────────────────────────────

	if (/<style[\s>]/i.test(html)) {
		issues.push({
			severity: "warning",
			client: "Gmail, Naver Mail, Kakao Mail",
			message: "<style> blocks are stripped by Gmail and Korean mail clients",
			suggestion: "Move all styles inline. Use a CSS inliner before sending.",
		});
	}

	// ─── External stylesheet detection ───────────────────────────────────────

	if (/href\s*=\s*["'][^"']*\.css["']/i.test(html)) {
		issues.push({
			severity: "error",
			client: "All clients",
			message: "External CSS stylesheets are not supported in email",
			suggestion: "Inline all styles before sending. Remove <link rel='stylesheet'> tags.",
		});
	}

	// ─── Email size check (Gmail 102 KB clip) ────────────────────────────────

	const sizeBytes = byteLength(html);
	if (sizeBytes > 102400) {
		issues.push({
			severity: "warning",
			client: "Gmail",
			message: `Email is ${Math.round(sizeBytes / 1024)}KB — exceeds Gmail's 102KB limit and will be clipped`,
			suggestion: "Reduce template size. Move large images to CDN URLs and trim redundant markup.",
		});
	}

	// ─── Background image ────────────────────────────────────────────────────

	if (/background-image\s*:/i.test(html)) {
		issues.push({
			severity: "warning",
			client: "Outlook (Windows)",
			message: "background-image CSS is not supported in Outlook 2007–2019",
			suggestion: "Use VML background images for Outlook, or use a solid background color fallback.",
		});
	}

	// ─── background shorthand on non-table elements ──────────────────────────

	if (/background\s*:\s*url\s*\(/i.test(html)) {
		issues.push({
			severity: "warning",
			client: "Outlook (Windows)",
			message: "background: url(...) shorthand is not supported in Outlook",
			suggestion: "Use VML conditional comments for Outlook background images.",
		});
	}

	// ─── Flexbox ─────────────────────────────────────────────────────────────

	if (/display\s*:\s*flex/i.test(html) || /flex-direction/i.test(html)) {
		issues.push({
			severity: "warning",
			client: "Outlook (Windows), Gmail (Android)",
			message: "CSS Flexbox is not supported in Outlook or Gmail Android",
			suggestion: "Use table-based layout with <table>, <tr>, <td> for reliable email layout.",
		});
	}

	// ─── CSS Grid ────────────────────────────────────────────────────────────

	if (/display\s*:\s*grid/i.test(html) || /grid-template/i.test(html)) {
		issues.push({
			severity: "warning",
			client: "Outlook (Windows), Gmail",
			message: "CSS Grid is not supported in Outlook or Gmail",
			suggestion: "Use table-based layout instead of CSS Grid.",
		});
	}

	// ─── CSS custom properties ───────────────────────────────────────────────

	if (/var\s*\(--/i.test(html) || /--[a-z]/i.test(html)) {
		issues.push({
			severity: "warning",
			client: "Outlook, Gmail, Naver Mail",
			message: "CSS custom properties (variables) are not supported in most email clients",
			suggestion: "Replace all var(--foo) references with hardcoded values before sending.",
		});
	}

	// ─── Web fonts (@font-face) ───────────────────────────────────────────────

	if (/@font-face/i.test(html)) {
		issues.push({
			severity: "info",
			client: "Outlook (Windows), Gmail, Naver Mail",
			message: "@font-face web fonts are not supported in several major clients",
			suggestion: "Always define a system font fallback stack. The font will display correctly in Apple Mail and some others.",
		});
	}

	// ─── Google Fonts <link> ──────────────────────────────────────────────────

	if (/fonts\.googleapis\.com/i.test(html)) {
		issues.push({
			severity: "info",
			client: "Outlook (Windows), Gmail, Naver Mail",
			message: "Google Fonts are loaded via external CSS which is blocked in many clients",
			suggestion: "Specify a system font fallback stack after Google Font references.",
		});
	}

	// ─── position: fixed / absolute ──────────────────────────────────────────

	if (/position\s*:\s*(fixed|absolute)/i.test(html)) {
		issues.push({
			severity: "error",
			client: "All clients",
			message: "position: fixed and position: absolute are not supported in email",
			suggestion: "Use table-based layout. Email rendering does not support positioned elements.",
		});
	}

	// ─── overflow: hidden ─────────────────────────────────────────────────────

	if (/overflow\s*:\s*hidden/i.test(html)) {
		issues.push({
			severity: "warning",
			client: "Gmail, Outlook",
			message: "overflow: hidden is not reliably supported in email clients",
			suggestion: "Avoid overflow: hidden. Structure layout so content doesn't overflow its container.",
		});
	}

	// ─── SVG ─────────────────────────────────────────────────────────────────

	if (/<svg[\s>]/i.test(html)) {
		issues.push({
			severity: "warning",
			client: "Outlook (Windows), Gmail (Android)",
			message: "SVG elements are not supported in Outlook or Gmail Android",
			suggestion: "Export SVG as a PNG/WebP image and use <img> instead.",
		});
	}

	// ─── Video / Audio ────────────────────────────────────────────────────────

	if (/<video[\s>]/i.test(html)) {
		issues.push({
			severity: "error",
			client: "Outlook, Gmail, Yahoo",
			message: "<video> is not supported in most email clients",
			suggestion: "Use an animated GIF or a static image with a play-button overlay linking to the video.",
		});
	}

	if (/<audio[\s>]/i.test(html)) {
		issues.push({
			severity: "error",
			client: "Most clients",
			message: "<audio> is not supported in email clients",
			suggestion: "Remove <audio> elements. Link to audio hosting instead.",
		});
	}

	// ─── max-width on outer table (Outlook) ──────────────────────────────────

	if (/max-width/i.test(html) && /<table/i.test(html)) {
		issues.push({
			severity: "info",
			client: "Outlook (Windows)",
			message: "max-width is ignored by Outlook (Windows) on table elements",
			suggestion: "Set an explicit width attribute alongside max-width. Use MSO conditional comments to control width in Outlook.",
		});
	}

	// ─── box-shadow ───────────────────────────────────────────────────────────

	if (/box-shadow/i.test(html)) {
		issues.push({
			severity: "info",
			client: "Outlook (Windows)",
			message: "box-shadow is not rendered in Outlook for Windows",
			suggestion: "Use border styles as a fallback for visual depth in Outlook.",
		});
	}

	// Sort: errors first, then warnings, then info
	const order = { error: 0, warning: 1, info: 2 };
	issues.sort((a, b) => order[a.severity] - order[b.severity]);

	return issues;
}
