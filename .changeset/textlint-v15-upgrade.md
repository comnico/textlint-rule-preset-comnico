---
"textlint-rule-preset-comnico": major
---

textlint v15 対応: 依存パッケージのアップデートと環境整備

### Breaking Changes

- `peerDependencies` を `textlint@^15.0.0` に変更（v12〜v14 は非サポート）
- Node.js 20.0.0 以上が必須
- `rules` のキー名を `rulesConfig` と一致するよう修正

#### キー名変更の詳細

`.textlintrc` で以下のルールを個別に設定している場合、キー名の変更が必要です。

| 旧キー名 | 新キー名 |
|---|---|
| `textlint-rule-ja-keishikimeishi` | `ja-keishikimeishi` |
| `textlint-rule-ja-no-abusage` | `ja-no-abusage` |
| `hiragana-daimeishi` | `ja-hiragana-daimeishi` |
| `hiragana-fukushi` | `ja-hiragana-fukushi` |
| `hiragana-hojodoushi` | `ja-hiragana-hojodoushi` |

### Changes

- 全依存パッケージを最新版に更新（メジャーアップデート11個含む）
- GitHub Actions CI を追加（Node.js 20/22）
- prettier v2 → v3
