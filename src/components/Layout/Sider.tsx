import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import Menus from '@/components/Layout/Menus'
import scss from './index.module.scss'

const Sider: React.FC = () => {
  const cache = localStorage.getItem('collapsed') === 'true'
  const [collapsed, setCollapsed] = useState<boolean>(cache)

  useEffect(() => localStorage.setItem('collapsed', String(collapsed)), [collapsed])

  return (
    <Layout.Sider
      width={210}
      theme='dark'
      collapsed={collapsed}
      className={scss.sider}
      collapsible
      onCollapse={setCollapsed}
      collapsedWidth={48}>
      <div className={scss.site}>
        <img className={scss.site__icon} src={require('@/assets/img/logo.png')} alt=""/>
      </div>
      <Menus/>
    </Layout.Sider>
  )
}

export default Sider
