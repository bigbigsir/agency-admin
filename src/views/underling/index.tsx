import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Descriptions, Tag, Space, Button, Form, Input, Table, Layout, Card, Tree } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { DataNode, TreeProps } from 'antd/es/tree'
import { PaginationProps } from 'antd/es/pagination'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { TableProps } from 'antd/lib/table/Table'
import CreateForm from './components/CreateForm'
import DepositForm from './components/DepositForm'
import WithdrawalForm from './components/WithdrawalForm'
import RangesRangePicker from '@/components/RangesRangePicker'
import scss from './index.module.scss'
import * as api from './api'

interface ListItem {
  name: string
}

const treeData: DataNode[] = [
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
]

const Index: React.FC = () => {
  const [list, setList] = useState<ListItem[]>([])
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [pagination, setPagination] = useState<PaginationProps>({
    total: 0,
    current: 1,
    pageSize: 10,
    showTotal (total) {
      return (<FormattedMessage id={'showTotal'} values={{ total }}/>)
    },
    showQuickJumper: true,
    showSizeChanger: true
  })
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
      width: 164,
      dataIndex: 'key'
    }
  ]

  function add () {
    setModalVisible({ create: true })
  }

  function add1 () {
    setModalVisible({ deposit: true })
  }

  function add2 () {
    setModalVisible({ withdrawal: true })
  }

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }

  const onChange: TableProps<ListItem>['onChange'] = () => {

  }

  function asd (a: any, b: any) {
    console.log(a, b)
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
        <Button onClick={add1} type="primary" icon={<PlusOutlined/>}>
          存款
        </Button>
        <Button onClick={add2} type="primary" icon={<PlusOutlined/>}>
          取款
        </Button>
        <RangesRangePicker onChange={asd}/>
        <Form layout={'inline'}>
          <Form.Item label="下线会员号">
            <Input placeholder={'请输入'} maxLength={50}/>
          </Form.Item>
          <Form.Item label="账户号">
            <Input placeholder={'请输入'} maxLength={50}/>
          </Form.Item>
          <Button onClick={() => null} type="primary" icon={<SearchOutlined/>}>
            搜索
          </Button>
        </Form>
      </Space>
      <Layout>
        <Layout.Sider width={260} theme={'light'}>
          <Card size={'small'} className={scss.card} title="下线代理">
            <Tree
              treeData={treeData}
              blockNode
              onSelect={onSelect}
            />
          </Card>
          <Card size={'small'} className={scss.card} title="直属会员">
            <p>直属会员1</p>
            <p>直属会员1</p>
            <p>直属会员1</p>
          </Card>
        </Layout.Sider>
        <Layout.Content>
          <Table
            rowKey="id"
            scroll={{ x: 1200 }}
            loading={loading.table}
            columns={columns}
            dataSource={list}
            pagination={pagination}
            onChange={onChange}/>
        </Layout.Content>
      </Layout>
      <CreateForm
        visible={modalVisible.create}
        record={{}}
        onCancel={() => setModalVisible({})}
        onSuccess={() => setModalVisible({})}/>
      <DepositForm
        visible={modalVisible.deposit}
        record={{}}
        onCancel={() => setModalVisible({})}
        onSuccess={() => setModalVisible({})}/>
      <WithdrawalForm
        visible={modalVisible.withdrawal}
        record={{}}
        onCancel={() => setModalVisible({})}
        onSuccess={() => setModalVisible({})}/>
    </div>
  )
}

export default Index
