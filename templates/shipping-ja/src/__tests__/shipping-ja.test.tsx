import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ShippingJa from "../index.js";

describe("ShippingJa template", () => {
	it("renders without errors", () => {
		const html = renderToStaticMarkup(createElement(ShippingJa));
		expect(html).toBeTruthy();
		expect(html.length).toBeGreaterThan(0);
	});

	it("renders with Japanese locale", () => {
		const html = renderToStaticMarkup(createElement(ShippingJa));
		expect(html).toContain('lang="ja"');
	});

	it("includes Japanese font loading", () => {
		const html = renderToStaticMarkup(createElement(ShippingJa));
		expect(html).toContain("Noto+Sans+JP");
	});

	it("renders shipping notification title", () => {
		const html = renderToStaticMarkup(createElement(ShippingJa));
		expect(html).toContain("配送のお知らせ");
	});

	it("displays tracking number", () => {
		const html = renderToStaticMarkup(createElement(ShippingJa));
		expect(html).toContain("1234567890");
	});

	it("displays carrier name", () => {
		const html = renderToStaticMarkup(createElement(ShippingJa));
		expect(html).toContain("ヤマト運輸");
	});

	it("displays estimated delivery", () => {
		const html = renderToStaticMarkup(createElement(ShippingJa));
		expect(html).toContain("2026年4月3日");
	});

	it("renders order items", () => {
		const html = renderToStaticMarkup(createElement(ShippingJa));
		expect(html).toContain("Proプラン ウェルカムキット");
	});

	it("includes CJK font family", () => {
		const html = renderToStaticMarkup(createElement(ShippingJa));
		expect(html).toContain("Noto Sans JP");
	});
});
