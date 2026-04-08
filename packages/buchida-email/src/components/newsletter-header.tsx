import type { CSSProperties } from "react";

export interface NewsletterHeaderProps {
	title: string;
	issueNumber?: number;
	date: string | Date;
	logoUrl?: string;
	locale?: string;
	style?: CSSProperties;
}

const ISSUE_LABEL: Record<string, string> = {
	en: "Issue",
	ko: "제",
	ja: "第",
	zh: "第",
};

const ISSUE_SUFFIX: Record<string, string> = {
	en: "",
	ko: "호",
	ja: "号",
	zh: "期",
};

function parseDate(date: string | Date): Date {
	if (date instanceof Date) return date;
	return new Date(date);
}

/**
 * NewsletterHeader — branded newsletter top section.
 * Shows optional logo, newsletter title, issue number, and date.
 */
export function NewsletterHeader({
	title,
	issueNumber,
	date,
	logoUrl,
	locale = "en",
	style,
}: NewsletterHeaderProps) {
	const parsed = parseDate(date);
	let formattedDate: string;
	try {
		formattedDate = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(parsed);
	} catch {
		formattedDate = parsed.toLocaleDateString();
	}

	const prefix = ISSUE_LABEL[locale] ?? ISSUE_LABEL.en;
	const suffix = ISSUE_SUFFIX[locale] ?? ISSUE_SUFFIX.en;
	const issueStr = issueNumber !== undefined
		? locale === "ja" || locale === "zh"
			? `${prefix}${issueNumber}${suffix}`
			: `${prefix} #${issueNumber}`
		: null;

	return (
		<table
			role="presentation"
			cellPadding={0}
			cellSpacing={0}
			width="100%"
			{...(locale ? { lang: locale } : {})}
			style={{
				borderBottom: "3px solid #1A1A1A",
				marginBottom: "32px",
				paddingBottom: "20px",
				...style,
			}}
		>
			<tbody>
				<tr>
					<td>
						{logoUrl && (
							<img
								src={logoUrl}
								alt="logo"
								width={100}
								height={32}
								style={{ display: "block", marginBottom: "16px" }}
							/>
						)}
						<h1
							style={{
								fontSize: "26px",
								fontWeight: "800",
								color: "#1A1A1A",
								margin: "0 0 8px",
								lineHeight: "1.2",
							}}
						>
							{title}
						</h1>
						<p style={{ margin: 0, fontSize: "13px", color: "#6B7280" }}>
							{issueStr && (
								<span style={{ marginRight: "12px", fontWeight: "600", color: "#3B6EF9" }}>
									{issueStr}
								</span>
							)}
							{formattedDate}
						</p>
					</td>
				</tr>
			</tbody>
		</table>
	);
}
