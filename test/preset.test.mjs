import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createLinter } from "textlint";
import { TextlintKernelDescriptor } from "@textlint/kernel";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const preset = require("../lib/textlint-rule-preset-comnico.js");
const markdownPlugin = require("@textlint/textlint-plugin-markdown");

function createTestLinter() {
  const rules = Object.entries(preset.rules).map(([ruleId, rule]) => ({
    ruleId,
    rule,
    options: preset.rulesConfig[ruleId] ?? true,
  }));

  const descriptor = new TextlintKernelDescriptor({
    rules,
    plugins: [
      {
        pluginId: "markdown",
        plugin: markdownPlugin.default || markdownPlugin,
      },
    ],
    filterRules: [],
  });

  return createLinter({ descriptor });
}

describe("textlint-rule-preset-comnico", () => {
  it("should load all rules", () => {
    assert.equal(Object.keys(preset.rules).length, 29);
  });

  it("should have matching rulesConfig keys", () => {
    for (const key of Object.keys(preset.rulesConfig)) {
      assert.ok(key in preset.rules, `rulesConfig key "${key}" not found in rules`);
    }
  });

  it("should pass on valid markdown", async () => {
    const linter = createTestLinter();
    const filePath = resolve(__dirname, "fixtures/valid.md");
    const results = await linter.lintFiles([filePath]);
    const errors = results.flatMap((r) => r.messages);
    assert.equal(errors.length, 0, `Unexpected errors: ${JSON.stringify(errors)}`);
  });
});
