import React from 'react'
import Button from '@material-ui/core/Button'
import './Logout.css'
import Redirect from 'react-router-dom/es/Redirect'

export const Logout = (props) => {
  const user = {}
  props.setUser(user)
  localStorage.setItem('user', JSON.stringify(user))
  return <Redirect to='/'/>
}
