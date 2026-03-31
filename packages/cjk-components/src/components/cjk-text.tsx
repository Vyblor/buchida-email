import type { CSSProperties, ReactNode } from "react";
import { type CJKLocale, CJK_LINE_HEIGHT, FONT_FAMILIES } from "../fonts.js";

export interface CJKTextProps {
	children: ReactNode;
	locale: CJKLocale;
	style?: CSSProperties;
	as?: "p" | "span";
}

export function CJKText({ children, locale, style, as: Tag = "p" }: CJKTextProps) {
	return (
		<Tag
			lang={locale}
			style={{
				margin: "0 0 16px 0",
				fontSize: "16px",
				lineHeight: CJK_LINE_HEIGHT,
				fontFamily: FONT_FAMILIES[locale],
				color: "#333333",
				wordBreak: "keep-all",
				...style,
			}}
		>
			{children}
		</Tag>
	);
}
