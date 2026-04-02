<div align="center">
  <img src="assets/logo-black.svg" alt="buchida" width="280" />
  <p><strong>CJKファーストのメールコンポーネントとテンプレート</strong></p>

  [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [中文](README.zh.md)

  [![npm version](https://img.shields.io/npm/v/@buchida/email)](https://www.npmjs.com/package/@buchida/email) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

---

CJK（韓国語、日本語、中国語）をネイティブサポートするReactメールコンポーネントです。すべてのCJKメールクライアントで完璧にレンダリングされる美しいメールを作成できます。

## インストール

```bash
npm install @buchida/email @buchida/cjk-components
```

## クイックスタート

```tsx
import { Html, Head, Body, Container, Heading, Text, Button } from '@buchida/email';
import { CJKText, CJKHeading, CJKFont } from '@buchida/cjk-components';

export function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html lang="ja">
      <Head>
        <CJKFont lang="ja" />
      </Head>
      <Body>
        <Container>
          <CJKHeading lang="ja" level={1}>
            ようこそ、{name}さん！
          </CJKHeading>
          <CJKText lang="ja">
            buchidaにご登録いただきありがとうございます。
          </CJKText>
          <Button href="https://app.buchida.com">
            ダッシュボードへ
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
```

### HTMLにレンダリング

```ts
import { render } from '@buchida/email-render';
import { WelcomeEmail } from './emails/welcome';

const html = await render(WelcomeEmail({ name: '田中太郎' }));
```

## パッケージ

| パッケージ | 説明 |
|------------|------|
| `@buchida/email` | コアメールコンポーネント（Html, Head, Body, Container, Text, Button） |
| `@buchida/cjk-components` | CJK専用コンポーネント（CJKText, CJKHeading, CJKFont） |
| `@buchida/email-preview` | ホットリロード対応ローカルプレビューサーバー |
| `@buchida/email-render` | サーバーサイドHTML文字列レンダリング |

## 対応言語

| 言語 | フォントスタック | `lang`値 |
|------|-----------------|----------|
| 韓国語 | Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic | `ko` |
| 日本語 | Noto Sans JP, Hiragino Sans, Yu Gothic, Meiryo | `ja` |
| 中国語（簡体字） | Noto Sans SC, PingFang SC, Microsoft YaHei | `zh` |
| 中国語（繁体字） | Noto Sans TC, PingFang TC, Microsoft JhengHei | `zh-TW` |

## ドキュメント

- [クイックスタート](https://buchida.com/ja/docs/quickstart)
- [CJKテンプレートガイド](https://buchida.com/ja/docs/templates)
- [GitHub](https://github.com/Vyblor/buchida-email)

## ライセンス

MIT
