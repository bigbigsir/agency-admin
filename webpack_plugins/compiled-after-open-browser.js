'use strict'
const openBrowser = require('react-dev-utils/openBrowser')

// 项目编译完成后再打开浏览器
class CompiledAfterOpenBrowser {
  constructor (options = {}) {
    this.options = {
      port: 3000,
      ...options
    }
  }

  apply (compiler) {
    let opened = false
    const done = (stats, done) => {
      if (!stats.hasErrors()) {
        open()
      }
      done()
    }

    const open = () => {
      if (!opened) {
        opened = true
        const host = 'http://localhost:'
        openBrowser(host + this.options.port)
      }
    }

    if (compiler.hooks) {
      compiler.hooks.done.tapAsync('CompiledOpenBrowser', done)
    } else {
      compiler.plugin('done', done)
    }
  }
}

module.exports = CompiledAfterOpenBrowser
