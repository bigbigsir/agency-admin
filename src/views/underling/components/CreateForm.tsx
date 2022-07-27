import React, {
  useState,
  useEffect
} from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Rule } from 'antd/es/form'
import { ColumnsType } from 'antd/es/table'
import { Modal, Form, Input, Radio, Checkbox, Descriptions, Divider, InputNumber, Table } from 'antd'
import scss from '../index.module.scss'
import { passwordReg } from '@/utils/regexp'
import { TableRowSelection } from 'antd/lib/table/interface'

interface CreateFormProps {
  record?: any
  visible: boolean
  onCancel: () => void
  onSuccess: () => void
}

const ModalForm: React.FC<CreateFormProps> = (props) => {
  const intl = useIntl()
  const { record, visible, onCancel, onSuccess } = props
  const [title, setTitle] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm()
  const requiredRule: Rule[] = [
    {
      required: true
    }
  ]
  const passwordRule: Rule[] = [
    ...requiredRule,
    {
      pattern: passwordReg,
      message: <FormattedMessage id={'login.password.regexp'}/>
    }
  ]
  const confirmPasswordRule: Rule[] = [
    ...passwordRule,
    {
      validator (rule, value) {
        if (form.getFieldValue('newPassword') !== value) {
          return Promise.reject('两次输入的密码不匹配')
        }
        return Promise.resolve()
      }
    }
  ]

  const data: any = [
    {
      key: '1',
      name: '5K~300K',
      age: '5K~300K',
      address: '5K~300K'
    },
    {
      key: '2',
      name: '5K~300K',
      age: '5K~300K',
      address: '5K~300K'
    },
    {
      key: '3',
      name: '5K~300K',
      age: '5K~300K',
      address: '5K~300K'
    }
  ]

  const columns: ColumnsType<any> = [
    {
      title: '庄/闲',
      dataIndex: 'name'
    },
    {
      title: '和',
      dataIndex: 'age'
    },
    {
      title: '对子',
      dataIndex: 'address'
    }
  ]

  useEffect(toggleVisible, [visible, record])

  function toggleVisible () {
    if (record && visible) {
      form.setFieldsValue(record)
    } else {
      form.resetFields()
    }
    setTitle(intl.formatMessage({ id: record ? 'update' : 'add' }))
  }

  const rowSelectionOnChange: TableRowSelection<any>['onChange'] = (keys) => {
    form.setFieldsValue({ new1: keys[0] })
  }

  function onFinish (values: Record<string, any>) {
    console.log(values)
    setLoading(true)
  }

  return (
    <Modal
      title={title}
      visible={visible}
      forceRender
      className={'common-modal ' + scss.modal}
      maskClosable={false}
      confirmLoading={loading}
      onOk={() => form.submit()}
      onCancel={onCancel}>
      <Descriptions size={'middle'} column={4} layout="vertical" bordered>
        <Descriptions.Item label="直属代理">OK888888</Descriptions.Item>
        <Descriptions.Item label="币种">PHP</Descriptions.Item>
        <Descriptions.Item label="占成">5%</Descriptions.Item>
        <Descriptions.Item label="洗码">0%</Descriptions.Item>
      </Descriptions>
      <Divider/>
      <Form
        form={form}
        labelCol={{ span: 5 }}
        onFinish={onFinish}>
        <Form.Item name="id" noStyle>
          <Input hidden type="text"/>
        </Form.Item>
        <Form.Item label="下线会员号">
          <span>laskwqke123</span>
        </Form.Item>
        <Form.Item name="name" label="账户号" rules={requiredRule}>
          <Input maxLength={16} placeholder="6-20位数字或字母"/>
        </Form.Item>
        <Form.Item name="name2" label="账户昵称" rules={requiredRule}>
          <Input maxLength={16} placeholder="账户昵称"/>
        </Form.Item>
        <Form.Item name="newPassword" label="密码" rules={passwordRule} validateFirst>
          <Input.Password maxLength={20} placeholder="6-20位数字或字母"/>
        </Form.Item>
        <Form.Item name="confirmPassword" label="确认密码" rules={confirmPasswordRule} validateFirst
          dependencies={['newPassword']}>
          <Input.Password
            maxLength={20}
            placeholder="6-20位数字或字母"
            visibilityToggle={false}
            onPressEnter={() => form.submit()}/>
        </Form.Item>
        <Form.Item name="phone1" label="电话号码" rules={requiredRule}>
          <Input maxLength={20} placeholder="例：8613800180000"/>
        </Form.Item>
        <Form.Item name="phone2" label="备用号码" rules={requiredRule}>
          <Input maxLength={20} placeholder="例：8613800180000"/>
        </Form.Item>
        <Form.Item label="账号类型" required>
          <Form.Item name="phone3" rules={requiredRule}>
            <Radio.Group>
              <Radio value={1}>下线代理</Radio>
              <Radio value={2}>游戏会员</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="phone21" rules={requiredRule}>
            <Checkbox.Group>
              <Checkbox value={1}>禁用账号（停用代理网及游戏功能）</Checkbox>
              <br/>
              <Checkbox value={2}>同时禁用所有下线</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item name="phone2111" rules={requiredRule} noStyle>
            <Checkbox.Group>
              <Checkbox>禁用投注（停用游戏功能）</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Form.Item>
        <Form.Item label='游戏条件' required>
          <Form.Item>
            <span>占成比 </span>
            <Form.Item name="a123" rules={requiredRule} noStyle>
              <InputNumber/>
            </Form.Item>
            <span> 上线 0%</span>
          </Form.Item>
          <Form.Item noStyle>
            <span>洗码比 </span>
            <Form.Item name="a2223" rules={requiredRule} noStyle>
              <InputNumber/>
            </Form.Item>
            <span> 上线 1.45%</span>
          </Form.Item>
        </Form.Item>
        <Form.Item label='投注限红' required>
          <Form.Item name="new1" rules={requiredRule} noStyle>
            <Input type='hidden' maxLength={20} placeholder="请输入"/>
          </Form.Item>
          <Table
            bordered
            rowSelection={{
              type: 'radio',
              onChange: rowSelectionOnChange
            }}
            columns={columns}
            dataSource={data}
            pagination={false}/>
        </Form.Item>
        <Divider/>
        <Form.Item name="newPassword1" label="操作密码" rules={requiredRule}>
          <Input.Password maxLength={20} placeholder="请输入" visibilityToggle={false} onPressEnter={() => form.submit()}/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalForm
