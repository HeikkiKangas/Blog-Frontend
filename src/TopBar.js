/* eslint-disable react/prop-types */
import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import './topbar.css'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
export const TopBar = (props) => {
  return (
    <div id={'topBar'}>
      <CreatePostButton/>
      <LoginButton loggedIn={false}/>
      <SearchBar posts={props.posts}/>
    </div>
  )
}

const SearchBar = ({ posts }) => {
  console.log('TopBar')
  console.log(posts)

  return (
    <Autocomplete
      id="searchBar"
      options={posts === undefined ? [] : posts.map(p => p.title)}
      autoComplete={true}
      openOnFocus={false}
      renderInput={(params) => (
        <TextField {...params} label="Search posts" margin="normal" variant="outlined" />
      )}/>
  )
}

const CreatePostButton = (props) => (
  <Button
    id='createButton'
    variant='contained'
    fullWidth={false}
    color='secondary'
    component={Link} to="/createpost/">
    Create blog post
  </Button>
)

const LoginButton = (props) => (
  <Button
    id='loginButton'
    variant='contained'
    fullWidth={false}
    color='secondary'
    startIcon={<Icon>person</Icon>}>
    {props.loggedIn ? 'Logout' : 'Login'}
  </Button>
)
