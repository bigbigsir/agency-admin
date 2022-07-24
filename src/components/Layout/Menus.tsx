import React, { useEffect, useMemo, useState } from 'react'
import type { MenuProps, SubMenuProps } from 'antd'
import { Menu, message } from 'antd'
import { MenuTheme } from 'antd/lib/menu/MenuContext'
import { menus as originalMenus, MenuItem as OriginalMenuItem } from '@/router/routes'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'
import { findMenuByPath } from '@/utils'
import scss from './index.module.scss'

interface Props {
  theme: MenuTheme
}

interface MenuItem extends OriginalMenuItem {
  parent?: string
  onTitleClick?: SubMenuProps['onTitleClick']
}

const Menus: React.FC<Props> = ({ theme }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [/* openKeys */, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const menus = useMemo(() => cloneMenus(originalMenus), [originalMenus])

  useEffect(getOpenKeys, [location])

  function getOpenKeys () {
    const path = location.pathname
    const selected = findMenuByPath(menus, 'key', path)

    if (selected) {
      const openKeys = getParentsId(menus, selected)
      setOpenKeys(openKeys)
      setSelectedKeys([selected.key])
    } else {
      setOpenKeys([])
      setSelectedKeys([])
    }

    // 获取菜单的向上所有父节点
    function getParentsId (menus: MenuItem[] = [], item: MenuItem, keys: string[] = []): string[] {
      if (item.parent) {
        const parent = findMenuByPath(menus, 'key', item.parent)
        keys.push(parent!.key)
        if (parent!.parent) getParentsId(menus, parent!, keys)
      }
      return keys
    }
  }

  function cloneMenus (menus: OriginalMenuItem[], parent?: string): MenuItem[] {
    return menus.map(item => {
      return {
        ...item,
        parent,
        label: !item.children ? <a onClick={e => e.preventDefault()} href={item.key}>{item.label}</a> : item.label,
        children: item.children && cloneMenus(item.children, item.key),
        onTitleClick: item.children?.length ? onTitleClick : undefined
      }
    })
  }

  function onTitleClick ({ key }: { key: string }) {
    setOpenKeys(k => {
      let keys = [...k]
      const isExist = keys.some(item => item === key)
      if (isExist) {
        keys = keys.filter(item => item !== key)
      } else {
        keys.push(key)
      }
      return keys
    })
  }

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (/^\//.test(key)) {
      navigate(key)
    } else if (/^http?s/.test(key)) {
      window.open(key)
    } else {
      message.info('页面地址无效')
    }
  }

  return (
    <Menu
      mode="inline"
      theme={theme}
      items={menus}
      defaultOpenKeys={menus.map(i => i.key)}
      // openKeys={openKeys}
      selectedKeys={selectedKeys}
      className={scss.menu}
      onClick={onClick}
    />
  )
}

export default Menus
