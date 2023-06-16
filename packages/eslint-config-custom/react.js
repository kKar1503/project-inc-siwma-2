module.exports = {
  extends: ['./index.js', 'next'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    JSX: true,
  },
  rules: {
    'import/extensions': ['error', { tsx: 'never' }],
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/button-has-type': 'off',
    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
  },
};
