module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    'prettier/prettier': 2,
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
