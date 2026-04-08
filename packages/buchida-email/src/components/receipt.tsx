import type { CSSProperties } from "react";
import { CurrencyAmount } from "./currency-amount.js";

export type ReceiptCurrency = "USD" | "KRW" | "JPY" | "CNY" | "EUR";

export interface ReceiptItem {
	name: string;
	quantity: number;
	price: number;
}

export interface ReceiptProps {
	orderId: string;
	date: string | Date;
	items: Array<ReceiptItem>;
	currency: ReceiptCurrency;
	subtotal: number;
	tax?: number;
	total: number;
	locale?: string;
	style?: CSSProperties;
}

const LABELS: Record<string, { item: string; qty: string; price: string; subtotal: string; tax: string; total: string; order: string; date: string }> = {
	en: { item: "Item", qty: "Qty", price: "Price", subtotal: "Subtotal", tax: "Tax", total: "Total", order: "Order", date: "Date" },
	ko: { item: "항목", qty: "수량", price: "금액", subtotal: "소계", tax: "세금", total: "합계", order: "주문번호", date: "결제일" },
	ja: { item: "品目", qty: "数量", price: "金額", subtotal: "小計", tax: "税金", total: "合計", order: "注文番号", date: "日付" },
	zh: { item: "项目", qty: "数量", price: "金额", subtotal: "小计", tax: "税费", total: "合计", order: "订单号", date: "日期" },
};

function parseDate(date: string | Date): Date {
	if (date instanceof Date) return date;
	return new Date(date);
}

/**
 * Receipt — locale-aware email receipt/invoice table component.
 * Renders order ID, date, line items, subtotal, optional tax, and total.
 */
export function Receipt({
	orderId,
	date,
	items,
	currency,
	subtotal,
	tax,
	total,
	locale = "en",
	style,
}: ReceiptProps) {
	const L = LABELS[locale] ?? LABELS.en;
	const parsed = parseDate(date);
	let formattedDate: string;
	try {
		formattedDate = new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(parsed);
	} catch {
		formattedDate = parsed.toLocaleDateString();
	}

	const borderStyle = "1px solid #E5E7EB";
	const headerBg = "#FFF1E6";
	const cellPad = "8px 12px";

	return (
		<table
			role="presentation"
			cellPadding={0}
			cellSpacing={0}
			width="100%"
			{...(locale ? { lang: locale } : {})}
			style={{
				border: "2px solid #1A1A1A",
				borderRadius: "8px",
				overflow: "hidden",
				fontFamily: "inherit",
				...style,
			}}
		>
			<tbody>
				{/* Order meta row */}
				<tr>
					<td
						colSpan={3}
						style={{
							padding: cellPad,
							borderBottom: borderStyle,
							backgroundColor: "#FFF8F0",
							fontSize: "13px",
							color: "#6B7280",
						}}
					>
						<span style={{ marginRight: "16px" }}>
							<strong>{L.order}:</strong> {orderId}
						</span>
						<span>
							<strong>{L.date}:</strong> {formattedDate}
						</span>
					</td>
				</tr>
				{/* Column headers */}
				<tr style={{ backgroundColor: headerBg }}>
					<td style={{ padding: cellPad, borderBottom: borderStyle, fontWeight: "bold", fontSize: "13px" }}>
						{L.item}
					</td>
					<td style={{ padding: cellPad, borderBottom: borderStyle, fontWeight: "bold", fontSize: "13px", textAlign: "center" }}>
						{L.qty}
					</td>
					<td style={{ padding: cellPad, borderBottom: borderStyle, fontWeight: "bold", fontSize: "13px", textAlign: "right" }}>
						{L.price}
					</td>
				</tr>
				{/* Line items */}
				{items.map((item, idx) => (
					<tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#FAFAFA" }}>
						<td style={{ padding: cellPad, borderBottom: borderStyle, fontSize: "14px" }}>{item.name}</td>
						<td style={{ padding: cellPad, borderBottom: borderStyle, fontSize: "14px", textAlign: "center" }}>
							{item.quantity}
						</td>
						<td style={{ padding: cellPad, borderBottom: borderStyle, fontSize: "14px", textAlign: "right" }}>
							<CurrencyAmount amount={item.price} currency={currency} locale={locale} />
						</td>
					</tr>
				))}
				{/* Subtotal */}
				<tr>
					<td colSpan={2} style={{ padding: cellPad, borderBottom: borderStyle, textAlign: "right", fontSize: "14px", color: "#6B7280" }}>
						{L.subtotal}
					</td>
					<td style={{ padding: cellPad, borderBottom: borderStyle, textAlign: "right", fontSize: "14px", color: "#6B7280" }}>
						<CurrencyAmount amount={subtotal} currency={currency} locale={locale} />
					</td>
				</tr>
				{/* Tax (optional) */}
				{tax !== undefined && (
					<tr>
						<td colSpan={2} style={{ padding: cellPad, borderBottom: borderStyle, textAlign: "right", fontSize: "14px", color: "#6B7280" }}>
							{L.tax}
						</td>
						<td style={{ padding: cellPad, borderBottom: borderStyle, textAlign: "right", fontSize: "14px", color: "#6B7280" }}>
							<CurrencyAmount amount={tax} currency={currency} locale={locale} />
						</td>
					</tr>
				)}
				{/* Total */}
				<tr style={{ backgroundColor: headerBg }}>
					<td colSpan={2} style={{ padding: cellPad, textAlign: "right", fontWeight: "bold", fontSize: "16px" }}>
						{L.total}
					</td>
					<td style={{ padding: cellPad, textAlign: "right", fontWeight: "bold", fontSize: "16px" }}>
						<CurrencyAmount amount={total} currency={currency} locale={locale} />
					</td>
				</tr>
			</tbody>
		</table>
	);
}
