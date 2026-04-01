import { CJKFont, CJKHeading, CJKText, CompactSection } from "@buchida/cjk-components";
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

export interface ShippingItem {
	name: string;
	quantity: number;
}

export interface ShippingJaProps {
	customerName?: string;
	orderId?: string;
	trackingNumber?: string;
	carrier?: string;
	trackingUrl?: string;
	estimatedDelivery?: string;
	items?: ShippingItem[];
}

export default function ShippingJa({
	customerName = "お客様",
	orderId = "ORD-2026-001",
	trackingNumber = "1234567890",
	carrier = "ヤマト運輸",
	trackingUrl = "https://toi.kuronekoyamato.co.jp/cgi-bin/tneko",
	estimatedDelivery = "2026年4月3日",
	items = [
		{ name: "Proプラン ウェルカムキット", quantity: 1 },
		{ name: "buchida ステッカーパック", quantity: 2 },
	],
}: ShippingJaProps) {
	return (
		<Email lang="ja">
			<Head>
				<CJKFont locale="ja" />
				<title>配送のお知らせ</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text={`${customerName}、ご注文の商品が発送されました。`} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/logo.png"
						alt="buchida"
						width={120}
						height={40}
						style={{ margin: "0 auto 32px" }}
					/>
					<CJKHeading locale="ja" as="h1">
						配送のお知らせ
					</CJKHeading>
					<CJKText locale="ja">
						{customerName}、ご注文の商品が発送されました。以下の配送情報をご確認ください。
					</CJKText>

					<CompactSection>
						<CJKText locale="ja" style={{ fontSize: "14px", color: "#666666", margin: "4px 0" }}>
							注文番号: {orderId}
						</CJKText>
						<CJKText locale="ja" style={{ fontSize: "14px", color: "#666666", margin: "4px 0" }}>
							配送業者: {carrier}
						</CJKText>
						<CJKText locale="ja" style={{ fontSize: "14px", color: "#666666", margin: "4px 0" }}>
							追跡番号: {trackingNumber}
						</CJKText>
						<CJKText locale="ja" style={{ fontSize: "14px", color: "#666666", margin: "4px 0" }}>
							配達予定日: {estimatedDelivery}
						</CJKText>
					</CompactSection>

					<Button href={trackingUrl}>配送状況を確認</Button>

					<Hr />

					<CJKHeading locale="ja" as="h2">
						注文内容
					</CJKHeading>
					<Section>
						<Row style={{ backgroundColor: "#FFF1F0", padding: "8px 12px" }}>
							<Column width="70%">
								<CJKText locale="ja" style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>
									商品名
								</CJKText>
							</Column>
							<Column width="30%">
								<CJKText
									locale="ja"
									style={{ fontWeight: "bold", margin: 0, fontSize: "14px", textAlign: "center" }}
								>
									数量
								</CJKText>
							</Column>
						</Row>
						{items.map((item) => (
							<Row key={item.name} style={{ padding: "8px 12px" }}>
								<Column width="70%">
									<CJKText locale="ja" style={{ margin: 0, fontSize: "14px" }}>
										{item.name}
									</CJKText>
								</Column>
								<Column width="30%">
									<CJKText locale="ja" style={{ margin: 0, fontSize: "14px", textAlign: "center" }}>
										{item.quantity}
									</CJKText>
								</Column>
							</Row>
						))}
					</Section>

					<Hr />

					<CJKText locale="ja" style={{ fontSize: "12px", color: "#999999" }}>
						buchida Inc. | support@buchida.com
					</CJKText>
				</Container>
			</Body>
		</Email>
	);
}
