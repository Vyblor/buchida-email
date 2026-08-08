import { writeFileSync } from "node:fs";
import { createElement } from "react";
import TrustSafetyTakedown from "../templates/trust-safety-takedown/dist/index.js";
import { render } from "../packages/render/dist/index.js";

const props = {
	impersonatedBrand: "Linkt",
	recipientTeam: "Linkt Security Team",
	incidentId: "buchida-trust-safety-incident-001",
	volumeApprox: "~31,700",
	dateRange: "2026-05-01 → 2026-05-04",
	recipientProfile:
		"Australian consumer ISP, education (.edu.au), and government (.gov.au) mailboxes",
	abuseDomains: ["linktinvoice.com", "linktnoticeinvoice.com", "mail.linktinvoice.com"],
	authenticDomain: "linkt.com.au",
	clonedFromUrl: "view.digital.linkt.com.au",
	peakRejectionRate: "99.93%",
	replyTo: "security@buchida.com",
};

const html = render(createElement(TrustSafetyTakedown, props));

writeFileSync("/tmp/takedown-linkt.html", html);

// Parallel plain-text version
const text = `buchida Trust & Safety — buchida-trust-safety-incident-001
Phishing campaign impersonating Linkt

Linkt Security Team,

We are writing from buchida, a transactional email API platform. Our compliance team has identified and stopped a phishing campaign that was impersonating Linkt through accounts on our service. We are notifying you proactively because we believe your security team should be aware, and because the lookalike domains used will likely attempt to migrate to other providers if not taken down at the infrastructure level.


WHAT WE OBSERVED

Between 2026-05-01 and 2026-05-04, a single subscriber on our paid tier sent approximately 31,700 messages targeting Australian consumer ISP, education (.edu.au), and government (.gov.au) mailboxes. The campaign achieved a peak rejection rate of 99.93% from major receiving providers — indicating that Gmail, Outlook, and other major mailbox providers had already classified the sender as fraudulent.

Lookalike domains used by the abuser:
- linktinvoice.com
- linktnoticeinvoice.com
- mail.linktinvoice.com

For contrast, your authentic domain is linkt.com.au. The lookalike domains were registered through a third-party registrar, with privacy-protected WHOIS, and have no apparent affiliation with your organisation.


DEFINITIVE EVIDENCE OF CLONE-PHISHING

The HTML body of the messages contained an automatic marker that Microsoft Outlook and Internet Explorer insert when a user invokes "Save As..." on an HTML email. The URL referenced inside that marker pointed to your own email-marketing infrastructure at view.digital.linkt.com.au.

In other words: the abuser received a legitimate email from your organisation, saved it locally, modified the call-to-action link, and re-sent the cloned template through our service to a harvested recipient list. This is the canonical clone-phishing pattern, and it cannot be the result of legitimate use.

Subject lines also included Cyrillic-Latin homoglyph variants (a known spam-filter-evasion technique) and a parallel impersonation of a separate jurisdiction's transport authority — together indicating organised activity rather than naive misuse.


ACTIONS BUCHIDA HAS TAKEN

- Suspended the offending subscriber account
- Revoked the API key used to inject the messages
- Removed verification status from the lookalike sending domains
- Drained ~22,900 in-flight messages from our outbound queue before they could attempt further delivery
- Cancelled the subscription per our Acceptable Use Policy
- Sent the suspended subscriber a formal notification with a 7-day appeal window
- Logged the incident internally and committed to additional preventative controls (brand-impersonation watchlist at domain verification, content fingerprinting at send time, KYC for high-risk impersonation categories)


WHAT YOU MAY WANT TO DO

We share this proactively. If it is useful to your team, you may wish to:

- Request DNS takedown of the lookalike domains via your existing trust-team channels with the DNS provider and the registrar
- Add the lookalike domains to your customer-protection blocklists
- Notify your customer-support team so they can correctly categorise inbound complaints related to this campaign
- Request our complete technical evidence package (sending logs, message bodies, recipient sample, registrar WHOIS data) — available via direct reply to this email


We have no expectation of action from your side — this notification is an operator-to-operator courtesy. We are happy to coordinate, share the full evidence package, or appear in any subsequent investigation.

Reply to security@buchida.com for technical follow-up.


buchida Trust & Safety
https://buchida.com · security@buchida.com
`;

writeFileSync("/tmp/takedown-linkt.txt", text);

console.log("HTML bytes:", html.length);
console.log("Text bytes:", text.length);
console.log("HTML preview (first 200):", html.substring(0, 200));
