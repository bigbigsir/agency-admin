import React from 'react'
import { ReloadOutlined, NotificationOutlined } from '@ant-design/icons'
import { Layout, Tooltip, Badge } from 'antd'
import { useIntl } from 'react-intl'
import LangDropdown from '@/components/LangDropdown'
import UserDropdown from './UserDropdown'
import scss from '../index.module.scss'

interface HeaderProps {
  setContentKey: (key: string) => void
}

const Index: React.FC<HeaderProps> = (props) => {
  const { setContentKey } = props
  const intl = useIntl()

  return (
    <Layout.Header id="pageHeader" className={scss.header}>
      <div className={scss.header__center}>
        盈樂貴賓會熱線1: +63 9999999999 盈樂貴賓會熱線2: +63 9888888888
      </div>
      <div className={scss.header__right}>
        <Tooltip placement="bottom" title={intl.formatMessage({ id: 'layout.header.refresh' })}>
          <div onClick={() => setContentKey(String(Date.now()))} className={scss.header__action}>
            <ReloadOutlined/>
          </div>
        </Tooltip>
        <div className={scss.header__action}>
          <Badge size="small" count={5}>
            <NotificationOutlined/>
          </Badge>
        </div>
        <LangDropdown className={scss.header__action}/>
        <UserDropdown className={scss.header__action}/>
      </div>
    </Layout.Header>
  )
}

export default Index
