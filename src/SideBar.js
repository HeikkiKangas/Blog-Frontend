import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

export const SideBar = (props) => (
  <div id={'sideBar'}>
    <LoginButton loggedIn={false}/>
  </div>
)

const LoginButton = (props) => (
  <Button
    variant={'contained'}
    fullWidth={true}
    color={'primary'}
    startIcon={<Icon>person</Icon>}>
    {props.loggedIn ? 'Logout' : 'Login'}
  </Button>
)
