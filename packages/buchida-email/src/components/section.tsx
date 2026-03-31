import type { CSSProperties, ReactNode } from "react";

export interface SectionProps {
	children: ReactNode;
	style?: CSSProperties;
}

export function Section({ children, style }: SectionProps) {
	return (
		<table
			role="presentation"
			cellPadding={0}
			cellSpacing={0}
			style={{
				width: "100%",
				...style,
			}}
		>
			<tbody>{children}</tbody>
		</table>
	);
}
