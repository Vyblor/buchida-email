import { CJKFont, CJKHeading, CJKText, CompactSection } from "@buchida/cjk-components";
import { Body, Button, Container, Email, Head, Hr, Image, Link, Preview } from "@buchida/email";

export interface NewsletterArticle {
	title: string;
	summary: string;
	url: string;
}

export interface NewsletterJaProps {
	issueNumber?: number;
	date?: string;
	articles?: NewsletterArticle[];
	unsubscribeUrl?: string;
}

export default function NewsletterJa({
	issueNumber = 1,
	date = "2026年3月31日",
	articles = [
		{
			title: "buchida APIの新機能",
			summary:
				"最新のアップデートで、日本語メールのレンダリングが大幅に改善されました。Noto Sans JPフォントの自動読み込みにも対応しています。",
			url: "https://buchida.com/blog/new-features",
		},
		{
			title: "CJKメールテンプレートのベストプラクティス",
			summary: "日本語、韓国語、中国語のメールを美しく表示するためのガイドラインをご紹介します。",
			url: "https://buchida.com/blog/cjk-best-practices",
		},
	],
	unsubscribeUrl = "https://buchida.com/unsubscribe",
}: NewsletterJaProps) {
	return (
		<Email lang="ja">
			<Head>
				<CJKFont locale="ja" />
				<title>{`buchida ニュースレター #${issueNumber}`}</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text={`buchida ニュースレター #${issueNumber} - ${date}`} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/logo.png"
						alt="buchida"
						width={120}
						height={40}
						style={{ margin: "0 auto 32px" }}
					/>
					<CJKHeading locale="ja" as="h1">
						ニュースレター #{issueNumber}
					</CJKHeading>
					<CJKText locale="ja" style={{ fontSize: "14px", color: "#666666" }}>
						{date}
					</CJKText>

					<Hr />

					{articles.map((article) => (
						<CompactSection key={article.title}>
							<CJKHeading locale="ja" as="h2">
								{article.title}
							</CJKHeading>
							<CJKText locale="ja">{article.summary}</CJKText>
							<Button href={article.url}>続きを読む</Button>
						</CompactSection>
					))}

					<Hr />

					<CJKText locale="ja" style={{ fontSize: "12px", color: "#999999", textAlign: "center" }}>
						このメールはbuchidaニュースレターの配信登録をされた方にお送りしています。
					</CJKText>
					<CJKText locale="ja" style={{ fontSize: "12px", color: "#999999", textAlign: "center" }}>
						<Link href={unsubscribeUrl} style={{ color: "#999999" }}>
							配信停止
						</Link>
					</CJKText>
				</Container>
			</Body>
		</Email>
	);
}
