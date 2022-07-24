import React from 'react'
import { Dropdown, Divider, Menu, MenuProps } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Currency, setCurrency, getCurrencySelector } from '@/store/slice/currency'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import scss from '../index.module.scss'

interface Props {
  className?: string;
}

const CurrencyDropdown: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch()
  const currency = useSelector(getCurrencySelector)
  const currencyList = [
    {
      key: 'PHP',
      currency: '🇵🇭 PHP',
      proportion: '0.00%',
      brokerage: '1.90%',
      balance: '1,000万'
    },
    {
      key: 'RMB',
      currency: '🇨🇳 RMB',
      proportion: '0.00%',
      brokerage: '1.90%',
      balance: '1,000万'
    },
    {
      key: 'HKD',
      currency: '🇭🇰 HKD',
      proportion: '0.00%',
      brokerage: '1.90%',
      balance: '1,000万'
    },
    {
      key: 'KRW',
      currency: '🇰🇷 KRW',
      proportion: '0.00%',
      brokerage: '1.90%',
      balance: '1,000万'
    }
  ]

  const menuItems: ItemType[] = [
    {
      type: 'group',
      label: '选择交收方案',
      className: scss.currency__item
    },
    ...currencyList.map(item => ({
      key: item.key,
      label: (
        <div className={'monospaced-font'}>
          <span>币种：{item.currency}</span>
          <Divider type="vertical"/>
          <span>占成：{item.proportion}</span>
          <Divider type="vertical"/>
          <span>洗码：{item.brokerage}</span>
          <Divider type="vertical"/>
          <span>余额：{item.balance}</span>
        </div>
      ),
      className: scss.currency__item
    }))
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    dispatch(setCurrency(key as Currency))
  }

  return (
    <Dropdown
      overlay={<Menu onClick={onClick} items={menuItems} selectedKeys={[currency]}/>}
      placement="bottomRight">
      <div className={className}>
        <span style={{ fontSize: 14 }} className={'monospaced-font'}>
          {currencyList.find(i => i.key === currency)?.currency}
        </span>
      </div>
    </Dropdown>
  )
}

export default CurrencyDropdown
