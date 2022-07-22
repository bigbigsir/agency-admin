module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
    'stylelint-config-css-modules'
  ],
  overrides: [
    {
      files: ['**/*.{html,vue}'],
      customSyntax: 'postcss-html'
    },
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less'
    }
  ],
  rules: {
    // sass函数命名规则 默认 ^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$
    'scss/at-function-pattern': [
      '^(-?-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected custom property name to be kebab-case'
      }
    ],
    // 为适用的颜色函数指定现代或传统符号 modern（默认） legacy
    'color-function-notation': 'legacy',
    // 禁止空评论 true（默认） null
    "scss/comment-no-empty": null
  }
}
