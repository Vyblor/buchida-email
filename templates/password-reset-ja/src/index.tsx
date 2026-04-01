import { CJKFont, CJKHeading, CJKText } from "@buchida/cjk-components";
import { Body, Button, Container, Email, Head, Hr, Image, Preview } from "@buchida/email";

export interface PasswordResetJaProps {
	name?: string;
	resetUrl?: string;
	expiryHours?: number;
}

export default function PasswordResetJa({
	name = "ユーザー",
	resetUrl = "https://buchida.com/reset?token=abc123",
	expiryHours = 24,
}: PasswordResetJaProps) {
	return (
		<Email lang="ja">
			<Head>
				<CJKFont locale="ja" />
				<title>パスワードリセット</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text={`${name}様、buchidaのパスワードリセットのご依頼を承りました。`} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/logo.png"
						alt="buchida"
						width={120}
						height={40}
						style={{ margin: "0 auto 32px" }}
					/>
					<CJKHeading locale="ja" as="h1">
						パスワードリセット
					</CJKHeading>
					<CJKText locale="ja">
						{name}様、パスワードリセットのご依頼を承りました。下のボタンをクリックして新しいパスワードを設定してください。
					</CJKText>
					<Button href={resetUrl}>パスワードをリセット</Button>
					<CJKText locale="ja" style={{ fontSize: "14px", color: "#666666" }}>
						このリンクは{expiryHours}時間後に無効になります。
					</CJKText>
					<Hr />
					<CJKText locale="ja" style={{ fontSize: "14px", color: "#999999" }}>
						🔒
						セキュリティに関するご注意：このリクエストにお心当たりがない場合は、このメールを無視してください。パスワードは変更されません。
					</CJKText>
					<CJKText locale="ja" style={{ fontSize: "12px", color: "#999999" }}>
						buchida Inc. | support@buchida.com
					</CJKText>
				</Container>
			</Body>
		</Email>
	);
}
