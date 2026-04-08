import type { CSSProperties } from "react";

export type SocialPlatform =
	| "twitter"
	| "github"
	| "linkedin"
	| "line"
	| "kakaotalk"
	| "wechat"
	| "instagram"
	| "facebook"
	| "youtube";

export interface SocialLink {
	platform: SocialPlatform;
	url: string;
}

export interface SocialLinksProps {
	links: SocialLink[];
	style?: CSSProperties;
	iconSize?: number;
}

/**
 * Display labels used as accessible text fallbacks — no image assets needed.
 * Text-based rendering ensures maximum email client compatibility.
 */
const PLATFORM_LABELS: Record<SocialPlatform, string> = {
	twitter: "Twitter / X",
	github: "GitHub",
	linkedin: "LinkedIn",
	line: "LINE",
	kakaotalk: "KakaoTalk",
	wechat: "WeChat",
	instagram: "Instagram",
	facebook: "Facebook",
	youtube: "YouTube",
};

/**
 * Brand colors used for the pill/badge background.
 * Gives visual distinction without requiring image assets.
 */
const PLATFORM_COLORS: Record<SocialPlatform, string> = {
	twitter: "#000000",
	github: "#24292e",
	linkedin: "#0a66c2",
	line: "#06c755",
	kakaotalk: "#fee500",
	wechat: "#07c160",
	instagram: "#e1306c",
	facebook: "#1877f2",
	youtube: "#ff0000",
};

const PLATFORM_TEXT_COLORS: Record<SocialPlatform, string> = {
	twitter: "#ffffff",
	github: "#ffffff",
	linkedin: "#ffffff",
	line: "#ffffff",
	kakaotalk: "#3c1e1e",
	wechat: "#ffffff",
	instagram: "#ffffff",
	facebook: "#ffffff",
	youtube: "#ffffff",
};

/**
 * SocialLinks — a row of branded text badges linking to social profiles.
 *
 * Uses text labels instead of image icons for maximum email client compat.
 * Each badge is a small pill with the platform's brand color.
 */
export function SocialLinks({ links, style, iconSize = 32 }: SocialLinksProps) {
	const fontSize = Math.max(10, Math.round(iconSize * 0.35));
	const paddingH = Math.round(iconSize * 0.3);
	const paddingV = Math.round(iconSize * 0.15);
	const borderRadius = Math.round(iconSize * 0.25);

	return (
		<table
			role="presentation"
			align="center"
			cellPadding={0}
			cellSpacing={0}
			style={{ margin: "0 auto", ...style }}
		>
			<tbody>
				<tr>
					{links.map(({ platform, url }) => (
						<td key={platform} style={{ paddingRight: "8px" }}>
							<a
								href={url}
								style={{
									display: "inline-block",
									backgroundColor: PLATFORM_COLORS[platform],
									color: PLATFORM_TEXT_COLORS[platform],
									fontSize: `${fontSize}px`,
									fontWeight: "bold",
									textDecoration: "none",
									borderRadius: `${borderRadius}px`,
									padding: `${paddingV}px ${paddingH}px`,
									lineHeight: "1",
									whiteSpace: "nowrap",
									fontFamily: "'DM Sans', Arial, sans-serif",
								}}
							>
								{PLATFORM_LABELS[platform]}
							</a>
						</td>
					))}
				</tr>
			</tbody>
		</table>
	);
}
