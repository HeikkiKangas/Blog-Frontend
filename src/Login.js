import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import './Login.css'
import { TextField } from '@material-ui/core'
import API_URL from './API_URL'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function validateForm () {
    return username.length > 0 && password.length > 0
  }

  function handleSubmit (event) {
    event.preventDefault()
    fetch(`${API_URL}/users/login`, {
      headers: new Headers({
        Authorization: `Basic ${btoa(`${username}:${password}`)}`
      })
    })
  }

  return (
    <div className="Login">
      <form className='loginForm' onSubmit={handleSubmit}>
        <TextField
          controlId='username'
          autofocus
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="text"
          variant='outlined'
          label='Username' />
        <TextField
          controlId='password'
          autofocus
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          variant='outlined'
          label='Password' />
        <Button disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  )
}
