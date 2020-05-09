import React from 'react'
import Button from '@material-ui/core/Button'
import './Logout.css'

export const Logout = (props) => {

  const handleSubmit = event => {
    event.preventDefault()

    const user = { }
    props.setUser(user)
    localStorage.setItem('user', JSON.stringify(user))

  }

  return (
    <div className="logout">
      <Button id='logout' onClick={handleSubmit}>
          Logout
      </Button>
    </div>
  )
}
