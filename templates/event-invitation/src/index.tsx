import { CJKFont, CJKText } from "@buchida/cjk-components";
import { Body, Button, Container, Email, Head, Hr, Image, Preview } from "@buchida/email";

type SupportedLocale = "en" | "ko" | "ja" | "zh";

interface LocaleContent {
	title: string;
	previewText: (eventName: string) => string;
	heading: string;
	inviteLabel: string;
	dateLabel: string;
	timeLabel: string;
	locationLabel: string;
	ctaText: string;
	footer: string;
}

const CONTENT: Record<SupportedLocale, LocaleContent> = {
	en: {
		title: "You're Invited — buchida",
		previewText: (name) => `You're invited to ${name}! Join us for this special event.`,
		heading: "You're Invited!",
		inviteLabel: "Event",
		dateLabel: "Date",
		timeLabel: "Time",
		locationLabel: "Location",
		ctaText: "RSVP Now →",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	ko: {
		title: "초대장 — buchida",
		previewText: (name) => `${name}에 초대합니다! 이 특별한 이벤트에 함께해 주세요.`,
		heading: "초대합니다!",
		inviteLabel: "이벤트",
		dateLabel: "날짜",
		timeLabel: "시간",
		locationLabel: "장소",
		ctaText: "참가 신청하기 →",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	ja: {
		title: "ご招待 — buchida",
		previewText: (name) => `${name}にご招待します！このスペシャルイベントにご参加ください。`,
		heading: "ご招待申し上げます！",
		inviteLabel: "イベント",
		dateLabel: "日付",
		timeLabel: "時間",
		locationLabel: "場所",
		ctaText: "参加申込 →",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	zh: {
		title: "活动邀请 — buchida",
		previewText: (name) => `诚邀您参加${name}！请加入我们的特别活动。`,
		heading: "诚邀您参加！",
		inviteLabel: "活动",
		dateLabel: "日期",
		timeLabel: "时间",
		locationLabel: "地点",
		ctaText: "立即报名 →",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
};

export interface EventInvitationProps {
	eventName?: string;
	date?: string;
	time?: string;
	location?: string;
	description?: string;
	rsvpUrl?: string;
	bannerUrl?: string;
	logoUrl?: string;
	locale?: SupportedLocale;
}

export default function EventInvitation({
	eventName = "buchida Developer Meetup",
	date = "April 15, 2026",
	time = "7:00 PM KST",
	location = "Seoul, Korea (Online + In-person)",
	description,
	rsvpUrl = "https://buchida.com/events/rsvp",
	bannerUrl,
	logoUrl = "https://buchida.com/logo.png",
	locale = "en",
}: EventInvitationProps) {
	const t = CONTENT[locale] ?? CONTENT.en;

	const defaultDescriptions: Record<SupportedLocale, string> = {
		en: "Join us for an evening of networking, demos, and discussions about the future of email APIs in Asia.",
		ko: "아시아 이메일 API의 미래에 대한 네트워킹, 데모 및 토론의 저녁에 함께해 주세요.",
		ja: "アジアにおけるメールAPIの未来についてのネットワーキング、デモ、議論の夕べにご参加ください。",
		zh: "加入我们，共度一个关于亚洲邮件API未来的社交、演示和讨论之夜。",
	};
	const resolvedDescription = description ?? defaultDescriptions[locale] ?? defaultDescriptions.en;

	return (
		<Email lang={locale}>
			<Head>
				<CJKFont locale={locale} />
				<title>{t.title}</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text={t.previewText(eventName)} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src={logoUrl}
						alt="buchida"
						width={120}
						height={40}
						style={{ margin: "0 auto 24px" }}
					/>

					{bannerUrl && (
						<Image
							src={bannerUrl}
							alt={eventName}
							width={560}
							height={200}
							style={{ width: "100%", borderRadius: "12px", marginBottom: "24px" }}
						/>
					)}

					<CJKText
						locale={locale}
						style={{
							fontSize: "28px",
							fontWeight: "800",
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
							fontSize: "20px",
							fontWeight: "700",
							textAlign: "center",
							color: "#3B6EF9",
							marginBottom: "24px",
						}}
					>
						{eventName}
					</CJKText>

					{/* Event details box */}
					<table
						role="presentation"
						cellPadding={0}
						cellSpacing={0}
						width="100%"
						style={{
							border: "2px solid #1A1A1A",
							borderRadius: "12px",
							backgroundColor: "#FFFFFF",
							marginBottom: "24px",
							boxShadow: "4px 4px 0px #1A1A1A",
						}}
					>
						<tbody>
							{[
								[t.dateLabel, date],
								[t.timeLabel, time],
								[t.locationLabel, location],
							].map(([label, value], idx) => (
								<tr
									key={idx}
									style={{ borderBottom: idx < 2 ? "1px solid #F3F4F6" : "none" }}
								>
									<td
										style={{
											padding: "14px 20px",
											width: "30%",
											fontSize: "13px",
											fontWeight: "600",
											color: "#6B7280",
										}}
									>
										{label}
									</td>
									<td
										style={{
											padding: "14px 20px",
											fontSize: "14px",
											fontWeight: "600",
											color: "#1A1A1A",
										}}
									>
										{value}
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<CJKText
						locale={locale}
						style={{ fontSize: "15px", color: "#4B5563", lineHeight: "1.7", marginBottom: "28px" }}
					>
						{resolvedDescription}
					</CJKText>

					<div style={{ textAlign: "center", marginBottom: "16px" }}>
						<Button
							href={rsvpUrl}
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
