import type { ReactNode } from "react";

export interface EmailProps {
	children: ReactNode;
	lang?: string;
	/** Alias for lang — sets the html[lang] attribute */
	locale?: string;
	dir?: "ltr" | "rtl";
}

export function Email({ children, lang, locale, dir = "ltr" }: EmailProps) {
	const resolvedLang = lang ?? locale ?? "en";
	return (
		<html lang={resolvedLang} dir={dir}>
			{children}
		</html>
	);
}
