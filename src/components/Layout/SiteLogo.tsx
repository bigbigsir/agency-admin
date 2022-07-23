import React from 'react'
import classNames from 'classnames/bind'
import { LayoutConfig, SiderWidth, Theme } from '@/components/Layout/index'
import scss from './index.module.scss'

const cx = classNames.bind(scss)

interface SiteLogoProps extends LayoutConfig {
  theme: Theme
  sideWidth: SiderWidth
}

const SiteLogo: React.FC<SiteLogoProps> = (props) => {
  const {
    theme,
    sideWidth,
    collapsed
  } = props
  const width = !collapsed ? sideWidth.width : sideWidth.collapsedWidth
  return (
    <div
      style={{ width }}
      className={cx('site', theme, { collapsed })}>
      <img className={cx('site__icon')} src={require('@/assets/img/logo.png')} alt=""/>
      {
        !collapsed &&
        <span className={cx('site__title')}>代理后台</span>
      }

    </div>
  )
}

export default SiteLogo
