module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "array-bracket-spacing": ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "arrow-spacing": ["error"],
    "block-spacing": ["error", "always"],
    "comma-dangle": ["error", {"arrays": "never", "objects": "never"}],
    "comma-spacing": ["error"],
    "computed-property-spacing": ["error", "never"],
    "eol-last": ["error"],
    "func-call-spacing": ["error", "never"],
    "indent": ["error", 2, {"SwitchCase": 1}],
    "key-spacing": ["error"],
    "keyword-spacing": ["error", {"before": true, "after": true}],
    "linebreak-style": ["error", "unix"],
    "no-alert": ["error"],
    "no-console": ["error", {"allow": ["debug", "info", "warn", "error"]}],
    "no-debugger": ["error"],
    "no-multiple-empty-lines": ["error", {"max": 1}],
    "no-multi-spaces": ["error", {"ignoreEOLComments": true}],
    "no-trailing-spaces": ["error"],
    "object-curly-spacing": ["error", "never"],
    "rest-spread-spacing": ["error", "never"],
    "semi": ["error", "never"],
    "semi-spacing": ["error", {"before": false, "after": true}],
    "space-before-blocks": ["error"],
    "space-before-function-paren": ["error", {"anonymous": "never", "named": "never", "asyncArrow": "always"}],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": ["error", {"int32Hint": true}],
    "space-unary-ops": ["error", {"words": true, "nonwords": false}],
    "switch-colon-spacing": ["error", {"after": true, "before": false}],
    "template-curly-spacing": ["error", "never"],
    "template-tag-spacing": ["error", "never"],
    "vue/attribute-hyphenation": ["error", "never"],
    "vue/attributes-order": ["off"],
    "vue/max-attributes-per-line": ["off"],
    "vue/order-in-components": ["error", {
      "order": [
        "el",
        "name",
        "parent",
        ["components", "directives", "filters"],
        ["props", "propsData"],
        "data",
        "watch",
        "methods",
        "template"
      ]
    }],
    "vue/require-default-prop": ["off"]
  }
}
