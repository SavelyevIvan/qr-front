module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ["airbnb", "prettier"],
  overrides: [
    {
      files: "*.jsx",
    },
  ],
  plugins: ["babel", "import", "react"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    "import/extensions": [".js", ".jsx"],
  },
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/button-has-type": 0,
    "react/prop-types": 0,
    quotes: ["warn", "double"],
    "react/jsx-uses-vars": 1,
    "no-unused-vars": ["warn", { vars: "all" }],
    "no-param-reassign": 0,
    "react/jsx-props-no-spreading": "off",
    "no-underscore-dangle": 0,
    "import/no-cycle": 0,
    "class-methods-use-this": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "no-unused-expressions": 0,
    "import/prefer-default-export": 0,
    "no-nested-ternary": 0,
  },
};
