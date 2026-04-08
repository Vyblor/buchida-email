import type { CSSProperties } from "react";

export type CurrencyCode = "USD" | "KRW" | "JPY" | "CNY" | "EUR" | "GBP";

export interface CurrencyAmountProps {
	amount: number;
	currency: CurrencyCode;
	locale?: string;
	style?: CSSProperties;
}

/**
 * Map from currency to a default display locale when none is provided.
 * This drives Intl.NumberFormat symbol position and decimal logic.
 */
const CURRENCY_LOCALE_MAP: Record<CurrencyCode, string> = {
	USD: "en-US",
	KRW: "ko-KR",
	JPY: "ja-JP",
	CNY: "zh-CN",
	EUR: "de-DE",
	GBP: "en-GB",
};

/**
 * Currencies that display without decimal places by convention.
 */
const ZERO_DECIMAL: Set<CurrencyCode> = new Set(["KRW", "JPY"]);

/**
 * CurrencyAmount — locale-aware monetary formatting for email.
 * Examples: $20.00 · ₩25,000 · ¥2,000 · ¥140.00 · €18.00 · £15.00
 */
export function CurrencyAmount({ amount, currency, locale, style }: CurrencyAmountProps) {
	const displayLocale = locale ?? CURRENCY_LOCALE_MAP[currency];
	const fractionDigits = ZERO_DECIMAL.has(currency) ? 0 : 2;

	let formatted: string;
	try {
		formatted = new Intl.NumberFormat(displayLocale, {
			style: "currency",
			currency,
			minimumFractionDigits: fractionDigits,
			maximumFractionDigits: fractionDigits,
		}).format(amount);
	} catch {
		// Fallback if Intl is unavailable (very old Node)
		formatted = `${currency} ${amount.toFixed(fractionDigits)}`;
	}

	return (
		<span
			style={{
				fontVariantNumeric: "tabular-nums",
				...style,
			}}
			{...(locale ? { lang: locale } : {})}
		>
			{formatted}
		</span>
	);
}
