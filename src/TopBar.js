import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import './topbar.css'
export const TopBar = (props) => {
  return (
    <div id={'topBar'}>
      <CreatePostButton/>
      <SearchBar/>
      <LoginButton loggedIn={false}/>
    </div>
  )
}

const SearchBar = () => {
  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        id="searchbar"
        freeSolo
        // options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField {...params} label="searchbar" margin="normal" variant="outlined" />
        )}
      />
    </div>
  )
  /*
  const handleChange = (e) => {
    console.log(e.target.value)
    const object = document.getElementById('post')
    console.log(object.textContent)

    const searchBarText = e.target.value
    const divText = object.textContent
    if (divText.includes(searchBarText)) {
      console.log('the div text contains your search text')
    } else {
      console.log("the div text doesn't contain search text")
    }
  }

  return (
    <input type="text" id={'searchBar'} className="input" onChange={handleChange} placeholder="Search..." />
  )

   */
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
