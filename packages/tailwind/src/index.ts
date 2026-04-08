/**
 * @buchida/tailwind
 * Tailwind CSS utility class inliner for email components.
 *
 * This is a static map of the most common Tailwind utilities translated to
 * inline CSS. It covers the subset that is both useful in emails and safe
 * across email clients.
 *
 * Usage:
 *   import { inlineCSS } from "@buchida/tailwind";
 *   const html = inlineCSS(rawHtml);
 */

// ---------------------------------------------------------------------------
// Static Tailwind → CSS map
// ---------------------------------------------------------------------------

/** Spacing scale (rem → px at 16px base) */
const SPACING: Record<string, string> = {
	"0": "0px",
	"px": "1px",
	"0.5": "2px",
	"1": "4px",
	"1.5": "6px",
	"2": "8px",
	"2.5": "10px",
	"3": "12px",
	"3.5": "14px",
	"4": "16px",
	"5": "20px",
	"6": "24px",
	"7": "28px",
	"8": "32px",
	"9": "36px",
	"10": "40px",
	"11": "44px",
	"12": "48px",
	"14": "56px",
	"16": "64px",
	"20": "80px",
	"24": "96px",
	"28": "112px",
	"32": "128px",
	"36": "144px",
	"40": "160px",
	"44": "176px",
	"48": "192px",
	"56": "224px",
	"64": "256px",
};

/** Font size scale */
const FONT_SIZES: Record<string, string> = {
	"xs": "12px",
	"sm": "14px",
	"base": "16px",
	"lg": "18px",
	"xl": "20px",
	"2xl": "24px",
	"3xl": "30px",
	"4xl": "36px",
	"5xl": "48px",
	"6xl": "60px",
};

/** Border radius scale */
const BORDER_RADIUS: Record<string, string> = {
	"none": "0px",
	"sm": "2px",
	"": "4px",
	"md": "6px",
	"lg": "8px",
	"xl": "12px",
	"2xl": "16px",
	"3xl": "24px",
	"full": "9999px",
};

/** Max-width scale */
const MAX_WIDTHS: Record<string, string> = {
	"xs": "320px",
	"sm": "384px",
	"md": "448px",
	"lg": "512px",
	"xl": "576px",
	"2xl": "672px",
	"3xl": "768px",
	"4xl": "896px",
	"5xl": "1024px",
	"6xl": "1152px",
	"7xl": "1280px",
	"full": "100%",
	"screen": "100vw",
	"none": "none",
	"prose": "65ch",
};

/** Tailwind color palette (subset — the most common email colors) */
const COLORS: Record<string, string> = {
	// Slate
	"slate-50": "#f8fafc",
	"slate-100": "#f1f5f9",
	"slate-200": "#e2e8f0",
	"slate-300": "#cbd5e1",
	"slate-400": "#94a3b8",
	"slate-500": "#64748b",
	"slate-600": "#475569",
	"slate-700": "#334155",
	"slate-800": "#1e293b",
	"slate-900": "#0f172a",
	// Gray
	"gray-50": "#f9fafb",
	"gray-100": "#f3f4f6",
	"gray-200": "#e5e7eb",
	"gray-300": "#d1d5db",
	"gray-400": "#9ca3af",
	"gray-500": "#6b7280",
	"gray-600": "#4b5563",
	"gray-700": "#374151",
	"gray-800": "#1f2937",
	"gray-900": "#111827",
	// Zinc
	"zinc-50": "#fafafa",
	"zinc-100": "#f4f4f5",
	"zinc-200": "#e4e4e7",
	"zinc-300": "#d4d4d8",
	"zinc-400": "#a1a1aa",
	"zinc-500": "#71717a",
	"zinc-600": "#52525b",
	"zinc-700": "#3f3f46",
	"zinc-800": "#27272a",
	"zinc-900": "#18181b",
	// Red
	"red-50": "#fef2f2",
	"red-100": "#fee2e2",
	"red-400": "#f87171",
	"red-500": "#ef4444",
	"red-600": "#dc2626",
	"red-700": "#b91c1c",
	// Orange
	"orange-50": "#fff7ed",
	"orange-100": "#ffedd5",
	"orange-400": "#fb923c",
	"orange-500": "#f97316",
	"orange-600": "#ea580c",
	// Yellow
	"yellow-50": "#fefce8",
	"yellow-100": "#fef9c3",
	"yellow-400": "#facc15",
	"yellow-500": "#eab308",
	// Green
	"green-50": "#f0fdf4",
	"green-100": "#dcfce7",
	"green-400": "#4ade80",
	"green-500": "#22c55e",
	"green-600": "#16a34a",
	"green-700": "#15803d",
	// Blue
	"blue-50": "#eff6ff",
	"blue-100": "#dbeafe",
	"blue-400": "#60a5fa",
	"blue-500": "#3b82f6",
	"blue-600": "#2563eb",
	"blue-700": "#1d4ed8",
	// Indigo
	"indigo-50": "#eef2ff",
	"indigo-500": "#6366f1",
	"indigo-600": "#4f46e5",
	// Purple
	"purple-50": "#faf5ff",
	"purple-500": "#a855f7",
	"purple-600": "#9333ea",
	// Pink
	"pink-50": "#fdf2f8",
	"pink-500": "#ec4899",
	"pink-600": "#db2777",
	// Whites/Blacks
	"white": "#ffffff",
	"black": "#000000",
	"transparent": "transparent",
};

