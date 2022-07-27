import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Button, Form, Input, Alert } from 'antd'
import { Rule } from 'antd/es/form'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { setToken } from '@/store/slice/token/actions'
import { usernameReg, passwordReg } from '@/utils/regexp'
import LocaleDropdown from '@/components/Layout/Header/LocaleDropdown'
import * as api from './api'
import styles from './index.module.scss'

interface Values {
  username: string
  password: string
}

const Index: React.FC = () => {
  const intl = useIntl()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  const [form] = Form.useForm<Values>()
  const usernameRule: Rule[] = [
    {
      required: true,
      message: <FormattedMessage id={'required'}/>
    },
    {
      pattern: usernameReg,
      message: <FormattedMessage id={'login.username.regexp'}/>
    }
  ]
  const passwordRule: Rule[] = [
    {
      required: true,
      message: <FormattedMessage id={'required'}/>
    },
    {
      pattern: passwordReg,
      message: <FormattedMessage id={'login.password.regexp'}/>
    }
  ]

  function onFinish (values: Values) {
    const params = {
      ...values,
      _isShowErrorTips: false
    }
    setLoading(true)
    api.login(params).then(({ data, success, message }) => {
      if (success) {
        dispatch(setToken(data))
      } else {
        setErrorMessage(message)
      }
      setLoading(false)
    }).finally(() => dispatch(setToken('token')))
  }

  return (
    <div className={styles.login}>
      <Button className={styles.login__lang} type="text">
        <LocaleDropdown/>
      </Button>
      <header className={styles.login__logo}>
        <img src={require('@/assets/img/logo.png')} alt=""/>
      </header>
      <div className={styles.login__content}>
        <Form
          name="login"
          size="large"
          form={form}
          onFinish={onFinish}>
          {
            errorMessage &&
            <Form.Item>
              <Alert message={errorMessage} type="error" showIcon/>
            </Form.Item>
          }
          <Form.Item name="username" rules={usernameRule}>
            <Input
              prefix={<UserOutlined/>}
              maxLength={50}
              placeholder={intl.formatMessage({ id: 'login.username' })}/>
          </Form.Item>
          <Form.Item name="password" rules={passwordRule}>
            <Input.Password
              prefix={<LockOutlined/>}
              maxLength={20}
              placeholder={intl.formatMessage({ id: 'login.password' })}
              visibilityToggle={false}
              onPressEnter={() => form.submit()}/>
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" block>
              {intl.formatMessage({ id: 'login.login' })}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Index
