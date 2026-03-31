import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { render, renderToText } from "../index.js";

describe("render", () => {
	it("returns valid HTML string with DOCTYPE", () => {
		const el = createElement("html", { lang: "ko" }, createElement("body", null, "Hello"));
		const html = render(el);
		expect(html).toContain("<!DOCTYPE html");
		expect(html).toContain('<html lang="ko"');
		expect(html).toContain("Hello");
	});

	it("renders email components to static markup", () => {
		const el = createElement(
			"html",
			null,
			createElement(
				"body",
				null,
				createElement("h1", null, "제목"),
				createElement("p", null, "본문 내용"),
			),
		);
		const html = render(el);
		expect(html).toContain("<h1>제목</h1>");
		expect(html).toContain("<p>본문 내용</p>");
	});

	it("produces a valid HTML string", () => {
		const el = createElement("html", null, createElement("body", null, "test"));
		const html = render(el);
		expect(typeof html).toBe("string");
		expect(html.length).toBeGreaterThan(0);
		expect(html).toMatch(/^<!DOCTYPE/);
	});
});

describe("renderToText", () => {
	it("strips HTML tags and returns plain text", () => {
		const el = createElement(
			"div",
			null,
			createElement("h1", null, "Title"),
			createElement("p", null, "Paragraph text"),
		);
		const text = renderToText(el);
		expect(text).toContain("Title");
		expect(text).toContain("Paragraph text");
		expect(text).not.toContain("<h1>");
		expect(text).not.toContain("<p>");
	});

	it("converts hr to text separator", () => {
		const el = createElement("div", null, createElement("hr"), "text");
		const text = renderToText(el);
		expect(text).toContain("---");
	});

	it("handles CJK characters", () => {
		const el = createElement("div", null, createElement("p", null, "안녕하세요"));
		const text = renderToText(el);
		expect(text).toContain("안녕하세요");
	});
});
