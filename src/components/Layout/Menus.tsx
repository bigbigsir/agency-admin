import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames/bind'
import { useHistory, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { MenuItem, MenuList, State } from '@/store/types'
import { Menu, message } from 'antd'
import { useIntl } from 'react-intl'
import { Theme } from '@/components/Layout/index'
import { setAuths } from '@/store/actions/common'
import { findMenuById, findMenuByPath } from '@/utils/util'
import Icon from '@/components/icon'
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
  const intl = useIntl()
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [clickMenuId, setClickMenuId] = useState<string | undefined>()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const menus = []
  const filteredMenus = useMemo(filterMenus, [menus])

  const menusProps = {
    mode,
    theme,
    className: cx('menu'),
    selectedKeys,
    inlineIndent: 16,
    onClick: clickMenu
  }

  useEffect(getOpenKeys, [menus, location])

  useEffect(setSelectedMenuAuths, [selectedKeys])

  // 去除隐藏的菜单(show:false)
  function filterMenus () {
    const clone = JSON.parse(JSON.stringify(menus || []))
    return recursion(clone)

    function recursion (menus: MenuList) {
      return menus.filter(item => {
        item.children = recursion(item.children)
        return item.show
      })
    }
  }

  /**
   * 设置当前path的菜单id，和展开的菜单id
   * 使用menus而不是filteredMenus，是因为filteredMenus剔除了隐藏菜单
   * */
  function getOpenKeys () {
    const path = location.pathname
    const selectedItem = clickMenuId ? findMenuById(menus, clickMenuId) : findMenuByPath(menus, path)
    setClickMenuId(undefined)

    if (selectedItem) {
      setSelectedKeys([selectedItem.id])

      if (selectedItem.show) {
        const openKeys = getParentsId(filteredMenus, selectedItem)
        setOpenKeys(openKeys)
      }

      if (selectedItem.path !== '/') {
        document.title = selectedItem.name + ' - ' + intl.formatMessage({ id: 'router.title.home' })
      }
    } else {
      setOpenKeys([])
      setSelectedKeys([])
    }

    // 获取菜单的向上所有父节点
    function getParentsId (menus: MenuList = [], item: MenuItem, keys: string[] = []): string[] {
      const parent = findMenuById(menus, item.parent)
      if (parent) {
        keys.push(parent.id)
        if (parent.parent) getParentsId(menus, parent, keys)
      }
      return keys
    }
  }

  function setSelectedMenuAuths () {
    const menuId = selectedKeys && selectedKeys[0]
    const menu = findMenuById(menus, menuId)
    dispatch(setAuths(menu?.auths || []))
  }

  function renderSubMenu (menu: MenuItem): React.ReactNode {
    return (
      <SubMenu
        key={menu.id}
        title={menu.name}
        icon={<Icon iconId={menu.icon}/>}
        onTitleClick={onTitleClick}
      >
        {
          menu.children.map(menu => (
            menu.children.length ? renderSubMenu(menu) : renderMenuItem(menu)
          ))
        }
      </SubMenu>
    )
  }

  function renderMenuItem (menu: MenuItem): React.ReactNode {
    return (
      <Menu.Item key={menu.id}>
        <a onClick={e => e.preventDefault()} href={menu.path}>
          <Icon iconId={menu.icon}/>
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
    const menu = findMenuById(menus, key)
    if (menu && menu.path) {
      if (/^\//.test(menu.path)) {
        history.push(menu.path)
        setClickMenuId(key)
      } else if (/^http?s/.test(menu.path)) {
        window.open(menu.path)
      }
    } else {
      message.info('页面地址不存在')
    }
  }

  return collapsed || mode === 'horizontal'
    ? <Menu {...menusProps}>
      {
        filteredMenus.map((menu) => (
          menu.children.length ? renderSubMenu(menu) : renderMenuItem(menu)
        ))
      }
    </Menu>
    : <Menu {...menusProps} openKeys={openKeys}>
      {
        filteredMenus.map((menu) => (
          menu.children.length ? renderSubMenu(menu) : renderMenuItem(menu)
        ))
      }
    </Menu>
}

export default Menus
