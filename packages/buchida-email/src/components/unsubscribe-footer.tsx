import type { CSSProperties } from "react";

export interface UnsubscribeFooterProps {
	unsubscribeUrl: string;
	locale?: string;
	companyName?: string;
	companyAddress?: string;
	style?: CSSProperties;
}

type SupportedLocale = "en" | "ko" | "ja" | "zh";

interface LocaleStrings {
	reason: string;
	unsubscribe: string;
	canSpam?: string;
}

const STRINGS: Record<SupportedLocale, LocaleStrings> = {
	en: {
		reason: "You're receiving this email because you subscribed to updates from",
		unsubscribe: "Unsubscribe",
		canSpam: "This email was sent in compliance with the CAN-SPAM Act.",
	},
	ko: {
		reason: "이 이메일은 다음의 뉴스레터 구독 신청에 따라 발송되었습니다:",
		unsubscribe: "수신거부",
		canSpam: "본 이메일은 정보통신망법 및 KISA 이메일 수신거부 가이드라인을 준수합니다.",
	},
	ja: {
		reason: "このメールは以下のサービスの購読登録に基づいて送信されています:",
		unsubscribe: "配信停止",
		canSpam: "このメールは特定電子メール法に基づき送信しています。",
	},
	zh: {
		reason: "您收到此邮件是因为您已订阅以下服务的更新:",
		unsubscribe: "退订",
		canSpam: "本邮件符合相关电子邮件法规要求。",
	},
};

function resolveLocale(locale?: string): SupportedLocale {
	if (!locale) return "en";
	const base = locale.split("-")[0] as SupportedLocale;
	return base in STRINGS ? base : "en";
}

/**
 * UnsubscribeFooter — multi-locale, legally-compliant unsubscribe footer.
 *
 * Covers CAN-SPAM (US), KISA guidelines (KR), 特定電子メール法 (JP),
 * and general compliance text for CN.
 */
export function UnsubscribeFooter({
	unsubscribeUrl,
	locale,
	companyName,
	companyAddress,
	style,
}: UnsubscribeFooterProps) {
	const lang = resolveLocale(locale);
	const s = STRINGS[lang];

	const containerStyle: CSSProperties = {
		borderTop: "1px solid #e5e7eb",
		paddingTop: "16px",
		marginTop: "24px",
		fontSize: "12px",
		color: "#9ca3af",
		textAlign: "center",
		lineHeight: "1.6",
		...style,
	};

	const linkStyle: CSSProperties = {
		color: "#6b7280",
		textDecoration: "underline",
	};

	return (
		<table
			role="presentation"
			width="100%"
			cellPadding={0}
			cellSpacing={0}
			style={containerStyle}
			lang={lang}
		>
			<tbody>
				<tr>
					<td align="center">
						<p style={{ margin: "0 0 4px 0" }}>
							{s.reason}
							{companyName ? ` ${companyName}.` : "."}
							{" "}
							<a href={unsubscribeUrl} style={linkStyle}>
								{s.unsubscribe}
							</a>
						</p>
						{companyAddress && (
							<p style={{ margin: "0 0 4px 0" }}>{companyAddress}</p>
						)}
						{s.canSpam && (
							<p style={{ margin: "0" }}>{s.canSpam}</p>
						)}
					</td>
				</tr>
			</tbody>
		</table>
	);
}
