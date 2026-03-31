import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

/**
 * Render a React email element to an HTML string with DOCTYPE.
 */
export function render(element: ReactElement): string {
	const markup = renderToStaticMarkup(element);
	return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n${markup}`;
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
