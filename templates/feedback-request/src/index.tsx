import { CJKFont, CJKText } from "@buchida/cjk-components";
import { Body, Button, Container, Email, Head, Hr, Image, Preview } from "@buchida/email";

type SupportedLocale = "en" | "ko" | "ja" | "zh";

interface LocaleContent {
	title: string;
	previewText: (name: string) => string;
	heading: string;
	subheading: string;
	body: (name: string) => string;
	scaleLabel: string;
	scaleMin: string;
	scaleMax: string;
	ctaText: string;
	skipText: string;
	skipLabel: string;
	closing: string;
	footer: string;
}

const CONTENT: Record<SupportedLocale, LocaleContent> = {
	en: {
		title: "How are we doing? — buchida",
		previewText: (name) => `Hi ${name}, we'd love to hear your feedback on buchida.`,
		heading: "How likely are you to recommend buchida?",
		subheading: "We value your feedback",
		body: (name) =>
			`Hi ${name}, on a scale of 0–10, how likely are you to recommend buchida to a friend or colleague?`,
		scaleLabel: "Select your score:",
		scaleMin: "Not at all likely",
		scaleMax: "Extremely likely",
		ctaText: "Share Feedback →",
		skipText: "Prefer to skip?",
		skipLabel: "No thanks",
		closing: "Your feedback helps us improve buchida for everyone. It only takes 2 minutes.",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	ko: {
		title: "서비스 만족도 조사 — buchida",
		previewText: (name) => `${name}님, buchida에 대한 피드백을 들려주세요.`,
		heading: "buchida를 추천하실 의향이 있으신가요?",
		subheading: "소중한 의견을 기다립니다",
		body: (name) =>
			`${name}님, 0~10점 척도로 buchida를 친구나 동료에게 추천하실 의향이 얼마나 있으신가요?`,
		scaleLabel: "점수를 선택해 주세요:",
		scaleMin: "전혀 없음",
		scaleMax: "매우 높음",
		ctaText: "의견 보내기 →",
		skipText: "건너뛰려면?",
		skipLabel: "괜찮습니다",
		closing: "여러분의 의견은 모든 사람을 위해 buchida를 개선하는 데 도움이 됩니다. 2분이면 충분합니다.",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	ja: {
		title: "サービス満足度調査 — buchida",
		previewText: (name) => `${name}様、buchidaについてのフィードバックをお聞かせください。`,
		heading: "buchidaをお友達や同僚に推薦する可能性は？",
		subheading: "ご意見をお聞かせください",
		body: (name) =>
			`${name}様、0〜10のスケールで、buchidaを友人や同僚に推薦する可能性はどのくらいですか？`,
		scaleLabel: "スコアを選択してください:",
		scaleMin: "全くない",
		scaleMax: "非常に高い",
		ctaText: "フィードバックを送る →",
		skipText: "スキップしますか？",
		skipLabel: "結構です",
		closing: "皆様のご意見は、全ての方のためにbuchidaを改善するのに役立ちます。2分あれば完了します。",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	zh: {
		title: "服务满意度调查 — buchida",
		previewText: (name) => `${name}，请分享您对buchida的反馈意见。`,
		heading: "您向朋友推荐buchida的可能性有多大？",
		subheading: "我们重视您的反馈",
		body: (name) =>
			`${name}，在0到10的量表上，您向朋友或同事推荐buchida的可能性有多大？`,
		scaleLabel: "请选择您的评分:",
		scaleMin: "完全不可能",
		scaleMax: "非常可能",
		ctaText: "提交反馈 →",
		skipText: "想跳过？",
		skipLabel: "不，谢谢",
		closing: "您的反馈帮助我们为所有人改善buchida。只需2分钟。",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
};

const DEFAULT_NAMES: Record<SupportedLocale, string> = {
	en: "there",
	ko: "고객",
	ja: "ユーザー",
	zh: "用户",
};

export interface FeedbackRequestProps {
	name?: string;
	feedbackUrl?: string;
	skipUrl?: string;
	logoUrl?: string;
	locale?: SupportedLocale;
}

export default function FeedbackRequest({
	name,
	feedbackUrl = "https://buchida.com/feedback",
	skipUrl = "https://buchida.com/feedback/skip",
	logoUrl = "https://buchida.com/logo.png",
	locale = "en",
}: FeedbackRequestProps) {
	const t = CONTENT[locale] ?? CONTENT.en;
	const resolvedName = name ?? DEFAULT_NAMES[locale] ?? DEFAULT_NAMES.en;

	// NPS score buttons: 0–10
	const scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const scoreColors: Record<number, string> = {
		0: "#EF4444", 1: "#EF4444", 2: "#EF4444", 3: "#EF4444", 4: "#EF4444", 5: "#EF4444",
		6: "#F59E0B", 7: "#F59E0B",
		8: "#10B981", 9: "#10B981", 10: "#10B981",
	};

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
						src={logoUrl}
						alt="buchida"
						width={120}
						height={40}
						style={{ margin: "0 auto 32px" }}
					/>

					<CJKText
						locale={locale}
						style={{ fontSize: "13px", fontWeight: "600", color: "#3B6EF9", textAlign: "center", marginBottom: "8px", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}
					>
						{t.subheading}
					</CJKText>
					<CJKText
						locale={locale}
						style={{ fontSize: "22px", fontWeight: "700", textAlign: "center", color: "#1A1A1A", marginBottom: "16px" }}
					>
						{t.heading}
					</CJKText>
					<CJKText
						locale={locale}
						style={{ fontSize: "15px", color: "#4B5563", textAlign: "center", marginBottom: "32px", lineHeight: "1.6" }}
					>
						{t.body(resolvedName)}
					</CJKText>

					{/* NPS score row */}
					<CJKText
						locale={locale}
						style={{ fontSize: "13px", fontWeight: "600", color: "#6B7280", marginBottom: "12px", textAlign: "center" }}
					>
						{t.scaleLabel}
					</CJKText>
					<table role="presentation" cellPadding={0} cellSpacing={0} align="center" style={{ margin: "0 auto 8px" }}>
						<tbody>
							<tr>
								{scores.map((score) => (
									<td key={score} style={{ padding: "0 2px" }}>
										<a
											href={`${feedbackUrl}?score=${score}`}
											style={{
												display: "inline-block",
												width: "36px",
												height: "36px",
												lineHeight: "36px",
												textAlign: "center" as const,
												borderRadius: "6px",
												backgroundColor: scoreColors[score],
												color: "#FFFFFF",
												fontWeight: "700",
												fontSize: "14px",
												textDecoration: "none",
												border: "2px solid #1A1A1A",
											}}
										>
											{score}
										</a>
									</td>
								))}
							</tr>
						</tbody>
					</table>
					<table role="presentation" cellPadding={0} cellSpacing={0} width="100%" style={{ marginBottom: "28px" }}>
						<tbody>
							<tr>
								<td style={{ fontSize: "11px", color: "#9CA3AF" }}>{t.scaleMin}</td>
								<td style={{ fontSize: "11px", color: "#9CA3AF", textAlign: "right" as const }}>{t.scaleMax}</td>
							</tr>
						</tbody>
					</table>

					<div style={{ textAlign: "center", marginBottom: "16px" }}>
						<Button
							href={feedbackUrl}
							style={{
								backgroundColor: "#3B6EF9",
								borderRadius: "9999px",
								border: "3px solid #1A1A1A",
								boxShadow: "4px 4px 0px #1A1A1A",
							}}
						>
							{t.ctaText}
						</Button>
					</div>

					<CJKText
						locale={locale}
						style={{ fontSize: "13px", textAlign: "center", color: "#9CA3AF", marginBottom: "4px" }}
					>
						{t.skipText}{" "}
						<a href={skipUrl} style={{ color: "#6B7280", textDecoration: "underline" }}>
							{t.skipLabel}
						</a>
					</CJKText>

					<Hr />
					<CJKText
						locale={locale}
						style={{ fontSize: "13px", textAlign: "center", color: "#6B7280", marginBottom: "8px" }}
					>
						{t.closing}
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
