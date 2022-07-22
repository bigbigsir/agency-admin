import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import classNames from 'classnames/bind'
import Sider from './Sider'
import Header from './Header'
import { isObject } from '@/utils'
import { Outlet } from 'react-router-dom'
import scss from './index.module.scss'

const cx = classNames.bind(scss)

export type Theme = 'dark' | 'light'

export interface Payload {
  collapsed?: boolean
  siderTheme?: Theme
  headerTheme?: Theme
}

export interface SiderWidth {
  width: number,
  collapsedWidth: number
}

export interface LayoutConfig {
  collapsed: boolean
  siderTheme: Theme
  headerTheme: Theme
}

const BasicLayout: React.FC = () => {
  const [contentKey, setContentKey] = useState<string | undefined>()
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    collapsed: false,
    siderTheme: 'dark',
    headerTheme: 'light',
    ...getLocalLayoutConfig()
  })

  const sideWidth: SiderWidth = {
    width: 210,
    collapsedWidth: 48
  }
  const { collapsed } = layoutConfig

  useEffect(windowResizeHandle, [collapsed])

  useEffect(saveLayoutConfig, [layoutConfig])

  function getLocalLayoutConfig () {
    let config = localStorage.getItem('admin_layoutConfig')
    config = config && JSON.parse(config)
    return isObject(config) ? config : {}
  }

  function windowResizeHandle () {
    function handleResize () {
      if (!collapsed) {
        assignLayoutConfig({ collapsed: document.body.clientWidth < 1000 })
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }

  function assignLayoutConfig (payload: Payload): void {
    setLayoutConfig(state => ({
      ...state,
      ...payload
    }))
  }

  function saveLayoutConfig () {
    localStorage.setItem('admin_layoutConfig', JSON.stringify(layoutConfig))
  }

  return (
    <Layout className={cx('layout')}>
      <Sider {...layoutConfig} sideWidth={sideWidth}/>
      <div style={{ minWidth: collapsed ? sideWidth.collapsedWidth : sideWidth.width }}/>
      <Layout className={cx('layout__layout')}>
        <Header
          {...layoutConfig}
          sideWidth={sideWidth}
          setContentKey={setContentKey}
          assignLayoutConfig={assignLayoutConfig}/>
        <Layout.Content key={contentKey} className={cx('layout__content')}>
          <Outlet/>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
