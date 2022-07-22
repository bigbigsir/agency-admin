import React from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { setToken } from '@/store/slice/token/actions'
import styles from './index.module.scss'

function Component () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function logout () {
    dispatch(setToken(null))
    navigate('/login', { replace: true })
  }

  return (
    <div className={styles.page}>
      <button className={'button'} onClick={() => dispatch(setToken(null))}>退出登陆1</button>
      <br/>
      <button className={'button'} onClick={logout}>退出登陆2</button>
    </div>
  )
}

export default Component
