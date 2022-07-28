import React, { useEffect, useState } from 'react'
import { SortOrder } from 'antd/es/table/interface'
import { useIntl } from 'react-intl'
import { Descriptions, Tag, Space, Button, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { PaginationProps } from 'antd/es/pagination'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { TableProps } from 'antd/lib/table/Table'
import { paginationDefault } from '@/utils/hooks'
import CreateForm from './CreateForm'
import NameInputGroup from '@/components/NameInputGroup'
import * as api from './api'
import scss from './index.module.scss'
import { SorterResult } from 'antd/lib/table/interface'

interface ListItem {
  id: number
  name: string
}

const Index: React.FC = () => {
  const intl = useIntl()
  const [list, setList] = useState<ListItem[]>([])
  const [record, setRecord] = useState<ListItem>()
  const [filters, setFilters] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [sortOrder, setSortOrder] = useState<Record<string, SortOrder | undefined>>({ name: 'ascend' })
  const [pagination, setPagination] = useState<PaginationProps>(paginationDefault)
  const [modalVisible, setModalVisible] = useState<Record<string, boolean>>({})

  const columns: ColumnsType<ListItem> = [
    {
      title: '子账号会员号',
      dataIndex: 'name',
      sorter: true,
      sortOrder: sortOrder.name
    },
    {
      title: '子账号账户号',
      dataIndex: 'name1'
    },
    {
      title: '账号状态',
      dataIndex: 'status',
      sorter: true,
      sortOrder: sortOrder.status
    },
    {
      title: '联系电话',
      dataIndex: 'key'
    },
    {
      title: '权限',
      dataIndex: 'auth',
      sorter: true,
      sortOrder: sortOrder.auth
    },
    {
      title: '开户时间',
      dataIndex: 'create',
      sorter: true,
      sortOrder: sortOrder.create
    },
    {
      title: '最后登录时间',
      dataIndex: 'last',
      sorter: true,
      sortOrder: sortOrder.last
    },
    {
      title: '操作',
      fixed: 'right',
      width: 100,
      dataIndex: 'key',
      render (v, record) {
        return <>
          <a onClick={() => update(record)}>
            {intl.formatMessage({ id: 'update' })}
          </a>
        </>
      }
    }
  ]

  useEffect(getList, [])

  function getList (options?: Record<string, any>) {
    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      sort: sortOrder,
      ...filters,
      ...options
    }
    setLoading(true)
    api.getSubAccount(params).then(({ data, success }) => {
      if (success) {
        setList(data)
        setSortOrder(params.sort)
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
          id: 1,
          name: '2020-05-07 13:55:01'
        }, {
          id: 2,
          name: '2020-05-07 13:55:01'
        }
      ]
      setList(data)
      setLoading(false)
      setSortOrder(params.sort)
    })
  }

  function add () {
    setModalVisible({ create: true })
  }

  function update (record: ListItem) {
    setRecord(record)
    setModalVisible({ create: true })
  }

  function nameOnchange (params: Record<string, string>) {
    setFilters(params)
  }

  const onChange: TableProps<ListItem>['onChange'] = (pagination, filters, sorter) => {
    getList({
      sort: { [(sorter as SorterResult<ListItem>).field as string]: (sorter as SorterResult<ListItem>).order },
      page: pagination.current,
      pageSize: pagination.pageSize
    })
  }

  return (
    <div className={'common ' + scss.page}>
      <Descriptions size={'middle'} layout="vertical" column={6} bordered>
        <Descriptions.Item label="会员号">OK888888(tttttt)</Descriptions.Item>
        <Descriptions.Item label="币种">PHP</Descriptions.Item>
        <Descriptions.Item label="占成">5%</Descriptions.Item>
        <Descriptions.Item label="可用余额">15.50万</Descriptions.Item>
        <Descriptions.Item label="总线余额">30.50万</Descriptions.Item>
        <Descriptions.Item label="账号状态">
          <Tag color="success">success</Tag>
        </Descriptions.Item>
      </Descriptions>
      <Space className={'common__toolbar'} size={'middle'}>
        <Button onClick={add} type="primary" icon={<PlusOutlined/>}>
          新增子账号
        </Button>
        <NameInputGroup onChange={nameOnchange}/>
        <Button onClick={() => getList()} type="primary" icon={<SearchOutlined/>}>
          搜索
        </Button>
      </Space>
      <Table
        rowKey="id"
        scroll={{ x: 1200 }}
        loading={loading}
        columns={columns}
        dataSource={list}
        pagination={pagination}
        onChange={onChange}/>
      <CreateForm
        record={record}
        visible={modalVisible.create}
        onCancel={() => setModalVisible({})}
        onSuccess={() => getList()}/>
    </div>
  )
}

export default Index
