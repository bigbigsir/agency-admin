import React, { useEffect, Suspense, ReactElement } from 'react'
import { Routes, useLocation, useNavigationType } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { findRouteByPath } from '@/router/routes'
import { getPlatform } from '@/utils'
import PageLoading from '@/components/PageLoading'
import './index2.scss'

interface Props {
  type: 'header' | 'main'
  children: React.ReactElement
}

// 控制滑动自带动画冲突
let stopAnimation = false

// 延后重置控制参数
function delayReset () {
  setTimeout(() => {
    stopAnimation = false
  }, 16)
}

window.addEventListener('touchstart', () => {
  stopAnimation = false
})
window.addEventListener('touchmove', () => {
  stopAnimation = getPlatform() === 'ios'
})
window.addEventListener('touchend', delayReset)

export default function RouterTransition (props: Props) {
  const { type, children } = props
  const location = useLocation()
  const navigationType = useNavigationType()

  const classNameMap = {
    main: 'css-transition-main',
    none: 'none',
    back: 'back',
    header: 'css-transition-header',
    forward: 'forward',
    noHeader: 'no-header'
  }
  const routerStack = (sessionStorage.getItem('ROUTER_STACK') || '').split(',').filter(Boolean)
  const classNames = getClassNames(location.pathname)

  delayReset()
  // 路由记录存储到本地
  useEffect(() => sessionStorage.setItem('ROUTER_STACK', routerStack.join()), [location])

  function getClassNames (pathname: string) {
    // console.log(routerStack, navigationType, pathname)
    // 如果是REPLACE，将最后一个路由替换为当前当前路由
    if (navigationType === 'REPLACE') routerStack.pop()
    // 重复打开同样的路由不增加记录（数组最后一个为 pathname）
    const isLast = routerStack.slice(-1).pop() === pathname
    // 当前路由存在且是上一页（数组中倒数第二为当前 pathname）
    const isSecondLast = routerStack.slice(-2)[0] === pathname

    if (stopAnimation || isLast) return classNameMap.none

    isSecondLast ? routerStack.pop() : routerStack.push(pathname)

    return isSecondLast ? classNameMap.back : classNameMap.forward
  }

  function childFactory (child: ReactElement): ReactElement {
    const className = [classNameMap[type]]
    if (type === 'main') {
      const route = findRouteByPath((child.key as string).replace('.$', ''))

      if (route && !route.header) {
        className.unshift(classNameMap.noHeader)
      }
    }
    return React.cloneElement(child, { className: className.join(' '), classNames })
  }

  return (
    <TransitionGroup
      component={null}
      childFactory={childFactory}>
      <CSSTransition key={location.pathname} timeout={310}>
        <div>
          <Suspense fallback={<PageLoading/>}>
            <Routes location={location}>
              {children}
            </Routes>
          </Suspense>
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}
