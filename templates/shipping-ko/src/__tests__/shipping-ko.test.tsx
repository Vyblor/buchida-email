import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ShippingKo from "../index.js";

describe("ShippingKo template", () => {
	it("renders without errors", () => {
		const html = renderToStaticMarkup(createElement(ShippingKo));
		expect(html).toBeTruthy();
		expect(html.length).toBeGreaterThan(0);
	});

	it("renders with Korean locale", () => {
		const html = renderToStaticMarkup(createElement(ShippingKo));
		expect(html).toContain('lang="ko"');
	});

	it("includes Korean font loading", () => {
		const html = renderToStaticMarkup(createElement(ShippingKo));
		expect(html).toContain("Noto+Sans+KR");
	});

	it("renders shipping notification title", () => {
		const html = renderToStaticMarkup(createElement(ShippingKo));
		expect(html).toContain("배송 알림");
	});

	it("displays tracking number", () => {
		const html = renderToStaticMarkup(createElement(ShippingKo));
		expect(html).toContain("1234567890");
	});

	it("displays carrier name", () => {
		const html = renderToStaticMarkup(createElement(ShippingKo));
		expect(html).toContain("CJ대한통운");
	});

	it("displays estimated delivery", () => {
		const html = renderToStaticMarkup(createElement(ShippingKo));
		expect(html).toContain("2026년 4월 3일");
	});

	it("renders order items", () => {
		const html = renderToStaticMarkup(createElement(ShippingKo));
		expect(html).toContain("Pro 플랜 환영 키트");
	});

	it("includes CJK font family", () => {
		const html = renderToStaticMarkup(createElement(ShippingKo));
		expect(html).toContain("Noto Sans KR");
	});
});
