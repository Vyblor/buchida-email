import { CJKFont, CJKHeading, CJKText } from "@buchida/cjk-components";
import { Body, Button, Container, Email, Head, Hr, Image, Preview } from "@buchida/email";

export interface WelcomeZhProps {
	name?: string;
	dashboardUrl?: string;
}

export default function WelcomeZh({
	name = "用户",
	dashboardUrl = "https://buchida.com/dashboard",
}: WelcomeZhProps) {
	return (
		<Email lang="zh">
			<Head>
				<CJKFont locale="zh" />
				<title>欢迎使用buchida</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text={`${name}，欢迎使用buchida！立即开始发送邮件。`} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/logo.png"
						alt="buchida"
						width={120}
						height={40}
						style={{ margin: "0 auto 32px" }}
					/>
					<CJKHeading locale="zh" as="h1">
						{name}，欢迎您！ 🎉
					</CJKHeading>
					<CJKText locale="zh">
						感谢您注册buchida。使用亚洲最优秀的邮件API服务，立即开始发送邮件。
					</CJKText>
					<CJKText locale="zh">
						buchida是一个完全支持中文、韩文和日文的开发者友好型邮件平台。
					</CJKText>
					<Button href={dashboardUrl}>进入控制台</Button>
					<Hr />
					<CJKText locale="zh" style={{ fontSize: "14px", color: "#666666" }}>
						如需帮助，请联系 support@buchida.com。
					</CJKText>
				</Container>
			</Body>
		</Email>
	);
}
