import React, { useState } from 'react'
import { Modal, Form, Input } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { Rule } from 'antd/es/form'
import * as api from '@/views/login/api'

interface Props {
  visible: boolean
  onCancel: () => void
  onSuccess: () => void
}

function UpdatePhone (props: Props) {
  const { visible, onCancel, onSuccess } = props
  const intl = useIntl()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const requiredRule: Rule[] = [
    {
      required: true,
      message: <FormattedMessage id={'required'}/>
    }
  ]

  function onFinish (values: Record<string, any>) {
    setLoading(true)
    api.updatePassword(values).then(({ data, success }) => {
      if (success) {
        onSuccess()
      }
    }).finally(() => setLoading(false))
  }

  return (
    <Modal
      title="修改电话"
      visible={visible}
      maskClosable={false}
      confirmLoading={loading}
      onOk={() => form.submit()}
      onCancel={onCancel}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}>
        <Form.Item name="phone1" label="电话号码" rules={requiredRule}>
          <Input maxLength={20} placeholder="例：8613800180000"/>
        </Form.Item>
        <Form.Item name="phone2" label="备用号码" rules={requiredRule}>
          <Input maxLength={20} placeholder="例：8613800180000"/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdatePhone
