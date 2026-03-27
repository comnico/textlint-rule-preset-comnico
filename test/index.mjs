import { createLinter } from "textlint";
import { TextlintKernelDescriptor } from "@textlint/kernel";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const preset = require("../lib/textlint-rule-preset-comnico.js");
const markdownPlugin = require("@textlint/textlint-plugin-markdown");

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

const linter = createLinter({ descriptor });
const filePath = resolve(__dirname, "fixtures/valid.md");
const results = await linter.lintFiles([filePath]);
const errors = results.flatMap((r) => r.messages);

if (errors.length > 0) {
  console.error("Lint errors found:");
  for (const e of errors) {
    console.error(`  ${e.loc.start.line}:${e.loc.start.column} ${e.message} (${e.ruleId})`);
  }
  process.exit(1);
}

console.log(`OK: ${Object.keys(preset.rules).length} rules loaded, 0 errors`);
