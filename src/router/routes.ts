import { ComponentType, lazy, LazyExoticComponent } from 'react'
import { matchPath } from 'react-router-dom'
import Layout from '@/components/Layout'

const Page404 = lazy(() => import('@/components/Page404'))

interface RouteParam {
  path: string
  meta: Readonly<{
    title: string
  }>
  element: ComponentType | LazyExoticComponent<ComponentType>
  children?: RouteParam[]
  /**
   * 进入页面前是否需要验证登录状态，父级路由的loginAuth具有优先级
   * true：需要登录（未登录跳转 登录页）
   * false：不需要登录（已登录跳转 首页）
   * undefined 登录和未登录皆可进入页面
   * */
  loginAuth?: boolean
}

const routes: RouteParam[] = [
  {
    path: '/',
    meta: {
      title: ''
    },
    loginAuth: true,
    element: Layout,
    children: [
      {
        path: '/',
        meta: {
          title: '首页'
        },
        element: lazy(() => import('../views/home'))
      },
      {
        path: '/todo',
        meta: {
          title: '代办'
        },
        element: lazy(() => import('../views/todo'))
      },
      {
        path: '*',
        meta: {
          title: '404'
        },
        element: Page404
      }
    ]
  },
  {
    path: '/login',
    meta: {
      title: '登录'
    },
    loginAuth: false,
    element: lazy(() => import('../views/login'))
  }
]

function findRouteByPath (path: string, _routes: RouteParam[] = routes): RouteParam | void {
  for (let i = 0, item; (item = _routes[i]); i++) {
    if (matchPath(item.path, path)) {
      return item
    } else {
      item = findRouteByPath(path, item.children || [])
    }
    if (item) return item
  }
}

export type { RouteParam }
export { findRouteByPath }
export default routes
