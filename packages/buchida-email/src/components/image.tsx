import type { CSSProperties } from "react";

export interface ImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	style?: CSSProperties;
}

export function Image({ src, alt, width, height, style }: ImageProps) {
	return (
		<img
			src={src}
			alt={alt}
			width={width}
			height={height}
			style={{
				display: "block",
				border: 0,
				outline: "none",
				textDecoration: "none",
				maxWidth: "100%",
				...style,
			}}
		/>
	);
}
