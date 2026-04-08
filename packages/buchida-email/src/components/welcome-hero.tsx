import type { CSSProperties } from "react";

export interface WelcomeHeroProps {
	title: string;
	subtitle: string;
	ctaText: string;
	ctaUrl: string;
	logoUrl?: string;
	locale?: string;
	style?: CSSProperties;
}

/**
 * WelcomeHero — centered hero section for welcome emails.
 * Renders: optional logo → title → subtitle → CTA button.
 * Uses buchida neo-brutalist button style (#3B6EF9, bold border + shadow).
 */
export function WelcomeHero({
	title,
	subtitle,
	ctaText,
	ctaUrl,
	logoUrl,
	locale = "en",
	style,
}: WelcomeHeroProps) {
	return (
		<table
			role="presentation"
			cellPadding={0}
			cellSpacing={0}
			width="100%"
			{...(locale ? { lang: locale } : {})}
			style={{ textAlign: "center", ...style }}
		>
			<tbody>
				{logoUrl && (
					<tr>
						<td style={{ paddingBottom: "24px" }}>
							<img
								src={logoUrl}
								alt="logo"
								width={120}
								height={40}
								style={{ display: "block", margin: "0 auto" }}
							/>
						</td>
					</tr>
				)}
				<tr>
					<td>
						<h1
							style={{
								fontSize: "28px",
								fontWeight: "800",
								color: "#1A1A1A",
								margin: "0 0 12px",
								lineHeight: "1.2",
							}}
						>
							{title}
						</h1>
					</td>
				</tr>
				<tr>
					<td>
						<p
							style={{
								fontSize: "16px",
								color: "#4B5563",
								margin: "0 0 32px",
								lineHeight: "1.6",
							}}
						>
							{subtitle}
						</p>
					</td>
				</tr>
				<tr>
					<td style={{ paddingBottom: "8px" }}>
						<table role="presentation" cellPadding={0} cellSpacing={0} align="center" style={{ margin: "0 auto" }}>
							<tbody>
								<tr>
									<td
										style={{
											borderRadius: "9999px",
											backgroundColor: "#3B6EF9",
											border: "3px solid #1A1A1A",
											boxShadow: "4px 4px 0px #1A1A1A",
										}}
									>
										<a
											href={ctaUrl}
											style={{
												display: "inline-block",
												padding: "14px 32px",
												fontSize: "16px",
												fontWeight: "bold",
												color: "#ffffff",
												textDecoration: "none",
												textAlign: "center" as const,
												borderRadius: "9999px",
												backgroundColor: "#3B6EF9",
											}}
										>
											{ctaText}
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
	);
}
