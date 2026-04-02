import { CJKFont, CJKText } from "@buchida/cjk-components";
import { Body, Button, Container, Email, Head, Hr, Image, Preview } from "@buchida/email";

export interface MagicLinkProps {
	url?: string;
}

export default function MagicLink({ url = "https://buchida.com/api/auth/callback" }: MagicLinkProps) {
	return (
		<Email lang="ko">
			<Head>
				<CJKFont locale="ko" />
				<title>buchida 로그인</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text="buchida에 로그인하세요. Sign in to buchida." />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/icon-192x192.png"
						alt="buchida"
						width={64}
						height={64}
						style={{ margin: "0 auto 24px", borderRadius: "12px" }}
					/>
					<CJKText locale="ko" style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", color: "#1A1A1A", marginBottom: "8px" }}>
						buchida 로그인
					</CJKText>
					<CJKText locale="ko" style={{ fontSize: "14px", textAlign: "center", color: "#6B7280", marginBottom: "32px" }}>
						Sign in to buchida · ログイン · 登录
					</CJKText>
					<CJKText locale="ko" style={{ fontSize: "15px", textAlign: "center", color: "#1A1A1A", marginBottom: "8px" }}>
						아래 버튼을 클릭하여 로그인하세요.
					</CJKText>
					<CJKText locale="ko" style={{ fontSize: "14px", textAlign: "center", color: "#6B7280", marginBottom: "32px" }}>
						Click the button below to sign in.
					</CJKText>
					<div style={{ textAlign: "center", marginBottom: "32px" }}>
						<Button href={url} style={{ backgroundColor: "#3B6EF9", borderRadius: "9999px", border: "3px solid #1A1A1A", boxShadow: "4px 4px 0px #1A1A1A" }}>
							로그인 / Sign in →
						</Button>
					</div>
					<Hr />
					<CJKText locale="ko" style={{ fontSize: "12px", textAlign: "center", color: "#9CA3AF", lineHeight: "1.8" }}>
						이 링크는 24시간 동안 유효합니다. 본인이 요청하지 않았다면 무시하세요.
					</CJKText>
					<CJKText locale="ko" style={{ fontSize: "12px", textAlign: "center", color: "#9CA3AF", lineHeight: "1.8" }}>
						This link expires in 24 hours. Ignore if you didn't request it.
					</CJKText>
					<CJKText locale="ko" style={{ fontSize: "12px", textAlign: "center", color: "#9CA3AF", lineHeight: "1.8" }}>
						このリンクは24時間有効です。リクエストしていない場合は無視してください。
					</CJKText>
					<CJKText locale="ko" style={{ fontSize: "12px", textAlign: "center", color: "#9CA3AF", lineHeight: "1.8" }}>
						此链接24小时内有效。如果您未请求此链接，请忽略此邮件。
					</CJKText>
					<Hr />
					<CJKText locale="ko" style={{ fontSize: "11px", textAlign: "center", color: "#9CA3AF" }}>
						buchida.com · Email API for Asia & Beyond · 부치다
					</CJKText>
				</Container>
			</Body>
		</Email>
	);
}
