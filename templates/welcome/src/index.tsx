import { Body, Button, Container, Email, Head, Hr, Image, Preview, Text, Heading } from "@buchida/email";
import { CJKFont, CJKHeading, CJKText } from "@buchida/cjk-components";

type SupportedLocale = "en" | "ko" | "ja" | "zh";

interface LocaleContent {
	title: string;
	previewText: (name: string) => string;
	greeting: (name: string) => string;
	body1: string;
	body2: string;
	button: string;
	footer: string;
}

const CONTENT: Record<SupportedLocale, LocaleContent> = {
	en: {
		title: "Welcome to buchida!",
		previewText: (name) => `Hi ${name}, welcome to buchida! Start sending emails today.`,
		greeting: (name) => `Hi ${name}, Welcome! 🎉`,
		body1: "Thank you for signing up for buchida. Start sending emails with Asia's leading email API service.",
		body2: "buchida is a developer-friendly email platform with first-class support for Korean, Japanese, and Chinese.",
		button: "Go to Dashboard →",
		footer: "If you need help, contact support@buchida.com.",
	},
	ko: {
		title: "buchida에 오신 것을 환영합니다!",
		previewText: (name) => `${name}님, buchida에 오신 것을 환영합니다! 이메일 전송을 시작하세요.`,
		greeting: (name) => `${name}님, 환영합니다! 🎉`,
		body1: "buchida에 가입해 주셔서 감사합니다. 아시아 최고의 이메일 API 서비스로 이메일 전송을 시작하세요.",
		body2: "buchida는 한국어, 일본어, 중국어를 완벽하게 지원하는 개발자 친화적인 이메일 플랫폼입니다.",
		button: "대시보드로 이동 →",
		footer: "도움이 필요하시면 support@buchida.com으로 문의해 주세요.",
	},
	ja: {
		title: "buchidaへようこそ！",
		previewText: (name) => `${name}様、buchidaへようこそ！メール配信を始めましょう。`,
		greeting: (name) => `${name}様、ようこそ！ 🎉`,
		body1: "buchidaにご登録いただきありがとうございます。アジア最高のメールAPIサービスでメール配信を始めましょう。",
		body2: "buchidaは日本語、韓国語、中国語を完全にサポートする開発者向けのメールプラットフォームです。",
		button: "ダッシュボードへ →",
		footer: "ご質問がございましたら、support@buchida.comまでお問い合わせください。",
	},
	zh: {
		title: "欢迎使用buchida！",
		previewText: (name) => `${name}，欢迎使用buchida！立即开始发送邮件。`,
		greeting: (name) => `${name}，欢迎您！ 🎉`,
		body1: "感谢您注册buchida。使用亚洲最优秀的邮件API服务，立即开始发送邮件。",
		body2: "buchida是一个完全支持中文、韩文和日文的开发者友好型邮件平台。",
		button: "前往控制台 →",
		footer: "如需帮助，请联系 support@buchida.com。",
	},
};

const DEFAULT_NAMES: Record<SupportedLocale, string> = {
	en: "there",
	ko: "사용자",
	ja: "ユーザー",
	zh: "用户",
};

export interface WelcomeProps {
	name?: string;
	locale?: SupportedLocale;
	dashboardUrl?: string;
}

export default function Welcome({
	name,
	locale = "en",
	dashboardUrl = "https://buchida.com/dashboard",
}: WelcomeProps) {
	const t = CONTENT[locale] ?? CONTENT.en;
	const resolvedName = name ?? DEFAULT_NAMES[locale] ?? DEFAULT_NAMES.en;
	const isCjk = locale === "ko" || locale === "ja" || locale === "zh";

	return (
		<Email lang={locale}>
			<Head>
				{isCjk && <CJKFont locale={locale} />}
				<title>{t.title}</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text={t.previewText(resolvedName)} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/logo.png"
						alt="buchida"
						width={120}
						height={40}
						style={{ margin: "0 auto 32px" }}
					/>
					{isCjk ? (
						<>
							<CJKHeading locale={locale} as="h1">
								{t.greeting(resolvedName)}
							</CJKHeading>
							<CJKText locale={locale}>{t.body1}</CJKText>
							<CJKText locale={locale}>{t.body2}</CJKText>
						</>
					) : (
						<>
							<Heading as="h1">{t.greeting(resolvedName)}</Heading>
							<Text>{t.body1}</Text>
							<Text>{t.body2}</Text>
						</>
					)}
					<Button href={dashboardUrl}>{t.button}</Button>
					<Hr />
					{isCjk ? (
						<CJKText locale={locale} style={{ fontSize: "14px", color: "#666666" }}>
							{t.footer}
						</CJKText>
					) : (
						<Text style={{ fontSize: "14px", color: "#666666" }}>{t.footer}</Text>
					)}
				</Container>
			</Body>
		</Email>
	);
}
