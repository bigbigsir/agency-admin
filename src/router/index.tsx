import React, { ComponentType, Suspense, useEffect } from 'react'
import { createBrowserHistory } from 'history'
import {
  Route,
  Routes,
  useLocation,
  unstable_HistoryRouter as HistoryRouter
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getTokenSelector } from '@/store/slice/token'
import PageLoading from '@/components/PageLoading'
import routes, { RouteParam } from './routes'

interface RenderMainProps extends RouteParam {
  child?: boolean
}

interface RenderHeaderProps extends Omit<RouteParam, 'header'> {
  header: ComponentType<any>
}

const history = createBrowserHistory()

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

function RenderMain (props: RenderMainProps) {
  const { meta = {}, child, element: Element, loginAuth } = props
  const navigate = useNavigate()
  const location = useLocation()
  const loginStatus = useSelector(getTokenSelector)

  const { title } = meta
  const { state, search, pathname } = location
  const toHome = loginStatus && loginAuth === false
  const toLogin = !loginStatus && !!loginAuth
  // console.log('title:', title, '｜pathname:', pathname, '｜path:', path, '｜loginAuth:', loginAuth, '｜toHome:', toHome, '｜toLogin:', toLogin)
  useEffect(() => {
    if (toHome) {
      const from = (state as Record<string, any>)?.from || '/'
      navigate(from, { replace: true })
    } else if (toLogin) {
      const from = pathname + search
      navigate('/login', {
        state: { from },
        replace: true
      })
    }
  }, [loginStatus, location])

  if (toHome || toLogin) return null
  if (title) document.title = title

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
      <Routes>
        {
          createHeaderRoute(routes)
        }
        <Route path={'*'} element={null}/>
      </Routes>
      <Suspense fallback={<PageLoading/>}>
        <Routes>
          {createMainRoute(routes)}
        </Routes>
      </Suspense>
    </HistoryRouter>
  )
}

export { history }
export default Router
