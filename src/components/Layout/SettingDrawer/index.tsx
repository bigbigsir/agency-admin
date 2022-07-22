import React from 'react'
import { Drawer, Tooltip, Select, Divider, Switch } from 'antd'
import classNames from 'classnames/bind'
import { CheckOutlined } from '@ant-design/icons'
import { LayoutConfig, Payload, MenuLocation, Theme } from '@/components/Layout'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { ComponentSize, State } from '@/store/types'
import { setComponentSize } from '@/store/actions/common'
import scss from './index.module.scss'

const cx = classNames.bind(scss)

interface SizeItem {
  key: ComponentSize
  label: string
}

interface ThemeItem {
  value: Theme
  label: string
}

interface LayoutItem {
  img: string
  title: string
  key: MenuLocation
}

interface Props extends LayoutConfig {
  drawerVisible: boolean
  toggleDrawerVisible: (payload: boolean) => void
  assignLayoutConfig: (payload: Payload) => void
}

const Index: React.FC<Props> = (props) => {
  const {
    showTabs,
    siderTheme,
    headerTheme,
    fixedHeader,
    menuLocation,
    drawerVisible,
    contentWidthType,
    assignLayoutConfig,
    toggleDrawerVisible
  } = props
  const intl = useIntl()
  const dispatch = useDispatch()
  const componentSize = useSelector<State, ComponentSize>(state => state.componentSize)

  const sizes: SizeItem[] = [
    {
      key: 'small',
      label: intl.formatMessage({ id: 'layout.componentSize.small' })
    },
    {
      key: 'middle',
      label: intl.formatMessage({ id: 'layout.componentSize.middle' })
    },
    {
      key: 'large',
      label: intl.formatMessage({ id: 'layout.componentSize.large' })
    }
  ]
  const themeList: ThemeItem[] = [
    {
      value: 'dark',
      label: intl.formatMessage({ id: 'layout.settingDrawer.dark' })
    }, {
      value: 'light',
      label: intl.formatMessage({ id: 'layout.settingDrawer.light' })
    }
  ]
  const layoutList: LayoutItem[] = [
    {
      key: 'left',
      title: intl.formatMessage({ id: 'layout.settingDrawer.sideMenuLayout' }),
      img: require('./img/menu_in_left.svg')
    }, {
      key: 'top',
      title: intl.formatMessage({ id: 'layout.settingDrawer.topMenuLayout' }),
      img: require('./img/menu_in_head.svg')
    }, {
      key: 'mix',
      title: intl.formatMessage({ id: 'layout.settingDrawer.mixMenuLayout' }),
      img: require('./img/menu_in_left_full_head.svg')
    }
  ]

  function setSize (v: any) {
    dispatch(setComponentSize(v as ComponentSize))
  }

  function onClose () {
    toggleDrawerVisible(false)
  }

  return (
    <Drawer
      placement="right"
      closable={true}
      visible={drawerVisible}
      onClose={onClose}
    >
      <div className={cx('setting')}>
        <h3 className={cx('setting__title')}>
          {intl.formatMessage({ id: 'layout.settingDrawer.themeColor' })}
        </h3>
        <div className={cx('setting__nav')}>
          <div className={cx('setting__nav-item')}>
            <span>
              {intl.formatMessage({ id: 'layout.settingDrawer.themeHeader' })}
            </span>
            <Select
              size="small"
              value={headerTheme}
              style={{ width: 80 }}
              onChange={v => assignLayoutConfig({ headerTheme: v })}>
              {
                themeList.map(item => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                ))
              }
            </Select>
          </div>
          <div className={cx('setting__nav-item')}>
            <span>
              {intl.formatMessage({ id: 'layout.settingDrawer.themeSide' })}
            </span>
            <Select
              size="small"
              value={siderTheme}
              style={{ width: 80 }}
              onChange={v => assignLayoutConfig({ siderTheme: v })}
            >
              {
                themeList.map(item => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                ))
              }
            </Select>
          </div>
        </div>
        <Divider/>
        <h3 className={cx('setting__title')}>
          {intl.formatMessage({ id: 'layout.settingDrawer.navigationMode' })}
        </h3>
        <div className={cx('setting__checkbox')}>
          {
            layoutList.map((item, index) => (
              <Tooltip key={index} title={item.title}>
                <div onClick={() => assignLayoutConfig({ menuLocation: item.key })}
                  className={cx('setting__checkbox-item')}>
                  <img src={item.img} alt=""/>
                  {
                    item.key === menuLocation &&
                    <span className={cx('setting__icon-checked')}>
                      <CheckOutlined/>
                    </span>
                  }
                </div>
              </Tooltip>
            ))
          }
        </div>
        <div className={cx('setting__nav')}>
          <div className={cx('setting__nav-item')}>
            <span>
              {intl.formatMessage({ id: 'layout.settingDrawer.contentWidth' })}
            </span>
            <Select
              size="small"
              style={{ width: 80 }}
              value={contentWidthType}
              onChange={v => assignLayoutConfig({ contentWidthType: v })}>
              <Select.Option value="fluid">
                {intl.formatMessage({ id: 'layout.settingDrawer.fluid' })}
              </Select.Option>
              <Select.Option value="fixed">
                {intl.formatMessage({ id: 'layout.settingDrawer.fixed' })}
              </Select.Option>
            </Select>
          </div>
          <div className={cx('setting__nav-item')}>
            <span>
              {intl.formatMessage({ id: 'layout.settingDrawer.fixedHeader' })}
            </span>
            <Switch
              size="small"
              checked={fixedHeader}
              onChange={v => assignLayoutConfig({ fixedHeader: v })}/>
          </div>
          <div className={cx('setting__nav-item')}>
            <span>
              {intl.formatMessage({ id: 'layout.settingDrawer.tabs' })}
            </span>
            <Switch
              size="small"
              checked={showTabs}
              onChange={v => assignLayoutConfig({ showTabs: v })}/>
          </div>
        </div>
        <Divider/>
        <h3 className={cx('setting__title')}>
          {intl.formatMessage({ id: 'layout.settingDrawer.regionalSettings' })}
        </h3>
        <div className={cx('setting__nav')}>
          <div className={cx('setting__nav-item')}>
            <span>
              {intl.formatMessage({ id: 'layout.settingDrawer.componentSize' })}
            </span>
            <Select
              size="small"
              value={componentSize}
              style={{ width: 80 }}
              onChange={setSize}>
              {
                sizes.map(item => (
                  <Select.Option value={item.key} key={item.key}>
                    {item.label}
                  </Select.Option>
                ))
              }
            </Select>
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default Index
