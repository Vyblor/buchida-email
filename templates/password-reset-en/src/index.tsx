import { CJKFont, CJKText } from "@buchida/cjk-components";
import { Body, Button, Container, Email, Head, Hr, Image, Preview } from "@buchida/email";

export interface PasswordResetEnProps {
	url?: string;
	name?: string;
	expiryHours?: number;
}

export default function PasswordResetEn({
	url = "https://buchida.com/reset?token=abc123",
	name = "there",
	expiryHours = 1,
}: PasswordResetEnProps) {
	return (
		<Email lang="en">
			<Head>
				<CJKFont locale="en" />
				<title>Reset your password — buchida</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text="Reset your buchida password. This link expires in 1 hour." />
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
						Reset your password
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
						Hi {name}, click the button below to reset your buchida password. This link expires in{" "}
						{expiryHours} hour{expiryHours !== 1 ? "s" : ""}.
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
							Reset Password →
						</Button>
					</div>
					<Hr />
					<CJKText
						locale="en"
						style={{ fontSize: "12px", textAlign: "center", color: "#9CA3AF", lineHeight: "1.8" }}
					>
						If you didn't request a password reset, you can safely ignore this email. Your password
						will not be changed.
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
