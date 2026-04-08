import type { CSSProperties } from "react";

export interface NotificationCardProps {
	icon?: string;
	title: string;
	body: string;
	ctaText?: string;
	ctaUrl?: string;
	locale?: string;
	style?: CSSProperties;
}

/**
 * NotificationCard — compact notification card for transactional emails.
 * Shows an optional icon/emoji, title, body text, and optional CTA link.
 */
export function NotificationCard({
	icon,
	title,
	body,
	ctaText,
	ctaUrl,
	locale = "en",
	style,
}: NotificationCardProps) {
	return (
		<table
			role="presentation"
			cellPadding={0}
			cellSpacing={0}
			width="100%"
			{...(locale ? { lang: locale } : {})}
			style={{
				border: "2px solid #1A1A1A",
				borderRadius: "12px",
				backgroundColor: "#FFFFFF",
				boxShadow: "4px 4px 0px #1A1A1A",
				...style,
			}}
		>
			<tbody>
				<tr>
					<td style={{ padding: "24px 28px" }}>
						{icon && (
							<p
								style={{
									fontSize: "36px",
									margin: "0 0 12px",
									lineHeight: "1",
									textAlign: "center" as const,
								}}
							>
								{icon}
							</p>
						)}
						<p
							style={{
								fontSize: "18px",
								fontWeight: "700",
								color: "#1A1A1A",
								margin: "0 0 8px",
								lineHeight: "1.3",
								textAlign: icon ? ("center" as const) : ("left" as const),
							}}
						>
							{title}
						</p>
						<p
							style={{
								fontSize: "15px",
								color: "#4B5563",
								margin: ctaText && ctaUrl ? "0 0 20px" : "0",
								lineHeight: "1.6",
								textAlign: icon ? ("center" as const) : ("left" as const),
							}}
						>
							{body}
						</p>
						{ctaText && ctaUrl && (
							<table
								role="presentation"
								cellPadding={0}
								cellSpacing={0}
								style={{ margin: icon ? "0 auto" : "0" }}
							>
								<tbody>
									<tr>
										<td
											style={{
												borderRadius: "6px",
												backgroundColor: "#3B6EF9",
												border: "2px solid #1A1A1A",
												boxShadow: "3px 3px 0px #1A1A1A",
											}}
										>
											<a
												href={ctaUrl}
												style={{
													display: "inline-block",
													padding: "10px 22px",
													fontSize: "14px",
													fontWeight: "bold",
													color: "#ffffff",
													textDecoration: "none",
													borderRadius: "6px",
													backgroundColor: "#3B6EF9",
												}}
											>
												{ctaText}
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						)}
					</td>
				</tr>
			</tbody>
		</table>
	);
}
