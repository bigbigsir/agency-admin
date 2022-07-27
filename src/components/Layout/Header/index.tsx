import React from 'react'
import { ReloadOutlined } from '@ant-design/icons'
import { Layout, Tooltip } from 'antd'
import { useIntl } from 'react-intl'
import LocaleDropdown from '@/components/Layout/Header/LocaleDropdown'
import UserDropdown from './UserDropdown'
import CurrencyDropdown from './CurrencyDropdown'
import MessageDropdown from './MessageDropdown'
import scss from '../index.module.scss'

interface HeaderProps {
  setContentKey: () => void
}

const Header: React.FC<HeaderProps> = (props) => {
  const { setContentKey } = props
  const intl = useIntl()

  return (
    <Layout.Header id="pageHeader" className={scss.header}>
      <div className={scss.header__center}>
        盈樂貴賓會熱線1: +63 9999999999 盈樂貴賓會熱線2: +63 9888888888
      </div>
      <div className={scss.header__right}>
        <Tooltip placement="bottom" title="刷新页面">
          <div onClick={setContentKey} className={scss.header__action}>
            <ReloadOutlined/>
          </div>
        </Tooltip>
        <LocaleDropdown className={scss.header__action}/>
        <MessageDropdown className={scss.header__action}/>
        <CurrencyDropdown className={scss.header__action}/>
        <UserDropdown className={scss.header__action}/>
      </div>
    </Layout.Header>
  )
}

export default Header
