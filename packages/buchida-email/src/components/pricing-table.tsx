import type { CSSProperties } from "react";

export interface PricingPlan {
	name: string;
	price: string;
	features: string[];
	highlighted?: boolean;
	ctaText: string;
	ctaUrl: string;
}

export interface PricingTableProps {
	plans: Array<PricingPlan>;
	locale?: string;
	style?: CSSProperties;
}

/**
 * PricingTable — side-by-side pricing plan cards (table-based for email client compatibility).
 * Highlighted plans get #3B6EF9 background on the header and neo-brutalist CTA button.
 */
export function PricingTable({ plans, locale = "en", style }: PricingTableProps) {
	const colWidth = Math.floor(100 / plans.length);

	return (
		<table
			role="presentation"
			cellPadding={0}
			cellSpacing={0}
			width="100%"
			{...(locale ? { lang: locale } : {})}
			style={{ borderCollapse: "separate", borderSpacing: "8px", ...style }}
		>
			<tbody>
				<tr>
					{plans.map((plan, idx) => {
						const isHighlighted = Boolean(plan.highlighted);
						const headerBg = isHighlighted ? "#3B6EF9" : "#F3F4F6";
						const headerColor = isHighlighted ? "#FFFFFF" : "#1A1A1A";

						return (
							<td
								key={idx}
								width={`${colWidth}%`}
								valign="top"
								style={{
									border: isHighlighted ? "3px solid #1A1A1A" : "2px solid #E5E7EB",
									borderRadius: "12px",
									overflow: "hidden",
									padding: "0",
									boxShadow: isHighlighted ? "4px 4px 0px #1A1A1A" : "none",
									verticalAlign: "top",
								}}
							>
								{/* Plan header */}
								<table role="presentation" cellPadding={0} cellSpacing={0} width="100%">
									<tbody>
										<tr>
											<td
												style={{
													backgroundColor: headerBg,
													padding: "16px 20px",
													borderRadius: "9px 9px 0 0",
												}}
											>
												<p style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: "700", color: headerColor, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
													{plan.name}
												</p>
												<p style={{ margin: 0, fontSize: "28px", fontWeight: "800", color: headerColor }}>
													{plan.price}
												</p>
											</td>
										</tr>
										{/* Features list */}
										<tr>
											<td style={{ padding: "16px 20px", backgroundColor: "#FFFFFF" }}>
												<table role="presentation" cellPadding={0} cellSpacing={0} width="100%">
													<tbody>
														{plan.features.map((feature, fi) => (
															<tr key={fi}>
																<td style={{ padding: "4px 0", fontSize: "13px", color: "#374151" }}>
																	<span style={{ color: "#3B6EF9", fontWeight: "bold", marginRight: "8px" }}>✓</span>
																	{feature}
																</td>
															</tr>
														))}
													</tbody>
												</table>
											</td>
										</tr>
										{/* CTA */}
										<tr>
											<td style={{ padding: "16px 20px 20px", backgroundColor: "#FFFFFF", textAlign: "center" as const }}>
												<a
													href={plan.ctaUrl}
													style={{
														display: "inline-block",
														padding: "10px 20px",
														fontSize: "14px",
														fontWeight: "bold",
														color: isHighlighted ? "#FFFFFF" : "#1A1A1A",
														textDecoration: "none",
														backgroundColor: isHighlighted ? "#3B6EF9" : "#F3F4F6",
														borderRadius: "6px",
														border: "2px solid #1A1A1A",
														boxShadow: "2px 2px 0px #1A1A1A",
													}}
												>
													{plan.ctaText}
												</a>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						);
					})}
				</tr>
			</tbody>
		</table>
	);
}
