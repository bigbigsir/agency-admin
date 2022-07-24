import React, { Suspense, useEffect } from 'react'
import { createBrowserHistory } from 'history'
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  unstable_HistoryRouter as HistoryRouter
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getTokenSelector } from '@/store/slice/token'
import routes, { RouteParam } from './routes'
import PageLoading from '@/components/PageLoading'

interface RenderProps extends RouteParam {
  child?: boolean
}

const history = createBrowserHistory()

function createRoute (routes: RouteParam[], child?: boolean) {
  return routes.map((route, i) => {
    const { path, children } = route

    return (
      <Route key={i} path={path} element={<Render child={child} {...route}/>}>
        {
          children && children.length && createRoute(children, true)
        }
      </Route>
    )
  })
}

function Render (props: RenderProps) {
  const { label, child, redirect, element: Component, loginAuth } = props
  const navigate = useNavigate()
  const location = useLocation()
  const loginStatus = useSelector(getTokenSelector)

  const { state, search, pathname } = location
  const toHome = loginStatus && loginAuth === false
  const toLogin = !loginStatus && !!loginAuth

  function checkAuth () {
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
  }

  useEffect(checkAuth, [loginStatus, location])

  if (toHome || toLogin) return null
  if (redirect) return <Navigate to={redirect}/>
  if (!Component) return null
  if (label) document.title = label

  return child
    ? <Suspense fallback={<PageLoading/>}><Component/></Suspense>
    : <Component/>
}

function Router () {
  return (
    <HistoryRouter history={history}>
      <Suspense fallback={<PageLoading/>}>
        <Routes>
          {createRoute(routes)}
        </Routes>
      </Suspense>
    </HistoryRouter>
  )
}

export { history }
export default Router
