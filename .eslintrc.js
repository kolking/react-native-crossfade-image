module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
  ignorePatterns: ['/coverage/*'],
};
