import React from 'react'
import classNames from 'classnames/bind'
import {
  // UserOutlined,
  LogoutOutlined,
  UnlockOutlined
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { Avatar, Dropdown, Menu } from 'antd'
import { useIntl } from 'react-intl'
import scss from '../index.module.scss'
import { setToken } from '@/store/slice/token/actions'

const cx = classNames.bind(scss)

interface Props {
  className?: string;
}

const UserDropdown: React.FC<Props> = ({ className }) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const username = '123'

  function logout ({ key }: any) {
    if (key === 'logout') {
      dispatch(setToken(null))
    } else if (key === 'password') {
      console.log('password')
    }
  }

  const menu = (
    <Menu onClick={logout} style={{ minWidth: 120 }}>
      <Menu.Item key="password">
        <UnlockOutlined/>
        <span>
          {intl.formatMessage({ id: 'layout.userDropdown.password' })}
        </span>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="logout">
        <LogoutOutlined/>
        <span>
          {intl.formatMessage({ id: 'layout.userDropdown.logout' })}
        </span>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <div className={className}>
        <Avatar className={cx('header__avatar')}>{username.substr(0, 1).toUpperCase()}</Avatar>
        <span className={cx('header__username')}>{username}</span>
      </div>
    </Dropdown>
  )
}

export default UserDropdown
