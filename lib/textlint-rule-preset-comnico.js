"use strict";
const { moduleInterop } = require("@textlint/module-interop");
module.exports = {
  rules: {
    allowlist: moduleInterop(require("textlint-filter-rule-allowlist")),
    comments: moduleInterop(require("textlint-filter-rule-comments")),
    "ja-hiragana-daimeishi": moduleInterop(require("textlint-rule-ja-hiragana-daimeishi")),
    "ja-hiragana-fukushi": moduleInterop(require("textlint-rule-ja-hiragana-fukushi")),
    "ja-hiragana-hojodoushi": moduleInterop(require("textlint-rule-ja-hiragana-hojodoushi")),
    "ja-keishikimeishi": moduleInterop(require("textlint-rule-ja-keishikimeishi")),
    "ja-no-abusage": moduleInterop(require("textlint-rule-ja-no-abusage")),
    "ja-no-mixed-period": moduleInterop(require("textlint-rule-ja-no-mixed-period")),
    "ja-no-redundant-expression": moduleInterop(
      require("textlint-rule-ja-no-redundant-expression"),
    ),
    "ja-no-weak-phrase": moduleInterop(require("textlint-rule-ja-no-weak-phrase")),
    "ja-unnatural-alphabet": moduleInterop(require("textlint-rule-ja-unnatural-alphabet")),
    "max-ten": moduleInterop(require("textlint-rule-max-ten")),
    "no-double-negative-ja": moduleInterop(require("textlint-rule-no-double-negative-ja")),
    "no-doubled-conjunction": moduleInterop(require("textlint-rule-no-doubled-conjunction")),
    "no-doubled-conjunctive-particle-ga": moduleInterop(
      require("textlint-rule-no-doubled-conjunctive-particle-ga"),
    ),
    "no-doubled-joshi": moduleInterop(require("textlint-rule-no-doubled-joshi")),
    "no-dropping-the-ra": moduleInterop(require("textlint-rule-no-dropping-the-ra")),
    "no-hankaku-kana": moduleInterop(require("textlint-rule-no-hankaku-kana")),
    "no-mix-dearu-desumasu": moduleInterop(require("textlint-rule-no-mix-dearu-desumasu")),
    "no-mixed-zenkaku-and-hankaku-alphabet": moduleInterop(
      require("textlint-rule-no-mixed-zenkaku-and-hankaku-alphabet"),
    ),
    "no-nfd": moduleInterop(require("textlint-rule-no-nfd")),
    "ja-no-space-around-parentheses": moduleInterop(
      require("textlint-rule-ja-no-space-around-parentheses"),
    ),
    "ja-no-space-between-full-width": moduleInterop(
      require("textlint-rule-ja-no-space-between-full-width"),
    ),
    "ja-space-between-half-and-full-width": moduleInterop(
      require("textlint-rule-ja-space-between-half-and-full-width"),
    ),
    "ja-space-after-exclamation": moduleInterop(
      require("textlint-rule-ja-space-after-exclamation"),
    ),
    "ja-space-after-question": moduleInterop(require("textlint-rule-ja-space-after-question")),
    "ja-space-around-code": moduleInterop(require("textlint-rule-ja-space-around-code")),
    prh: moduleInterop(require("textlint-rule-prh")),
    "sentence-length": moduleInterop(require("textlint-rule-sentence-length")),
  },
  rulesConfig: {
    prh: {
      rulePaths: [__dirname + "/prh.yml"],
    },
    "ja-no-mixed-period": true,
    "no-hankaku-kana": true,
    "no-doubled-conjunctive-particle-ga": true,
    "no-double-negative-ja": true,
    "no-doubled-joshi": true,
    "no-dropping-the-ra": true,
    "sentence-length": {
      max: 120,
    },
    "ja-no-abusage": true,
    "ja-no-redundant-expression": true,
    "no-mixed-zenkaku-and-hankaku-alphabet": true,
    "ja-keishikimeishi": true,
    "ja-hiragana-fukushi": true,
    "ja-hiragana-hojodoushi": true,
    "ja-hiragana-daimeishi": true,
    "ja-no-space-around-parentheses": true,
    "ja-no-space-between-full-width": true,
    "ja-space-between-half-and-full-width": true,
    "ja-space-after-exclamation": true,
    "ja-space-after-question": true,
    "ja-space-around-code": false,
    "ja-no-weak-phrase": true,
    "ja-unnatural-alphabet": true,
    "no-mix-dearu-desumasu": true,
  },
};
