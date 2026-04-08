import { CJKFont, CJKText } from "@buchida/cjk-components";
import { Body, Button, Container, Email, Head, Hr, Image, Preview } from "@buchida/email";

export interface VerifyEmailJaProps {
	url?: string;
	name?: string;
}

export default function VerifyEmailJa({
	url = "https://buchida.com/api/auth/verify-email?token=xxx",
	name = "ユーザー",
}: VerifyEmailJaProps) {
	return (
		<Email lang="ja">
			<Head>
				<CJKFont locale="ja" />
				<title>メール認証 — buchida</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text={`${name}さん、buchidaのメールアドレスを認証してください。`} />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/icon-192x192.png"
						alt="buchida"
						width={64}
						height={64}
						style={{ margin: "0 auto 24px", borderRadius: "12px" }}
					/>
					<CJKText
						locale="ja"
						style={{
							fontSize: "24px",
							fontWeight: "bold",
							textAlign: "center",
							color: "#1A1A1A",
							marginBottom: "8px",
						}}
					>
						メールアドレスを認証
					</CJKText>
					<CJKText
						locale="ja"
						style={{
							fontSize: "14px",
							textAlign: "center",
							color: "#6B7280",
							marginBottom: "32px",
						}}
					>
						{name}さん、下のボタンをクリックしてメールアドレスを認証し、buchidaアカウントを有効化してください。
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
							メール認証 →
						</Button>
					</div>
					<Hr />
					<CJKText
						locale="ja"
						style={{ fontSize: "12px", textAlign: "center", color: "#9CA3AF", lineHeight: "1.8" }}
					>
						このリンクは24時間有効です。buchidaアカウントを作成していない場合は無視してください。
					</CJKText>
					<Hr />
					<CJKText
						locale="ja"
						style={{ fontSize: "11px", textAlign: "center", color: "#9CA3AF" }}
					>
						buchida.com · Email API for Asia & Beyond · 부치다
					</CJKText>
				</Container>
			</Body>
		</Email>
	);
}
