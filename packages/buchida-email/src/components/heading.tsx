import type { CSSProperties, ReactNode } from "react";

export interface HeadingProps {
	children: ReactNode;
	style?: CSSProperties;
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const defaultSizes: Record<string, string> = {
	h1: "32px",
	h2: "24px",
	h3: "20px",
	h4: "18px",
	h5: "16px",
	h6: "14px",
};

export function Heading({ children, style, as: Tag = "h1" }: HeadingProps) {
	return (
		<Tag
			style={{
				margin: "0 0 16px 0",
				fontSize: defaultSizes[Tag],
				fontWeight: "bold",
				lineHeight: "1.3",
				color: "#111111",
				...style,
			}}
		>
			{children}
		</Tag>
	);
}
