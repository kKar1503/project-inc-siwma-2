module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: true,
      typescript: true,
    },
  },
  rules: {
    indent: 'off',
    quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    'object-curly-newline': 'off',
    'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
      },
    ],
    'no-plusplus': 'off',
    'import/extensions': [
      'error',
      {
        ts: 'never',
      },
    ],
    'no-shadow': 'off',
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
    'max-classes-per-file': 'off',
    '@typescript-eslint/no-shadow': 'warn',
  },
  overrides: [
    {
      env: {
        jest: true,
      },
      files: ['**/*.test.js'],
      plugins: ['jest'],
    },
    {
      env: {
        'cypress/globals': true,
      },
      files: ['**/*.cy.js'],
      plugins: ['cypress'],
    },
  ],
  ignorePatterns: ['**/*.json', 'node_modules', '.next', 'public', '**/*.d.ts'],
};
