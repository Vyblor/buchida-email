import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export interface RenderOptions {
	/** Indent HTML output (default: false) */
	pretty?: boolean;
	/** Remove unnecessary whitespace (default: false) */
	minify?: boolean;
}

/**
 * Render a React email element to an HTML string with DOCTYPE.
 */
export function render(element: ReactElement, options?: RenderOptions): string {
	const markup = renderToStaticMarkup(element);
	const doctype =
		'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

	let html = `${doctype}\n${markup}`;

	// Process MSO conditional comments
	html = processMsoConditionals(html);

	if (options?.minify) {
		html = html.replace(/\n\s*/g, "").replace(/>\s+</g, "><");
	}

	if (options?.pretty) {
		html = prettyPrintHtml(html);
	}

	return html;
}

/**
 * Replace MSO marker elements with Outlook conditional comments.
 * Templates use: <mso-conditional>fallback HTML here</mso-conditional>
 * Output: <!--[if mso]>fallback HTML here<![endif]-->
 */
function processMsoConditionals(html: string): string {
	return html
		.replace(/<mso-conditional>/g, "<!--[if mso]>")
		.replace(/<\/mso-conditional>/g, "<![endif]-->")
		.replace(/<mso-hide>/g, "<!--[if !mso]><!-->" )
		.replace(/<\/mso-hide>/g, "<!--<![endif]-->");
}

function prettyPrintHtml(html: string): string {
	let indent = 0;
	return html
		.replace(/(>)(<)/g, "$1\n$2")
		.split("\n")
		.map((line) => {
			if (line.match(/^<\//)) indent--;
			const indented = "  ".repeat(Math.max(0, indent)) + line.trim();
			if (line.match(/^<[^/]/) && !line.match(/\/>/)) indent++;
			return indented;
		})
		.join("\n");
}

/**
 * Render a React email element to plain text.
 * Strips all HTML tags and normalizes whitespace.
 */
export function renderToText(element: ReactElement): string {
	const markup = renderToStaticMarkup(element);

	const text = markup
		// Remove style tags and their content
		.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
		// Remove script tags and their content
		.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
		// Replace <br> and block-level closing tags with newlines
		.replace(/<br\s*\/?>/gi, "\n")
		.replace(/<\/(p|div|h[1-6]|tr|li|blockquote)>/gi, "\n")
		// Replace <hr> with a separator
		.replace(/<hr[^>]*>/gi, "\n---\n")
		// Strip remaining HTML tags
		.replace(/<[^>]+>/g, "")
		// Decode common HTML entities
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&nbsp;/g, " ")
		// Normalize whitespace
		.replace(/[ \t]+/g, " ")
		// Collapse multiple newlines
		.replace(/\n{3,}/g, "\n\n")
		.trim();

	return text;
}
