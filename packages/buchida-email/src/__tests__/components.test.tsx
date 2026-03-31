import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
	Body,
	Button,
	Column,
	Container,
	Email,
	Head,
	Heading,
	Hr,
	Image,
	Link,
	Preview,
	Row,
	Section,
	Text,
} from "../index.js";

function render(el: React.ReactElement): string {
	return renderToStaticMarkup(el);
}

describe("Email", () => {
	it("renders html tag with lang attribute", () => {
		const html = render(createElement(Email, { lang: "ko" }, "content"));
		expect(html).toContain('<html lang="ko"');
		expect(html).toContain("content");
	});

	it("defaults to lang=en", () => {
		const html = render(createElement(Email, null, "content"));
		expect(html).toContain('lang="en"');
	});
});

describe("Head", () => {
	it("renders meta tags for email", () => {
		const html = render(createElement(Head, null));
		expect(html).toContain("charset=UTF-8");
		expect(html).toContain("viewport");
		expect(html).toContain("x-apple-disable-message-reformatting");
	});
});

describe("Body", () => {
	it("renders body with default styles", () => {
		const html = render(createElement(Body, null, "content"));
		expect(html).toContain("<body");
		expect(html).toContain("margin:0");
		expect(html).toContain("content");
	});
});

describe("Container", () => {
	it("renders a table with max-width", () => {
		const html = render(createElement(Container, null, "content"));
		expect(html).toContain("role=\"presentation\"");
		expect(html).toContain("max-width:600px");
	});

	it("accepts custom maxWidth", () => {
		const html = render(createElement(Container, { maxWidth: 400 }, "content"));
		expect(html).toContain("max-width:400px");
	});
});

describe("Section", () => {
	it("renders a presentation table", () => {
		const html = render(createElement(Section, null, createElement("tr", null, createElement("td", null, "test"))));
		expect(html).toContain("role=\"presentation\"");
		expect(html).toContain("width:100%");
	});
});

describe("Row", () => {
	it("renders a tr element", () => {
		const html = render(
			createElement("table", null, createElement("tbody", null, createElement(Row, null, createElement("td", null, "cell")))),
		);
		expect(html).toContain("<tr");
		expect(html).toContain("cell");
	});
});

describe("Column", () => {
	it("renders a td element with vertical-align top", () => {
		const html = render(
			createElement("table", null, createElement("tbody", null, createElement("tr", null, createElement(Column, null, "content")))),
		);
		expect(html).toContain("<td");
		expect(html).toContain("vertical-align:top");
	});
});

describe("Text", () => {
	it("renders p tag with default styles", () => {
		const html = render(createElement(Text, null, "hello"));
		expect(html).toContain("<p");
		expect(html).toContain("font-size:16px");
		expect(html).toContain("line-height:1.5");
		expect(html).toContain("hello");
	});

	it("renders as span when specified", () => {
		const html = render(createElement(Text, { as: "span" }, "hello"));
		expect(html).toContain("<span");
	});
});

describe("Heading", () => {
	it("renders h1 by default", () => {
		const html = render(createElement(Heading, null, "Title"));
		expect(html).toContain("<h1");
		expect(html).toContain("font-size:32px");
	});

	it("renders correct tag and size for h2", () => {
		const html = render(createElement(Heading, { as: "h2" }, "Subtitle"));
		expect(html).toContain("<h2");
		expect(html).toContain("font-size:24px");
	});
});

describe("Button", () => {
	it("renders a table-wrapped link", () => {
		const html = render(createElement(Button, { href: "https://example.com" }, "Click"));
		expect(html).toContain("role=\"presentation\"");
		expect(html).toContain('href="https://example.com"');
		expect(html).toContain("Click");
		expect(html).toContain("text-decoration:none");
	});
});

describe("Link", () => {
	it("renders an anchor tag", () => {
		const html = render(createElement(Link, { href: "https://example.com" }, "link text"));
		expect(html).toContain('href="https://example.com"');
		expect(html).toContain("link text");
		expect(html).toContain("color:#0066ff");
	});
});

describe("Image", () => {
	it("renders img with proper email attributes", () => {
		const html = render(createElement(Image, { src: "https://example.com/img.png", alt: "test", width: 100 }));
		expect(html).toContain('src="https://example.com/img.png"');
		expect(html).toContain('alt="test"');
		expect(html).toContain("display:block");
		expect(html).toContain('width="100"');
	});
});

describe("Hr", () => {
	it("renders a styled horizontal rule", () => {
		const html = render(createElement(Hr, null));
		expect(html).toContain("<hr");
		expect(html).toContain("border-top:1px solid #e5e5e5");
	});
});

describe("Preview", () => {
	it("renders hidden preview text", () => {
		const html = render(createElement(Preview, { text: "Preview this email" }));
		expect(html).toContain("display:none");
		expect(html).toContain("Preview this email");
	});
});
