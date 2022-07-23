import React, { useState } from 'react'
import { Layout } from 'antd'
import Sider from './Sider'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import scss from './index.module.scss'

const BasicLayout: React.FC = () => {
  const [contentKey, setContentKey] = useState<string | undefined>()

  return (
    <Layout className={scss.layout}>
      <Sider/>
      <Layout>
        <Header setContentKey={setContentKey}/>
        <Layout.Content key={contentKey} className={scss.layout__content}>
          <Outlet/>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
