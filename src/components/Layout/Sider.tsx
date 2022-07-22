import React from 'react'
import { Layout } from 'antd'
import classNames from 'classnames/bind'
import Menus from '@/components/Layout/Menus'
import SiteLogo from '@/components/Layout/SiteLogo'
import { LayoutConfig, SiderWidth } from '@/components/Layout/index'
import scss from './index.module.scss'

interface SiderProps extends LayoutConfig {
  sideWidth: SiderWidth
}

const cx = classNames.bind(scss)

const Sider: React.FC<SiderProps> = (props) => {
  const { sideWidth, siderTheme, collapsed } = props

  return (
    <Layout.Sider
      width={sideWidth.width}
      theme={siderTheme}
      trigger={null}
      collapsed={collapsed}
      className={cx('sider')}
      collapsible
      collapsedWidth={sideWidth.collapsedWidth}>
      <SiteLogo {...props} theme={siderTheme}/>
      <Menus mode={'inline'} theme={siderTheme} collapsed={collapsed}/>
    </Layout.Sider>
  )
}
export default Sider
