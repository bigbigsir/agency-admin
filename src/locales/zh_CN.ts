import login from '@/views/login/locales/zh_CN'

const base = {
  required: '请输入',
  tips: '提示',
  ok: '确定',
  cancel: '取消',
  add: '添加',
  update: '编辑',
  delete: '删除',
  deleteTips: '你确定要删除这条记录吗？',
  deleteMultipleTips: '你确定要删除选中记录吗？',
  select: '请选择',
  showTotal: '共 {total} 条',
  status: '状态',
  show: '显示',
  back: '返回',
  hide: '隐藏',
  enable: '启用',
  disable: '禁用',
  search: '查询',
  reset: '重置',
  resetFilter: '重置筛选',
  submit: '提交',
  refresh: '刷新',
  captcha: '验证码',
  email: '邮箱',
  sendEmail: '发送邮件',
  channels: '官方频道',
  onlineService: '在线客服',
  'success.add': '添加成功',
  'success.addTask': '任务添加成功',
  'success.update': '更新成功',
  'success.delete': '刪除成功'
}

const zhCN = {
  ...base,
  ...login
}

export default zhCN
