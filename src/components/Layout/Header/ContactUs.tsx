import React from 'react'
import { CustomerServiceOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import { useIntl } from 'react-intl'
import domain from '@/config/domain'
import Icon from '@/components/icon'

interface Props {
  className?: string;
}

const Index: React.FC<Props> = ({ className }) => {
  const intl = useIntl()
  const langMenu = (
    <Menu style={{ minWidth: 120 }}>
      <Menu.Item>
        <a rel="noreferrer" href={domain.service} target="_blank">
          <Icon iconId="icon-telegram"/>
          <span>{intl.formatMessage({ id: 'onlineService' })}</span>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noreferrer" href={domain.chats} target="_blank">
          <Icon iconId="icon-chats"/>
          <span>{intl.formatMessage({ id: 'channels' })}</span>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noreferrer" href={domain.email} target="_blank">
          <Icon iconId="MailOutlined"/>
          <span>{intl.formatMessage({ id: 'sendEmail' })}</span>
        </a>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={langMenu} placement="bottomRight">
      <div className={className}>
        <CustomerServiceOutlined/>
      </div>
    </Dropdown>
  )
}

export default Index
