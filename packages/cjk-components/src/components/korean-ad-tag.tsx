import type { CSSProperties } from "react";

export interface KoreanAdTagProps {
	style?: CSSProperties;
}

/**
 * Required "(광고)" label for Korean marketing emails per Korean law.
 * Must appear in the subject line or prominently in the email body.
 */
export function KoreanAdTag({ style }: KoreanAdTagProps) {
	return (
		<span
			lang="ko"
			style={{
				fontSize: "12px",
				color: "#666666",
				fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
				...style,
			}}
		>
			(광고)
		</span>
	);
}
