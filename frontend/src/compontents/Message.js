import React from 'react'
import Alert from 'react-bootstrap/Alert'

function Message({variant, children, message}) {
  return (
    <Alert variant={variant} >
      <Alert.Heading>{message}</Alert.Heading>
        {children}
    </Alert>
  )
}

export default Message