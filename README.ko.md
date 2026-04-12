<div align="center">
  <img src="assets/logo-black.svg" alt="buchida" width="280" />
  <p><strong>buchida 이메일 템플릿 — CJK 네이티브 React Email 컴포넌트</strong></p>

  [English](README.md) | [**한국어**](README.ko.md) | [日本語](README.ja.md) | [中文](README.zh.md)

  [![npm version](https://img.shields.io/npm/v/@buchida/email)](https://www.npmjs.com/package/@buchida/email) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

---

@buchida/email는 buchida — AI 에이전트를 위한 이메일 API — 의 React Email 컴포넌트 라이브러리로, 한국어, 일본어, 중국어를 네이티브로 지원합니다. buchida는 CLI, MCP 서버, 그리고 5개 언어 SDK (Node, Python, Go, Ruby, Java)를 제공하며, 모두 동일한 REST API 표면을 공유합니다.

## 설치

```bash
npm install @buchida/email
```

## 첫 이메일 보내기

```tsx
import { renderBuchidaEmail, WelcomeTemplate } from '@buchida/email';

const html = renderBuchidaEmail(<WelcomeTemplate name="안녕하세요" locale="ko" />);

// buchida.emails.send 또는 모든 SMTP 클라이언트에 전달
```

## 문서

전체 문서: **[buchida.com/docs](https://buchida.com/docs)**

- API 레퍼런스: https://buchida.com/docs/api-reference
- 빠른 시작 가이드: https://buchida.com/docs/quickstart
- CJK 이메일 템플릿: https://buchida.com/docs/templates
- MCP 서버 설정: https://buchida.com/docs/mcp
- CLI 레퍼런스: https://buchida.com/docs/cli

## 링크

- **웹사이트:** [buchida.com](https://buchida.com)
- **문서:** [buchida.com/docs](https://buchida.com/docs)
- **요금제:** [buchida.com/pricing](https://buchida.com/pricing)
- **GitHub:** https://github.com/Vyblor/buchida-email

## 라이선스

MIT
