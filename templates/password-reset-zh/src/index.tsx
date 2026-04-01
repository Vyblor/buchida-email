import { CJKFont, CJKHeading, CJKText } from "@buchida/cjk-components";
import { Body, Button, Container, Email, Head, Hr, Image, Preview } from "@buchida/email";

export interface PasswordResetZhProps {
	name?: string;
	resetUrl?: string;
	expiryHours?: number;
}

export default function PasswordResetZh({
	name = "用户",
	resetUrl = "https://buchida.com/reset?token=abc123",
	expiryHours = 24,
}: PasswordResetZhProps) {
	return (
		<Email lang="zh">
			<Head>
				<CJKFont locale="zh" />
				<title>重置密码</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text={`${name}，您的buchida密码重置请求已收到。`} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/logo.png"
						alt="buchida"
						width={120}
						height={40}
						style={{ margin: "0 auto 32px" }}
					/>
					<CJKHeading locale="zh" as="h1">
						重置密码
					</CJKHeading>
					<CJKText locale="zh">
						{name}，我们收到了您的密码重置请求。请点击下方按钮设置新密码。
					</CJKText>
					<Button href={resetUrl}>重置密码</Button>
					<CJKText locale="zh" style={{ fontSize: "14px", color: "#666666" }}>
						此链接将在{expiryHours}小时后失效。
					</CJKText>
					<Hr />
					<CJKText locale="zh" style={{ fontSize: "14px", color: "#999999" }}>
						🔒 安全提示：如果您没有发起此请求，请忽略此邮件。您的密码不会被更改。
					</CJKText>
					<CJKText locale="zh" style={{ fontSize: "12px", color: "#999999" }}>
						buchida Inc. | support@buchida.com
					</CJKText>
				</Container>
			</Body>
		</Email>
	);
}
