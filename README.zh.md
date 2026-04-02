<div align="center">
  <img src="assets/logo-black.svg" alt="buchida" width="280" />
  <p><strong>CJK优先的邮件组件和模板</strong></p>

  [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [中文](README.zh.md)

  [![npm version](https://img.shields.io/npm/v/@buchida/email)](https://www.npmjs.com/package/@buchida/email) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

---

原生支持CJK（韩文、日文、中文）的React邮件组件。构建在所有CJK邮件客户端中完美渲染的精美邮件。

## 安装

```bash
npm install @buchida/email @buchida/cjk-components
```

## 快速开始

```tsx
import { Html, Head, Body, Container, Heading, Text, Button } from '@buchida/email';
import { CJKText, CJKHeading, CJKFont } from '@buchida/cjk-components';

export function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html lang="zh">
      <Head>
        <CJKFont lang="zh" />
      </Head>
      <Body>
        <Container>
          <CJKHeading lang="zh" level={1}>
            欢迎，{name}！
          </CJKHeading>
          <CJKText lang="zh">
            感谢您注册buchida。
          </CJKText>
          <Button href="https://app.buchida.com">
            前往控制台
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
```

### 渲染为HTML

```ts
import { render } from '@buchida/email-render';
import { WelcomeEmail } from './emails/welcome';

const html = await render(WelcomeEmail({ name: '张伟' }));
```

## 包

| 包名 | 说明 |
|------|------|
| `@buchida/email` | 核心邮件组件（Html, Head, Body, Container, Text, Button） |
| `@buchida/cjk-components` | CJK专用组件（CJKText, CJKHeading, CJKFont） |
| `@buchida/email-preview` | 支持热重载的本地预览服务器 |
| `@buchida/email-render` | 服务端HTML字符串渲染 |

## 支持的语言

| 语言 | 字体栈 | `lang`值 |
|------|--------|----------|
| 韩文 | Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic | `ko` |
| 日文 | Noto Sans JP, Hiragino Sans, Yu Gothic, Meiryo | `ja` |
| 中文（简体） | Noto Sans SC, PingFang SC, Microsoft YaHei | `zh` |
| 中文（繁体） | Noto Sans TC, PingFang TC, Microsoft JhengHei | `zh-TW` |

## 文档

- [快速开始](https://buchida.com/zh/docs/quickstart)
- [CJK模板指南](https://buchida.com/zh/docs/templates)
- [GitHub](https://github.com/Vyblor/buchida-email)

## 许可证

MIT
