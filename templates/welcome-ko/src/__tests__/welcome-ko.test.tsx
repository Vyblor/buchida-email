import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import WelcomeKo from "../index.js";

describe("WelcomeKo template", () => {
	it("renders without errors", () => {
		const html = renderToStaticMarkup(createElement(WelcomeKo));
		expect(html).toBeTruthy();
		expect(html.length).toBeGreaterThan(0);
	});

	it("renders with Korean locale", () => {
		const html = renderToStaticMarkup(createElement(WelcomeKo));
		expect(html).toContain('lang="ko"');
	});

	it("includes Korean font loading", () => {
		const html = renderToStaticMarkup(createElement(WelcomeKo));
		expect(html).toContain("Noto+Sans+KR");
	});

	it("renders custom name", () => {
		const html = renderToStaticMarkup(createElement(WelcomeKo, { name: "홍길동" }));
		expect(html).toContain("홍길동");
	});

	it("includes CJK font family", () => {
		const html = renderToStaticMarkup(createElement(WelcomeKo));
		expect(html).toContain("Noto Sans KR");
	});
});
