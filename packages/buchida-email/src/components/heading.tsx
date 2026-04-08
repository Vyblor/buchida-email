import type { CSSProperties, ReactNode } from "react";

export interface HeadingProps {
	children: ReactNode;
	style?: CSSProperties;
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	locale?: string;
}

const defaultSizes: Record<string, string> = {
	h1: "32px",
	h2: "24px",
	h3: "20px",
	h4: "18px",
	h5: "16px",
	h6: "14px",
};

const CJK_FONT_MAP: Record<string, string> = {
	ko: "'Noto Sans KR', sans-serif",
	ja: "'Noto Sans JP', sans-serif",
	zh: "'Noto Sans SC', sans-serif",
};

export function Heading({ children, style, as: Tag = "h1", locale }: HeadingProps) {
	const cjkStyle = locale && CJK_FONT_MAP[locale]
		? { fontFamily: CJK_FONT_MAP[locale], lineHeight: "1.8" }
		: {};

	return (
		<Tag
			style={{
				margin: "0 0 16px 0",
				fontSize: defaultSizes[Tag],
				fontWeight: "bold",
				lineHeight: "1.3",
				color: "#111111",
				...cjkStyle,
				...style,
			}}
			{...(locale ? { lang: locale } : {})}
		>
			{children}
		</Tag>
	);
}
