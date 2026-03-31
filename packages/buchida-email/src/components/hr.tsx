import type { CSSProperties } from "react";

export interface HrProps {
	style?: CSSProperties;
}

export function Hr({ style }: HrProps) {
	return (
		<hr
			style={{
				border: "none",
				borderTop: "1px solid #e5e5e5",
				margin: "24px 0",
				...style,
			}}
		/>
	);
}
