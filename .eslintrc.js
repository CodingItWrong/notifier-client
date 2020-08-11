module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  rules: {
    'import/newline-after-import': 'error',
    'import/no-anonymous-default-export': 'error',
    'import/no-mutable-exports': 'error',
    'import/order': ['error', { alphabetize: { order: 'asc' } }],
    'no-duplicate-imports': 'error',
    'react-native/no-inline-styles': 'off',
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
  },
  globals: {
    WebSocket: true,
  },
};
