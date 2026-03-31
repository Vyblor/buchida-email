import type { CSSProperties, ReactNode } from "react";
import { type CJKLocale, CJK_LINE_HEIGHT, FONT_FAMILIES } from "../fonts.js";

export interface CJKHeadingProps {
	children: ReactNode;
	locale: CJKLocale;
	style?: CSSProperties;
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const defaultSizes: Record<string, string> = {
	h1: "32px",
	h2: "24px",
	h3: "20px",
	h4: "18px",
	h5: "16px",
	h6: "14px",
};

const letterSpacing: Record<CJKLocale, string> = {
	ko: "0.02em",
	ja: "0.05em",
	zh: "0.03em",
};

export function CJKHeading({ children, locale, style, as: Tag = "h1" }: CJKHeadingProps) {
	return (
		<Tag
			lang={locale}
			style={{
				margin: "0 0 16px 0",
				fontSize: defaultSizes[Tag],
				fontWeight: "bold",
				lineHeight: CJK_LINE_HEIGHT,
				fontFamily: FONT_FAMILIES[locale],
				color: "#111111",
				wordBreak: "keep-all",
				letterSpacing: letterSpacing[locale],
				...style,
			}}
		>
			{children}
		</Tag>
	);
}
