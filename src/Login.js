/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import './Login.css'
import { TextField } from '@material-ui/core'
import API_URL from './API_URL'
import { Redirect } from 'react-router-dom'

export const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const validateForm = () => username.length > 0 && password.length > 0

  const handleSubmit = event => {
    event.preventDefault()

    fetch(`${API_URL}/users/login`, {
      headers: new Headers({
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        username: username
      })
    })
      .then(response => response.json())
      .then(json => props.login({ password: password, ...json }))
      .then(() => setRedirect(true))
      .catch(console.log)
  }

  if (redirect) {
    return <Redirect to='/'/>
  } else {
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
              label='Username'/>
          </div>
          <div className="password">
            <TextField
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              variant='outlined'
              label='Password'/>
          </div>
          <Button disabled={!validateForm()} type="submit">
            Login
          </Button>
        </form>
      </div>
    )
  }
}
