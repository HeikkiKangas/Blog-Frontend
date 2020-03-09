import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'

export const TopBar = (props) => {
  return (
    <div id={'topBar'}>
      <CreatePostButton/>
      <input type="text" placeholder="Search.."></input>
      <LoginButton loggedIn={false}/>
    </div>
  )
}

const CreatePostButton = (props) => (
  <Button
    variant={'contained'}
    fullWidth={false}
    color={'primary'}
    component={Link} to="/createpost/">
    Create blog post
  </Button>
)

const LoginButton = (props) => (
  <Button
    variant={'contained'}
    fullWidth={false}
    color={'primary'}
    startIcon={<Icon>person</Icon>}>
    {props.loggedIn ? 'Logout' : 'Login'}
  </Button>
)
