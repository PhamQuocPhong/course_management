module.exports = {
  rules: {
    "no-mixed-spaces-and-tabs": 0,
    "no-console": "off",
    "no-empty": 0
  },
  extends: [
    "plugin:vue/base",
    // "plugin:prettier/recommended",
    // "eslint:recommended"
  ],
  env: {
    node: true,
    commonjs: true
  },

  parserOptions: {
    parser: 'babel-eslint'
  },
};
