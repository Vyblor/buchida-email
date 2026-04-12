<div align="center">
  <img src="assets/logo-black.svg" alt="buchida" width="280" />
  <p><strong>buchida 邮件模板 — CJK 原生 React Email 组件</strong></p>

  [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [**中文**](README.zh.md)

  [![npm version](https://img.shields.io/npm/v/@buchida/email)](https://www.npmjs.com/package/@buchida/email) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

---

@buchida/email 是为 AI 代理打造的邮件 API buchida 的 React Email 组件库，原生支持韩语、日语和中文。buchida 提供 CLI、MCP 服务器和 5 种语言的 SDK (Node、Python、Go、Ruby、Java),所有这些都共享相同的 REST API 表面。

## 安装

```bash
npm install @buchida/email
```

## 发送您的第一封邮件

```tsx
import { renderBuchidaEmail, WelcomeTemplate } from '@buchida/email';

const html = renderBuchidaEmail(<WelcomeTemplate name="你好" locale="zh" />);

// 传递给 buchida.emails.send 或任何 SMTP 客户端
```

## 文档

完整文档: **[buchida.com/docs](https://buchida.com/docs)**

- API 参考: https://buchida.com/docs/api-reference
- 快速入门指南: https://buchida.com/docs/quickstart
- CJK 邮件模板: https://buchida.com/docs/templates
- MCP 服务器设置: https://buchida.com/docs/mcp
- CLI 参考: https://buchida.com/docs/cli

## 链接

- **网站:** [buchida.com](https://buchida.com)
- **文档:** [buchida.com/docs](https://buchida.com/docs)
- **定价:** [buchida.com/pricing](https://buchida.com/pricing)
- **GitHub:** https://github.com/Vyblor/buchida-email

## 许可证

MIT
