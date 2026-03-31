import type { CSSProperties } from "react";

export interface ButtonProps {
	href: string;
	children: string;
	style?: CSSProperties;
}

export function Button({ href, children, style }: ButtonProps) {
	return (
		<table role="presentation" cellPadding={0} cellSpacing={0}>
			<tbody>
				<tr>
					<td
						style={{
							borderRadius: "6px",
							backgroundColor: "#0066ff",
						}}
					>
						<a
							href={href}
							style={{
								display: "inline-block",
								padding: "12px 24px",
								fontSize: "16px",
								fontWeight: "bold",
								color: "#ffffff",
								textDecoration: "none",
								borderRadius: "6px",
								backgroundColor: "#0066ff",
								...style,
							}}
						>
							{children}
						</a>
					</td>
				</tr>
			</tbody>
		</table>
	);
}
