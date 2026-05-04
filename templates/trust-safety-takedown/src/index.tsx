import {
	Body,
	Container,
	Email,
	Head,
	Heading,
	Hr,
	Image,
	Preview,
	Section,
	Text,
} from "@buchida/email";

export interface TrustSafetyTakedownProps {
	/** Name of the impersonated organization (e.g. "Linkt", "Transurban") */
	impersonatedBrand: string;
	/** Optional recipient team name displayed in the greeting */
	recipientTeam?: string;
	/** Buchida-internal incident reference (e.g. "incident-001") */
	incidentId: string;
	/** Approximate volume of abusive messages (formatted, e.g. "~31,700") */
	volumeApprox: string;
	/** Date range over which abuse occurred (formatted, e.g. "2026-05-01 → 2026-05-04") */
	dateRange: string;
	/** Geographic recipient profile (e.g. "Australian consumer ISPs, .edu.au, .gov.au mailboxes") */
	recipientProfile: string;
	/** The lookalike / typosquat domains used by the abuser */
	abuseDomains: string[];
	/** Authentic brand domain for contrast (e.g. "linkt.com.au") */
	authenticDomain: string;
	/**
	 * URL inside the Outlook/IE "saved from url=" marker found in the cloned email
	 * (the real brand's email-marketing infrastructure URL).
	 */
	clonedFromUrl: string;
	/** Bounce / spam-rejection rate at peak (e.g. "99.93%") */
	peakRejectionRate: string;
	/** Reply-to address for technical follow-up */
	replyTo: string;
}

