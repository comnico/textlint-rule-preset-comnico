"use strict";
const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const { TextlintKernelDescriptor } = require("@textlint/kernel");
const { createLinter } = require("textlint");
const { builtInPlugins } = require("textlint/lib/src/loader/TextlintrcLoader.js");
const preset = require("../lib/textlint-rule-preset-comnico.js");

function createTestLinter() {
  const rules = Object.entries(preset.rules).map(([ruleId, rule]) => ({
    ruleId,
    rule,
    options: preset.rulesConfig[ruleId] ?? true,
  }));

  const descriptor = new TextlintKernelDescriptor({
    rules,
    plugins: builtInPlugins,
    filterRules: [],
  });

  return createLinter({ descriptor });
}

async function lintErrors(text) {
  const linter = createTestLinter();
  const result = await linter.lintText(text, "test.md");
  return result.messages;
}

describe("textlint-rule-preset-comnico", () => {
  it("全ルールが読み込まれること", () => {
    assert.equal(Object.keys(preset.rules).length, 29);
  });

  it("rulesConfigのキーがrulesに存在すること", () => {
    for (const key of Object.keys(preset.rulesConfig)) {
      assert.ok(key in preset.rules, `rulesConfigのキー "${key}" がrulesに存在しません`);
    }
  });

  it("正しい文章でエラーが発生しないこと", async () => {
    const text = "これは例文です。";

    const errors = await lintErrors(text);

    assert.equal(errors.length, 0, `予期しないエラー: ${JSON.stringify(errors)}`);
  });

  it("半角カナを検出できること", async () => {
    const text = "ｶﾀｶﾅは半角で書いてはいけません。";

    const errors = await lintErrors(text);

    assert.ok(errors.length > 0, "エラーが検出されなかった");
    assert.ok(
      errors.some((e) => e.ruleId.includes("no-hankaku-kana")),
      `no-hankaku-kana が含まれていない (実際: ${errors.map((e) => e.ruleId).join(", ")})`,
    );
  });

  it("ら抜き言葉を検出できること", async () => {
    const text = "今日は関係者だけで食べれるお店に行きます。";

    const errors = await lintErrors(text);

    assert.ok(errors.length > 0, "エラーが検出されなかった");
    assert.ok(
      errors.some((e) => e.ruleId.includes("no-dropping-the-ra")),
      `no-dropping-the-ra が含まれていない (実際: ${errors.map((e) => e.ruleId).join(", ")})`,
    );
  });

  it("二重否定を検出できること", async () => {
    const text = "その結果についてまったく問題がないわけではない。";

    const errors = await lintErrors(text);

    assert.ok(errors.length > 0, "エラーが検出されなかった");
    assert.ok(
      errors.some((e) => e.ruleId.includes("no-double-negative-ja")),
      `no-double-negative-ja が含まれていない (実際: ${errors.map((e) => e.ruleId).join(", ")})`,
    );
  });

  it("助詞の重複を検出できること", async () => {
    const text = "私は東京は好きです。";

    const errors = await lintErrors(text);

    assert.ok(errors.length > 0, "エラーが検出されなかった");
    assert.ok(
      errors.some((e) => e.ruleId.includes("no-doubled-joshi")),
      `no-doubled-joshi が含まれていない (実際: ${errors.map((e) => e.ruleId).join(", ")})`,
    );
  });

  it("ですます調とである調の混在を検出できること", async () => {
    const text =
      "今日は天気がよいです。だから散歩に出かけた。明日も晴れるでしょう。しかし気温は下がるのである。";

    const errors = await lintErrors(text);

    assert.ok(errors.length > 0, "エラーが検出されなかった");
    assert.ok(
      errors.some((e) => e.ruleId.includes("no-mix-dearu-desumasu")),
      `no-mix-dearu-desumasu が含まれていない (実際: ${errors.map((e) => e.ruleId).join(", ")})`,
    );
  });
});
