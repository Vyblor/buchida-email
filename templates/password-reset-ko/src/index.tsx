import { CJKFont, CJKHeading, CJKText } from "@buchida/cjk-components";
import { Body, Button, Container, Email, Head, Hr, Image, Preview } from "@buchida/email";

export interface PasswordResetKoProps {
	name?: string;
	resetUrl?: string;
	expiryHours?: number;
}

export default function PasswordResetKo({
	name = "사용자",
	resetUrl = "https://buchida.com/reset?token=abc123",
	expiryHours = 24,
}: PasswordResetKoProps) {
	return (
		<Email lang="ko">
			<Head>
				<CJKFont locale="ko" />
				<title>비밀번호 재설정</title>
			</Head>
			<Body style={{ backgroundColor: "#f9fafb" }}>
				<Preview text={`${name}님, buchida 비밀번호 재설정 요청이 접수되었습니다.`} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/logo.png"
						alt="buchida"
						width={120}
						height={40}
						style={{ margin: "0 auto 32px" }}
					/>
					<CJKHeading locale="ko" as="h1">
						비밀번호 재설정
					</CJKHeading>
					<CJKText locale="ko">
						{name}님, 비밀번호 재설정 요청이 접수되었습니다. 아래 버튼을 클릭하여 새 비밀번호를
						설정하세요.
					</CJKText>
					<Button href={resetUrl}>비밀번호 재설정</Button>
					<CJKText locale="ko" style={{ fontSize: "14px", color: "#666666" }}>
						이 링크는 {expiryHours}시간 후에 만료됩니다.
					</CJKText>
					<Hr />
					<CJKText locale="ko" style={{ fontSize: "14px", color: "#999999" }}>
						🔒 보안 안내: 본인이 요청하지 않은 경우 이 이메일을 무시하세요. 비밀번호는 변경되지
						않습니다.
					</CJKText>
					<CJKText locale="ko" style={{ fontSize: "12px", color: "#999999" }}>
						buchida Inc. | support@buchida.com
					</CJKText>
				</Container>
			</Body>
		</Email>
	);
}
