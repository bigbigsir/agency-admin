import React from 'react'
import classNames from 'classnames/bind'
import { useHistory } from 'react-router'
import { LayoutConfig, SiderWidth, Theme } from '@/components/Layout/index'
import domain from '@/config/domain'
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
    collapsed,
    menuLocation
  } = props
  const history = useHistory()
  const width = !collapsed || menuLocation === 'top' ? sideWidth.width : sideWidth.collapsedWidth
  return (
    <div
      style={{ width }}
      className={cx('site', theme, { collapsed })}
      onClick={() => history.push('/')}>
      <img className={cx('site__icon')} src={domain.logo as unknown as string} alt=""/>
      {
        (!collapsed || menuLocation === 'top') &&
        <span className={cx('site__title')}>{domain.title}</span>
      }
    </div>
  )
}

export default SiteLogo
