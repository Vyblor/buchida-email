import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import WelcomeJa from "../index.js";

describe("WelcomeJa template", () => {
	it("renders without errors", () => {
		const html = renderToStaticMarkup(createElement(WelcomeJa));
		expect(html).toBeTruthy();
		expect(html.length).toBeGreaterThan(0);
	});

	it("renders with Japanese locale", () => {
		const html = renderToStaticMarkup(createElement(WelcomeJa));
		expect(html).toContain('lang="ja"');
	});

	it("includes Japanese font loading", () => {
		const html = renderToStaticMarkup(createElement(WelcomeJa));
		expect(html).toContain("Noto+Sans+JP");
	});

	it("renders custom name", () => {
		const html = renderToStaticMarkup(createElement(WelcomeJa, { name: "田中太郎" }));
		expect(html).toContain("田中太郎");
	});

	it("includes CJK font family", () => {
		const html = renderToStaticMarkup(createElement(WelcomeJa));
		expect(html).toContain("Noto Sans JP");
	});
});
