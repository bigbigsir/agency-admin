import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames/bind'
import { Menu, message } from 'antd'
import { useIntl } from 'react-intl'
import { Theme } from '@/components/Layout/index'
import scss from './index.module.scss'

const { SubMenu } = Menu
const cx = classNames.bind(scss)

interface MenusProps {
  mode: 'horizontal' | 'inline'
  theme: Theme
  collapsed?: boolean
  className?: string
}

const Menus: React.FC<MenusProps> = (props) => {
  const {
    mode,
    theme,
    collapsed
  } = props

  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const menus: { children: string | any[] }[] = []

  const menusProps = {
    mode,
    theme,
    className: cx('menu'),
    selectedKeys,
    inlineIndent: 16,
    onClick: clickMenu
  }

  function renderSubMenu (menu: any): React.ReactNode {
    return (
      <SubMenu
        key={menu.id}
        title={menu.name}
        onTitleClick={onTitleClick}
      >
        {
          menu.children.map((menu: { children: string | any[] }) => (
            menu.children.length ? renderSubMenu(menu) : renderMenuItem(menu)
          ))
        }
      </SubMenu>
    )
  }

  function renderMenuItem (menu: any): React.ReactNode {
    return (
      <Menu.Item key={menu.id}>
        <a onClick={e => e.preventDefault()} href={menu.path}>
          <span>{menu.icon}</span>
          <span>{menu.name}</span>
        </a>
      </Menu.Item>
    )
  }

  function onTitleClick ({ key }: any) {
    if (collapsed) return
    let keys = [...openKeys]
    const isExist = keys.some(item => item === key)
    if (isExist) {
      keys = keys.filter(item => item !== key)
    } else {
      keys.push(key)
    }
    setOpenKeys(keys)
  }

  function clickMenu ({ key }: any) {

  }

  return <Menu {...menusProps}>
    {
      menus.map((menu: { children: string | any[] }) => (
        menu.children.length ? renderSubMenu(menu) : renderMenuItem(menu)
      ))
    }
  </Menu>
}

export default Menus
