import { CJKFont, CJKText } from "@buchida/cjk-components";
import { Body, Button, Container, Email, Head, Hr, Image, Preview } from "@buchida/email";

export interface VerifyEmailZhProps {
	url?: string;
	name?: string;
}

export default function VerifyEmailZh({
	url = "https://buchida.com/api/auth/verify-email?token=xxx",
	name = "用户",
}: VerifyEmailZhProps) {
	return (
		<Email lang="zh">
			<Head>
				<CJKFont locale="zh" />
				<title>验证邮箱 — buchida</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text={`${name}，请验证您的邮箱以激活buchida账户。`} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/icon-192x192.png"
						alt="buchida"
						width={64}
						height={64}
						style={{ margin: "0 auto 24px", borderRadius: "12px" }}
					/>
					<CJKText
						locale="zh"
						style={{
							fontSize: "24px",
							fontWeight: "bold",
							textAlign: "center",
							color: "#1A1A1A",
							marginBottom: "8px",
						}}
					>
						验证您的邮箱
					</CJKText>
					<CJKText
						locale="zh"
						style={{
							fontSize: "14px",
							textAlign: "center",
							color: "#6B7280",
							marginBottom: "32px",
						}}
					>
						{name}，点击下方按钮验证邮箱并激活您的buchida账户。
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
							验证邮箱 →
						</Button>
					</div>
					<Hr />
					<CJKText
						locale="zh"
						style={{ fontSize: "12px", textAlign: "center", color: "#9CA3AF", lineHeight: "1.8" }}
					>
						此链接24小时内有效。如果您未创建buchida账户，请忽略此邮件。
					</CJKText>
					<Hr />
					<CJKText
						locale="zh"
						style={{ fontSize: "11px", textAlign: "center", color: "#9CA3AF" }}
					>
						buchida.com · Email API for Asia & Beyond · 부치다
					</CJKText>
				</Container>
			</Body>
		</Email>
	);
}
