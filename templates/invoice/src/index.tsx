import { CJKFont, CJKText } from "@buchida/cjk-components";
import { Body, Container, Email, Head, Hr, Image, Preview, Receipt, type ReceiptCurrency } from "@buchida/email";

type SupportedLocale = "en" | "ko" | "ja" | "zh";

interface LocaleContent {
	title: string;
	previewText: (orderId: string) => string;
	heading: string;
	intro: (name: string) => string;
	support: string;
	footer: string;
}

const CONTENT: Record<SupportedLocale, LocaleContent> = {
	en: {
		title: "Your Invoice — buchida",
		previewText: (orderId) => `Your buchida invoice for order ${orderId} is ready.`,
		heading: "Your Invoice",
		intro: (name) => `Hi ${name}, thank you for your payment. Here is your invoice.`,
		support: "Questions? Contact us at billing@buchida.com",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	ko: {
		title: "청구서 — buchida",
		previewText: (orderId) => `주문번호 ${orderId}에 대한 buchida 청구서가 준비되었습니다.`,
		heading: "청구서",
		intro: (name) => `${name}님, 결제해 주셔서 감사합니다. 청구서를 확인해 주세요.`,
		support: "문의사항은 billing@buchida.com으로 연락해 주세요.",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	ja: {
		title: "請求書 — buchida",
		previewText: (orderId) => `注文番号${orderId}のbuchida請求書が準備できました。`,
		heading: "請求書",
		intro: (name) => `${name}様、お支払いいただきありがとうございます。請求書をご確認ください。`,
		support: "ご不明な点は billing@buchida.com までお問い合わせください。",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
	zh: {
		title: "发票 — buchida",
		previewText: (orderId) => `您的buchida订单${orderId}的发票已准备好。`,
		heading: "发票",
		intro: (name) => `${name}，感谢您的付款。以下是您的发票。`,
		support: "如有疑问，请联系 billing@buchida.com",
		footer: "buchida.com · Email API for Asia & Beyond · 부치다",
	},
};

const DEFAULT_NAMES: Record<SupportedLocale, string> = {
	en: "there",
	ko: "고객",
	ja: "お客様",
	zh: "用户",
};

export interface InvoiceItem {
	name: string;
	quantity: number;
	price: number;
}

export interface InvoiceProps {
	orderId?: string;
	date?: string | Date;
	customerName?: string;
	items?: InvoiceItem[];
	currency?: ReceiptCurrency;
	subtotal?: number;
	tax?: number;
	total?: number;
	locale?: SupportedLocale;
}

export default function Invoice({
	orderId = "INV-2026-001",
	date = new Date(),
	customerName,
	items = [{ name: "Pro Plan (Monthly)", quantity: 1, price: 20 }],
	currency = "USD",
	subtotal = 20,
	tax,
	total = 20,
	locale = "en",
}: InvoiceProps) {
	const t = CONTENT[locale] ?? CONTENT.en;
	const resolvedName = customerName ?? DEFAULT_NAMES[locale] ?? DEFAULT_NAMES.en;

	return (
		<Email lang={locale}>
			<Head>
				<CJKFont locale={locale} />
				<title>{t.title}</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text={t.previewText(orderId)} />
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
						style={{ fontSize: "15px", color: "#4B5563", marginBottom: "24px" }}
					>
						{t.intro(resolvedName)}
					</CJKText>
					<Receipt
						orderId={orderId}
						date={date}
						items={items}
						currency={currency}
						subtotal={subtotal}
						tax={tax}
						total={total}
						locale={locale}
						style={{ marginBottom: "24px" }}
					/>
					<Hr />
					<CJKText
						locale={locale}
						style={{ fontSize: "13px", textAlign: "center", color: "#9CA3AF" }}
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
