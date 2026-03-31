import { Body, Button, Container, Email, Head, Hr, Image, Preview } from "@buchida/email";
import { CJKFont, CJKHeading, CJKText } from "@buchida/cjk-components";

export interface WelcomeJaProps {
	name?: string;
	dashboardUrl?: string;
}

export default function WelcomeJa({
	name = "ユーザー",
	dashboardUrl = "https://buchida.com/dashboard",
}: WelcomeJaProps) {
	return (
		<Email lang="ja">
			<Head>
				<CJKFont locale="ja" />
				<title>buchidaへようこそ</title>
			</Head>
			<Body style={{ backgroundColor: "#f9fafb" }}>
				<Preview text={`${name}様、buchidaへようこそ！メール配信を始めましょう。`} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/logo.png"
						alt="buchida"
						width={120}
						height={40}
						style={{ margin: "0 auto 32px" }}
					/>
					<CJKHeading locale="ja" as="h1">
						{name}様、ようこそ！ 🎉
					</CJKHeading>
					<CJKText locale="ja">
						buchidaにご登録いただきありがとうございます。アジア最高のメールAPIサービスでメール配信を始めましょう。
					</CJKText>
					<CJKText locale="ja">
						buchidaは日本語、韓国語、中国語を完全にサポートする開発者向けのメールプラットフォームです。
					</CJKText>
					<Button href={dashboardUrl}>ダッシュボードへ</Button>
					<Hr />
					<CJKText locale="ja" style={{ fontSize: "14px", color: "#666666" }}>
						ご質問がございましたら、support@buchida.comまでお問い合わせください。
					</CJKText>
				</Container>
			</Body>
		</Email>
	);
}
