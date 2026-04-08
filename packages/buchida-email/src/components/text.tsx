import type { CSSProperties, ReactNode } from "react";

export interface TextProps {
	children: ReactNode;
	style?: CSSProperties;
	as?: "p" | "span";
	locale?: string;
}

const CJK_FONT_MAP: Record<string, string> = {
	ko: "'Noto Sans KR', sans-serif",
	ja: "'Noto Sans JP', sans-serif",
	zh: "'Noto Sans SC', sans-serif",
};

export function Text({ children, style, as: Tag = "p", locale }: TextProps) {
	const cjkStyle = locale && CJK_FONT_MAP[locale]
		? { fontFamily: CJK_FONT_MAP[locale], lineHeight: "1.8" }
		: {};

	return (
		<Tag
			style={{
				margin: "0 0 16px 0",
				fontSize: "16px",
				lineHeight: "1.5",
				color: "#333333",
				...cjkStyle,
				...style,
			}}
			{...(locale ? { lang: locale } : {})}
		>
			{children}
		</Tag>
	);
}
