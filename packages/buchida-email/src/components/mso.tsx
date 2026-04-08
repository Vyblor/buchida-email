import type { ReactNode } from "react";

/**
 * Wraps children in MSO conditional comments for Outlook compatibility.
 * The render pipeline converts <mso-conditional> tags to <!--[if mso]>...<![endif]-->.
 */
export function MsoConditional({ children }: { children: ReactNode }) {
	// @ts-expect-error — custom HTML element processed by render pipeline
	return <mso-conditional>{children}</mso-conditional>;
}

/**
 * Wraps children in MSO hide comments (hidden from Outlook).
 * The render pipeline converts <mso-hide> tags to <!--[if !mso]><!-->...<![endif]-->.
 */
export function MsoHide({ children }: { children: ReactNode }) {
	// @ts-expect-error — custom HTML element processed by render pipeline
	return <mso-hide>{children}</mso-hide>;
}
