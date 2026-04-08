import { CJKFont, CJKText } from "@buchida/cjk-components";
import {
	Body,
	Container,
	Email,
	Head,
	Hr,
	Image,
	NewsletterHeader,
	Preview,
	UnsubscribeFooter,
} from "@buchida/email";

type SupportedLocale = "en" | "ko" | "ja" | "zh";

interface ArticleItem {
	title: string;
	summary: string;
	url: string;
	readMore: string;
}

interface LocaleContent {
	title: string;
	previewText: string;
	newsletterTitle: string;
	unsubscribeUrl: string;
}

const CONTENT: Record<SupportedLocale, LocaleContent> = {
	en: {
		title: "buchida Newsletter",
		previewText: "The latest from buchida — tips, updates, and more.",
		newsletterTitle: "buchida Newsletter",
		unsubscribeUrl: "https://buchida.com/unsubscribe",
	},
	ko: {
		title: "buchida 뉴스레터",
		previewText: "buchida의 최신 소식 — 팁, 업데이트 등.",
		newsletterTitle: "buchida 뉴스레터",
		unsubscribeUrl: "https://buchida.com/unsubscribe",
	},
	ja: {
		title: "buchidaニュースレター",
		previewText: "buchidaの最新情報 — ヒント、アップデートなど。",
		newsletterTitle: "buchidaニュースレター",
		unsubscribeUrl: "https://buchida.com/unsubscribe",
	},
	zh: {
		title: "buchida 新闻通讯",
		previewText: "buchida 的最新消息 — 技巧、更新等。",
		newsletterTitle: "buchida 新闻通讯",
		unsubscribeUrl: "https://buchida.com/unsubscribe",
	},
};

export interface NewsletterProps {
	issueNumber?: number;
	date?: string | Date;
	articles?: ArticleItem[];
	logoUrl?: string;
	locale?: SupportedLocale;
}

const DEFAULT_ARTICLES: Record<SupportedLocale, ArticleItem[]> = {
	en: [
		{
			title: "Getting Started with buchida",
			summary: "Learn how to send your first email in under 5 minutes with the buchida API.",
			url: "https://buchida.com/docs/quickstart",
			readMore: "Read more →",
		},
		{
			title: "CJK Email Best Practices",
			summary: "Tips for sending beautiful Korean, Japanese, and Chinese emails that render perfectly in every client.",
			url: "https://buchida.com/blog/cjk-email",
			readMore: "Read more →",
		},
	],
	ko: [
		{
			title: "buchida 시작하기",
			summary: "buchida API로 5분 안에 첫 번째 이메일을 보내는 방법을 알아보세요.",
			url: "https://buchida.com/docs/quickstart",
			readMore: "자세히 보기 →",
		},
		{
			title: "한국어 이메일 모범 사례",
			summary: "모든 이메일 클라이언트에서 완벽하게 렌더링되는 한국어 이메일 팁.",
			url: "https://buchida.com/blog/cjk-email",
			readMore: "자세히 보기 →",
		},
	],
	ja: [
		{
			title: "buchidaを始める",
			summary: "buchida APIで5分以内に最初のメールを送る方法を学びましょう。",
			url: "https://buchida.com/docs/quickstart",
			readMore: "詳細はこちら →",
		},
		{
			title: "日本語メールのベストプラクティス",
			summary: "すべてのメールクライアントで完璧にレンダリングされる日本語メールのヒント。",
			url: "https://buchida.com/blog/cjk-email",
			readMore: "詳細はこちら →",
		},
	],
	zh: [
		{
			title: "开始使用buchida",
			summary: "学习如何在5分钟内使用buchida API发送您的第一封邮件。",
			url: "https://buchida.com/docs/quickstart",
			readMore: "阅读更多 →",
		},
		{
			title: "中文邮件最佳实践",
			summary: "在所有邮件客户端完美渲染中文邮件的技巧。",
			url: "https://buchida.com/blog/cjk-email",
			readMore: "阅读更多 →",
		},
	],
};

export default function Newsletter({
	issueNumber,
	date = new Date(),
	articles,
	logoUrl = "https://buchida.com/logo.png",
	locale = "en",
}: NewsletterProps) {
	const t = CONTENT[locale] ?? CONTENT.en;
	const resolvedArticles = articles ?? DEFAULT_ARTICLES[locale] ?? DEFAULT_ARTICLES.en;

	return (
		<Email lang={locale}>
			<Head>
				<CJKFont locale={locale} />
				<title>{t.title}</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text={t.previewText} />
				<Container style={{ padding: "40px 20px" }}>
					<NewsletterHeader
						title={t.newsletterTitle}
						issueNumber={issueNumber}
						date={date}
						logoUrl={logoUrl}
						locale={locale}
					/>

					{resolvedArticles.map((article, idx) => (
						<div key={idx} style={{ marginBottom: "32px" }}>
							<CJKText
								locale={locale}
								style={{
									fontSize: "18px",
									fontWeight: "700",
									color: "#1A1A1A",
									marginBottom: "8px",
								}}
							>
								{article.title}
							</CJKText>
							<CJKText
								locale={locale}
								style={{ fontSize: "14px", color: "#4B5563", marginBottom: "12px", lineHeight: "1.7" }}
							>
								{article.summary}
							</CJKText>
							<a
								href={article.url}
								style={{
									color: "#3B6EF9",
									fontWeight: "600",
									fontSize: "14px",
									textDecoration: "none",
								}}
							>
								{article.readMore}
							</a>
							{idx < resolvedArticles.length - 1 && <Hr />}
						</div>
					))}

					<Hr />
					<UnsubscribeFooter
						unsubscribeUrl={t.unsubscribeUrl}
						locale={locale}
						companyName="buchida"
					/>
				</Container>
			</Body>
		</Email>
	);
}
