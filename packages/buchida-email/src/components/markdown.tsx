import type { CSSProperties } from "react";

export interface MarkdownProps {
	children: string;
	style?: CSSProperties;
	locale?: string;
}

export function Markdown({ children, style, locale }: MarkdownProps) {
	const html = markdownToHtml(children);
	return (
		<div
			style={{ fontSize: "16px", lineHeight: "1.6", color: "#1A1A1A", ...style }}
			{...(locale ? { lang: locale } : {})}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}

function markdownToHtml(md: string): string {
	return md
		// Headers
		.replace(/^### (.*$)/gm, '<h3 style="font-size:18px;font-weight:bold;margin:16px 0 8px;">$1</h3>')
		.replace(/^## (.*$)/gm, '<h2 style="font-size:20px;font-weight:bold;margin:20px 0 8px;">$1</h2>')
		.replace(/^# (.*$)/gm, '<h1 style="font-size:24px;font-weight:bold;margin:24px 0 8px;">$1</h1>')
		// Bold and italic
		.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
		.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
		.replace(/\*(.*?)\*/g, "<em>$1</em>")
		// Links
		.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color:#3B6EF9;text-decoration:underline;">$1</a>')
		// Line breaks
		.replace(/\n\n/g, '</p><p style="margin:0 0 16px;">')
		.replace(/\n/g, "<br/>")
		// Wrap in paragraph
		.replace(/^/, '<p style="margin:0 0 16px;">')
		.replace(/$/, "</p>");
}
