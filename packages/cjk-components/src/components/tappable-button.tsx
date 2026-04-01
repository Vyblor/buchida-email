import type { CSSProperties } from "react";
import { type CJKLocale, FONT_FAMILIES } from "../fonts.js";

export interface TappableButtonProps {
	href: string;
	children: string;
	locale: CJKLocale;
	style?: CSSProperties;
}

export function TappableButton({ href, children, locale, style }: TappableButtonProps) {
	return (
		<table role="presentation" cellPadding={0} cellSpacing={0}>
			<tbody>
				<tr>
					<td
						style={{
							borderRadius: "6px",
							backgroundColor: "#3B6EF9",
						}}
					>
						<a
							href={href}
							lang={locale}
							style={{
								display: "inline-block",
								minWidth: "44px",
								minHeight: "44px",
								padding: "12px 24px",
								fontSize: "16px",
								fontWeight: "bold",
								fontFamily: FONT_FAMILIES[locale],
								color: "#ffffff",
								textDecoration: "none",
								borderRadius: "6px",
								backgroundColor: "#3B6EF9",
								textAlign: "center",
								lineHeight: "20px",
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
