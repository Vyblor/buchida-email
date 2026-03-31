import { type CJKLocale, NOTO_SANS_URLS } from "../fonts.js";

export interface CJKFontProps {
	locale: CJKLocale;
}

export function CJKFont({ locale }: CJKFontProps) {
	const url = NOTO_SANS_URLS[locale];
	return <link rel="stylesheet" href={url} />;
}
