import React from 'react'
import { Dropdown, Menu } from 'antd'
import { State, setLocale, getLocaleSelector } from '@/store/slice/locale'
import { useDispatch, useSelector } from 'react-redux'
import { TranslationOutlined } from '@ant-design/icons'

interface Props {
  className?: string;
}

interface Language {
  key: State
  icon: string
  label: React.ReactNode
}

const LangDropdown: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch()
  const languages: Language[] = [
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
  const locale = useSelector(getLocaleSelector)

  function onClick ({ key }: any) {
    dispatch(setLocale(key))
  }

  return (
    <Dropdown overlay={<Menu onClick={onClick} items={languages} selectedKeys={[locale]}/>} placement="bottomRight">
      <div className={className}>
        <TranslationOutlined/>
      </div>
    </Dropdown>
  )
}

export default LangDropdown
