import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PasswordResetJa from "../index.js";

describe("PasswordResetJa template", () => {
	it("renders without errors", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetJa));
		expect(html).toBeTruthy();
		expect(html.length).toBeGreaterThan(0);
	});

	it("renders with Japanese locale", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetJa));
		expect(html).toContain('lang="ja"');
	});

	it("includes Japanese font loading", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetJa));
		expect(html).toContain("Noto+Sans+JP");
	});

	it("renders password reset title", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetJa));
		expect(html).toContain("パスワードリセット");
	});

	it("renders custom name", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetJa, { name: "田中太郎" }));
		expect(html).toContain("田中太郎");
	});

	it("includes expiry notice", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetJa));
		expect(html).toContain("24時間");
	});

	it("includes security tip", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetJa));
		expect(html).toContain("セキュリティ");
	});

	it("includes CJK font family", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetJa));
		expect(html).toContain("Noto Sans JP");
	});
});
