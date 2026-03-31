import type { CSSProperties, ReactNode } from "react";

export interface RowProps {
	children: ReactNode;
	style?: CSSProperties;
}

export function Row({ children, style }: RowProps) {
	return <tr style={style}>{children}</tr>;
}
