import { ComponentType, lazy, LazyExoticComponent } from 'react'
import { matchPath } from 'react-router-dom'
import Header from '@/components/Header'

const Page404 = lazy(() => import('@/components/Page404'))

interface RouteParam {
  path: string
  meta?: Readonly<{
    title?: string
  }>
  header?: ComponentType<any>
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
      title: '首页'
    },
    loginAuth: true,
    header: Header,
    element: lazy(() => import('../views/home'))
  },
  {
    path: '/todo',
    meta: {
      title: '代办'
    },
    loginAuth: true,
    element: lazy(() => import('../views/todo'))
  },
  {
    path: '/counter',
    meta: {
      title: '计数'
    },
    loginAuth: true,
    header: Header,
    element: lazy(() => import('../views/counter')),
    children: [
      {
        path: '/counter/b',
        meta: {
          title: '计数b'
        },
        header: Header,
        element: lazy(() => import('../views/common'))
      },
      {
        path: '/counter/:id',
        meta: {
          title: '计数a'
        },
        header: Header,
        element: lazy(() => import('../views/common'))
      }
    ]
  },
  {
    path: '/test',
    meta: {
      title: '测试'
    },
    loginAuth: true,
    header: Header,
    element: lazy(() => import('../views/common'))
  },
  {
    path: '*',
    meta: {
      title: '404'
    },
    loginAuth: true,
    element: Page404
  },
  {
    path: '/login',
    meta: {
      title: '登录'
    },
    loginAuth: false,
    element: lazy(() => import(/* webpackChunkName: "auth" */'../views/login'))
  },
  {
    path: '/register',
    meta: {
      title: '注册'
    },
    loginAuth: false,
    element: lazy(() => import(/* webpackChunkName: "auth" */'../views/register'))
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
