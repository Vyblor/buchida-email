import type { CSSProperties, ReactNode } from "react";

export interface CompactSectionProps {
	children: ReactNode;
	style?: CSSProperties;
}

export function CompactSection({ children, style }: CompactSectionProps) {
	return (
		<table
			role="presentation"
			cellPadding={0}
			cellSpacing={0}
			style={{
				width: "100%",
				padding: "8px 0",
				...style,
			}}
		>
			<tbody>
				<tr>
					<td style={{ padding: "4px 0" }}>{children}</td>
				</tr>
			</tbody>
		</table>
	);
}
