import type { CSSProperties } from "react";

export interface QRCodeProps {
	data: string;
	size?: number;
	style?: CSSProperties;
}

/**
 * QRCode — renders a QR code image in email using the Google Charts API.
 *
 * No external npm dependency required. The Google Charts QR endpoint is free,
 * requires no authentication, and has been stable since 2008.
 *
 * Usage:
 *   <QRCode data="https://buchida.com" size={160} />
 */
export function QRCode({ data, size = 128, style }: QRCodeProps) {
	const url =
		`https://chart.googleapis.com/chart?chs=${size}x${size}&cht=qr&chl=${encodeURIComponent(data)}&choe=UTF-8`;

	return (
		<table
			role="presentation"
			align="center"
			cellPadding={0}
			cellSpacing={0}
			style={{ margin: "0 auto" }}
		>
			<tbody>
				<tr>
					<td>
						<img
							src={url}
							alt="QR Code"
							width={size}
							height={size}
							style={{
								display: "block",
								border: 0,
								outline: "none",
								...style,
							}}
						/>
					</td>
				</tr>
			</tbody>
		</table>
	);
}
