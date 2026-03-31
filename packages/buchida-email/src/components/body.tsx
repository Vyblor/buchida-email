import type { CSSProperties, ReactNode } from "react";

export interface BodyProps {
	children: ReactNode;
	style?: CSSProperties;
}

export function Body({ children, style }: BodyProps) {
	return (
		<body
			style={{
				margin: 0,
				padding: 0,
				width: "100%",
				backgroundColor: "#ffffff",
				fontFamily: "Arial, Helvetica, sans-serif",
				...style,
			}}
		>
			{children}
		</body>
	);
}
