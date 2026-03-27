# textlint-rule-preset-comnico

文章内容が、「コムニコプロダクト表記ガイドライン」に沿っているかチェックするための textlint ルールプリセットです。

## インストール

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-preset-comnico

## 使いかた

Via `.textlintrc`(Recommended)

```json
{
  "rules": {
    "preset-comnico": true
  }
}
```

Via CLI

```
textlint --rule preset-comnico README.md
```

## 動作要件

- Node.js >= 20.0.0
- textlint >= 15.0.0

### Tests

    npm test

## リリース手順

1. `main` ブランチで変更がマージ済みであることを確認
2. バージョンを更新（破壊的変更: `major`、機能追加: `minor`、バグ修正: `patch`）

```bash
npm version major  # or minor, patch
```

3. リモートにプッシュ（タグ含む）

```bash
git push && git push --tags
```

4. npm に公開

```bash
npm publish
```

5. [GitHub Releases](https://github.com/comnico/textlint-rule-preset-comnico/releases) でタグから Release を作成し、変更内容を記載

## License

MIT © 2022 comnico inc.
