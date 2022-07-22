import React from 'react'
import { useLocation } from 'react-router-dom'
import { findRouteByPath } from '@/router/routes'
import styles from './index.module.scss'

function Index () {
  const location = useLocation()
  const route = findRouteByPath(location.pathname)

  return (
    <div className={styles.page}>
      <h3>{location.pathname}</h3>
      <h3>{route?.meta?.title}</h3>
    </div>
  )
}

export default Index
