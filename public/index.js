'use strict';

(function (window, document, designWidth) {
  let _remDividedNumber = 100

  // set 1rem = 100px = 设备宽度375 / 设计宽度375 * 100 (这里除以的倍数需要和.env文件中除以的倍数一致)
  function setRemUnit () {
    const docEl = document.documentElement
    const maxWidth = 640
    const isDesktop = getPlatform() === 'pc'

    const viewWidth = (docEl.clientWidth > maxWidth && isDesktop) ? maxWidth : docEl.clientWidth
    const rem = Math.ceil(viewWidth / designWidth * _remDividedNumber)
    // 保持根元素的px单位为双数
    docEl.style.setProperty('font-size', (rem - rem % 2) + 'px')
    docEl.style.setProperty('--max-width', viewWidth + 'px')
    docEl.className = docEl.className.replace(/\s*hairlines/g, '')

    // detect 0.5px supports
    if (window.devicePixelRatio >= 2 && !isDesktop) {
      docEl.className += 'hairlines'
    }
  }

  // 获取设备平台
  function getPlatform () {
    const u = navigator.userAgent
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    const isAndroid = !!~u.indexOf('Android') || !!~u.indexOf('Adr')
    const isMobile = !!~u.indexOf('Mobile')
    if (isIOS) {
      return 'ios'
    } else if (isAndroid) {
      return 'android'
    } else if (isMobile) {
      return 'mobile'
    } else {
      return 'pc'
    }
  }

  // 需要获取打包时传递出来的参数进行初始化
  function init (params) {
    const { remDividedNumber } = params
    remDividedNumber && (_remDividedNumber = remDividedNumber)
    setRemUnit()
    window.init = null
  }

  window.init = init
  window.isPrerender = !!window.__PRERENDER_INJECTED // 判断是否是预渲染环境
  window.addEventListener('resize', setRemUnit)
})(window, document, 375)
