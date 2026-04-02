<div align="center">
  <img src="assets/logo-black.svg" alt="buchida" width="280" />
  <p><strong>CJK 우선 이메일 컴포넌트 및 템플릿</strong></p>

  [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [中文](README.zh.md)

  [![npm version](https://img.shields.io/npm/v/@buchida/email)](https://www.npmjs.com/package/@buchida/email) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

---

CJK(한국어, 일본어, 중국어)를 기본 지원하는 React 이메일 컴포넌트입니다. 모든 CJK 이메일 클라이언트에서 완벽하게 렌더링되는 아름다운 이메일을 만드세요.

## 설치

```bash
npm install @buchida/email @buchida/cjk-components
```

## 빠른 시작

```tsx
import { Html, Head, Body, Container, Heading, Text, Button } from '@buchida/email';
import { CJKText, CJKHeading, CJKFont } from '@buchida/cjk-components';

export function WelcomeEmail({ name }: { name: string }) {
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
          </CJKText>
          <Button href="https://app.buchida.com">
            대시보드로 이동
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
```

### HTML로 렌더링

```ts
import { render } from '@buchida/email-render';
import { WelcomeEmail } from './emails/welcome';

const html = await render(WelcomeEmail({ name: '김민준' }));
```

## 패키지

| 패키지 | 설명 |
|--------|------|
| `@buchida/email` | 핵심 이메일 컴포넌트 (Html, Head, Body, Container, Text, Button) |
| `@buchida/cjk-components` | CJK 전용 컴포넌트 (CJKText, CJKHeading, CJKFont) |
| `@buchida/email-preview` | 핫 리로드 지원 로컬 미리보기 서버 |
| `@buchida/email-render` | 서버 사이드 HTML 문자열 렌더링 |

## 지원 언어

| 언어 | 폰트 스택 | `lang` 값 |
|------|-----------|-----------|
| 한국어 | Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic | `ko` |
| 일본어 | Noto Sans JP, Hiragino Sans, Yu Gothic, Meiryo | `ja` |
| 중국어 (간체) | Noto Sans SC, PingFang SC, Microsoft YaHei | `zh` |
| 중국어 (번체) | Noto Sans TC, PingFang TC, Microsoft JhengHei | `zh-TW` |

## 문서

- [빠른 시작 가이드](https://buchida.com/ko/docs/quickstart)
- [CJK 템플릿 가이드](https://buchida.com/ko/docs/templates)
- [GitHub](https://github.com/Vyblor/buchida-email)

## 라이선스

MIT
