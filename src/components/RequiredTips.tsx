import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

const Required: React.FC<{ labelId: string }> = ({ labelId }) => {
  const intl = useIntl()
  return (
    // <FormattedMessage id={'required'} values={{ label: <FormattedMessage id={labelId}/> }}/>
    <FormattedMessage id={'required'} values={{ label: intl.formatMessage({ id: labelId }) }}/>
  )
}

export default Required
