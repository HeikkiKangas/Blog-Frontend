import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import './Login.css'
import { TextField } from '@material-ui/core'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function validateForm () {
    return email.length > 0 && password.length > 0
  }

  function handleSubmit (event) {
    event.preventDefault()
  }

  return (
    <div className="Login">
      <form className='loginForm' onSubmit={handleSubmit}>
        <TextField
          controlId='email'
          autofocus
          value={email}
          onChange={e => setEmail(e.target.value)}
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
