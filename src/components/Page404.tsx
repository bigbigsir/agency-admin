import React from 'react'
import { Result, Button } from 'antd'
import { useNavigate } from 'react-router'

const Index: React.FC = () => {
  const navigate = useNavigate()

  function backHome () {
    navigate('/')
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button onClick={backHome} type="primary">Back Home</Button>}
    />
  )
}

export default Index
