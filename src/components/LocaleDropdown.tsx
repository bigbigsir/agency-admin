import React from 'react'
import { Dropdown, Menu, MenuProps } from 'antd'
import { Locale, setLocale, getLocaleSelector } from '@/store/slice/locale'
import { useDispatch, useSelector } from 'react-redux'
import { TranslationOutlined } from '@ant-design/icons'
import { ItemType } from 'antd/lib/menu/hooks/useItems'

interface Props {
  className?: string;
}

type MenuItem = ItemType & {
  key: Locale
}

const LocaleDropdown: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch()
  const locale = useSelector(getLocaleSelector)

  const menuItems: MenuItem[] = [
    {
      key: 'zh-CN',
      label: <span>🇨🇳&nbsp;&nbsp;简体中文</span>
    },
    {
      key: 'ko-KR',
      label: <span>🇰🇷&nbsp;&nbsp;한국어</span>
    },
    {
      key: 'en-US',
      label: <span>🇺🇸&nbsp;&nbsp;English</span>
    }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    dispatch(setLocale(key as Locale))
  }

  return (
    <Dropdown
      overlay={<Menu onClick={onClick} items={menuItems} selectedKeys={[locale]}/>}
      placement="bottomRight">
      <div className={className}>
        <TranslationOutlined/>
      </div>
    </Dropdown>
  )
}

export default LocaleDropdown
