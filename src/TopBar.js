/* eslint-disable react/prop-types */
import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import './topbar.css'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  inputRoot: {
    color: 'pink',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'pink'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'pink'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'pink'
    }
  }
}))

export const TopBar = (props) => {
  const admin = props.user.admin
  return (
    <div id={'topBar'}>
      {admin ? <CreatePostButton/> : null}
      <LoginButton user={props.user}/>
      <SearchBar posts={props.posts}/>
    </div>
  )
}

const SearchBar = ({ posts }) => {
  const classes = useStyles()
  console.log('TopBar')
  console.log(posts)

  return (
    <form
      id='searchBarForm'
      onSubmit={(e) => {
        e.preventDefault()
      }}>
      <Autocomplete
        id="searchBar"
        classes={classes}
        options={posts === undefined ? [] : posts.map(p => p.title)}
        autoComplete={true}
        openOnFocus={false}
        onChange={e => {
          console.log(posts[(Number(e.target.dataset.optionIndex))])
          console.log(e.target.dataset.optionIndex)
          if (e.target.dataset.optionIndex) {
            const postId = posts[(Number(e.target.dataset.optionIndex))].id
            const element = document.getElementById('post' + postId)
            if (element) element.scrollIntoView()
            console.log(postId)
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search posts"
            margin="normal"
            variant="outlined"
          />
        )}
      />
    </form>
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
    component={Link} to={props.user.username ? '/logout' : '/login'}
    startIcon={<Icon>person</Icon>}>
    {props.user.username ? 'Logout' : 'Login'}
  </Button>
)
