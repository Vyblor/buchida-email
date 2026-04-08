import { CJKFont, CJKText } from "@buchida/cjk-components";
import {
	Body,
	Button,
	Container,
	Email,
	Head,
	Hr,
	Image,
	Preview,
	WelcomeHero,
} from "@buchida/email";

type SupportedLocale = "en" | "ko" | "ja" | "zh";

interface FeatureItem {
	title: string;
	description: string;
}

interface LocaleContent {
	title: string;
	previewText: (version: string) => string;
	heroSubtitle: string;
	heroCta: string;
	whatsNewLabel: string;
	footer: string;
}

const CONTENT: Record<SupportedLocale, LocaleContent> = {
	en: {
		title: "Product Update — buchida",
		previewText: (v) => `buchida ${v} is here — see what's new!`,
		heroSubtitle: "We've been busy building new features to make your email sending faster and more reliable.",
		heroCta: "See What's New →",
		whatsNewLabel: "What's New",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	ko: {
		title: "제품 업데이트 — buchida",
		previewText: (v) => `buchida ${v} 업데이트 — 새로운 기능을 확인하세요!`,
		heroSubtitle: "이메일 발송을 더 빠르고 안정적으로 만들기 위한 새로운 기능을 개발했습니다.",
		heroCta: "새 기능 보기 →",
		whatsNewLabel: "새로운 기능",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	ja: {
		title: "製品アップデート — buchida",
		previewText: (v) => `buchida ${v} アップデート — 新機能をご確認ください！`,
		heroSubtitle: "メール送信をより速く、より信頼性の高いものにするための新機能を開発しました。",
		heroCta: "新機能を見る →",
		whatsNewLabel: "新機能",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	zh: {
		title: "产品更新 — buchida",
		previewText: (v) => `buchida ${v} 更新 — 查看新功能！`,
		heroSubtitle: "我们开发了新功能，让您的邮件发送更快、更可靠。",
		heroCta: "查看新功能 →",
		whatsNewLabel: "新功能",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
};

const DEFAULT_FEATURES: Record<SupportedLocale, FeatureItem[]> = {
	en: [
		{ title: "Faster Delivery", description: "Emails now route through 3 new data centers for sub-second delivery across Asia." },
		{ title: "Enhanced Analytics", description: "Real-time open and click tracking with per-locale breakdowns." },
		{ title: "New SDKs", description: "Official Ruby and Java SDKs are now available." },
	],
	ko: [
		{ title: "빠른 배송", description: "아시아 전역에서 1초 미만의 전달을 위해 3개의 새로운 데이터 센터를 추가했습니다." },
		{ title: "향상된 분석", description: "로케일별 분석이 포함된 실시간 열람 및 클릭 추적." },
		{ title: "새 SDK", description: "공식 Ruby 및 Java SDK가 이제 제공됩니다." },
	],
	ja: [
		{ title: "高速配信", description: "アジア全域でのサブ秒配信のために3つの新しいデータセンターを追加しました。" },
		{ title: "強化されたアナリティクス", description: "ロケール別内訳付きのリアルタイム開封・クリック追跡。" },
		{ title: "新しいSDK", description: "公式Ruby・Java SDKが利用可能になりました。" },
	],
	zh: [
		{ title: "更快的送达", description: "新增3个数据中心，实现亚洲地区毫秒级邮件送达。" },
		{ title: "增强的分析", description: "实时打开率和点击率追踪，支持按语言区域细分。" },
		{ title: "新SDK", description: "官方Ruby和Java SDK现已推出。" },
	],
};

export interface ProductUpdateProps {
	version?: string;
	heroTitle?: string;
	ctaUrl?: string;
	features?: FeatureItem[];
	heroImageUrl?: string;
	logoUrl?: string;
	locale?: SupportedLocale;
}

export default function ProductUpdate({
	version = "2.0",
	heroTitle,
	ctaUrl = "https://buchida.com/changelog",
	features,
	heroImageUrl,
	logoUrl = "https://buchida.com/logo.png",
	locale = "en",
}: ProductUpdateProps) {
	const t = CONTENT[locale] ?? CONTENT.en;
	const resolvedFeatures = features ?? DEFAULT_FEATURES[locale] ?? DEFAULT_FEATURES.en;
	const resolvedHeroTitle = heroTitle ?? (locale === "ko" ? `buchida ${version} 업데이트` : locale === "ja" ? `buchida ${version} アップデート` : locale === "zh" ? `buchida ${version} 更新` : `buchida ${version} is Here`);

	return (
		<Email lang={locale}>
			<Head>
				<CJKFont locale={locale} />
				<title>{t.title}</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text={t.previewText(version)} />
				<Container style={{ padding: "40px 20px" }}>
					<WelcomeHero
						title={resolvedHeroTitle}
						subtitle={t.heroSubtitle}
						ctaText={t.heroCta}
						ctaUrl={ctaUrl}
						logoUrl={logoUrl}
						locale={locale}
						style={{ marginBottom: "32px" }}
					/>

					{heroImageUrl && (
						<Image
							src={heroImageUrl}
							alt="product update"
							width={560}
							height={280}
							style={{ width: "100%", borderRadius: "8px", marginBottom: "32px" }}
						/>
					)}

					<Hr />

					<CJKText
						locale={locale}
						style={{ fontSize: "18px", fontWeight: "700", color: "#1A1A1A", marginBottom: "16px" }}
					>
						{t.whatsNewLabel}
					</CJKText>

					{resolvedFeatures.map((feature, idx) => (
						<div key={idx} style={{ marginBottom: "20px" }}>
							<CJKText
								locale={locale}
								style={{ fontSize: "15px", fontWeight: "600", color: "#1A1A1A", marginBottom: "4px" }}
							>
								✦ {feature.title}
							</CJKText>
							<CJKText
								locale={locale}
								style={{ fontSize: "14px", color: "#4B5563", lineHeight: "1.6", margin: "0 0 0 20px" }}
							>
								{feature.description}
							</CJKText>
						</div>
					))}

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
