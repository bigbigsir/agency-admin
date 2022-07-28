import React, {
  useState,
  useEffect
} from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Rule } from 'antd/es/form'
import { ArrowUpOutlined } from '@ant-design/icons'
import { Modal, Form, Input, Radio, Checkbox, Descriptions, Divider, InputNumber, Typography } from 'antd'
import scss from '../index.module.scss'

interface CreateFormProps {
  record?: any
  visible: boolean
  onCancel: () => void
  onSuccess: () => void
}

const ModalForm: React.FC<CreateFormProps> = (props) => {
  const intl = useIntl()
  const { record, visible, onCancel, onSuccess } = props
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm()
  const requiredRule: Rule[] = [
    {
      required: true
    }
  ]

  useEffect(toggleVisible, [visible, record])

  function toggleVisible () {
    if (record && visible) {
      form.setFieldsValue(record)
    } else {
      form.resetFields()
    }
  }

  function onFinish (values: Record<string, any>) {
    console.log(values)
    setLoading(true)
  }

  return (
    <Modal
      title='下线取款'
      visible={visible}
      className={'common-modal ' + scss.modal}
      maskClosable={false}
      confirmLoading={loading}
      onOk={() => form.submit()}
      onCancel={onCancel}>
      <Descriptions size={'middle'} column={3} layout="vertical" bordered>
        <Descriptions.Item label="上级代理">OK888888</Descriptions.Item>
        <Descriptions.Item label="代理线">
          币种：RMB 占成：0.00% 洗码：1.50%
        </Descriptions.Item>
        <Descriptions.Item label="额度">
          <p style={{ minWidth: 100 }}>100000</p>
        </Descriptions.Item>
      </Descriptions>
      <p className={scss.arrow}>
        <Typography.Text type='success'>
          <ArrowUpOutlined/>
        </Typography.Text>
      </p>
      <Descriptions size={'middle'} column={3} layout="vertical" bordered>
        <Descriptions.Item label="下级代理">OK888888</Descriptions.Item>
        <Descriptions.Item label="代理线">
          币种：RMB 占成：0.00% 洗码：1.50%
        </Descriptions.Item>
        <Descriptions.Item label="额度">
          <p style={{ minWidth: 100 }}>1000</p>
        </Descriptions.Item>
      </Descriptions>
      <Divider/>
      <Form
        name='withdrawal'
        form={form}
        labelCol={{ span: 4 }}
        onFinish={onFinish}>
        <Form.Item name="name1" label="取款额度" rules={requiredRule}>
          <InputNumber className='width-full' placeholder="请输入"/>
        </Form.Item>
        <Form.Item name="name2" label="备注">
          <Input.TextArea rows={4} placeholder="请输入"/>
        </Form.Item>
        <Form.Item name="newPassword1" label="操作密码" rules={requiredRule}>
          <Input.Password maxLength={20} placeholder="请输入" visibilityToggle={false} onPressEnter={() => form.submit()}/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalForm
