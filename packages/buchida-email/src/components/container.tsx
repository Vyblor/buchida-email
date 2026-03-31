import type { CSSProperties, ReactNode } from "react";

export interface ContainerProps {
	children: ReactNode;
	style?: CSSProperties;
	maxWidth?: number;
}

export function Container({ children, style, maxWidth = 600 }: ContainerProps) {
	return (
		<table
			role="presentation"
			cellPadding={0}
			cellSpacing={0}
			style={{
				width: "100%",
				maxWidth: `${maxWidth}px`,
				margin: "0 auto",
				...style,
			}}
		>
			<tbody>
				<tr>
					<td>{children}</td>
				</tr>
			</tbody>
		</table>
	);
}
