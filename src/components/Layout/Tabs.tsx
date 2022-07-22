import React, { useEffect, useMemo, useState } from 'react'
import { Dropdown, Menu, Tabs, Button } from 'antd'
import classNames from 'classnames/bind'
import {
  CloseCircleOutlined,
  MenuOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PoweroffOutlined,
  TagOutlined
} from '@ant-design/icons'
import Icon from '@/components/icon'
import scss from './index.module.scss'
import { useSelector } from 'react-redux'
import { MenuList, State } from '@/store/types'
import { findMenuById, findMenuByPath } from '@/utils/util'
import { useHistory, useLocation } from 'react-router'
import { useIntl } from 'react-intl'

const cx = classNames.bind(scss)

const Nav: React.FC = () => {
  const intl = useIntl()
  const history = useHistory()
  const location = useLocation()
  const [tabs, setTabs] = useState<MenuList>([])
  const [activeKey, setActiveKey] = useState<string>('')

  const menus = useSelector<State, MenuList>(state => state.userInfo?.menus || [])
  const filteredMenus = useMemo(filterMenus, [menus])

  const menu = (
    <Menu onClick={onMenuClick} style={{ minWidth: 120 }}>
      <Menu.Item key="other">
        <TagOutlined/>
        <span>
          {intl.formatMessage({ id: 'layout.tabs.closeOther' })}
        </span>
      </Menu.Item>
      <Menu.Item key="left">
        <ArrowLeftOutlined/>
        <span>
          {intl.formatMessage({ id: 'layout.tabs.closeLeft' })}
        </span>
      </Menu.Item>
      <Menu.Item key="right">
        <ArrowRightOutlined/>
        <span>
          {intl.formatMessage({ id: 'layout.tabs.closeRight' })}
        </span>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="all">
        <PoweroffOutlined/>
        <span>
          {intl.formatMessage({ id: 'layout.tabs.closeAll' })}
        </span>
      </Menu.Item>
    </Menu>
  )
  const TabDropdown = (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <Button type="text" icon={<MenuOutlined/>}/>
    </Dropdown>
  )
  useEffect(getActiveKey, [filteredMenus, location])

  function getActiveKey () {
    const path = location.pathname
    const menu = findMenuByPath(filteredMenus, path)
    if (menu) {
      setTabs(tabs => {
        const isExist = tabs.some(item => item.id === menu.id)
        if (isExist) {
          return tabs
        } else {
          return [...tabs, menu]
        }
      })
      setActiveKey(menu.id)
    } else {
      setActiveKey('')
    }
  }

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

  function onMenuClick ({ key }: any) {
    switch (key) {
      case 'other':
        return closeOther()
      case 'left':
        return closeLeft()
      case 'right':
        return closeRight()
      case 'all':
        closeAll()
    }
  }

  function onTabClick (key: string) {
    const menu = findMenuById(filteredMenus, key)
    menu?.path && history.push(menu.path)
  }

  function oncCloseClick (e: React.MouseEvent<HTMLSpanElement>, id: string) {
    if (tabs.length > 1) {
      const index = tabs.findIndex(item => item.id === id)
      const preTab = tabs[index - 1]
      const nextTab = tabs[index + 1]
      if (id === activeKey) {
        history.push((nextTab ? nextTab.path : preTab.path) as string)
      }
      setTabs(tabs => tabs.filter(item => item.id !== id))
    } else {
      closeAll()
    }

    e.preventDefault()
    e.stopPropagation()
  }

  function closeOther () {
    setTabs(tabs => tabs.filter(item => item.id === activeKey))
  }

  function closeLeft () {
    const index = tabs.findIndex(item => item.id === activeKey)
    setTabs(tabs => tabs.slice(index))
  }

  function closeRight () {
    const index = tabs.findIndex(item => item.id === activeKey)
    setTabs(tabs => tabs.slice(0, index + 1))
  }

  function closeAll () {
    setTabs([])
    history.push('/')
  }

  return (
    <div id="pageNavBar" className={cx('tabs')}>
      {
        !!tabs.length &&
        <Tabs
          size="small"
          className={cx('tabs__inner')}
          activeKey={activeKey}
          tabBarExtraContent={TabDropdown}
          onTabClick={onTabClick}>
          {
            tabs.map(item => {
              const tab = (
                <a onClick={e => e.preventDefault()} href={item.path} className={cx('tabs__item')}>
                  <Icon iconId={item.icon}/>
                  <span>{item.name}</span>
                  <CloseCircleOutlined onClick={(e) => oncCloseClick(e, item.id)} className={cx('tabs__close')}/>
                </a>
              )
              return <Tabs.TabPane key={item.id} tab={tab}/>
            })
          }
        </Tabs>
      }
    </div>
  )
}

export default Nav
