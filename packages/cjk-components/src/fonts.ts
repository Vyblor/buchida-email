export type CJKLocale = "en" | "ko" | "ja" | "zh";

export const FONT_FAMILIES: Record<CJKLocale, string> = {
	en: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
	ko: "'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
	ja: "'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', sans-serif",
	zh: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
};

export const NOTO_SANS_URLS: Record<CJKLocale, string> = {
	en: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap",
	ko: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap",
	ja: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap",
	zh: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap",
};

export const CJK_LINE_HEIGHT = 1.8;
