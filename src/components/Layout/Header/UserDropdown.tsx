import React, { useState } from 'react'
import {
  LogoutOutlined,
  UnlockOutlined,
  PhoneOutlined
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { Avatar, Dropdown, Menu, MenuProps } from 'antd'
import { useIntl } from 'react-intl'
import { setToken } from '@/store/slice/token/actions'
import { useNavigate } from 'react-router'
import UpdatePassword from './updatePassword'
import UpdatePhone from './updatePhone'
import scss from '../index.module.scss'

interface Props {
  className?: string;
}

const UserDropdown: React.FC<Props> = ({ className }) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [visible, setVisible] = useState<Record<string, boolean>>({})
  const username = '123'

  const menuItems = [
    {
      key: 'password',
      label: '修改密码',
      icon: <UnlockOutlined/>
    },
    {
      key: 'phone',
      label: '修改电话',
      icon: <PhoneOutlined/>
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined/>
    }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      dispatch(setToken(null))
      navigate('/login')
    } else if (key === 'password') {
      setVisible({ password: true })
    } else if (key === 'phone') {
      setVisible({ phone: true })
    }
  }

  return (
    <>
      <Dropdown overlay={<Menu onClick={onClick} items={menuItems}/>} placement="bottomRight">
        <div className={className}>
          <Avatar className={scss.header__avatar}>{username.substr(0, 1).toUpperCase()}</Avatar>
          <span className={scss.header__username}>{username}</span>
        </div>
      </Dropdown>
      <UpdatePassword
        visible={visible.password}
        onCancel={() => setVisible({})}
        onSuccess={() => setVisible({})}/>
      <UpdatePhone
        visible={visible.phone}
        onCancel={() => setVisible({})}
        onSuccess={() => setVisible({})}/>
    </>
  )
}

export default UserDropdown
