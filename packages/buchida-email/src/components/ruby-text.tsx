import type { CSSProperties } from "react";

export interface RubyTextProps {
	children: string;
	annotation: string;
	style?: CSSProperties;
	locale?: string;
}

/**
 * RubyText — furigana/pinyin annotations above base text.
 * Uses <ruby> HTML (supported in most email clients).
 * Fallback for Outlook: shows annotation in parentheses via MSO conditional.
 */
export function RubyText({ children, annotation, style, locale }: RubyTextProps) {
	return (
		<span style={style} {...(locale ? { lang: locale } : {})}>
			{/*[if !mso]><!*/}
			<ruby>
				{children}
				<rt style={{ fontSize: "0.6em", color: "#666666" }}>{annotation}</rt>
			</ruby>
			{/*<![endif]*/}
			{/*[if mso]><!*/}
			<span>
				{children}({annotation})
			</span>
			{/*<![endif]*/}
		</span>
	);
}
