import { LocaleObject } from '@/locales/types'

const tabs: LocaleObject = {
  'layout.tabs.closeOther': '关闭其他',
  'layout.tabs.closeLeft': '关闭左侧',
  'layout.tabs.closeRight': '关闭右侧',
  'layout.tabs.closeAll': '关闭全部'
}

const header: LocaleObject = {
  'layout.header.refresh': '刷新页面',
  'layout.header.setting': '设置页面'
}

const userDropdown: LocaleObject = {
  'layout.userDropdown.center': '个人中心',
  'layout.userDropdown.password': '修改密码',
  'layout.userDropdown.logout': '退出登录'
}

const componentSize: LocaleObject = {
  'layout.componentSize.small': '小型',
  'layout.componentSize.middle': '中等',
  'layout.componentSize.large': '大型'
}

const settingDrawer: LocaleObject = {
  'layout.settingDrawer.themeColor': '主题色',
  'layout.settingDrawer.themeHeader': '头部风格',
  'layout.settingDrawer.themeSide': '侧边栏风格',
  'layout.settingDrawer.dark': '暗色',
  'layout.settingDrawer.light': '亮色',
  'layout.settingDrawer.navigationMode': '导航模式',
  'layout.settingDrawer.sideMenuLayout': '侧边菜单布局',
  'layout.settingDrawer.topMenuLayout': '顶部菜单布局',
  'layout.settingDrawer.mixMenuLayout': '混合菜单布局',
  'layout.settingDrawer.contentWidth': '内容区域宽度',
  'layout.settingDrawer.fluid': '流式',
  'layout.settingDrawer.fixed': '固定',
  'layout.settingDrawer.fixedHeader': '固定头部',
  'layout.settingDrawer.regionalSettings': '内容区域',
  'layout.settingDrawer.componentSize': '组件大小',
  'layout.settingDrawer.tabs': '标签'
}

export default {
  ...tabs,
  ...header,
  ...userDropdown,
  ...settingDrawer,
  ...componentSize
}