// ---------------------------------------------------------------------------
// Class → CSS resolution
// ---------------------------------------------------------------------------

/**
 * Resolve a single Tailwind class name to a CSS property:value pair.
 * Returns null if the class is not in our static map.
 */
function resolveClass(cls: string): string | null {
	// Display
	if (cls === "hidden") return "display:none";
	if (cls === "block") return "display:block";
	if (cls === "inline") return "display:inline";
	if (cls === "inline-block") return "display:inline-block";
	if (cls === "flex") return "display:flex";
	if (cls === "table") return "display:table";

	// Width / Height
	if (cls === "w-full") return "width:100%";
	if (cls === "w-auto") return "width:auto";
	if (cls === "h-full") return "height:100%";
	if (cls === "h-auto") return "height:auto";
	if (cls === "h-screen") return "height:100vh";

	// Max-width
	const maxWMatch = cls.match(/^max-w-(.+)$/);
	if (maxWMatch) {
		const size = maxWMatch[1];
		if (MAX_WIDTHS[size]) return `max-width:${MAX_WIDTHS[size]}`;
	}

	// Typography
	if (cls === "font-bold") return "font-weight:700";
	if (cls === "font-semibold") return "font-weight:600";
	if (cls === "font-medium") return "font-weight:500";
	if (cls === "font-normal") return "font-weight:400";
	if (cls === "font-light") return "font-weight:300";
	if (cls === "italic") return "font-style:italic";
	if (cls === "not-italic") return "font-style:normal";
	if (cls === "underline") return "text-decoration:underline";
	if (cls === "no-underline") return "text-decoration:none";
	if (cls === "line-through") return "text-decoration:line-through";
	if (cls === "text-center") return "text-align:center";
	if (cls === "text-left") return "text-align:left";
	if (cls === "text-right") return "text-align:right";
	if (cls === "uppercase") return "text-transform:uppercase";
	if (cls === "lowercase") return "text-transform:lowercase";
	if (cls === "capitalize") return "text-transform:capitalize";
	if (cls === "normal-case") return "text-transform:none";
	if (cls === "truncate") return "overflow:hidden;text-overflow:ellipsis;white-space:nowrap";
	if (cls === "whitespace-nowrap") return "white-space:nowrap";
	if (cls === "whitespace-pre") return "white-space:pre";
	if (cls === "break-words") return "overflow-wrap:break-word";
	if (cls === "break-all") return "word-break:break-all";

	// Font size
	const textSizeMatch = cls.match(/^text-(.+)$/);
	if (textSizeMatch) {
		const size = textSizeMatch[1];
		if (FONT_SIZES[size]) return `font-size:${FONT_SIZES[size]}`;
		// Color fallthrough
		if (COLORS[size]) return `color:${COLORS[size]}`;
	}

	// Text color
	const textColorMatch = cls.match(/^text-(.+)$/);
	if (textColorMatch) {
		const color = textColorMatch[1];
		if (COLORS[color]) return `color:${COLORS[color]}`;
	}

	// Background color
	const bgColorMatch = cls.match(/^bg-(.+)$/);
	if (bgColorMatch) {
		const color = bgColorMatch[1];
		if (COLORS[color]) return `background-color:${COLORS[color]}`;
		if (color === "transparent") return "background-color:transparent";
	}

	// Border color
	const borderColorMatch = cls.match(/^border-(.+)$/);
	if (borderColorMatch) {
		const val = borderColorMatch[1];
		if (COLORS[val]) return `border-color:${COLORS[val]}`;
		// border-{n} — border-width
		if (/^\d+$/.test(val)) {
			return `border-width:${val}px`;
		}
	}
	if (cls === "border") return "border-width:1px;border-style:solid";
	if (cls === "border-solid") return "border-style:solid";
	if (cls === "border-dashed") return "border-style:dashed";
	if (cls === "border-dotted") return "border-style:dotted";
	if (cls === "border-none") return "border:none";

	// Border radius
	const roundedMatch = cls.match(/^rounded(?:-(.+))?$/);
	if (roundedMatch) {
		const size = roundedMatch[1] ?? "";
		if (size in BORDER_RADIUS) return `border-radius:${BORDER_RADIUS[size]}`;
	}

	// Padding
	const paddingMatch = cls.match(/^(p|px|py|pt|pr|pb|pl)-(.+)$/);
	if (paddingMatch) {
		const [, dir, n] = paddingMatch;
		const px = SPACING[n];
		if (!px) return null;
		switch (dir) {
			case "p": return `padding:${px}`;
			case "px": return `padding-left:${px};padding-right:${px}`;
			case "py": return `padding-top:${px};padding-bottom:${px}`;
			case "pt": return `padding-top:${px}`;
			case "pr": return `padding-right:${px}`;
			case "pb": return `padding-bottom:${px}`;
			case "pl": return `padding-left:${px}`;
		}
	}

	// Margin
	const marginMatch = cls.match(/^(m|mx|my|mt|mr|mb|ml)-(.+)$/);
	if (marginMatch) {
		const [, dir, n] = marginMatch;
		if (n === "auto") {
			switch (dir) {
				case "m": return "margin:auto";
				case "mx": return "margin-left:auto;margin-right:auto";
				case "my": return "margin-top:auto;margin-bottom:auto";
				case "mt": return "margin-top:auto";
				case "mr": return "margin-right:auto";
				case "mb": return "margin-bottom:auto";
				case "ml": return "margin-left:auto";
			}
		}
		const px = SPACING[n];
		if (!px) return null;
		switch (dir) {
			case "m": return `margin:${px}`;
			case "mx": return `margin-left:${px};margin-right:${px}`;
			case "my": return `margin-top:${px};margin-bottom:${px}`;
			case "mt": return `margin-top:${px}`;
			case "mr": return `margin-right:${px}`;
			case "mb": return `margin-bottom:${px}`;
			case "ml": return `margin-left:${px}`;
		}
	}

	// Line height
	if (cls === "leading-none") return "line-height:1";
	if (cls === "leading-tight") return "line-height:1.25";
	if (cls === "leading-snug") return "line-height:1.375";
	if (cls === "leading-normal") return "line-height:1.5";
	if (cls === "leading-relaxed") return "line-height:1.625";
	if (cls === "leading-loose") return "line-height:2";

	// Letter spacing
	if (cls === "tracking-tighter") return "letter-spacing:-0.05em";
	if (cls === "tracking-tight") return "letter-spacing:-0.025em";
	if (cls === "tracking-normal") return "letter-spacing:0em";
	if (cls === "tracking-wide") return "letter-spacing:0.025em";
	if (cls === "tracking-wider") return "letter-spacing:0.05em";
	if (cls === "tracking-widest") return "letter-spacing:0.1em";

	// Overflow
	if (cls === "overflow-hidden") return "overflow:hidden";
	if (cls === "overflow-auto") return "overflow:auto";
	if (cls === "overflow-scroll") return "overflow:scroll";
	if (cls === "overflow-visible") return "overflow:visible";

	// Opacity
	const opacityMatch = cls.match(/^opacity-(\d+)$/);
	if (opacityMatch) {
		return `opacity:${Number(opacityMatch[1]) / 100}`;
	}

	// Vertical align
	if (cls === "align-top") return "vertical-align:top";
	if (cls === "align-middle") return "vertical-align:middle";
	if (cls === "align-bottom") return "vertical-align:bottom";

	// Position
	if (cls === "relative") return "position:relative";
	if (cls === "absolute") return "position:absolute";
	if (cls === "fixed") return "position:fixed";
	if (cls === "static") return "position:static";

	return null;
}

