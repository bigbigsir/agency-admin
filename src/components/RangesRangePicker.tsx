import moment from 'moment'
import React from 'react'
import { DatePicker } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import { useIntl } from 'react-intl'

interface Props {
  onChange: RangePickerProps['onChange']
}

const RangesRangePicker: React.FC<Props> = (props) => {
  const { onChange } = props
  const intl = useIntl()
  const ranges: RangePickerProps['ranges'] = {
    [intl.formatMessage({ id: 'thisDay' })]: [moment().startOf('day'), moment().endOf('day')],
    [intl.formatMessage({ id: 'thisWeek' })]: [moment().startOf('week'), moment().endOf('day')],
    [intl.formatMessage({ id: 'lastWeek' })]: [moment().add(1, 'week').startOf('week'), moment().add(1, 'week').endOf('week')],
    [intl.formatMessage({ id: 'thisMonth' })]: [moment().startOf('month'), moment().endOf('day')],
    [intl.formatMessage({ id: 'lastMonth' })]: [moment().add(1, 'month').startOf('month'), moment().add(1, 'month').endOf('month')]
  }

  return (
    <DatePicker.RangePicker
      ranges={ranges}
      format="YYYY/MM/DD HH:mm:ss"
      showTime
      onChange={onChange}
    />
  )
}

export default RangesRangePicker
