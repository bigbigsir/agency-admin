import { PaginationProps } from 'antd/es/pagination'
import { FormattedMessage } from 'react-intl'
import React from 'react'

const paginationDefault: PaginationProps = {
  size: 'small',
  total: 0,
  current: 1,
  pageSize: 10,
  pageSizeOptions: [10, 20, 50],
  showTotal (total) {
    return (<FormattedMessage id={'showTotal'} values={{ total }}/>)
  },
  showQuickJumper: true,
  showSizeChanger: true
}

export {
  paginationDefault
}
