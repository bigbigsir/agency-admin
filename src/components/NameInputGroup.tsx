import React, { ChangeEventHandler, useState } from 'react'
import { Input, Select } from 'antd'
import { useIntl } from 'react-intl'
import { SelectProps } from 'rc-select/lib/Select'

interface Props {
  onChange: (params: Record<string, string>) => void
}

const NameInputGroup: React.FC<Props> = (props) => {
  const { onChange: _onChange } = props
  const intl = useIntl()
  const options: SelectProps['options'] = [
    {
      label: intl.formatMessage({ id: 'memberNumber' }),
      value: 'name'
    },
    {
      label: intl.formatMessage({ id: 'accountNumber' }),
      value: 'name1'
    }
  ]
  const [value, setValue] = useState<string>('')
  const [selected, setSelected] = useState<string>(options[0].value as string)

  const InputOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
    _onChange({ [selected]: e.target.value })
  }

  const SelectOnChange: SelectProps['onChange'] = (v) => {
    setSelected(v)
    _onChange({ [v]: value })
  }

  return (
    <Input.Group compact>
      <Select value={selected} options={options} onChange={SelectOnChange}
        placeholder={intl.formatMessage({ id: 'placeholderInput' })}/>
      <Input style={{ width: 'auto' }} value={value} onChange={InputOnChange}
        placeholder={intl.formatMessage({ id: 'placeholderSelect' })}/>
    </Input.Group>
  )
}

export default NameInputGroup
