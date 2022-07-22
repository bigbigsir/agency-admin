import React, { useState } from 'react'
import {
  ReloadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import { Layout, Tooltip } from 'antd'
import classNames from 'classnames/bind'
import SiteLogo from '@/components/Layout/SiteLogo'
import LangDropdown from '@/components/LangDropdown'
import UserDropdown from './UserDropdown'
import ContactUs from './ContactUs'
import { LayoutConfig, Payload, SiderWidth } from '@/components/Layout/index'
import scss from '../index.module.scss'
import { useIntl } from 'react-intl'

interface HeaderProps extends LayoutConfig {
  sideWidth: SiderWidth
  setContentKey: (key: string) => void
  assignLayoutConfig: (payload: Payload) => void
}

const cx = classNames.bind(scss)

const Index: React.FC<HeaderProps> = (props) => {
  const {
    collapsed,
    headerTheme,
    fixedHeader,
    menuLocation,
    setContentKey,
    assignLayoutConfig
  } = props
  const intl = useIntl()
  const headerInnerClassName = cx('header__inner', {
    mix: menuLocation === 'mix',
    fixed: fixedHeader || menuLocation === 'mix'
  })

  return (
    <Layout.Header id="pageHeader" className={cx('header', headerTheme)}>
      <div className={headerInnerClassName}>
        {(fixedHeader || menuLocation !== 'left') && <SiteLogo {...props} theme={headerTheme}/>}
        {
          menuLocation !== 'top' &&
          <span className={cx('header__action')}
            onClick={() => assignLayoutConfig({ collapsed: !collapsed })}>
            {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
          </span>
        }
        <div className={cx('header__center')}>
        </div>
        <div className={cx('header__right')}>
          <Tooltip placement="bottom" title={intl.formatMessage({ id: 'layout.header.refresh' })}>
            <div onClick={() => setContentKey(String(Date.now()))} className={cx('header__action')}>
              <ReloadOutlined/>
            </div>
          </Tooltip>
          <LangDropdown className={cx('header__action')}/>
          <ContactUs className={cx('header__action')}/>
          <UserDropdown className={cx('header__action')}/>
        </div>
      </div>
    </Layout.Header>
  )
}

export default Index
