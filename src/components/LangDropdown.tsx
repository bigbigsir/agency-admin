import React from 'react'
import { Dropdown, Menu, MenuProps } from 'antd'
import { State, setLocale, getLocaleSelector } from '@/store/slice/locale'
import { useDispatch, useSelector } from 'react-redux'
import { TranslationOutlined } from '@ant-design/icons'

interface Props {
  className?: string;
}

interface MenuItem {
  key: State
  icon: string
  label: React.ReactNode
}

const LangDropdown: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch()
  const locale = useSelector(getLocaleSelector)

  const menuItems: MenuItem[] = [
    {
      key: 'zh-CN',
      label: <span>&nbsp;&nbsp;简体中文</span>,
      icon: '🇨🇳'
    },
    {
      key: 'ko-KR',
      label: <span>&nbsp;&nbsp;한국어</span>,
      icon: '🇰🇷'
    },
    {
      key: 'en-US',
      label: <span>&nbsp;&nbsp;English</span>,
      icon: '🇺🇸'
    }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    dispatch(setLocale(key as State))
  }

  return (
    <Dropdown
      trigger={['hover', 'click']}
      overlay={<Menu onClick={onClick} items={menuItems} selectedKeys={[locale]}/>}
      placement="bottomRight">
      <div className={className}>
        <TranslationOutlined/>
      </div>
    </Dropdown>
  )
}

export default LangDropdown
