# @buchida/email

CJK-first email components and templates for building beautiful emails that render perfectly in Korean, Japanese, and Chinese.

## Packages

| Package | Description |
|---------|-------------|
| `@buchida/email` | Core email components (Html, Head, Body, Container, Text, Button, etc.) |
| `@buchida/cjk-components` | CJK-specific components (CJKText, CJKHeading, CJKFont, CJKLayout) |
| `@buchida/email-preview` | Local preview server for developing email templates |
| `@buchida/email-render` | Server-side render to HTML string |

## Installation

```bash
npm install @buchida/email @buchida/cjk-components
```

## Quick Start

### Basic email template

```tsx
import { Html, Head, Body, Container, Heading, Text, Button } from '@buchida/email';

export function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', padding: '20px' }}>
        <Container>
          <Heading>Welcome, {name}!</Heading>
          <Text>Thanks for signing up for buchida.</Text>
          <Button
            href="https://app.buchida.com"
            style={{ backgroundColor: '#0066FF', color: '#fff', padding: '12px 24px' }}
          >
            Go to Dashboard
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
```

### CJK email template

```tsx
import { Html, Head, Body, Container } from '@buchida/email';
import { CJKText, CJKHeading, CJKFont } from '@buchida/cjk-components';

export function WelcomeEmailKo({ name }: { name: string }) {
  return (
    <Html lang="ko">
      <Head>
        <CJKFont lang="ko" />
      </Head>
      <Body>
        <Container>
          <CJKHeading lang="ko" level={1}>
            환영합니다, {name}님!
          </CJKHeading>
          <CJKText lang="ko">
            buchida에 가입해 주셔서 감사합니다.
            지금 바로 이메일 발송을 시작하세요.
          </CJKText>
        </Container>
      </Body>
    </Html>
  );
}
```

### Rendering to HTML

```ts
import { render } from '@buchida/email-render';
import { WelcomeEmailKo } from './emails/welcome-ko';

const html = await render(WelcomeEmailKo({ name: '김민준' }));
// Use with buchida API, nodemailer, or any email sender
```

## CJK Components

### `<CJKText>`

Renders text with the correct font stack, line height, and word-break rules for the specified language.

```tsx
<CJKText lang="ja">ご注文の確認メールをお送りします。</CJKText>
<CJKText lang="zh">感谢您的订购，以下是您的订单确认。</CJKText>
<CJKText lang="ko">주문이 확인되었습니다. 아래 내용을 확인해주세요.</CJKText>
```

### `<CJKHeading>`

Heading component with CJK-appropriate font sizing (accounts for wider character width).

```tsx
<CJKHeading lang="ko" level={1}>주문 확인</CJKHeading>
<CJKHeading lang="ja" level={2}>お知らせ</CJKHeading>
```

### `<CJKFont>`

Embeds the correct web font subset for the specified language. Place in `<Head>`.

```tsx
<Head>
  <CJKFont lang="ko" />  {/* Noto Sans KR */}
  <CJKFont lang="ja" />  {/* Noto Sans JP */}
  <CJKFont lang="zh" />  {/* Noto Sans SC */}
</Head>
```

## Pre-built Templates

Ready-to-use templates for common email types in Korean, Japanese, and Chinese:

| Template | Languages |
|----------|-----------|
| Welcome | ko, ja, zh |
| Receipt | ko |
| Newsletter | ja |
| Password Reset | ko, ja, zh |
| Shipping Notification | ko, ja, zh |

### Using a pre-built template

```tsx
import { WelcomeKo } from '@buchida/email/templates/welcome-ko';
import { render } from '@buchida/email-render';

const html = await render(WelcomeKo({ name: '김민준', loginUrl: 'https://app.example.com' }));
```

## Local Preview

Run the preview server to develop templates with hot reload:

```bash
npx @buchida/email-preview
```

Opens a browser at `http://localhost:3300` with live preview of all templates in the `templates/` directory.

## Supported Languages

| Language | Font Stack | `lang` value |
|----------|-----------|-------------|
| Korean | Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic | `ko` |
| Japanese | Noto Sans JP, Hiragino Sans, Yu Gothic, Meiryo | `ja` |
| Chinese (Simplified) | Noto Sans SC, PingFang SC, Microsoft YaHei | `zh` |
| Chinese (Traditional) | Noto Sans TC, PingFang TC, Microsoft JhengHei | `zh-TW` |

## License

MIT
