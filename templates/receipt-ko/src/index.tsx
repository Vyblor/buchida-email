import {
	Body,
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
import { CJKFont, CJKHeading, CJKText, CompactSection } from "@buchida/cjk-components";

export interface ReceiptItem {
	name: string;
	quantity: number;
	price: number;
}

export interface ReceiptKoProps {
	customerName?: string;
	orderId?: string;
	orderDate?: string;
	items?: ReceiptItem[];
	total?: number;
}

function formatKRW(amount: number): string {
	return `₩${amount.toLocaleString("ko-KR")}`;
}

export default function ReceiptKo({
	customerName = "고객",
	orderId = "ORD-2026-001",
	orderDate = "2026년 3월 31일",
	items = [
		{ name: "Pro 플랜 (월간)", quantity: 1, price: 24000 },
		{ name: "추가 도메인 (5개)", quantity: 1, price: 6000 },
	],
	total = 30000,
}: ReceiptKoProps) {
	return (
		<Email lang="ko">
			<Head>
				<CJKFont locale="ko" />
				<title>buchida 결제 영수증</title>
			</Head>
			<Body style={{ backgroundColor: "#f9fafb" }}>
				<Preview text={`${customerName}님의 buchida 결제 영수증 - ${formatKRW(total)}`} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/logo.png"
						alt="buchida"
						width={120}
						height={40}
						style={{ margin: "0 auto 32px" }}
					/>
					<CJKHeading locale="ko" as="h1">
						결제 영수증
					</CJKHeading>
					<CJKText locale="ko">
						{customerName}님, 결제해 주셔서 감사합니다.
					</CJKText>

					<CompactSection>
						<CJKText locale="ko" style={{ fontSize: "14px", color: "#666666", margin: "4px 0" }}>
							주문번호: {orderId}
						</CJKText>
						<CJKText locale="ko" style={{ fontSize: "14px", color: "#666666", margin: "4px 0" }}>
							결제일: {orderDate}
						</CJKText>
					</CompactSection>

					<Hr />

					<Section>
						<Row style={{ backgroundColor: "#f3f4f6", padding: "8px 12px" }}>
							<Column width="50%">
								<CJKText locale="ko" style={{ fontWeight: "bold", margin: 0, fontSize: "14px" }}>
									항목
								</CJKText>
							</Column>
							<Column width="20%">
								<CJKText
									locale="ko"
									style={{ fontWeight: "bold", margin: 0, fontSize: "14px", textAlign: "center" }}
								>
									수량
								</CJKText>
							</Column>
							<Column width="30%">
								<CJKText
									locale="ko"
									style={{ fontWeight: "bold", margin: 0, fontSize: "14px", textAlign: "right" }}
								>
									금액
								</CJKText>
							</Column>
						</Row>
						{items.map((item) => (
							<Row key={item.name} style={{ padding: "8px 12px" }}>
								<Column width="50%">
									<CJKText locale="ko" style={{ margin: 0, fontSize: "14px" }}>
										{item.name}
									</CJKText>
								</Column>
								<Column width="20%">
									<CJKText locale="ko" style={{ margin: 0, fontSize: "14px", textAlign: "center" }}>
										{item.quantity}
									</CJKText>
								</Column>
								<Column width="30%">
									<CJKText locale="ko" style={{ margin: 0, fontSize: "14px", textAlign: "right" }}>
										{formatKRW(item.price)}
									</CJKText>
								</Column>
							</Row>
						))}
					</Section>

					<Hr />

					<Section>
						<Row style={{ padding: "8px 12px" }}>
							<Column width="70%">
								<CJKText
									locale="ko"
									style={{ fontWeight: "bold", margin: 0, fontSize: "16px", textAlign: "right" }}
								>
									합계
								</CJKText>
							</Column>
							<Column width="30%">
								<CJKText
									locale="ko"
									style={{ fontWeight: "bold", margin: 0, fontSize: "16px", textAlign: "right" }}
								>
									{formatKRW(total)}
								</CJKText>
							</Column>
						</Row>
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
