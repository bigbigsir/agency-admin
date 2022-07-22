import React, { ComponentType, Suspense, useEffect } from 'react'
import { createBrowserHistory } from 'history'
import {
  Route,
  matchPath,
  useLocation,
  unstable_HistoryRouter as HistoryRouter
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getTokenSelector } from '@/store/slice/token'
import { setRoute } from '@/store/slice/route'
import routes, { findRouteByPath, RouteParam } from './routes'
import store from '@/store'
import PageLoading from '@/components/PageLoading'
import RouterTransition from '@/components/RouterTransition'

interface RenderMainProps extends RouteParam {
  child?: boolean
}

interface RenderHeaderProps extends Omit<RouteParam, 'header'> {
  header: ComponentType<any>
}

const history = createBrowserHistory()

// eslint-disable-next-line no-unused-vars
function createMainRoute (routes: RouteParam[], child?: boolean) {
  return routes.map((route, i) => {
    const { path, children } = route

    return (
      <Route key={i} path={path} element={<RenderMain child={child} {...route}/>}>
        {
          children && children.length && createMainRoute(children, true)
        }
      </Route>
    )
  })
}

function createHeaderRoute (routes: RouteParam[]) {
  const _routes = flatDeep(routes).filter(item => !!item.header) as RenderHeaderProps[]

  function flatDeep (routes: RouteParam[]): RouteParam[] {
    return routes.reduce((total: RouteParam[], current) => {
      return total.concat([current], current.children ? flatDeep(current.children) : [])
    }, [])
  }

  return _routes.map((route, i) => {
    const { path } = route

    return (
      <Route key={i} path={path} element={<RenderHeader {...route}/>}/>
    )
  })
}

/**
 * 使用了 react-transition-group 后，卸载的页面会再次激活，执行Render方法
 * 所以会出现 location.pathname 与 path 不一致的问题
 * */
function RenderMain (props: RenderMainProps) {
  const { path, meta = {}, child, element: Element, loginAuth } = props
  const navigate = useNavigate()
  const location = useLocation()
  const loginStatus = useSelector(getTokenSelector)

  const { title } = meta
  const { state, search, pathname } = location
  const toHome = loginStatus && loginAuth === false
  const toLogin = !loginStatus && !!loginAuth
  // console.log('title:', title, '｜pathname:', pathname, '｜path:', path, '｜loginAuth:', loginAuth, '｜toHome:', toHome, '｜toLogin:', toLogin)
  useEffect(() => {
    if (toHome && !!matchPath(path, pathname)) {
      const from = (state as Record<string, any>)?.from || '/'
      navigate(from, { replace: true })
    } else if (toLogin && pathname !== '/login') {
      const from = pathname + search
      navigate('/login', {
        state: { from },
        replace: true
      })
    }
  }, [loginStatus, location])

  if (toHome || toLogin) return null
  if (title && !!matchPath(path, pathname)) document.title = title

  return child
    ? <Suspense fallback={<PageLoading/>}><Element/></Suspense>
    : <Element/>
}

function RenderHeader (props: RenderHeaderProps) {
  const { meta, header: Element, loginAuth } = props
  const loginStatus = useSelector(getTokenSelector)

  const toHome = loginStatus && loginAuth === false
  const toLogin = !loginStatus && !!loginAuth

  if (toHome || toLogin) return null

  return <Element meta={meta}/>
}

function Router () {
  return (
    <HistoryRouter history={history}>
      <RouterTransition type={'header'}>
        <>
          {createHeaderRoute(routes)}
          <Route path={'*'} element={null}/>
        </>
      </RouterTransition>
      <RouterTransition type={'main'}>
        <>{createMainRoute(routes)}</>
      </RouterTransition>
    </HistoryRouter>
  )
}

function listenRoute () {
  function listen (pathname: string) {
    const route = findRouteByPath(pathname)
    if (route) {
      const _route = {
        path: route.path,
        meta: route.meta,
        header: !!route.header,
        loginAuth: route.loginAuth
      }
      store.dispatch(setRoute(_route))
    }
  }

  window.addEventListener('load', () => listen(location.pathname), { once: true })
  history.listen(({ location }) => listen(location.pathname))
}

listenRoute()
export { history }
export default Router
