import { CJKFont, CJKText } from "@buchida/cjk-components";
import { Body, Button, Container, Email, Head, Hr, Image, Preview } from "@buchida/email";

export interface VerifyEmailEnProps {
	url?: string;
	name?: string;
}

export default function VerifyEmailEn({
	url = "https://buchida.com/api/auth/verify-email?token=xxx",
	name = "there",
}: VerifyEmailEnProps) {
	return (
		<Email lang="en">
			<Head>
				<CJKFont locale="en" />
				<title>Verify your email — buchida</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text="Verify your email to activate your buchida account." />
				<Container style={{ padding: "40px 20px" }}>
					<Image
						src="https://buchida.com/icon-192x192.png"
						alt="buchida"
						width={64}
						height={64}
						style={{ margin: "0 auto 24px", borderRadius: "12px" }}
					/>
					<CJKText
						locale="en"
						style={{
							fontSize: "24px",
							fontWeight: "bold",
							textAlign: "center",
							color: "#1A1A1A",
							marginBottom: "8px",
						}}
					>
						Verify your email
					</CJKText>
					<CJKText
						locale="en"
						style={{
							fontSize: "14px",
							textAlign: "center",
							color: "#6B7280",
							marginBottom: "32px",
						}}
					>
						Hi {name}, click the button below to verify your email and activate your buchida account.
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
							Verify Email →
						</Button>
					</div>
					<Hr />
					<CJKText
						locale="en"
						style={{ fontSize: "12px", textAlign: "center", color: "#9CA3AF", lineHeight: "1.8" }}
					>
						This link expires in 24 hours. If you didn't create a buchida account, you can safely
						ignore this email.
					</CJKText>
					<Hr />
					<CJKText
						locale="en"
						style={{ fontSize: "11px", textAlign: "center", color: "#9CA3AF" }}
					>
						buchida.com · Email API for Asia & Beyond · 부치다
					</CJKText>
				</Container>
			</Body>
		</Email>
	);
}
