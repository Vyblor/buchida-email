import type { CSSProperties } from "react";

export interface CodeBlockProps {
	children: string;
	style?: CSSProperties;
}

export function CodeBlock({ children, style }: CodeBlockProps) {
	return (
		<pre
			style={{
				backgroundColor: "#1A1A1A",
				color: "#E5E7EB",
				padding: "16px",
				borderRadius: "8px",
				fontSize: "14px",
				fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
				overflowX: "auto" as const,
				margin: "16px 0",
				...style,
			}}
		>
			<code>{children}</code>
		</pre>
	);
}

export interface CodeInlineProps {
	children: string;
	style?: CSSProperties;
}

export function CodeInline({ children, style }: CodeInlineProps) {
	return (
		<code
			style={{
				backgroundColor: "#F3F4F6",
				padding: "2px 6px",
				borderRadius: "4px",
				fontSize: "14px",
				fontFamily: "'JetBrains Mono', monospace",
				color: "#DC2626",
				...style,
			}}
		>
			{children}
		</code>
	);
}
