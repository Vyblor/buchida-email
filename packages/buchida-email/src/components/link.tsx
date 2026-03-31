import type { CSSProperties, ReactNode } from "react";

export interface LinkProps {
	href: string;
	children: ReactNode;
	style?: CSSProperties;
}

export function Link({ href, children, style }: LinkProps) {
	return (
		<a
			href={href}
			style={{
				color: "#0066ff",
				textDecoration: "underline",
				...style,
			}}
		>
			{children}
		</a>
	);
}
