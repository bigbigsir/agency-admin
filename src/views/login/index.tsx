import React from 'react'
import { useAppDispatch } from '@/store'
import { getToken } from '@/store/slice/token/actions'
import { useNavigate } from 'react-router'
import * as api from './api'
import styles from './index.module.scss'

function Component () {
  const navigate = useNavigate()
  const appDispatch = useAppDispatch()

  function login () {
    appDispatch(getToken())
  }

  function login1 () {
    appDispatch(getToken()).then(() => {
      navigate('/', { replace: true })
    })
  }

  function register () {
    api.login().then(({ data, success }) => {
      if (success) {
        console.log(data)
      }
    }).finally(() => navigate('/register', { replace: true }))
  }

  return (
    <div className={styles.page}>
      <button className={'button'} onClick={login}>登陆回记录页</button>
      <button className={'button'} onClick={login1}>登陆回主页</button>
      <button className={'button'} onClick={register}>注册</button>
    </div>
  )
}

export default Component
