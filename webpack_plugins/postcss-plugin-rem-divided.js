function remDivided (options) {
  const { num = 100 } = options
  // 此方法中修改，会循环调用
  // function Declaration (decl) {
  //   if (/\d+rem/g.test(decl.value)) {
  //     decl.value = decl.value.replace(/(\d+)(rem)/g, (match, p1, p2) => {
  //       return p1 / num + p2
  //     })
  //   }
  // }

  function Rule (rule) {
    rule.walkDecls((decl) => {
      if (/\d+rem/g.test(decl.value)) {
        decl.value = decl.value.replace(/(\d+)(rem)/g, (match, p1, p2) => {
          return p1 / num + p2
        })
      }
    })
  }

  return {
    postcssPlugin: 'postcss-rem-divided',
    Rule
  }
}

module.exports = remDivided

module.exports.postcss = true
