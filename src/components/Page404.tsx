import React from 'react'
import { useNavigate } from 'react-router'

function Component () {
  const navigate = useNavigate()

  return (
    <div style={{ background: 'rgb(64,64,64)', height: '100%', overflow: 'auto' }}>
      <h1>Page404</h1>
      <button className={'button'} onClick={() => navigate('/', { replace: true })}>返回首页</button>
    </div>
  )
}

export default Component
