<div align="center">
  <img src="assets/logo-black.svg" alt="buchida" width="280" />
  <p><strong>buchida メールテンプレート — CJK ネイティブ React Email コンポーネント</strong></p>

  [English](README.md) | [한국어](README.ko.md) | [**日本語**](README.ja.md) | [中文](README.zh.md)

  [![npm version](https://img.shields.io/npm/v/@buchida/email)](https://www.npmjs.com/package/@buchida/email) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

---

@buchida/email は buchida — AI エージェントのためのメール API — の React Email コンポーネントライブラリです。韓国語、日本語、中国語をネイティブにサポートしています。buchida は CLI、MCP サーバー、そして 5 言語の SDK (Node、Python、Go、Ruby、Java) を提供しており、すべて同じ REST API 表面を共有しています。

## インストール

```bash
npm install @buchida/email
```

## 最初のメールを送信

```tsx
import { renderBuchidaEmail, WelcomeTemplate } from '@buchida/email';

const html = renderBuchidaEmail(<WelcomeTemplate name="こんにちは" locale="ja" />);

// buchida.emails.send または任意の SMTP クライアントに渡す
```

## ドキュメント

完全なドキュメント: **[buchida.com/docs](https://buchida.com/docs)**

- API リファレンス: https://buchida.com/docs/api-reference
- クイックスタートガイド: https://buchida.com/docs/quickstart
- CJK メールテンプレート: https://buchida.com/docs/templates
- MCP サーバーセットアップ: https://buchida.com/docs/mcp
- CLI リファレンス: https://buchida.com/docs/cli

## リンク

- **ウェブサイト:** [buchida.com](https://buchida.com)
- **ドキュメント:** [buchida.com/docs](https://buchida.com/docs)
- **料金:** [buchida.com/pricing](https://buchida.com/pricing)
- **GitHub:** https://github.com/Vyblor/buchida-email

## ライセンス

MIT
