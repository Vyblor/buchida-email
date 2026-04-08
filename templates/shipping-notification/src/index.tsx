import { CJKFont, CJKText } from "@buchida/cjk-components";
import {
	Body,
	Button,
	Column,
	Container,
	Email,
	Head,
	Hr,
	Image,
	Preview,
	Row,
	Section,
} from "@buchida/email";

type SupportedLocale = "en" | "ko" | "ja" | "zh";

interface LocaleContent {
	title: string;
	previewText: (name: string) => string;
	heading: string;
	intro: (name: string) => string;
	orderLabel: string;
	carrierLabel: string;
	trackingLabel: string;
	deliveryLabel: string;
	trackButton: string;
	itemsHeading: string;
	itemNameLabel: string;
	qtyLabel: string;
	support: string;
	footer: string;
}

const CONTENT: Record<SupportedLocale, LocaleContent> = {
	en: {
		title: "Your order has shipped! — buchida",
		previewText: (name) => `Hi ${name}, your order is on its way!`,
		heading: "Your Order Has Shipped!",
		intro: (name) => `Hi ${name}, great news! Your order has been shipped and is on its way.`,
		orderLabel: "Order",
		carrierLabel: "Carrier",
		trackingLabel: "Tracking #",
		deliveryLabel: "Est. Delivery",
		trackButton: "Track Your Package →",
		itemsHeading: "Items Shipped",
		itemNameLabel: "Item",
		qtyLabel: "Qty",
		support: "buchida Inc. | support@buchida.com",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	ko: {
		title: "배송 알림 — buchida",
		previewText: (name) => `${name}님, 주문하신 상품이 발송되었습니다!`,
		heading: "배송 알림",
		intro: (name) => `${name}님, 주문하신 상품이 발송되었습니다! 아래에서 배송 정보를 확인하세요.`,
		orderLabel: "주문번호",
		carrierLabel: "택배사",
		trackingLabel: "운송장 번호",
		deliveryLabel: "예상 배송일",
		trackButton: "배송 추적 →",
		itemsHeading: "주문 상품",
		itemNameLabel: "상품명",
		qtyLabel: "수량",
		support: "buchida Inc. | support@buchida.com",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	ja: {
		title: "発送のお知らせ — buchida",
		previewText: (name) => `${name}様、ご注文の商品を発送しました！`,
		heading: "発送のお知らせ",
		intro: (name) => `${name}様、ご注文の商品を発送しました！下記にて配送状況をご確認ください。`,
		orderLabel: "注文番号",
		carrierLabel: "配送会社",
		trackingLabel: "追跡番号",
		deliveryLabel: "お届け予定日",
		trackButton: "荷物を追跡する →",
		itemsHeading: "発送商品",
		itemNameLabel: "商品名",
		qtyLabel: "数量",
		support: "buchida Inc. | support@buchida.com",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	zh: {
		title: "发货通知 — buchida",
		previewText: (name) => `${name}，您的订单已发货！`,
		heading: "发货通知",
		intro: (name) => `${name}，好消息！您的订单已发货，正在配送途中。`,
		orderLabel: "订单号",
		carrierLabel: "快递公司",
		trackingLabel: "快递单号",
		deliveryLabel: "预计送达",
		trackButton: "查看物流 →",
		itemsHeading: "发货商品",
		itemNameLabel: "商品名称",
		qtyLabel: "数量",
		support: "buchida Inc. | support@buchida.com",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
};

const DEFAULT_NAMES: Record<SupportedLocale, string> = {
	en: "there",
	ko: "고객",
	ja: "お客様",
	zh: "用户",
};

export interface ShippingItem {
	name: string;
	quantity: number;
}

export interface ShippingNotificationProps {
	customerName?: string;
	orderId?: string;
	trackingNumber?: string;
	carrier?: string;
	trackingUrl?: string;
	estimatedDelivery?: string;
	items?: ShippingItem[];
	locale?: SupportedLocale;
}

export default function ShippingNotification({
	customerName,
	orderId = "ORD-2026-001",
	trackingNumber = "1234567890",
	carrier = "FedEx",
	trackingUrl = "https://www.fedex.com/tracking",
	estimatedDelivery,
	items = [{ name: "Pro Plan Welcome Kit", quantity: 1 }],
	locale = "en",
}: ShippingNotificationProps) {
	const t = CONTENT[locale] ?? CONTENT.en;
	const resolvedName = customerName ?? DEFAULT_NAMES[locale] ?? DEFAULT_NAMES.en;

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
						src="https://buchida.com/logo.png"
						alt="buchida"
						width={120}
						height={40}
						style={{ margin: "0 auto 32px" }}
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
						style={{ fontSize: "15px", color: "#4B5563", marginBottom: "20px" }}
					>
						{t.intro(resolvedName)}
					</CJKText>

					{/* Tracking details */}
					<Section
						style={{
							border: "2px solid #E5E7EB",
							borderRadius: "8px",
							padding: "16px",
							backgroundColor: "#FFFFFF",
							marginBottom: "20px",
						}}
					>
						{[
							[t.orderLabel, orderId],
							[t.carrierLabel, carrier],
							[t.trackingLabel, trackingNumber],
							...(estimatedDelivery ? [[t.deliveryLabel, estimatedDelivery]] : []),
						].map(([label, value]) => (
							<Row key={label} style={{ marginBottom: "8px" }}>
								<Column width="40%">
									<CJKText locale={locale} style={{ fontSize: "13px", fontWeight: "600", color: "#6B7280", margin: 0 }}>
										{label}
									</CJKText>
								</Column>
								<Column width="60%">
									<CJKText locale={locale} style={{ fontSize: "13px", color: "#1A1A1A", margin: 0 }}>
										{value}
									</CJKText>
								</Column>
							</Row>
						))}
					</Section>

					<div style={{ textAlign: "center", marginBottom: "24px" }}>
						<Button
							href={trackingUrl}
							style={{
								backgroundColor: "#3B6EF9",
								borderRadius: "9999px",
								border: "3px solid #1A1A1A",
								boxShadow: "4px 4px 0px #1A1A1A",
							}}
						>
							{t.trackButton}
						</Button>
					</div>

					<Hr />

					<CJKText
						locale={locale}
						style={{ fontSize: "14px", fontWeight: "600", color: "#1A1A1A", marginBottom: "8px" }}
					>
						{t.itemsHeading}
					</CJKText>
					<Section>
						<Row style={{ backgroundColor: "#FFF1E6", padding: "8px 12px" }}>
							<Column width="70%">
								<CJKText locale={locale} style={{ fontWeight: "bold", margin: 0, fontSize: "13px" }}>
									{t.itemNameLabel}
								</CJKText>
							</Column>
							<Column width="30%">
								<CJKText locale={locale} style={{ fontWeight: "bold", margin: 0, fontSize: "13px", textAlign: "center" }}>
									{t.qtyLabel}
								</CJKText>
							</Column>
						</Row>
						{items.map((item, idx) => (
							<Row key={idx} style={{ padding: "8px 12px" }}>
								<Column width="70%">
									<CJKText locale={locale} style={{ margin: 0, fontSize: "13px" }}>
										{item.name}
									</CJKText>
								</Column>
								<Column width="30%">
									<CJKText locale={locale} style={{ margin: 0, fontSize: "13px", textAlign: "center" }}>
										{item.quantity}
									</CJKText>
								</Column>
							</Row>
						))}
					</Section>

					<Hr />
					<CJKText
						locale={locale}
						style={{ fontSize: "12px", textAlign: "center", color: "#9CA3AF" }}
					>
						{t.support}
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
