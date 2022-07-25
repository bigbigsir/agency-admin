import React, { useState } from 'react'
import { Modal, Form, Input } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { Rule } from 'antd/es/form'
import { passwordReg } from '@/utils/regexp'
import * as api from '@/views/login/api'

interface Props {
  visible: boolean
  onCancel: () => void
  onSuccess: () => void
}

function UpdatePassword (props: Props) {
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
  const passwordRule: Rule[] = [
    ...requiredRule,
    {
      pattern: passwordReg,
      message: <FormattedMessage id={'login.password.regexp'}/>
    }
  ]
  const newPasswordRule: Rule[] = [
    ...passwordRule,
    {
      validator (rule, value) {
        if (value === form.getFieldValue('password')) {
          return Promise.reject('新密码与旧密码不能相同')
        }
        return Promise.resolve()
      }
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
      title="修改密码"
      visible={visible}
      maskClosable={false}
      confirmLoading={loading}
      onOk={() => form.submit()}
      onCancel={onCancel}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}>
        <Form.Item name="password" label="旧密码" rules={passwordRule} validateFirst>
          <Input.Password maxLength={20} placeholder="请输入" autoComplete="off" visibilityToggle={false}/>
        </Form.Item>
        <Form.Item name="newPassword" label="新密码" rules={newPasswordRule} validateFirst>
          <Input.Password maxLength={20} placeholder="请输入"/>
        </Form.Item>
        <Form.Item name="confirmPassword" label="确认新密码" rules={confirmPasswordRule} validateFirst
          dependencies={['newPassword']}>
          <Input.Password
            maxLength={20}
            placeholder="请输入"
            visibilityToggle={false}
            onPressEnter={() => form.submit()}/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdatePassword
