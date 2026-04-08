import { CJKFont, CJKText } from "@buchida/cjk-components";
import { Body, Button, Container, Email, Head, Hr, Image, Preview } from "@buchida/email";

type SupportedLocale = "en" | "ko" | "ja" | "zh";

interface LocaleContent {
	title: string;
	previewText: (name: string) => string;
	heading: string;
	body: (name: string) => string;
	button: string;
	expiry: string;
	footer: string;
	brand: string;
}

const CONTENT: Record<SupportedLocale, LocaleContent> = {
	en: {
		title: "Verify your email — buchida",
		previewText: (name) => `Hi ${name}, verify your email to activate your buchida account.`,
		heading: "Verify your email",
		body: (name) => `Hi ${name}, click the button below to verify your email and activate your buchida account.`,
		button: "Verify Email →",
		expiry: "This link expires in 24 hours. If you didn't create a buchida account, you can safely ignore this email.",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
		brand: "buchida",
	},
	ko: {
		title: "이메일 인증 — buchida",
		previewText: (name) => `${name}님, buchida 이메일 인증을 완료하세요.`,
		heading: "이메일 인증",
		body: (name) => `${name}님, 아래 버튼을 클릭하여 이메일을 인증하고 buchida 계정을 활성화하세요.`,
		button: "이메일 인증하기 →",
		expiry: "이 링크는 24시간 동안 유효합니다. buchida 계정을 생성하지 않았다면 무시하세요.",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
		brand: "부치다",
	},
	ja: {
		title: "メール認証 — buchida",
		previewText: (name) => `${name}様、メールアドレスを認証してbuchidaアカウントを有効にしてください。`,
		heading: "メールアドレスの認証",
		body: (name) => `${name}様、下のボタンをクリックしてメールアドレスを認証し、buchidaアカウントを有効にしてください。`,
		button: "メールを認証する →",
		expiry: "このリンクは24時間で無効になります。buchidaアカウントを作成していない場合は、このメールを無視してください。",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
		brand: "buchida",
	},
	zh: {
		title: "验证邮箱 — buchida",
		previewText: (name) => `${name}，请验证您的邮箱以激活buchida账户。`,
		heading: "验证您的邮箱",
		body: (name) => `${name}，请点击下方按钮验证您的邮箱并激活buchida账户。`,
		button: "验证邮箱 →",
		expiry: "此链接24小时内有效。如果您没有创建buchida账户，请忽略此邮件。",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
		brand: "buchida",
	},
};

const DEFAULT_NAMES: Record<SupportedLocale, string> = {
	en: "there",
	ko: "사용자",
	ja: "ユーザー",
	zh: "用户",
};

export interface VerifyEmailProps {
	url?: string;
	name?: string;
	locale?: SupportedLocale;
}

export default function VerifyEmail({
	url = "https://buchida.com/api/auth/verify-email?token=xxx",
	name,
	locale = "en",
}: VerifyEmailProps) {
	const t = CONTENT[locale] ?? CONTENT.en;
	const resolvedName = name ?? DEFAULT_NAMES[locale] ?? DEFAULT_NAMES.en;

	return (
		<Email lang={locale}>
			<Head>
				<CJKFont locale={locale} />
				<title>{t.title}</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text={t.previewText(resolvedName)} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/icon-192x192.png"
						alt={t.brand}
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
						{t.body(resolvedName)}
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
						{t.expiry}
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
