# @buchida/email

CJK-first email components for building beautiful, international emails.

Built by [buchida](https://buchida.com) — Email API for Asia & Beyond.

## Why @buchida/email?

- **CJK-first**: Built-in support for Korean, Japanese, and Chinese with proper fonts, line-height, and letter-spacing
- **Email-safe**: All components render to email client compatible HTML (Gmail, Outlook, Naver Mail, Apple Mail)
- **Locale-aware**: Pass `locale` to any component for automatic CJK font loading and text optimization
- **MSO support**: Outlook conditional comments via `MsoConditional`/`MsoHide` components
- **Lightweight**: Zero runtime dependencies (peer deps: react)

## Install

```bash
npm install @buchida/email
```

## Components

| Component | Description |
|-----------|-------------|
| `Email` | Root HTML wrapper with lang attribute |
| `Head` | HTML head with meta tags |
| `Body` | Body with background color |
| `Container` | Centered content container (max-width table) |
| `Section` | Content grouping |
| `Row` / `Column` | Table-based grid layout |
| `Text` | Paragraph with CJK-aware line-height |
| `Heading` | H1-H6 with CJK letter-spacing |
| `Button` | CTA button (centered, neo-brutalist style) |
| `Image` | Responsive image |
| `Link` | Styled anchor |
| `Hr` / `Divider` | Horizontal rule |
| `Preview` | Preview text (hidden in body, visible in inbox) |
| `Font` | Google Fonts loader with CJK auto-append |
| `Markdown` | Markdown to email-safe HTML |
| `CodeBlock` | Dark code block |
| `CodeInline` | Inline code span |
| `MsoConditional` | Outlook-only content |
| `MsoHide` | Hide from Outlook |

## Quick Start

```tsx
import { Body, Button, Container, Email, Font, Head, Text } from "@buchida/email";

export default function WelcomeEmail({ name, locale = "ko" }) {
  return (
    <Email locale={locale}>
      <Head>
        <Font families={["DM Sans"]} locale={locale} />
      </Head>
      <Body style={{ backgroundColor: "#FFF8F0" }}>
        <Container>
          <Text locale={locale} style={{ fontSize: "24px", fontWeight: "bold" }}>
            Welcome, {name}!
          </Text>
          <Button href="https://buchida.com/dashboard" locale={locale}>
            Go to Dashboard →
          </Button>
        </Container>
      </Body>
    </Email>
  );
}
```

## CJK Support

Pass `locale` to enable automatic CJK optimization:

- `locale="ko"` → Noto Sans KR, line-height 1.8, letter-spacing 0.02em
- `locale="ja"` → Noto Sans JP, line-height 1.8, letter-spacing 0.05em
- `locale="zh"` → Noto Sans SC, line-height 1.8, letter-spacing 0.03em
- `locale="en"` → DM Sans (default western fonts)

## Rendering

Use `@buchida/render` to convert components to HTML:

```tsx
import { render } from "@buchida/render";
import WelcomeEmail from "./emails/welcome";

const html = render(<WelcomeEmail name="김민준" locale="ko" />);
// Returns complete HTML string with DOCTYPE
```

## MSO / Outlook Support

Use `MsoConditional` and `MsoHide` for Outlook conditional comments:

```tsx
import { MsoConditional, MsoHide, Container } from "@buchida/email";

// This content is shown only in Outlook (ghost table for layout)
<MsoConditional>
  <table width="600"><tr><td>
</MsoConditional>
  <Container>content here</Container>
<MsoConditional>
  </td></tr></table>
</MsoConditional>

// This content is hidden from Outlook
<MsoHide>
  <div style={{ maxWidth: "600px" }}>Modern layout</div>
</MsoHide>
```

The `render()` function from `@buchida/render` automatically converts these into proper `<!--[if mso]>` conditional comments.

## All Components

### Layout

```tsx
import { Email, Head, Body, Container, Section, Row, Column } from "@buchida/email";

<Email locale="ko">
  <Head />
  <Body style={{ backgroundColor: "#ffffff" }}>
    <Container>
      <Section>
        <Row>
          <Column>Left</Column>
          <Column>Right</Column>
        </Row>
      </Section>
    </Container>
  </Body>
</Email>
```

### Typography

```tsx
import { Text, Heading, Link } from "@buchida/email";

<Heading as="h1" locale="ko">제목</Heading>
<Text locale="ko">본문 텍스트입니다.</Text>
<Link href="https://buchida.com">링크</Link>
```

### Interactive

```tsx
import { Button } from "@buchida/email";

<Button href="https://buchida.com/dashboard" locale="ko">
  대시보드로 이동
</Button>
```

### Code

```tsx
import { CodeBlock, CodeInline } from "@buchida/email";

<CodeBlock>
  {`npm install @buchida/email`}
</CodeBlock>

<Text>
  Run <CodeInline>npm install</CodeInline> to get started.
</Text>
```

### Utilities

```tsx
import { Preview, Hr, Divider, Image, Font } from "@buchida/email";

// Preview text shown in inbox (hidden in email body)
<Preview>Welcome to buchida — your emails are ready to send.</Preview>

// Horizontal rule
<Hr />
<Divider />  {/* alias for Hr */}

// Responsive image
<Image src="https://buchida.com/logo.png" alt="buchida" width={120} height={40} />

// Font loading
<Font families={["Space Grotesk"]} locale="en" />
```

### Markdown

```tsx
import { Markdown } from "@buchida/email";

<Markdown>
  {`
# Hello

This is **bold** and this is _italic_.

- Item one
- Item two
  `}
</Markdown>
```

## License

MIT — [buchida.com](https://buchida.com)
