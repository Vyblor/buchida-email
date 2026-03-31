export interface PreviewProps {
	text: string;
}

export function Preview({ text }: PreviewProps) {
	return (
		<div
			style={{
				display: "none",
				maxHeight: 0,
				maxWidth: 0,
				overflow: "hidden",
				opacity: 0,
			}}
		>
			{text}
			{/* Invisible characters to prevent email clients from showing body text */}
			{"\u200C".repeat(150 - text.length > 0 ? 150 - text.length : 0)}
		</div>
	);
}
