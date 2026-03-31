import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReceiptKo from "../index.js";

describe("ReceiptKo template", () => {
	it("renders without errors", () => {
		const html = renderToStaticMarkup(createElement(ReceiptKo));
		expect(html).toBeTruthy();
		expect(html.length).toBeGreaterThan(0);
	});

	it("renders with Korean locale", () => {
		const html = renderToStaticMarkup(createElement(ReceiptKo));
		expect(html).toContain('lang="ko"');
	});

	it("displays KRW currency format", () => {
		const html = renderToStaticMarkup(createElement(ReceiptKo));
		expect(html).toContain("₩");
	});

	it("renders order details", () => {
		const html = renderToStaticMarkup(createElement(ReceiptKo));
		expect(html).toContain("ORD-2026-001");
		expect(html).toContain("결제 영수증");
	});

	it("includes CJK font family", () => {
		const html = renderToStaticMarkup(createElement(ReceiptKo));
		expect(html).toContain("Noto Sans KR");
	});
});
