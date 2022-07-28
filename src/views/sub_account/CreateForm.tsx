import React, { useState, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Rule } from 'antd/es/form'
import { Modal, Form, Input, Radio, Descriptions, Divider } from 'antd'
import { passwordReg } from '@/utils/regexp'
import * as api from './api'
import scss from './index.module.scss'

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

  useEffect(toggleVisible, [visible, record])

  function toggleVisible () {
    if (record && visible) {
      form.setFieldsValue(record)
    } else {
      form.resetFields()
    }
    setTitle(intl.formatMessage({ id: record ? 'update' : 'add' }))
  }

  function onFinish (values: Record<string, any>) {
    setLoading(true)
    api.addSubAccount(values).then(({ success }) => {
      if (success) {
        onCancel()
        onSuccess()
      }
      setLoading(false)
    }).finally(() => {
      onCancel()
      onSuccess()
      setLoading(false)
    })
  }

  return (
    <Modal
      title={title}
      visible={visible}
      className={'common-modal ' + scss.modal}
      forceRender
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
        <Form.Item label="会员号">
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
        <Form.Item name="phone3" label="账号权限" rules={requiredRule}>
          <Radio.Group>
            <Radio value={1}>下线代理</Radio>
            <Radio value={2}>游戏会员</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="phone22" label="账号状态" rules={requiredRule}>
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={2}>禁用</Radio>
          </Radio.Group>
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
