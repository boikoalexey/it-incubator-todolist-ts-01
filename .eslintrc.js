module.exports = {
    "env": {
        "browser": true,
        "es2021": true
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
        "semi": ["error", "never"],
        "quotes": ["error", "single"],
        "space-in-parens": ["error", "never"],
        "object-curly-spacing": ["error", "always"],
        "space-infix-ops": "error",
        "indent": ["error", 4, { "SwitchCase": 1 }],
    }
};
