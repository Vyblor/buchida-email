import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import WelcomeZh from "../index.js";

describe("WelcomeZh template", () => {
	it("renders without errors", () => {
		const html = renderToStaticMarkup(createElement(WelcomeZh));
		expect(html).toBeTruthy();
		expect(html.length).toBeGreaterThan(0);
	});

	it("renders with Chinese locale", () => {
		const html = renderToStaticMarkup(createElement(WelcomeZh));
		expect(html).toContain('lang="zh"');
	});

	it("includes Chinese font loading", () => {
		const html = renderToStaticMarkup(createElement(WelcomeZh));
		expect(html).toContain("Noto+Sans+SC");
	});

	it("renders custom name", () => {
		const html = renderToStaticMarkup(createElement(WelcomeZh, { name: "张伟" }));
		expect(html).toContain("张伟");
	});

	it("includes CJK font family", () => {
		const html = renderToStaticMarkup(createElement(WelcomeZh));
		expect(html).toContain("Noto Sans SC");
	});
});
