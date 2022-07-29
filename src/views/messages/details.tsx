import React from 'react'
import { useIntl } from 'react-intl'
import { Button, Divider } from 'antd'
import scss from './index.module.scss'
import { RollbackOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import * as api from './api'

const Index: React.FC = () => {
  const intl = useIntl()
  const navigate = useNavigate()

  function back () {
    navigate('/messages', { replace: true })
  }

  return (
    <div className={'common ' + scss.details}>
      <div className={scss.details__header}>
        <Button
          type="primary"
          icon={<RollbackOutlined/>}
          className={scss.details__button}
          onClick={back}>
          {intl.formatMessage({ id: 'back' })}
        </Button>
        <h2 className={scss.details__title}>
          消息标题
        </h2>
      </div>
      <Divider/>
      <p className={scss.details__time}>2022-06-22 12:00:00</p>
      <p className={scss.details__content}>
        Aenean euismod bibendum laoreet. Proin gravida dolor
        sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et
        magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis
        tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
        euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales
        pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam
        fermentum, nulla luctuspharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor
        sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et
        magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis
        tellus mollis orci, sed rhoncus sapien nunc eget.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor
        sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et
        magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis
        tellus mollis orci, sed rhoncus sapien nunc eget
      </p>
    </div>
  )
}

export default Index
