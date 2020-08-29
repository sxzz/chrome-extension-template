module.exports = {
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],

  root: true,
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    webextensions: true,
  },
  globals: {
    _: true,
  },

  rules: {
    "no-unused-vars": "off",
    "no-empty": "warn",
    "no-debugger": "warn",
  },
};
