import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Descriptions, Tag, Space, Button, List, Divider, Table, Card, Tree, Row, Col } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { DataNode, TreeProps } from 'antd/es/tree'
import { PaginationProps } from 'antd/es/pagination'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { TableProps } from 'antd/lib/table/Table'
import CreateForm from './components/CreateForm'
import DepositForm from './components/DepositForm'
import WithdrawalForm from './components/WithdrawalForm'
import NameInputGroup from '@/components/NameInputGroup'
import * as api from './api'
import scss from './index.module.scss'
import { SortOrder } from 'antd/es/table/interface'
import { paginationDefault } from '@/utils/hooks'
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
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [treeData, setTreeData] = useState<DataNode[]>([
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0'
            },
            {
              title: 'leaf',
              key: '0-0-0-1'
            }
          ]
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [
            { title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }
          ]
        }
      ]
    }
  ])
  const [sortOrder, setSortOrder] = useState<Record<string, SortOrder | undefined>>({ name: 'ascend' })
  const [pagination, setPagination] = useState<PaginationProps>(paginationDefault)
  const [modalVisible, setModalVisible] = useState<Record<string, boolean>>({})

  const columns: ColumnsType<ListItem> = [
    {
      title: '下线会员号',
      dataIndex: 'menu'
    },
    {
      title: '账户号',
      dataIndex: 'name'
    },
    {
      title: '余额',
      dataIndex: 'key'
    },
    {
      title: '下线数',
      dataIndex: 'key'
    },
    {
      title: '联系电话',
      dataIndex: 'key'
    },
    {
      title: '账号状态',
      dataIndex: 'key'
    },
    {
      title: '账号类型',
      dataIndex: 'key'
    },
    {
      title: '开户时间',
      dataIndex: 'key'
    },
    {
      title: '操作',
      fixed: 'right',
      width: 220,
      dataIndex: 'key',
      render (v, record) {
        return <>
          <a onClick={() => update(record)}>
            {intl.formatMessage({ id: 'update' })}
          </a>
          <Divider type="vertical"/>
          <a onClick={() => deposit()}>存款</a>
          <Divider type="vertical"/>
          <a onClick={() => withdrawal()}>取款</a>
          <Divider type="vertical"/>
          <a>提案归档</a>
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
    setLoading(state => ({ ...state, table: true }))
    api.getUnderline(params).then(({ data, success }) => {
      if (success) {
        setList(data)
        setSortOrder(params.sort)
        setPagination(sate => ({
          ...sate,
          total: data.total,
          current: data.page
        }))
      }
      setLoading(state => ({ ...state, table: false }))
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
      setLoading(state => ({ ...state, table: false }))
      setSortOrder(params.sort)
    })
  }

  function add () {
    setRecord(undefined)
    setModalVisible({ create: true })
  }

  function update (record: ListItem) {
    setRecord(record)
    setModalVisible({ create: true })
  }

  function deposit () {
    setRecord(record)
    setModalVisible({ deposit: true })
  }

  function withdrawal () {
    setRecord(record)
    setModalVisible({ withdrawal: true })
  }

  function nameOnchange (params: Record<string, string>) {
    setFilters(params)
  }

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
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
          新增下线
        </Button>
        <NameInputGroup onChange={nameOnchange}/>
        <Button onClick={() => getList()} type="primary" icon={<SearchOutlined/>}>
          搜索
        </Button>
      </Space>
      <Row>
        <Col span={4}>
          <Card size={'small'} className={scss.card} title="下线代理">
            <Tree
              treeData={treeData}
              blockNode
              onSelect={onSelect}
            />
          </Card>
          <Card size={'small'} className={scss.card} title="直属会员">
            <List
              size={'small'}
              dataSource={['1', '2']}
              renderItem={item => (
                <List.Item>
                  {item}
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={20}>
          <Table
            rowKey="id"
            scroll={{ x: 1200 }}
            loading={loading.table}
            columns={columns}
            dataSource={list}
            pagination={pagination}
            onChange={onChange}/>
        </Col>
      </Row>
      <CreateForm
        record={record}
        visible={modalVisible.create}
        onCancel={() => setModalVisible({})}
        onSuccess={() => getList()}/>
      <DepositForm
        visible={modalVisible.deposit}
        record={{}}
        onCancel={() => setModalVisible({})}
        onSuccess={() => getList()}/>
      <WithdrawalForm
        visible={modalVisible.withdrawal}
        record={{}}
        onCancel={() => setModalVisible({})}
        onSuccess={() => getList()}/>
    </div>
  )
}

export default Index
