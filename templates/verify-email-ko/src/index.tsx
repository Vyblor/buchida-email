import { CJKFont, CJKText } from "@buchida/cjk-components";
import { Body, Button, Container, Email, Head, Hr, Image, Preview } from "@buchida/email";

export interface VerifyEmailKoProps {
	url?: string;
	name?: string;
}

export default function VerifyEmailKo({
	url = "https://buchida.com/api/auth/verify-email?token=xxx",
	name = "사용자",
}: VerifyEmailKoProps) {
	return (
		<Email lang="ko">
			<Head>
				<CJKFont locale="ko" />
				<title>이메일 인증 — buchida</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text={`${name}님, buchida 이메일 인증을 완료하세요.`} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/icon-192x192.png"
						alt="buchida"
						width={64}
						height={64}
						style={{ margin: "0 auto 24px", borderRadius: "12px" }}
					/>
					<CJKText
						locale="ko"
						style={{
							fontSize: "24px",
							fontWeight: "bold",
							textAlign: "center",
							color: "#1A1A1A",
							marginBottom: "8px",
						}}
					>
						이메일 인증
					</CJKText>
					<CJKText
						locale="ko"
						style={{
							fontSize: "14px",
							textAlign: "center",
							color: "#6B7280",
							marginBottom: "32px",
						}}
					>
						{name}님, 아래 버튼을 클릭하여 이메일을 인증하고 buchida 계정을 활성화하세요.
					</CJKText>
					<div style={{ textAlign: "center", marginBottom: "32px" }}>
						<Button
							href={url}
							style={{
								backgroundColor: "#3B6EF9",
								borderRadius: "9999px",
								border: "3px solid #1A1A1A",
								boxShadow: "4px 4px 0px #1A1A1A",
							}}
						>
							이메일 인증하기 →
						</Button>
					</div>
					<Hr />
					<CJKText
						locale="ko"
						style={{ fontSize: "12px", textAlign: "center", color: "#9CA3AF", lineHeight: "1.8" }}
					>
						이 링크는 24시간 동안 유효합니다. buchida 계정을 생성하지 않았다면 무시하세요.
					</CJKText>
					<Hr />
					<CJKText
						locale="ko"
						style={{ fontSize: "11px", textAlign: "center", color: "#9CA3AF" }}
					>
						buchida.com · Email API for Asia & Beyond · 부치다
					</CJKText>
				</Container>
			</Body>
		</Email>
	);
}
