import type { CSSProperties } from "react";

export interface DateDisplayProps {
	date: string | Date;
	locale?: string;
	format?: "short" | "long" | "relative";
	style?: CSSProperties;
}

function parseDate(date: string | Date): Date {
	if (date instanceof Date) return date;
	return new Date(date);
}

/**
 * Returns a relative time string (e.g. "3 days ago") when `format="relative"`.
 * Falls back gracefully if Intl.RelativeTimeFormat is unavailable.
 */
function formatRelative(date: Date, locale: string): string {
	const now = Date.now();
	const diffMs = date.getTime() - now;
	const diffSec = Math.round(diffMs / 1000);
	const diffMin = Math.round(diffSec / 60);
	const diffHour = Math.round(diffMin / 60);
	const diffDay = Math.round(diffHour / 24);

	try {
		const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
		if (Math.abs(diffDay) >= 1) return rtf.format(diffDay, "day");
		if (Math.abs(diffHour) >= 1) return rtf.format(diffHour, "hour");
		if (Math.abs(diffMin) >= 1) return rtf.format(diffMin, "minute");
		return rtf.format(diffSec, "second");
	} catch {
		return date.toLocaleDateString(locale);
	}
}

/**
 * DateDisplay — locale-aware date formatting for email.
 *
 * en: "Apr 8, 2026" / "April 8, 2026"
 * ko: "2026년 4월 8일"
 * ja: "2026年4月8日"
 * zh: "2026年4月8日"
 */
export function DateDisplay({ date, locale = "en", format = "short", style }: DateDisplayProps) {
	const parsed = parseDate(date);

	let formatted: string;

	if (format === "relative") {
		formatted = formatRelative(parsed, locale);
	} else {
		const dateStyle = format === "long" ? "long" : "medium";
		try {
			formatted = new Intl.DateTimeFormat(locale, { dateStyle }).format(parsed);
		} catch {
			formatted = parsed.toLocaleDateString(locale);
		}
	}

	return (
		<time
			dateTime={parsed.toISOString()}
			style={{ ...style }}
			lang={locale}
		>
			{formatted}
		</time>
	);
}
