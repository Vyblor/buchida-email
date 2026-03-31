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

export interface ShippingKoProps {
	customerName?: string;
	orderId?: string;
	trackingNumber?: string;
	carrier?: string;
	trackingUrl?: string;
	estimatedDelivery?: string;
	items?: ShippingItem[];
}

export default function ShippingKo({
	customerName = "고객",
	orderId = "ORD-2026-001",
	trackingNumber = "1234567890",
	carrier = "CJ대한통운",
	trackingUrl = "https://www.cjlogistics.com/ko/tool/parcel/tracking",
	estimatedDelivery = "2026년 4월 3일",
	items = [
		{ name: "Pro 플랜 환영 키트", quantity: 1 },
		{ name: "buchida 스티커 팩", quantity: 2 },
	],
}: ShippingKoProps) {
	return (
		<Email lang="ko">
			<Head>
				<CJKFont locale="ko" />
				<title>배송 알림</title>
			</Head>
			<Body style={{ backgroundColor: "#f9fafb" }}>
				<Preview text={`${customerName}님, 주문하신 상품이 발송되었습니다.`} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/logo.png"
						alt="buchida"
						width={120}
						height={40}
						style={{ margin: "0 auto 32px" }}
					/>
					<CJKHeading locale="ko" as="h1">
						배송 알림
					</CJKHeading>
					<CJKText locale="ko">
						{customerName}님, 주문하신 상품이 발송되었습니다! 아래에서 배송 정보를
						확인하세요.
					</CJKText>

					<CompactSection>
						<CJKText locale="ko" style={{ fontSize: "14px", color: "#666666", margin: "4px 0" }}>
							주문번호: {orderId}
						</CJKText>
						<CJKText locale="ko" style={{ fontSize: "14px", color: "#666666", margin: "4px 0" }}>
							택배사: {carrier}
						</CJKText>
						<CJKText locale="ko" style={{ fontSize: "14px", color: "#666666", margin: "4px 0" }}>
							운송장 번호: {trackingNumber}
						</CJKText>
						<CJKText locale="ko" style={{ fontSize: "14px", color: "#666666", margin: "4px 0" }}>
							예상 배송일: {estimatedDelivery}
						</CJKText>
					</CompactSection>

					<Button href={trackingUrl}>배송 추적</Button>

					<Hr />

					<CJKHeading locale="ko" as="h2">
						주문 상품
					</CJKHeading>
					<Section>
						<Row style={{ backgroundColor: "#f3f4f6", padding: "8px 12px" }}>
							<Column width="70%">
								<CJKText locale="ko" style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>
									상품명
								</CJKText>
							</Column>
							<Column width="30%">
								<CJKText
									locale="ko"
									style={{ fontWeight: "bold", margin: 0, fontSize: "14px", textAlign: "center" }}
								>
									수량
								</CJKText>
							</Column>
						</Row>
						{items.map((item) => (
							<Row key={item.name} style={{ padding: "8px 12px" }}>
								<Column width="70%">
									<CJKText locale="ko" style={{ margin: 0, fontSize: "14px" }}>
										{item.name}
									</CJKText>
								</Column>
								<Column width="30%">
									<CJKText locale="ko" style={{ margin: 0, fontSize: "14px", textAlign: "center" }}>
										{item.quantity}
									</CJKText>
								</Column>
							</Row>
						))}
					</Section>

					<Hr />

					<CJKText locale="ko" style={{ fontSize: "12px", color: "#999999" }}>
						buchida Inc. | support@buchida.com
					</CJKText>
				</Container>
			</Body>
		</Email>
	);
}
