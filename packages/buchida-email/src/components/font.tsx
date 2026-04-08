const CJK_FONTS: Record<string, string> = {
	ko: "Noto Sans KR",
	ja: "Noto Sans JP",
	zh: "Noto Sans SC",
};

export interface FontProps {
	/** Google Fonts family names */
	families: string[];
	/** Font weights to load */
	weights?: number[];
	/** Optional locale hint for CJK font selection */
	locale?: string;
}

export function Font({ families, weights = [400, 700], locale }: FontProps) {
	const allFamilies = [...families];
	if (locale && CJK_FONTS[locale] && !allFamilies.includes(CJK_FONTS[locale])) {
		allFamilies.push(CJK_FONTS[locale]);
	}

	const params = allFamilies
		.map((f) => `family=${f.replace(/ /g, "+")}:wght@${weights.join(";")}`)
		.join("&");

	return (
		<link
			rel="stylesheet"
			href={`https://fonts.googleapis.com/css2?${params}&display=swap`}
		/>
	);
}
