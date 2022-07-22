import React from 'react'
import { useNavigate } from 'react-router'
import styles from './index.module.scss'

function Component () {
  const navigate = useNavigate()

  function login () {
    navigate('/login', { replace: true })
  }

  return (
    <div className={styles.page}>
      <button className={'button'} onClick={login}>登陆</button>
    </div>
  )
}

export default Component
