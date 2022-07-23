import React from 'react'
import {
  LogoutOutlined,
  UnlockOutlined,
  PhoneOutlined
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { Avatar, Dropdown, Menu, MenuProps } from 'antd'
import { useIntl } from 'react-intl'
import { setToken } from '@/store/slice/token/actions'
import scss from '../index.module.scss'

interface Props {
  className?: string;
}

const UserDropdown: React.FC<Props> = ({ className }) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const username = '123'

  const menuItems = [
    {
      key: 'password',
      label: intl.formatMessage({ id: 'layout.userDropdown.password' }),
      icon: <UnlockOutlined/>
    },
    {
      key: 'phone',
      label: intl.formatMessage({ id: 'layout.userDropdown.password' }),
      icon: <PhoneOutlined/>
    },
    {
      key: 'logout',
      label: intl.formatMessage({ id: 'layout.userDropdown.logout' }),
      icon: <LogoutOutlined/>
    }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      dispatch(setToken(null))
    } else if (key === 'password') {
      console.log('password')
    }
  }

  return (
    <Dropdown overlay={<Menu onClick={onClick} items={menuItems}/>} placement="bottomRight">
      <div className={className}>
        <Avatar className={scss.header__avatar}>{username.substr(0, 1).toUpperCase()}</Avatar>
        <span className={scss.header__username}>{username}</span>
      </div>
    </Dropdown>
  )
}

export default UserDropdown
