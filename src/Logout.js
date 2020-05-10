/* eslint-disable react/prop-types */
import React from 'react'
import './Logout.css'
import Redirect from 'react-router-dom/es/Redirect'

export const Logout = (props) => {
  props.logout()
  return <Redirect to='/'/>
}
