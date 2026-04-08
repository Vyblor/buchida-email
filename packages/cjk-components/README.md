# @buchida/cjk-components

Advanced CJK email components for Korean, Japanese, and Chinese emails.

Built by [buchida](https://buchida.com) — Email API for Asia & Beyond.

## Why @buchida/cjk-components?

- **Deep CJK expertise**: Components built specifically for East Asian email requirements — not bolted on
- **Legal compliance**: `KoreanAdTag` for Korea's Information and Communications Network Act (정보통신망법)
- **Mobile-first touch targets**: `TappableButton` with 44px minimum touch target (required for KakaoTalk / Line webviews)
- **Information density**: `CompactSection` for CJK content that needs tighter vertical rhythm
- **Font precision**: `CJKFont` loads the correct Noto Sans variant per locale with subsetting hints

## Install

```bash
npm install @buchida/cjk-components @buchida/email
```

## Components

| Component | Description |
|-----------|-------------|
| `CJKText` | Locale-aware text with proper line-height, word-break, and letter-spacing |
| `CJKHeading` | Locale-aware headings with CJK-specific letter-spacing |
| `CJKFont` | Google Fonts CJK font loader (Noto Sans KR/JP/SC) |
| `TappableButton` | 44px minimum touch target CTA button |
| `CompactSection` | Section with tighter vertical spacing for CJK information density |
| `KoreanAdTag` | Legal "(광고)" advertising label required by Korean law |

## Quick Start

```tsx
import { Email, Head, Body, Container, Button } from "@buchida/email";
import { CJKFont, CJKText, CJKHeading, KoreanAdTag } from "@buchida/cjk-components";

export default function KoreanNewsletterEmail({ name }: { name: string }) {
  return (
    <Email locale="ko">
      <Head>
        <CJKFont locale="ko" />
      </Head>
      <Body style={{ backgroundColor: "#FFF8F0" }}>
        <Container>
          <KoreanAdTag />
          <CJKHeading locale="ko" as="h1">
            {name}님께 특별 혜택을 드립니다
          </CJKHeading>
          <CJKText locale="ko">
            부치다(buchida)의 이메일 API로 아시아 전역에 이메일을 발송하세요.
            한국어, 일본어, 중국어를 완벽하게 지원합니다.
          </CJKText>
          <Button href="https://buchida.com/dashboard" locale="ko">
            지금 시작하기
          </Button>
        </Container>
      </Body>
    </Email>
  );
}
```

## CJKFont

Loads the correct Google Fonts CJK variant for each locale:

```tsx
import { CJKFont } from "@buchida/cjk-components";

// Korean — loads Noto Sans KR
<CJKFont locale="ko" />

// Japanese — loads Noto Sans JP
<CJKFont locale="ja" />

// Chinese — loads Noto Sans SC
<CJKFont locale="zh" />
```

Font URLs are exported for use with the base `Font` component:

```tsx
import { NOTO_SANS_URLS, FONT_FAMILIES } from "@buchida/cjk-components";

console.log(NOTO_SANS_URLS.ko);
// "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"

console.log(FONT_FAMILIES.ko);
// "Noto Sans KR"
```

### CJK Line Heights

```tsx
import { CJK_LINE_HEIGHT } from "@buchida/cjk-components";

console.log(CJK_LINE_HEIGHT.ko); // 1.8
console.log(CJK_LINE_HEIGHT.ja); // 1.8
console.log(CJK_LINE_HEIGHT.zh); // 1.8
console.log(CJK_LINE_HEIGHT.en); // 1.6
```

## CJKText

Locale-aware text with proper CJK typography rules:

```tsx
import { CJKText } from "@buchida/cjk-components";

// Korean: line-height 1.8, word-break: keep-all, letter-spacing 0.02em
<CJKText locale="ko">
  부치다는 아시아를 위한 이메일 API입니다.
</CJKText>

// Japanese: line-height 1.8, word-break: break-all, letter-spacing 0.05em
<CJKText locale="ja">
  buchidaはアジアのためのメールAPIです。
</CJKText>

// Chinese: line-height 1.8, word-break: break-all, letter-spacing 0.03em
<CJKText locale="zh">
  buchida是面向亚洲的电子邮件API。
</CJKText>
```

Props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `locale` | `"ko" \| "ja" \| "zh" \| "en"` | Required | Locale for typography rules |
| `style` | `CSSProperties` | — | Additional inline styles |
| `children` | `ReactNode` | Required | Text content |

## CJKHeading

Locale-aware headings with CJK letter-spacing:

```tsx
import { CJKHeading } from "@buchida/cjk-components";

<CJKHeading locale="ko" as="h1">환영합니다</CJKHeading>
<CJKHeading locale="ja" as="h2">ようこそ</CJKHeading>
<CJKHeading locale="zh" as="h3">欢迎</CJKHeading>
```

Props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `locale` | `"ko" \| "ja" \| "zh" \| "en"` | Required | Locale for typography rules |
| `as` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `"h1"` | Heading level |
| `style` | `CSSProperties` | — | Additional inline styles |

## TappableButton

44px minimum touch target button for mobile email clients, especially Korean (KakaoTalk) and Japanese (LINE) webviews:

```tsx
import { TappableButton } from "@buchida/cjk-components";

<TappableButton href="https://buchida.com" locale="ko">
  지금 시작하기
</TappableButton>
```

The minimum height is set to 44px (Apple HIG / WCAG 2.5.5) to ensure the touch target passes accessibility and usability requirements in mobile webviews.

## CompactSection

Section with tighter vertical spacing suited to CJK information density conventions:

```tsx
import { CompactSection } from "@buchida/cjk-components";
import { CJKText } from "@buchida/cjk-components";

<CompactSection locale="ko">
  <CJKText locale="ko">주문 번호: #12345</CJKText>
  <CJKText locale="ko">결제 금액: 30,000원</CJKText>
  <CJKText locale="ko">배송 예정일: 2026년 4월 10일</CJKText>
</CompactSection>
```

## KoreanAdTag

Legal `(광고)` advertising label required by Korea's Information and Communications Network Act (정보통신망법 제50조). **Must appear in Korean marketing/promotional emails or you risk being classified as spam.**

```tsx
import { KoreanAdTag } from "@buchida/cjk-components";

// Renders: (광고) [Company Name] | 수신거부
<KoreanAdTag companyName="부치다" unsubscribeUrl="https://buchida.com/unsubscribe" />
```

Props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `companyName` | `string` | — | Your company name in Korean |
| `unsubscribeUrl` | `string` | — | Unsubscribe link URL |
| `style` | `CSSProperties` | — | Additional inline styles |

## Font Constants

```tsx
import { FONT_FAMILIES, NOTO_SANS_URLS, CJK_LINE_HEIGHT, type CJKLocale } from "@buchida/cjk-components";

// CJKLocale type
type CJKLocale = "ko" | "ja" | "zh" | "en";

// Font family names
FONT_FAMILIES.ko  // "Noto Sans KR"
FONT_FAMILIES.ja  // "Noto Sans JP"
FONT_FAMILIES.zh  // "Noto Sans SC"
FONT_FAMILIES.en  // "DM Sans"

// Google Fonts CSS URLs
NOTO_SANS_URLS.ko  // "https://fonts.googleapis.com/css2?family=Noto+Sans+KR..."
NOTO_SANS_URLS.ja  // "https://fonts.googleapis.com/css2?family=Noto+Sans+JP..."
NOTO_SANS_URLS.zh  // "https://fonts.googleapis.com/css2?family=Noto+Sans+SC..."

// Recommended line heights
CJK_LINE_HEIGHT.ko  // 1.8
CJK_LINE_HEIGHT.ja  // 1.8
CJK_LINE_HEIGHT.zh  // 1.8
CJK_LINE_HEIGHT.en  // 1.6
```

## Related Packages

- [`@buchida/email`](https://www.npmjs.com/package/@buchida/email) — Base email components with locale prop support
- [`@buchida/render`](https://www.npmjs.com/package/@buchida/render) — Render React email components to HTML

## License

MIT — [buchida.com](https://buchida.com)
