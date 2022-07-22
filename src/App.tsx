import React from 'react'
import './App.scss'
import Router, { history } from '@/router/index1'

function App () {
  const navigate = history
  return (
    <div className="app">
      <Router/>
      <div className={'buttons'}>
        <button className={'button'} onClick={() => navigate.push('/')}>home</button>
        <button className={'button'} onClick={() => navigate.push('/todo')}>todo</button>
        <button className={'button'} onClick={() => navigate.push('/counter')}>counter</button>
        <button className={'button'} onClick={() => navigate.push('/test')}>test</button>
        <button className={'button'} onClick={() => navigate.push('/404')}>404</button>
        <button className={'button'} onClick={() => navigate.push('/login')}>login</button>
        <button className={'button'} onClick={() => navigate.back()}>back</button>
      </div>
    </div>
  )
}

export default App
