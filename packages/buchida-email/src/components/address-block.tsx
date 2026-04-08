import type { CSSProperties } from "react";

export interface AddressBlockProps {
	lines: string[];
	locale?: string;
	postalCode?: string;
	style?: CSSProperties;
}

/**
 * CJK locales that display addresses in large-to-small order
 * (country → province → city → district → street → name).
 */
const CJK_LOCALES = new Set(["ko", "ja", "zh"]);

function isCJKLocale(locale: string): boolean {
	return CJK_LOCALES.has(locale.split("-")[0]);
}

/**
 * AddressBlock — locale-aware postal address component for email.
 *
 * Western format (en, fr, de, …):
 *   Name → Street → City State ZIP → Country
 *
 * CJK format (ko, ja, zh):
 *   〒ZIP / 우편번호 / 邮编 (postal code first)
 *   Lines rendered as-is (caller is responsible for correct CJK order)
 */
export function AddressBlock({ lines, locale = "en", postalCode, style }: AddressBlockProps) {
	const isCJK = isCJKLocale(locale);

	const baseStyle: CSSProperties = {
		fontStyle: "normal",
		lineHeight: isCJK ? "1.8" : "1.6",
		fontSize: "14px",
		color: "#555555",
		...style,
	};

	const postalPrefix: Record<string, string> = {
		ko: "우편번호",
		ja: "〒",
		zh: "邮编",
	};

	const postalLabel = postalPrefix[locale.split("-")[0]] ?? "";

	return (
		<address style={baseStyle} lang={locale}>
			{isCJK && postalCode && (
				<span style={{ display: "block" }}>
					{postalLabel} {postalCode}
				</span>
			)}
			{lines.map((line, i) => (
				<span key={i} style={{ display: "block" }}>
					{line}
				</span>
			))}
			{!isCJK && postalCode && (
				<span style={{ display: "block" }}>{postalCode}</span>
			)}
		</address>
	);
}
