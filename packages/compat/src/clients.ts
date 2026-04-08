/**
 * Email client CSS support database.
 * Each entry lists known limitations for a given client.
 */

export interface EmailClientInfo {
	/** Human-readable display name */
	name: string;
	/** Platform(s) this client runs on */
	platforms: string[];
	/** Market share weight (1–10) for sorting issues by severity */
	weight: number;
	/** Features this client does NOT support */
	unsupported: string[];
	/** Features with partial/buggy support */
	partial: string[];
	/** Notes or workarounds */
	notes: string[];
}

export const EMAIL_CLIENTS: Record<string, EmailClientInfo> = {
	gmail_web: {
		name: "Gmail (Web)",
		platforms: ["web"],
		weight: 10,
		unsupported: [
			"<style> in <head>",
			"<link> external CSS",
			"@media queries (clipping workaround)",
			"background-image on <div>",
			"position: fixed / absolute",
			"overflow: hidden",
			"CSS variables (--custom-prop)",
			"CSS Grid",
			"CSS Flexbox (partial)",
		],
		partial: [
			"@media queries (Gmail clips at 102KB)",
			"border-radius (supported post-2019)",
		],
		notes: [
			"Emails over 102KB are clipped — Gmail shows 'View entire message' link",
			"Use inline styles exclusively",
			"Gmail's CSS parser strips <style> blocks entirely",
		],
	},
	gmail_app: {
		name: "Gmail (Android/iOS App)",
		platforms: ["android", "ios"],
		weight: 9,
		unsupported: [
			"<style> in <head>",
			"@media queries",
			"CSS variables",
			"CSS Grid",
			"CSS Flexbox",
		],
		partial: [],
		notes: [
			"Same rendering engine as Gmail Web on mobile — inline only",
		],
	},
	outlook_windows: {
		name: "Outlook (Windows)",
		platforms: ["windows"],
		weight: 8,
		unsupported: [
			"background-image (use VML)",
			"CSS Flexbox",
			"CSS Grid",
			"border-radius (Outlook 2007–2019)",
			"box-shadow",
			"CSS variables",
			"@font-face (web fonts)",
			"max-width",
			"<video>",
			"<audio>",
			"SVG",
		],
		partial: [
			"border (table cells only)",
			"padding (table cells recommended)",
		],
		notes: [
			"Outlook 2007–2019 uses Word rendering engine (very limited CSS)",
			"Use table-based layout exclusively for Outlook",
			"Use VML for background images",
			"border-radius only supported in Outlook 2021+ / Microsoft 365",
		],
	},
	outlook_macos: {
		name: "Outlook (macOS)",
		platforms: ["macos"],
		weight: 5,
		unsupported: [
			"CSS variables",
		],
		partial: [
			"@media queries",
		],
		notes: [
			"macOS Outlook uses WebKit — much better CSS support than Windows",
		],
	},
	apple_mail: {
		name: "Apple Mail",
		platforms: ["macos", "ios"],
		weight: 7,
		unsupported: [],
		partial: [],
		notes: [
			"Best CSS support of all major clients",
			"Supports @media queries, CSS variables, Flexbox, Grid",
		],
	},
	naver_mail: {
		name: "Naver Mail",
		platforms: ["web", "android", "ios"],
		weight: 6,
		unsupported: [
			"<style> blocks (stripped on web)",
			"<link> external CSS",
			"@font-face",
			"CSS variables",
			"@media queries",
		],
		partial: [],
		notes: [
			"Popular in South Korea — inline styles only",
			"Block-level styles are stripped from the head",
		],
	},
	kakao_mail: {
		name: "Kakao Mail",
		platforms: ["web", "android", "ios"],
		weight: 5,
		unsupported: [
			"<style> blocks",
			"@font-face",
			"CSS variables",
			"@media queries",
		],
		partial: [],
		notes: [
			"Korean email service — similar limitations to Naver Mail",
			"Inline styles required",
		],
	},
	yahoo_mail: {
		name: "Yahoo Mail",
		platforms: ["web", "android", "ios"],
		weight: 6,
		unsupported: [
			"<style> in <head> (partially stripped)",
			"CSS variables",
			"@font-face",
		],
		partial: [
			"<style> (class-based styles sometimes survive)",
			"@media queries",
		],
		notes: [
			"Yahoo strips many <head> styles but class-based styles may survive",
			"Inline styles are safest",
		],
	},
	samsung_mail: {
		name: "Samsung Mail",
		platforms: ["android"],
		weight: 5,
		unsupported: [
			"@font-face",
			"CSS variables",
		],
		partial: [
			"@media queries",
			"<style> (varies by firmware version)",
		],
		notes: [
			"Pre-installed on Samsung Android devices",
			"Uses Android WebView — reasonably good CSS support",
		],
	},
};
