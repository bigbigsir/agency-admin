'use strict'

const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'https://feida.app/api/v1',
  appId: 'admin',
  version: '1.0.0',
  prerenderRoutes: ['/'] // 需要预渲染的路由
}

module.exports = config
