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
      <SearchBar posts={props.posts}/>
    </div>
  )
}

const SearchBar = ({ posts }) => {
  console.log('TopBar')
  console.log(posts)
  let search
  let postId

  return (
    <form
      id='searchBarForm'
      onSubmit={(e) => {
        e.preventDefault()
        console.log(posts.find(p => p.title === search))
      }}>
      <Autocomplete
        id="searchBar"
        options={posts === undefined ? [] : posts.map(p => p.title)}
        autoComplete={true}
        openOnFocus={false}
        onChange={e => {
          console.log(posts[(Number(e.target.dataset.optionIndex))])
          postId = posts[(Number(e.target.dataset.optionIndex))].id
          console.log(postId)
        }}
        renderInput={(params) => (
          <TextField
            onChange={e => {
              search = e.target.value
              console.log(search)
            }}
            {...params}
            label="Search posts"
            margin="normal"
            variant="outlined"
          />
        )}
      />
      <Button
        variant='contained'
        color='secondary'
        type='submit'>
        Search
      </Button>
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
