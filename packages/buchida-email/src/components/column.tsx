import type { CSSProperties, ReactNode } from "react";

export interface ColumnProps {
	children: ReactNode;
	style?: CSSProperties;
	width?: string | number;
}

export function Column({ children, style, width }: ColumnProps) {
	return (
		<td
			style={{
				verticalAlign: "top",
				width,
				...style,
			}}
		>
			{children}
		</td>
	);
}
