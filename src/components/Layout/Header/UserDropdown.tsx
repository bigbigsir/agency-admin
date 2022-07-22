import React from 'react'
import classNames from 'classnames/bind'
import {
  // UserOutlined,
  LogoutOutlined,
  UnlockOutlined
} from '@ant-design/icons'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '@/store/types'
import { ResponseData } from '@/api/types'
import { signOut } from '@/store/actions/user'
import { Avatar, Dropdown, Menu, message } from 'antd'
import { useIntl } from 'react-intl'
import scss from '../index.module.scss'

const cx = classNames.bind(scss)

interface Props {
  className?: string;
}

const UserDropdown: React.FC<Props> = ({ className }) => {
  const intl = useIntl()
  const history = useHistory()
  const dispatch = useDispatch()
  const username = useSelector<State, string>(state => state.userInfo?.username || '')

  function logout ({ key }: any) {
    if (key === 'logout') {
      dispatch<Promise<ResponseData>>(signOut()).then(({ success }) => {
        if (success) {
          message.success('退出成功')
          history.push('/user/login')
        }
      })
    } else if (key === 'password') {
      history.push('/updatePassword')
    }
  }

  const menu = (
    <Menu onClick={logout} style={{ minWidth: 120 }}>
      {/* <Menu.Item key="center"> */}
      {/*  <UserOutlined/> */}
      {/*  <span> */}
      {/*    {intl.formatMessage({ id: 'layout.userDropdown.center' })} */}
      {/*  </span> */}
      {/* </Menu.Item> */}
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
