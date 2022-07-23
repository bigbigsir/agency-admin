const dev = process.env.NODE_ENV === 'development'

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  settings: {
    react: {
      version: '18.2.0'
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint'
  ],
  rules: {
    // 2个空格缩进
    indent: ['error', 2, {
      SwitchCase: 1
    }],
    // 未使用的变量
    'no-unused-vars': dev ? 'warn' : 'warn'
  }
}
