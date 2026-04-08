import type { CSSProperties, ReactNode } from "react";

export interface ContainerProps {
	children: ReactNode;
	style?: CSSProperties;
	maxWidth?: number;
	locale?: string;
}

export function Container({ children, style, maxWidth = 600, locale }: ContainerProps) {
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
			{...(locale ? { lang: locale } : {})}
		>
			<tbody>
				<tr>
					<td>{children}</td>
				</tr>
			</tbody>
		</table>
	);
}
