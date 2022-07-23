import React from 'react'
import { Dropdown, Badge, Tabs, List, Avatar, Button } from 'antd'
import { NotificationOutlined } from '@ant-design/icons'
import scss from '../index.module.scss'

interface Props {
  className?: string;
}

const MessageDropdown: React.FC<Props> = ({ className }) => {
  const data = [
    {
      title: 'Ant Design Title 1'
    },
    {
      title: 'Ant Design Title 2'
    },
    {
      title: 'Ant Design Title 3'
    },
    {
      title: 'Ant Design Title 4'
    }
  ]
  const overlay = (
    <Tabs className={scss.message} defaultActiveKey="1" centered>
      <Tabs.TabPane tab="未读消息" key="1">
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item className={scss.message__item}>
              <List.Item.Meta
                title={item.title}
                avatar={<Avatar src={require('./img/email.png')}/>}
                description="2020-05-07 13:55:01"
              />
            </List.Item>
          )}
        />
        <div className={scss.message__bottom}>
          <Button type="link">查看全部</Button>
        </div>
      </Tabs.TabPane>
    </Tabs>
  )

  return (
    <Dropdown
      overlay={overlay}
      placement="bottomRight">
      <div className={className}>
        <Badge size="small" count={5}>
          <NotificationOutlined/>
        </Badge>
      </div>
    </Dropdown>
  )
}

export default MessageDropdown
