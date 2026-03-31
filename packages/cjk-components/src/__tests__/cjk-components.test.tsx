import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
	CJKFont,
	CJKHeading,
	CJKText,
	CJK_LINE_HEIGHT,
	CompactSection,
	FONT_FAMILIES,
	KoreanAdTag,
	TappableButton,
} from "../index.js";

function render(el: React.ReactElement): string {
	return renderToStaticMarkup(el);
}

describe("CJKText", () => {
	it("renders with Korean font family and lang attribute", () => {
		const html = render(createElement(CJKText, { locale: "ko" }, "안녕하세요"));
		expect(html).toContain('lang="ko"');
		expect(html).toContain("Noto Sans KR");
		expect(html).toContain("Apple SD Gothic Neo");
		expect(html).toContain("Malgun Gothic");
		expect(html).toContain("안녕하세요");
	});

	it("renders with Japanese font family", () => {
		const html = render(createElement(CJKText, { locale: "ja" }, "こんにちは"));
		expect(html).toContain('lang="ja"');
		expect(html).toContain("Noto Sans JP");
		expect(html).toContain("Hiragino Sans");
		expect(html).toContain("Yu Gothic");
	});

	it("renders with Chinese font family", () => {
		const html = render(createElement(CJKText, { locale: "zh" }, "你好"));
		expect(html).toContain('lang="zh"');
		expect(html).toContain("Noto Sans SC");
		expect(html).toContain("PingFang SC");
		expect(html).toContain("Microsoft YaHei");
	});

	it("has line-height of 1.8", () => {
		const html = render(createElement(CJKText, { locale: "ko" }, "test"));
		expect(html).toContain(`line-height:${CJK_LINE_HEIGHT}`);
		expect(CJK_LINE_HEIGHT).toBe(1.8);
	});

	it("renders as span when specified", () => {
		const html = render(createElement(CJKText, { locale: "ko", as: "span" }, "text"));
		expect(html).toContain("<span");
	});
});

describe("CJKHeading", () => {
	it("renders with locale-specific font and letter-spacing", () => {
		const html = render(createElement(CJKHeading, { locale: "ko" }, "제목"));
		expect(html).toContain('lang="ko"');
		expect(html).toContain("Noto Sans KR");
		expect(html).toContain("letter-spacing:0.02em");
		expect(html).toContain("word-break:keep-all");
	});

	it("uses different letter-spacing per locale", () => {
		const jaHtml = render(createElement(CJKHeading, { locale: "ja" }, "見出し"));
		expect(jaHtml).toContain("letter-spacing:0.05em");

		const zhHtml = render(createElement(CJKHeading, { locale: "zh" }, "标题"));
		expect(zhHtml).toContain("letter-spacing:0.03em");
	});

	it("has line-height of 1.8", () => {
		const html = render(createElement(CJKHeading, { locale: "ja" }, "test"));
		expect(html).toContain(`line-height:${CJK_LINE_HEIGHT}`);
	});

	it("renders correct heading tag", () => {
		const html = render(createElement(CJKHeading, { locale: "ko", as: "h2" }, "test"));
		expect(html).toContain("<h2");
		expect(html).toContain("font-size:24px");
	});
});

describe("CJKFont", () => {
	it("renders Korean font link", () => {
		const html = render(createElement(CJKFont, { locale: "ko" }));
		expect(html).toContain("Noto+Sans+KR");
		expect(html).toContain("fonts.googleapis.com");
	});

	it("renders Japanese font link", () => {
		const html = render(createElement(CJKFont, { locale: "ja" }));
		expect(html).toContain("Noto+Sans+JP");
	});

	it("renders Chinese font link", () => {
		const html = render(createElement(CJKFont, { locale: "zh" }));
		expect(html).toContain("Noto+Sans+SC");
	});
});

describe("TappableButton", () => {
	it("has min 44x44px touch target", () => {
		const html = render(
			createElement(TappableButton, { href: "https://example.com", locale: "ko" }, "클릭"),
		);
		expect(html).toContain("min-width:44px");
		expect(html).toContain("min-height:44px");
	});

	it("uses locale-specific font", () => {
		const html = render(
			createElement(TappableButton, { href: "https://example.com", locale: "ja" }, "クリック"),
		);
		expect(html).toContain("Noto Sans JP");
		expect(html).toContain('lang="ja"');
	});
});

describe("CompactSection", () => {
	it("renders with tight padding", () => {
		const html = render(createElement(CompactSection, null, "content"));
		expect(html).toContain("padding:8px 0");
		expect(html).toContain("padding:4px 0");
	});
});

describe("KoreanAdTag", () => {
	it("renders the required (광고) label", () => {
		const html = render(createElement(KoreanAdTag, null));
		expect(html).toContain("(광고)");
		expect(html).toContain('lang="ko"');
	});

	it("uses Korean font family", () => {
		const html = render(createElement(KoreanAdTag, null));
		expect(html).toContain("Noto Sans KR");
	});
});

describe("Font families", () => {
	it("has correct Korean fallback chain", () => {
		expect(FONT_FAMILIES.ko).toContain("Noto Sans KR");
		expect(FONT_FAMILIES.ko).toContain("Apple SD Gothic Neo");
		expect(FONT_FAMILIES.ko).toContain("Malgun Gothic");
		expect(FONT_FAMILIES.ko).toContain("sans-serif");
	});

	it("has correct Japanese fallback chain", () => {
		expect(FONT_FAMILIES.ja).toContain("Noto Sans JP");
		expect(FONT_FAMILIES.ja).toContain("Hiragino Sans");
		expect(FONT_FAMILIES.ja).toContain("Yu Gothic");
		expect(FONT_FAMILIES.ja).toContain("sans-serif");
	});

	it("has correct Chinese fallback chain", () => {
		expect(FONT_FAMILIES.zh).toContain("Noto Sans SC");
		expect(FONT_FAMILIES.zh).toContain("PingFang SC");
		expect(FONT_FAMILIES.zh).toContain("Microsoft YaHei");
		expect(FONT_FAMILIES.zh).toContain("sans-serif");
	});
});
