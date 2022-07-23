import React from 'react'
import { Dropdown, Divider, Menu, MenuProps } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Currency, setCurrency, getCurrencySelector } from '@/store/slice/currency'
import { ItemType } from 'antd/lib/menu/hooks/useItems'

interface Props {
  className?: string;
}

const CurrencyDropdown: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch()
  const currency = useSelector(getCurrencySelector)

  const menuItems: ItemType[] = [
    {
      type: 'group',
      label: '选择交收方案'
    },
    {
      key: 'PHP',
      label: (
        <div>
          <span>币种：🇵🇭 PHP</span>
          <Divider type="vertical"/>
          <span>占成：0.00%</span>
          <Divider type="vertical"/>
          <span>洗码：1.90%</span>
          <Divider type="vertical"/>
          <span>余额：1,000万</span>
        </div>
      )
    },
    {
      key: 'RMB',
      label: (
        <div>
          <span>币种：🇨🇳 RMB</span>
          <Divider type="vertical"/>
          <span>占成：0.00%</span>
          <Divider type="vertical"/>
          <span>洗码：1.90%</span>
          <Divider type="vertical"/>
          <span>余额：1,000万</span>
        </div>
      )
    },
    {
      key: 'HKD',
      label: (
        <div>
          <span>币种：🇭🇰 HKD</span>
          <Divider type="vertical"/>
          <span>占成：0.00%</span>
          <Divider type="vertical"/>
          <span>洗码：1.90%</span>
          <Divider type="vertical"/>
          <span>余额：1,000万</span>
        </div>
      )
    },
    {
      key: 'KRW',
      label: (
        <div>
          <span>币种：🇰🇷 KRW</span>
          <Divider type="vertical"/>
          <span>占成：0.00%</span>
          <Divider type="vertical"/>
          <span>洗码：1.90%</span>
          <Divider type="vertical"/>
          <span>余额：1,000万</span>
        </div>
      )
    }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    dispatch(setCurrency(key as Currency))
  }

  return (
    <Dropdown
      overlay={<Menu onClick={onClick} items={menuItems} selectedKeys={[currency]}/>}
      placement="bottomRight">
      <div className={className}>
        <span style={{ fontSize: 14 }}>🇨🇳 RMB</span>
      </div>
    </Dropdown>
  )
}

export default CurrencyDropdown
