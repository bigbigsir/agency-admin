import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Tabs, List } from 'antd'
import { PaginationProps } from 'antd/es/pagination'
import { paginationDefault } from '@/utils/hooks'
import * as api from './api'
import scss from './index.module.scss'

interface ListItem {
  name: string,
  time: string
}

function MessageList ({ tab }: { tab: string }) {
  const [list, setList] = useState<ListItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<PaginationProps>({
    ...paginationDefault,
    onChange (page, pageSize) {
      getList({ page, pageSize })
    }
  })

  useEffect(getList, [])

  function getList (params?: Record<string, any>) {
    params = {
      tab,
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...params
    }
    setLoading(true)
    api.getMessages(params).then(({ data, success }) => {
      if (success) {
        setList(data)
        setPagination(sate => ({
          ...sate,
          total: data.total,
          current: data.page
        }))
      }
      setLoading(false)
    }).finally(() => {
      const data = [
        {
          name: '未读消息',
          time: '2020-05-07 13:55:01'
        }, {
          name: '未读消息',
          time: '2020-05-07 13:55:01'
        }
      ]
      setList(data)
      setLoading(false)
    })
  }

  return (
    <List
      loading={loading}
      itemLayout="horizontal"
      dataSource={list}
      pagination={pagination}
      renderItem={item => (
        <List.Item className={scss.message__item}>
          <List.Item.Meta
            title={item.name}
            description="2020-05-07 13:55:01"/>
        </List.Item>
      )}
    />
  )
}

const Index: React.FC = () => {
  const intl = useIntl()
  const [tab, setTab] = useState<string>('unread')

  return (
    <div className={['common', scss.page].join(' ')}>
      <Tabs defaultActiveKey={tab} centered onChange={e => setTab(e)}>
        <Tabs.TabPane tab="全部" key="all">
          <MessageList tab={tab}/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="未读" key="unread">
          <MessageList tab={tab}/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="已读" key="read">
          <MessageList tab={tab}/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Index
