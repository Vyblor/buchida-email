import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import NewsletterJa from "../index.js";

describe("NewsletterJa template", () => {
	it("renders without errors", () => {
		const html = renderToStaticMarkup(createElement(NewsletterJa));
		expect(html).toBeTruthy();
		expect(html.length).toBeGreaterThan(0);
	});

	it("renders with Japanese locale", () => {
		const html = renderToStaticMarkup(createElement(NewsletterJa));
		expect(html).toContain('lang="ja"');
	});

	it("includes unsubscribe link", () => {
		const html = renderToStaticMarkup(createElement(NewsletterJa));
		expect(html).toContain("配信停止");
		expect(html).toContain("unsubscribe");
	});

	it("renders articles", () => {
		const html = renderToStaticMarkup(createElement(NewsletterJa));
		expect(html).toContain("buchida APIの新機能");
		expect(html).toContain("続きを読む");
	});

	it("includes CJK font family", () => {
		const html = renderToStaticMarkup(createElement(NewsletterJa));
		expect(html).toContain("Noto Sans JP");
	});
});
