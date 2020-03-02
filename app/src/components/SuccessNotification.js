import React from "react";

const SuccessNotification = ({ message }) => {
  const sucessStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    padding: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={sucessStyle}>
      {message}
    </div>
  )
}

export default SuccessNotification