// ---------------------------------------------------------------------------
// HTML inlining
// ---------------------------------------------------------------------------

/**
 * Parse the class attribute value and resolve each class to CSS declarations.
 * Returns a semicolon-separated CSS string.
 */
function classesToCSS(classList: string): string {
	const classes = classList.trim().split(/\s+/);
	const declarations: string[] = [];

	for (const cls of classes) {
		if (!cls) continue;
		const css = resolveClass(cls);
		if (css) {
			declarations.push(css);
		}
	}

	return declarations.join(";");
}

/**
 * Merge a new CSS string into an existing `style` attribute value.
 * Tailwind-derived styles take precedence over existing inline styles
 * (they are appended, so later declarations win in CSS cascade).
 */
function mergeStyles(existing: string | null, tailwindCSS: string): string {
	if (!existing) return tailwindCSS;
	// Normalize: strip trailing semicolons
	const base = existing.replace(/;+$/, "");
	return `${base};${tailwindCSS}`;
}

/**
 * Convert an HTML string that contains Tailwind utility classes into one
 * where those classes have been converted to inline `style` attributes.
 *
 * This is a regex-based approach suitable for email HTML — it does not parse
 * a full DOM. The output is compatible with all major email clients.
 *
 * @param html - HTML string (typically from @buchida/render)
 * @returns HTML string with Tailwind classes inlined as style attributes
 *
 * @example
 * ```ts
 * import { inlineCSS } from "@buchida/tailwind";
 * import { render } from "@buchida/render";
 *
 * const rawHtml = render(<MyEmail />);
 * const emailHtml = inlineCSS(rawHtml);
 * ```
 */
