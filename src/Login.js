import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import './Login.css'
import { TextField } from '@material-ui/core'
import API_URL from './API_URL'

export const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function validateForm () {
    return username.length > 0 && password.length > 0
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const response = await fetch(`${API_URL}/users/login`, {
      headers: new Headers({
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        username: username
      })
    })
    if (response.ok) props.setUser({ username: username, password: password, admin: response.json().admin })
  }

  return (
    <div className="Login">
      <form className='loginForm' onSubmit={handleSubmit}>
        <div className="username">
          <TextField
            id='username'
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="text"
            variant='outlined'
            label='Username' />
        </div>
        <div className="password">
          <TextField
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            variant='outlined'
            label='Password' />
        </div>
        <Button disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  )
}
