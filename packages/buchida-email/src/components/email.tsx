import type { ReactNode } from "react";

export interface EmailProps {
	children: ReactNode;
	lang?: string;
	dir?: "ltr" | "rtl";
}

export function Email({ children, lang = "en", dir = "ltr" }: EmailProps) {
	return (
		<html lang={lang} dir={dir}>
			{children}
		</html>
	);
}
