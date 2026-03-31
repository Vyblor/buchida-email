import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ShippingZh from "../index.js";

describe("ShippingZh template", () => {
	it("renders without errors", () => {
		const html = renderToStaticMarkup(createElement(ShippingZh));
		expect(html).toBeTruthy();
		expect(html.length).toBeGreaterThan(0);
	});

	it("renders with Chinese locale", () => {
		const html = renderToStaticMarkup(createElement(ShippingZh));
		expect(html).toContain('lang="zh"');
	});

	it("includes Chinese font loading", () => {
		const html = renderToStaticMarkup(createElement(ShippingZh));
		expect(html).toContain("Noto+Sans+SC");
	});

	it("renders shipping notification title", () => {
		const html = renderToStaticMarkup(createElement(ShippingZh));
		expect(html).toContain("发货通知");
	});

	it("displays tracking number", () => {
		const html = renderToStaticMarkup(createElement(ShippingZh));
		expect(html).toContain("1234567890");
	});

	it("displays carrier name", () => {
		const html = renderToStaticMarkup(createElement(ShippingZh));
		expect(html).toContain("顺丰速运");
	});

	it("displays estimated delivery", () => {
		const html = renderToStaticMarkup(createElement(ShippingZh));
		expect(html).toContain("2026年4月3日");
	});

	it("renders order items", () => {
		const html = renderToStaticMarkup(createElement(ShippingZh));
		expect(html).toContain("Pro套餐欢迎礼包");
	});

	it("includes CJK font family", () => {
		const html = renderToStaticMarkup(createElement(ShippingZh));
		expect(html).toContain("Noto Sans SC");
	});
});
