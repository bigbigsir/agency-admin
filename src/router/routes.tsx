import React, { ComponentType, lazy, LazyExoticComponent } from 'react'
import { UserOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { getUuidV4 } from '@/utils/depend'
import Layout from '@/components/Layout'

interface MenuItem {
  key: string,
  icon?: React.ReactNode
  label?: React.ReactNode
  children?: MenuItem[]
}

interface RouteParam {
  path: string // 页面路径
  icon?: React.ReactNode // 菜单图标
  label?: string // 页面标题
  element?: ComponentType | LazyExoticComponent<ComponentType>
  redirect?: string // 重定向路径
  children?: RouteParam[] // 子页面配置
  // 进入页面前是否需要验证登录状态，父级路由的loginAuth具有优先级
  // true：需要登录（未登录跳转 登录页）
  // false：不需要登录（已登录跳转 首页）
  // undefined 登录和未登录皆可进入页面
  loginAuth?: boolean
}

/**
 * @description 菜单数据由前端本地管理
 * 新增页面如果需要显示在菜单中，需要在menus中添加key，值为页面path
 * 由于菜单可能涉及到3级以及更多层级，和菜单排序，所以此处菜单数据需要配置，而不从routes中生成
 * */
const menus: MenuItem[] = [
  {
    key: getUuidV4(),
    icon: <UserOutlined/>,
    label: '账号管理',
    children: [
      {
        key: '/underling'
      },
      {
        key: '/subAccount'
      },
      {
        key: '/messages'
      }
    ]
  },
  {
    key: getUuidV4(),
    icon: <UnorderedListOutlined/>,
    label: '报表管理',
    children: [
      {
        key: '/page31'
      },
      {
        key: '/page32'
      },
      {
        key: '/page33'
      },
      {
        key: '/page34'
      },
      {
        key: '/page35'
      },
      {
        key: '/page36'
      },
      {
        key: '/page37'
      }
    ]
  }
]
const routes: RouteParam[] = [
  {
    path: '/',
    loginAuth: true,
    element: Layout,
    children: [
      {
        path: '/',
        redirect: '/underling'
      },
      {
        path: '/underling',
        label: '下线管理',
        element: lazy(() => import('../views/underling'))
      },
      {
        path: '/subAccount',
        label: '子账号管理',
        element: lazy(() => import('../views/sub_account'))
      },
      {
        path: '/messages',
        label: '通知中心',
        element: lazy(() => import('../views/messages'))
      },
      {
        path: '/messages/:id',
        label: '通知中心',
        element: lazy(() => import('../views/messages/details'))
      },
      {
        path: '/page31',
        label: '余额查询',
        element: lazy(() => import('../views/home'))
      },
      {
        path: '/page32',
        label: '交收报表',
        element: lazy(() => import('../views/home'))
      },
      {
        path: '/page33',
        label: '资金报表',
        element: lazy(() => import('../views/home'))
      },
      {
        path: '/page34',
        label: '交易记录',
        element: lazy(() => import('../views/home'))
      },
      {
        path: '/page35',
        label: '游戏记录',
        element: lazy(() => import('../views/home'))
      },
      {
        path: '/page36',
        label: '提案记录',
        element: lazy(() => import('../views/home'))
      },
      {
        path: '/page37',
        label: '操作日志',
        element: lazy(() => import('../views/home'))
      }
    ]
  },
  {
    path: '/login',
    label: '登录',
    loginAuth: false,
    element: lazy(() => import('../views/login'))
  }
]
routes[0].children?.push({
  path: '*',
  label: '404',
  element: lazy(() => import('@/components/Page404'))
})

fillMenusData(menus, flatDeep(routes))

function fillMenusData (menus: MenuItem[], flatRoutes: RouteParam[]) {
  menus.forEach(menu => {
    const route = flatRoutes.find(route => route.path === menu.key)
    menu.children && fillMenusData(menu.children, flatRoutes)
    if (route) {
      menu.icon = route.icon
      menu.label = route.label
    }
  })
}

function flatDeep (routes: RouteParam[] = []): RouteParam[] {
  return routes.reduce((total: RouteParam[], current) => {
    return total.concat([current], flatDeep(current.children))
  }, [])
}

export type { RouteParam, MenuItem }
export { menus }
export default routes
