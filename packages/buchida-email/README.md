# @buchida/email

**buchida Email Templates — CJK-native React Email components**

@buchida/email is the React Email component library with native CJK support for **buchida** — an email API built for AI agents. Built-in support for Korean, Japanese, and Chinese with proper fonts, line-height, and letter-spacing. All components render to email client compatible HTML (Gmail, Outlook, Naver Mail, Apple Mail).

## Install

```bash
npm install @buchida/email
```

## Send your first email

```tsx
import { renderBuchidaEmail, WelcomeTemplate } from '@buchida/email';

const html = renderBuchidaEmail(<WelcomeTemplate name="안녕하세요" locale="ko" />);

// Pass to buchida.emails.send or any SMTP client
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

## Documentation

Full docs: **[buchida.com/docs](https://buchida.com/docs)**

- CJK email templates: https://buchida.com/docs/templates
- API reference: https://buchida.com/docs/api-reference
- Quickstart guide: https://buchida.com/docs/quickstart

## License

MIT — [buchida.com](https://buchida.com)
