import React from 'react'
import Tooltip from './component'

const withTooltip = (Component, options = {}) => ({ // eslint-disable-line react/display-name
  ...props,
}) => (
  <Tooltip {...options}>
    <Component {...props} />
  </Tooltip>
)

export default withTooltip