import React from 'react'
import { Spin, Space } from 'antd'

export default function PageLoading () {
  return (
    <div style={{
      paddingTop: 100,
      textAlign: 'center'
    }}>
      <Space>
        <Spin size="large"/>
      </Space>
    </div>
  )
}
