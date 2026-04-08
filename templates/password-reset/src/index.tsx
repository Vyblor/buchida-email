import { CJKFont, CJKText } from "@buchida/cjk-components";
import { Body, Button, Container, Email, Head, Hr, Image, Preview } from "@buchida/email";

type SupportedLocale = "en" | "ko" | "ja" | "zh";

interface LocaleContent {
	title: string;
	previewText: (hours: number) => string;
	heading: string;
	body: (name: string, hours: number) => string;
	button: string;
	disclaimer: string;
	footer: string;
}

const CONTENT: Record<SupportedLocale, LocaleContent> = {
	en: {
		title: "Reset your password — buchida",
		previewText: (hours) => `Reset your buchida password. This link expires in ${hours} hour${hours !== 1 ? "s" : ""}.`,
		heading: "Reset your password",
		body: (name, hours) =>
			`Hi ${name}, click the button below to reset your buchida password. This link expires in ${hours} hour${hours !== 1 ? "s" : ""}.`,
		button: "Reset Password →",
		disclaimer:
			"If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	ko: {
		title: "비밀번호 재설정 — buchida",
		previewText: (hours) => `buchida 비밀번호를 재설정하세요. 이 링크는 ${hours}시간 동안 유효합니다.`,
		heading: "비밀번호 재설정",
		body: (name, hours) =>
			`${name}님, 아래 버튼을 클릭하여 buchida 비밀번호를 재설정하세요. 이 링크는 ${hours}시간 동안 유효합니다.`,
		button: "비밀번호 재설정 →",
		disclaimer:
			"비밀번호 재설정을 요청하지 않으셨다면 이 이메일을 무시하세요. 비밀번호는 변경되지 않습니다.",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	ja: {
		title: "パスワードのリセット — buchida",
		previewText: (hours) => `buchidaパスワードをリセットしてください。このリンクは${hours}時間で無効になります。`,
		heading: "パスワードのリセット",
		body: (name, hours) =>
			`${name}様、下のボタンをクリックしてbuchidaパスワードをリセットしてください。このリンクは${hours}時間で無効になります。`,
		button: "パスワードをリセットする →",
		disclaimer:
			"パスワードのリセットを要求していない場合は、このメールを無視してください。パスワードは変更されません。",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	zh: {
		title: "重置密码 — buchida",
		previewText: (hours) => `重置您的buchida密码。此链接${hours}小时内有效。`,
		heading: "重置您的密码",
		body: (name, hours) =>
			`${name}，请点击下方按钮重置您的buchida密码。此链接${hours}小时内有效。`,
		button: "重置密码 →",
		disclaimer: "如果您没有请求重置密码，请忽略此邮件。您的密码不会被更改。",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
};

const DEFAULT_NAMES: Record<SupportedLocale, string> = {
	en: "there",
	ko: "사용자",
	ja: "ユーザー",
	zh: "用户",
};

export interface PasswordResetProps {
	url?: string;
	name?: string;
	expiryHours?: number;
	locale?: SupportedLocale;
}

export default function PasswordReset({
	url = "https://buchida.com/reset?token=abc123",
	name,
	expiryHours = 1,
	locale = "en",
}: PasswordResetProps) {
	const t = CONTENT[locale] ?? CONTENT.en;
	const resolvedName = name ?? DEFAULT_NAMES[locale] ?? DEFAULT_NAMES.en;

	return (
		<Email lang={locale}>
			<Head>
				<CJKFont locale={locale} />
				<title>{t.title}</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text={t.previewText(expiryHours)} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/icon-192x192.png"
						alt="buchida"
						width={64}
						height={64}
						style={{ margin: "0 auto 24px", borderRadius: "12px" }}
					/>
					<CJKText
						locale={locale}
						style={{
							fontSize: "24px",
							fontWeight: "bold",
							textAlign: "center",
							color: "#1A1A1A",
							marginBottom: "8px",
						}}
					>
						{t.heading}
					</CJKText>
					<CJKText
						locale={locale}
						style={{
							fontSize: "14px",
							textAlign: "center",
							color: "#6B7280",
							marginBottom: "32px",
						}}
					>
						{t.body(resolvedName, expiryHours)}
					</CJKText>
					<div style={{ textAlign: "center", marginBottom: "32px" }}>
						<Button
							href={url}
							style={{
								backgroundColor: "#3B6EF9",
								borderRadius: "9999px",
								border: "3px solid #1A1A1A",
								boxShadow: "4px 4px 0px #1A1A1A",
							}}
						>
							{t.button}
						</Button>
					</div>
					<Hr />
					<CJKText
						locale={locale}
						style={{ fontSize: "12px", textAlign: "center", color: "#9CA3AF", lineHeight: "1.8" }}
					>
						{t.disclaimer}
					</CJKText>
					<Hr />
					<CJKText
						locale={locale}
						style={{ fontSize: "11px", textAlign: "center", color: "#9CA3AF" }}
					>
						{t.footer}
					</CJKText>
				</Container>
			</Body>
		</Email>
	);
}
