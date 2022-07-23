import login from '@/views/login/locales/en_US'
import layout from '@/components/Layout/locales/en_US'

const base = {
  required: 'Please enter',
  tips: 'Tips',
  ok: 'Ok',
  cancel: 'Cancel',
  add: 'Add',
  update: 'Update',
  delete: 'Delete',
  deleteTips: 'Are you sure delete this record?',
  deleteMultipleTips: 'Are you sure delete checked record?',
  select: 'Please select',
  showTotal: 'Total {total} items',
  status: 'Status',
  show: 'Show',
  back: 'Back',
  hide: 'Hide',
  enable: 'Enable',
  disable: 'Disable',
  search: 'Search',
  reset: 'Reset',
  resetFilter: 'Reset filter',
  submit: 'Submit',
  refresh: 'Refresh',
  captcha: 'Captcha',
  email: 'Email'
}

const enUS = {
  ...base,
  ...login,
  ...layout
}

export default enUS
