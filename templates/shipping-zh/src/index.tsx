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

export interface ShippingZhProps {
	customerName?: string;
	orderId?: string;
	trackingNumber?: string;
	carrier?: string;
	trackingUrl?: string;
	estimatedDelivery?: string;
	items?: ShippingItem[];
}

export default function ShippingZh({
	customerName = "用户",
	orderId = "ORD-2026-001",
	trackingNumber = "1234567890",
	carrier = "顺丰速运",
	trackingUrl = "https://www.sf-express.com/cn/sc/dynamic_function/waybill",
	estimatedDelivery = "2026年4月3日",
	items = [
		{ name: "Pro套餐欢迎礼包", quantity: 1 },
		{ name: "buchida贴纸包", quantity: 2 },
	],
}: ShippingZhProps) {
	return (
		<Email lang="zh">
			<Head>
				<CJKFont locale="zh" />
				<title>发货通知</title>
			</Head>
			<Body style={{ backgroundColor: "#f9fafb" }}>
				<Preview text={`${customerName}，您的订单已发货。`} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/logo.png"
						alt="buchida"
						width={120}
						height={40}
						style={{ margin: "0 auto 32px" }}
					/>
					<CJKHeading locale="zh" as="h1">
						发货通知
					</CJKHeading>
					<CJKText locale="zh">
						{customerName}，您的订单已发货！请查看以下物流信息。
					</CJKText>

					<CompactSection>
						<CJKText locale="zh" style={{ fontSize: "14px", color: "#666666", margin: "4px 0" }}>
							订单号: {orderId}
						</CJKText>
						<CJKText locale="zh" style={{ fontSize: "14px", color: "#666666", margin: "4px 0" }}>
							快递公司: {carrier}
						</CJKText>
						<CJKText locale="zh" style={{ fontSize: "14px", color: "#666666", margin: "4px 0" }}>
							运单号: {trackingNumber}
						</CJKText>
						<CJKText locale="zh" style={{ fontSize: "14px", color: "#666666", margin: "4px 0" }}>
							预计送达: {estimatedDelivery}
						</CJKText>
					</CompactSection>

					<Button href={trackingUrl}>查看物流</Button>

					<Hr />

					<CJKHeading locale="zh" as="h2">
						订单商品
					</CJKHeading>
					<Section>
						<Row style={{ backgroundColor: "#f3f4f6", padding: "8px 12px" }}>
							<Column width="70%">
								<CJKText locale="zh" style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>
									商品名称
								</CJKText>
							</Column>
							<Column width="30%">
								<CJKText
									locale="zh"
									style={{ fontWeight: "bold", margin: 0, fontSize: "14px", textAlign: "center" }}
								>
									数量
								</CJKText>
							</Column>
						</Row>
						{items.map((item) => (
							<Row key={item.name} style={{ padding: "8px 12px" }}>
								<Column width="70%">
									<CJKText locale="zh" style={{ margin: 0, fontSize: "14px" }}>
										{item.name}
									</CJKText>
								</Column>
								<Column width="30%">
									<CJKText locale="zh" style={{ margin: 0, fontSize: "14px", textAlign: "center" }}>
										{item.quantity}
									</CJKText>
								</Column>
							</Row>
						))}
					</Section>

					<Hr />

					<CJKText locale="zh" style={{ fontSize: "12px", color: "#999999" }}>
						buchida Inc. | support@buchida.com
					</CJKText>
				</Container>
			</Body>
		</Email>
	);
}