export default function TrustSafetyTakedown({
	impersonatedBrand,
	recipientTeam,
	incidentId,
	volumeApprox,
	dateRange,
	recipientProfile,
	abuseDomains,
	authenticDomain,
	clonedFromUrl,
	peakRejectionRate,
	replyTo,
}: TrustSafetyTakedownProps) {
	const greeting = recipientTeam ? `${recipientTeam},` : `${impersonatedBrand} Security Team,`;
	const previewText = `Phishing campaign impersonating ${impersonatedBrand} — abuse identified at upstream provider, evidence and actions enclosed.`;

	return (
		<Email lang="en">
			<Head>
				<title>buchida Trust &amp; Safety — Phishing campaign impersonating {impersonatedBrand}</title>
			</Head>
			<Body style={{ backgroundColor: "#FFF8F0" }}>
				<Preview text={previewText} />
				<Container style={{ padding: "40px 20px", maxWidth: "640px" }}>
					<Image
						src="https://buchida.com/logo.png"
						alt="buchida"
						width={120}
						height={40}
						style={{ margin: "0 0 24px" }}
					/>

					<Text
						style={{
							fontSize: "12px",
							fontFamily: "monospace",
							color: "#6B4F32",
							textTransform: "uppercase",
							letterSpacing: "0.04em",
							margin: "0 0 8px",
						}}
					>
						Trust &amp; Safety — {incidentId}
					</Text>
					<Heading as="h1" style={{ marginTop: 0 }}>
						Phishing campaign impersonating {impersonatedBrand}
					</Heading>

					<Hr />

					<Text>{greeting}</Text>
					<Text>
						We are writing from <strong>buchida</strong>, a transactional email API platform. Our
						compliance team has identified and stopped a phishing campaign that was impersonating{" "}
						<strong>{impersonatedBrand}</strong> through accounts on our service. We are notifying
						you proactively because we believe your security team should be aware, and because the
						lookalike domains used will likely attempt to migrate to other providers if not taken
						down at the infrastructure level.
					</Text>

					<Section>
						<Heading as="h2" style={{ fontSize: "1.25rem" }}>
							What we observed
						</Heading>
						<Text>
							Between <strong>{dateRange}</strong>, a single subscriber on our paid tier sent
							approximately <strong>{volumeApprox}</strong> messages targeting{" "}
							{recipientProfile}. The campaign achieved a peak rejection rate of{" "}
							<strong>{peakRejectionRate}</strong> from major receiving providers — indicating
							that Gmail, Outlook, and other major mailbox providers had already classified the
							sender as fraudulent.
						</Text>
						<Text style={{ marginTop: "12px" }}>
							<strong>Lookalike domains used by the abuser:</strong>
						</Text>
						<ul style={{ margin: "0 0 12px 16px", padding: 0 }}>
							{abuseDomains.map((domain) => (
								<li key={domain} style={{ fontFamily: "monospace", fontSize: "0.9em" }}>
									{domain}
								</li>
							))}
						</ul>
						<Text>
							For contrast, your authentic domain is{" "}
							<code style={{ fontFamily: "monospace" }}>{authenticDomain}</code>. The lookalike
							domains were registered through a third-party registrar, with privacy-protected
							WHOIS, and have no apparent affiliation with your organisation.
						</Text>
					</Section>

					<Section>
						<Heading as="h2" style={{ fontSize: "1.25rem" }}>
							Definitive evidence of clone-phishing
						</Heading>
						<Text>
							The HTML body of the messages contained an automatic marker that Microsoft Outlook
							and Internet Explorer insert when a user invokes "Save As..." on an HTML email. The
							URL referenced inside that marker pointed to{" "}
							<strong>your own email-marketing infrastructure</strong> at{" "}
							<code style={{ fontFamily: "monospace" }}>{clonedFromUrl}</code>.
						</Text>
						<Text>
							In other words: the abuser received a legitimate email from your organisation,
							saved it locally, modified the call-to-action link, and re-sent the cloned template
							through our service to a harvested recipient list. This is the canonical
							clone-phishing pattern, and it cannot be the result of legitimate use.
						</Text>
						<Text>
							Subject lines also included Cyrillic-Latin homoglyph variants (a known
							spam-filter-evasion technique) and a parallel impersonation of a separate
							jurisdiction's transport authority — together indicating organised activity rather
							than naive misuse.
						</Text>
					</Section>

					<Section>
						<Heading as="h2" style={{ fontSize: "1.25rem" }}>
							Actions buchida has taken
						</Heading>
						<ul style={{ margin: "8px 0 0 16px", padding: 0 }}>
							<li>Suspended the offending subscriber account</li>
							<li>Revoked the API key used to inject the messages</li>
							<li>Removed verification status from the lookalike sending domains</li>
							<li>
								Drained ~22,900 in-flight messages from our outbound queue before they could
								attempt further delivery
							</li>
							<li>Cancelled the subscription per our Acceptable Use Policy</li>
							<li>
								Sent the suspended subscriber a formal notification with a 7-day appeal window
							</li>
							<li>
								Logged the incident internally and committed to additional preventative controls
								(brand-impersonation watchlist at domain verification, content fingerprinting at
								send time, KYC for high-risk impersonation categories)
							</li>
						</ul>
					</Section>

					<Section>
						<Heading as="h2" style={{ fontSize: "1.25rem" }}>
							What you may want to do
						</Heading>
						<Text>We share this proactively. If it is useful to your team, you may wish to:</Text>
						<ul style={{ margin: "8px 0 0 16px", padding: 0 }}>
							<li>
								Request DNS takedown of the lookalike domains via your existing trust-team
								channels with the DNS provider and the registrar
							</li>
							<li>Add the lookalike domains to your customer-protection blocklists</li>
							<li>
								Notify your customer-support team so they can correctly categorise inbound
								complaints related to this campaign
							</li>
							<li>
								Request our complete technical evidence package (sending logs, message bodies,
								recipient sample, registrar WHOIS data) — available via direct reply to this
								email
							</li>
						</ul>
					</Section>

					<Hr />

					<Text>
						We have no expectation of action from your side — this notification is an
						operator-to-operator courtesy. We are happy to coordinate, share the full evidence
						package, or appear in any subsequent investigation.
					</Text>

					<Text>
						Reply to <strong>{replyTo}</strong> for technical follow-up.
					</Text>

					<Hr />

					<Text style={{ fontSize: "13px", color: "#6B4F32" }}>
						buchida Trust &amp; Safety
						<br />
						<a href="https://buchida.com" style={{ color: "#6B4F32" }}>
							buchida.com
						</a>
						{" · "}
						{replyTo}
					</Text>
				</Container>
			</Body>
		</Email>
	);
}
