import React from 'react'
import { useSelector } from 'react-redux'
import { incremented, fetchValue, getValue, receivedAll } from '@/store/slice/counter/actions'
import { RootState, useAppDispatch } from '@/store'
import { Outlet, Link } from 'react-router-dom'
import styles from './index.module.scss'

function Index () {
  // const Outlet = useOutlet()
  const counter = useSelector((state: RootState) => state.counter)
  // const value = useSelector((state: RootState) => state.value)
  // const status = useSelector((state: RootState) => state.status)
  const dispatch = useAppDispatch()

  function _getValue () {
    dispatch(getValue(100)).then((data) => {
      console.log('data', data)
    }).catch(error => {
      console.log('error', error)
    })
  }

  function _fetchValue () {
    dispatch(fetchValue(200)).then((data) => {
      console.log('data', data)
    })
  }

  function _incremented () {
    dispatch(incremented())
  }

  function _decremented () {
    // dispatch(decremented())
    dispatch(receivedAll([1], 1))
  }

  return (
    <div className={styles.page}>
      <h3>{JSON.stringify(counter)}</h3>
      <h3>{counter.status}</h3>
      <h3>{counter.value}</h3>
      <button className={'button'} onClick={_incremented}>_incremented</button>
      <button className={'button'} onClick={_decremented}>_decremented</button>
      <button className={'button'} onClick={_getValue}>_getValue</button>
      <button className={'button'} onClick={_fetchValue}>_fetchValue</button>
      <h3>
        <Link to={'/counter/a'}>/counter/a</Link>
        <br/>
        <Link to={'/counter/b'}>/counter/b</Link>
      </h3>
      <Outlet/>
    </div>
  )
}

export default Index
