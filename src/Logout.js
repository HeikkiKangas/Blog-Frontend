import React from 'react'
import Button from '@material-ui/core/Button'
import './Logout.css'

export const Logout = (props) => {

  const handleSubmit = event => {
    event.preventDefault()

    props.setUser({})
  }

  return (
    <div className="logout">
      <Button id='logout' onClick={handleSubmit}>
          Logout
      </Button>
    </div>
  )
}