export function inlineCSS(html: string): string {
	// Match any opening HTML tag that has a class attribute.
	// Capture groups:
	//   1 — everything before the class attribute
	//   2 — the class attribute value
	//   3 — everything after the class attribute (to end of tag)
	const TAG_REGEX = /(<[a-zA-Z][a-zA-Z0-9]*(?:\s[^>]*)?)(\sclass="([^"]*)")([^>]*>)/g;

	return html.replace(TAG_REGEX, (match, before, classAttr, classValue, after) => {
		const tailwindCSS = classesToCSS(classValue);

		if (!tailwindCSS) {
			// No known Tailwind classes — leave the element unchanged
			return match;
		}

		// Check if there is already a style attribute in the tag
		const styleMatch = (before + after).match(/\sstyle="([^"]*)"/);

		if (styleMatch) {
			// Merge into existing style attribute
			const existingStyle = styleMatch[1];
			const mergedStyle = mergeStyles(existingStyle, tailwindCSS);
			// Replace the existing style attribute
			const tagWithMergedStyle = (before + classAttr + after).replace(
				/(\sstyle=")[^"]*(")/,
				`$1${mergedStyle}$2`,
			);
			return tagWithMergedStyle;
		}

		// No existing style attribute — inject one just before the closing >
		// `after` ends with ">"
		const closingIndex = after.lastIndexOf(">");
		const beforeClose = after.slice(0, closingIndex);
		const close = after.slice(closingIndex);
		return `${before}${classAttr} style="${tailwindCSS}"${beforeClose}${close}`;
	});
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { resolveClass, classesToCSS };
export type { };
