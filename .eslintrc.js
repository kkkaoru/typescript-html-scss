/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  extends: ['eslint-config-airbnb-base', 'plugin:@typescript-eslint/recommended', 'plugin:jest/all', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'max-lines': 'error',
    'max-depth': 'error',
    'max-lines-per-function': 'error',
    'import/extensions': [
      'error',
      {
        ts: 'off',
      },
    ],
    'jest/prefer-expect-assertions': ['error', { onlyFunctionsWithAsyncKeyword: true }],
  },
};
