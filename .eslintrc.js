module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    webextensions: true,
    node: true,
  },
  globals: {
    _: true,
  },
  parser: '@typescript-eslint/parser',
  rules: {
    'no-unused-vars': 'off',
    'no-empty': 'warn',
    'no-debugger': 'warn',
  },
};
