# @buchida/render

Render React email components to email-safe HTML and plain text.

Built by [buchida](https://buchida.com) — Email API for Asia & Beyond.

## Install

```bash
npm install @buchida/render
```

Peer dependencies: `react`, `react-dom`

## Quick Start

```tsx
import { render } from "@buchida/render";
import WelcomeEmail from "./emails/welcome";

// Render to HTML
const html = render(<WelcomeEmail name="김민준" locale="ko" />);

// Send with buchida
import Buchida from "buchida";
const client = new Buchida(process.env.BUCHIDA_API_KEY);
await client.emails.send({
  from: "hello@buchida.com",
  to: "user@example.com",
  subject: "환영합니다",
  html,
});
```

## API

### `render(element, options?)`

Renders a React element to a complete HTML email string.

```ts
import { render, type RenderOptions } from "@buchida/render";

const html = render(<WelcomeEmail />, {
  pretty: false,  // default: false
  minify: false,  // default: false
});
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `element` | `ReactElement` | The React component tree to render |
| `options` | `RenderOptions` | Optional render configuration |

**RenderOptions:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `pretty` | `boolean` | `false` | Indent the HTML output for readability |
| `minify` | `boolean` | `false` | Collapse whitespace and strip comments |

**Returns:** `string` — Complete HTML string starting with `<!DOCTYPE html ...>`

### `renderToText(element)`

Renders a React element to plain text by stripping HTML tags.

```ts
import { renderToText } from "@buchida/render";

const text = renderToText(<WelcomeEmail />);
// Plain text version without any HTML tags
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `element` | `ReactElement` | The React component tree to render |

**Returns:** `string` — Plain text string with normalized whitespace

## Options

### `pretty: true` — Readable HTML

```ts
const html = render(<WelcomeEmail />, { pretty: true });
```

Indents the HTML output for debugging. **Do not use in production** — adds whitespace that can affect email client rendering.

### `minify: true` — Compact HTML

```ts
const html = render(<WelcomeEmail />, { minify: true });
```

Strips unnecessary whitespace and collapses newlines. Recommended for production sends where email size matters (Gmail clips emails at 102KB).

## MSO Conditional Processing

The `render()` function automatically converts `MsoConditional` and `MsoHide` components from `@buchida/email` into proper Outlook conditional comments.

```tsx
import { MsoConditional, MsoHide } from "@buchida/email";

// In your template:
<MsoConditional>
  <table width="600"><tr><td>
</MsoConditional>
  <div style={{ maxWidth: "600px" }}>Content</div>
<MsoConditional>
  </td></tr></table>
</MsoConditional>
```

After `render()`, the output becomes:

```html
<!--[if mso]>
<table width="600"><tr><td>
<![endif]-->
<div style="max-width:600px">Content</div>
<!--[if mso]>
</td></tr></table>
<![endif]-->
```

This solves the fundamental limitation of React's inability to render HTML comments, giving you full Outlook ghost-table support.

## Plain Text

Use `renderToText` to generate the plain text alternative for multi-part emails:

```ts
import { render, renderToText } from "@buchida/render";

const html = render(<WelcomeEmail />);
const text = renderToText(<WelcomeEmail />);

await client.emails.send({
  from: "hello@buchida.com",
  to: "user@example.com",
  subject: "Welcome",
  html,
  text, // fallback for email clients that don't support HTML
});
```

The plain text render:
- Strips all HTML tags
- Converts `<br>` and block elements to newlines
- Converts `<hr>` to `---`
- Decodes HTML entities (`&amp;` → `&`, `&lt;` → `<`, etc.)
- Normalizes whitespace

## Server-Side Usage

`@buchida/render` works in any Node.js environment (≥18):

```ts
// Express route
app.get("/preview/:templateId", async (req, res) => {
  const { templateId } = req.params;
  const { locale = "en" } = req.query;

  const Template = await import(`./emails/${templateId}`);
  const html = render(<Template.default locale={locale} />);

  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

// Next.js server action
"use server";
import { render } from "@buchida/render";

export async function sendWelcomeEmail(userId: string) {
  const user = await db.users.findById(userId);
  const html = render(<WelcomeEmail name={user.name} locale={user.locale} />);
  await emailClient.send({ to: user.email, html });
}
```

## DOCTYPE

The rendered HTML includes a proper XHTML transitional DOCTYPE required for maximum email client compatibility:

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="ko">
  ...
</html>
```

## Related Packages

- [`@buchida/email`](https://www.npmjs.com/package/@buchida/email) — Base email components
- [`@buchida/cjk-components`](https://www.npmjs.com/package/@buchida/cjk-components) — CJK-specific components

## License

MIT — [buchida.com](https://buchida.com)
