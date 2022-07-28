import React, { ChangeEventHandler, useState } from 'react'
import { Input, Select } from 'antd'
import { useIntl } from 'react-intl'
import { SelectProps } from 'rc-select/lib/Select'

interface Props {
  onChange: (params: Record<string, string>) => void
}

const NameInputGroup: React.FC<Props> = (props) => {
  const { onChange } = props
  const intl = useIntl()
  const options: SelectProps['options'] = [
    {
      label: intl.formatMessage({ id: 'memberNumber' }),
      value: 'memberNumber'
    },
    {
      label: intl.formatMessage({ id: 'accountNumber' }),
      value: 'accountNumber'
    }
  ]
  const [value, setValue] = useState<string>('')
  const [selected, setSelected] = useState<string>(options[0].value as string)

  const InputOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
    onChange({ [selected]: e.target.value })
  }

  const SelectOnChange: SelectProps['onChange'] = (v) => {
    setSelected(v)
    onChange({ [v]: value })
  }

  return (
    <Input.Group compact>
      <Select
        value={selected}
        options={options}
        onChange={SelectOnChange}
        placeholder={intl.formatMessage({ id: 'placeholderInput' })}/>
      <Input
        value={value}
        style={{ width: 'auto' }}
        onChange={InputOnChange}
        allowClear
        placeholder={intl.formatMessage({ id: 'placeholderSelect' })}/>
    </Input.Group>
  )
}

export default NameInputGroup
