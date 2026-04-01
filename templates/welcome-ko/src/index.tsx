import { CJKFont, CJKHeading, CJKText } from "@buchida/cjk-components";
import { Body, Button, Container, Email, Head, Hr, Image, Preview } from "@buchida/email";

export interface WelcomeKoProps {
	name?: string;
	dashboardUrl?: string;
}

export default function WelcomeKo({
	name = "사용자",
	dashboardUrl = "https://buchida.com/dashboard",
}: WelcomeKoProps) {
	return (
		<Email lang="ko">
			<Head>
				<CJKFont locale="ko" />
				<title>buchida에 오신 것을 환영합니다</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text={`${name}님, buchida에 오신 것을 환영합니다! 이메일 전송을 시작하세요.`} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/logo.png"
						alt="buchida"
						width={120}
						height={40}
						style={{ margin: "0 auto 32px" }}
					/>
					<CJKHeading locale="ko" as="h1">
						{name}님, 환영합니다! 🎉
					</CJKHeading>
					<CJKText locale="ko">
						buchida에 가입해 주셔서 감사합니다. 아시아 최고의 이메일 API 서비스로 이메일 전송을
						시작하세요.
					</CJKText>
					<CJKText locale="ko">
						buchida는 한국어, 일본어, 중국어를 완벽하게 지원하는 개발자 친화적인 이메일
						플랫폼입니다.
					</CJKText>
					<Button href={dashboardUrl}>대시보드로 이동</Button>
					<Hr />
					<CJKText locale="ko" style={{ fontSize: "14px", color: "#666666" }}>
						도움이 필요하시면 support@buchida.com으로 문의해 주세요.
					</CJKText>
				</Container>
			</Body>
		</Email>
	);
}
