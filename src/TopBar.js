import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import './topbar.css'

export const TopBar = (props) => {
  return (
    <div id={'topBar'}>
      <CreatePostButton/>
      <input id="searchBar" type="text" placeholder="Search.."></input>
      <LoginButton loggedIn={false}/>
    </div>
  )
}

const CreatePostButton = (props) => (
  <Button
    id={'createButton'}
    variant={'contained'}
    fullWidth={false}
    color={'secondary'}
    component={Link} to="/createpost/">
    Create blog post
  </Button>
)

const LoginButton = (props) => (
  <Button
    id={'loginButton'}
    variant={'contained'}
    fullWidth={false}
    color={'secondary'}
    startIcon={<Icon>person</Icon>}>
    {props.loggedIn ? 'Logout' : 'Login'}
  </Button>
)
