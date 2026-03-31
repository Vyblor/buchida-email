import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PasswordResetZh from "../index.js";

describe("PasswordResetZh template", () => {
	it("renders without errors", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetZh));
		expect(html).toBeTruthy();
		expect(html.length).toBeGreaterThan(0);
	});

	it("renders with Chinese locale", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetZh));
		expect(html).toContain('lang="zh"');
	});

	it("includes Chinese font loading", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetZh));
		expect(html).toContain("Noto+Sans+SC");
	});

	it("renders password reset title", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetZh));
		expect(html).toContain("重置密码");
	});

	it("renders custom name", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetZh, { name: "张伟" }));
		expect(html).toContain("张伟");
	});

	it("includes expiry notice", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetZh));
		expect(html).toContain("24小时");
	});

	it("includes security tip", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetZh));
		expect(html).toContain("安全提示");
	});

	it("includes CJK font family", () => {
		const html = renderToStaticMarkup(createElement(PasswordResetZh));
		expect(html).toContain("Noto Sans SC");
	});
});
