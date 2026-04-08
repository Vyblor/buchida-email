import type { CSSProperties } from "react";

export interface ButtonProps {
	href: string;
	children: string;
	style?: CSSProperties;
	locale?: string;
}

export function Button({ href, children, style, locale }: ButtonProps) {
	const bgColor = style?.backgroundColor ?? "#3B6EF9";
	const radius = style?.borderRadius ?? "6px";

	return (
		<table role="presentation" cellPadding={0} cellSpacing={0} align="center" style={{ margin: "0 auto" }}
			{...(locale ? { lang: locale } : {})}
		>
			<tbody>
				<tr>
					<td
						align="center"
						style={{
							borderRadius: radius,
							backgroundColor: bgColor,
							border: style?.border,
							boxShadow: style?.boxShadow,
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
								textAlign: "center" as const,
								borderRadius: radius,
								backgroundColor: bgColor,
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
