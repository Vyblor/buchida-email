import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PasswordResetKo from "../index.js";

describe("PasswordResetKo template", () => {
	it("renders without errors", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetKo));
		expect(html).toBeTruthy();
		expect(html.length).toBeGreaterThan(0);
	});

	it("renders with Korean locale", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetKo));
		expect(html).toContain('lang="ko"');
	});

	it("includes Korean font loading", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetKo));
		expect(html).toContain("Noto+Sans+KR");
	});

	it("renders password reset title", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetKo));
		expect(html).toContain("비밀번호 재설정");
	});

	it("renders custom name", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetKo, { name: "홍길동" }));
		expect(html).toContain("홍길동");
	});

	it("includes expiry notice", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetKo));
		expect(html).toContain("24시간");
	});

	it("includes security tip", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetKo));
		expect(html).toContain("보안 안내");
	});

	it("includes CJK font family", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetKo));
		expect(html).toContain("Noto Sans KR");
	});
});
