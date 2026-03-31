import type { CSSProperties, ReactNode } from "react";

export interface TextProps {
	children: ReactNode;
	style?: CSSProperties;
	as?: "p" | "span";
}

export function Text({ children, style, as: Tag = "p" }: TextProps) {
	return (
		<Tag
			style={{
				margin: "0 0 16px 0",
				fontSize: "16px",
				lineHeight: "1.5",
				color: "#333333",
				...style,
			}}
		>
			{children}
		</Tag>
	);
}
