module.exports = {
    "env": {
        "browser": true,
    },
    "extends": "plugin:react/recommended",
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "semi": ["warn", "never"],
        "quotes": ["warn", "single"],
        "space-in-parens": ["warn", "never"],
        "object-curly-spacing": ["warn", "always"],
        "space-infix-ops": "warn",
        "indent": ["warn", 4, { "SwitchCase": 1 }],
        "vars-on-top": "warn",
        "array-bracket-spacing": ["warn", "always"],
        "block-spacing": ["warn", "always"],
        "brace-style": ["warn", "1tbs", { "allowSingleLine": false }],
        "camelcase": "warn",
        "comma-spacing": ["warn", { "before": false, "after": true }],
        "comma-dangle": ["warn", "never"],
        "computed-property-spacing": ["warn", "never"],
        "eol-last": "error",
        "func-style": ["warn", "expression", { "allowArrowFunctions": true }],
        "jsx-quotes": ["warn", "prefer-double"],
        "no-mixed-spaces-and-tabs": "warn",
        "no-multiple-empty-lines": "warn",
        "no-trailing-spaces": "warn",
    }
};
