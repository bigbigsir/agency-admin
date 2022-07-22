import React from 'react'
import { Outlet } from 'react-router'

function Layout () {
  return <div className={'test'}>
    <h1>头部</h1>
    <Outlet/>
  </div>
}

export default Layout
