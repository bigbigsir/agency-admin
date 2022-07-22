import React from 'react'
import { RouteParam } from '@/router/routes'
import { useNavigate } from 'react-router'
import styles from './index.module.scss'

interface Props {
  meta?: RouteParam['meta'],
  className: string
}

function Header ({ meta, className }: Props) {
  const { title } = meta || {}
  const navigate = useNavigate()
  return <div className={[styles.header, className].join(' ')}>
    <span onClick={() => navigate(-1)}>返回</span>
    <h2>{title}</h2>
    <span>其他</span>
  </div>
}

export default Header
