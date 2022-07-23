import React from 'react'
import {
  ReloadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import { Layout, Tooltip } from 'antd'
import classNames from 'classnames/bind'
import LangDropdown from '@/components/LangDropdown'
import UserDropdown from './UserDropdown'
import { LayoutConfig, Payload, SiderWidth } from '@/components/Layout'
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
    setContentKey,
    assignLayoutConfig
  } = props
  const intl = useIntl()
  const headerInnerClassName = cx('header__inner')

  return (
    <Layout.Header id="pageHeader" className={cx('header', headerTheme)}>
      <div className={headerInnerClassName}>
        <span className={cx('header__action')}
          onClick={() => assignLayoutConfig({ collapsed: !collapsed })}>
          {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
        </span>
        <div className={cx('header__center')}>
          54645
        </div>
        <div className={cx('header__right')}>
          <Tooltip placement="bottom" title={intl.formatMessage({ id: 'layout.header.refresh' })}>
            <div onClick={() => setContentKey(String(Date.now()))} className={cx('header__action')}>
              <ReloadOutlined/>
            </div>
          </Tooltip>
          <LangDropdown className={cx('header__action')}/>
          <UserDropdown className={cx('header__action')}/>
        </div>
      </div>
    </Layout.Header>
  )
}

export default Index
