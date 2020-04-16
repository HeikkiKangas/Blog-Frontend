import React from 'react'
import './App.css'
import { Banner } from './Banner'
import { TopBar } from './TopBar'
import { Posts } from './Posts'
import { BrowserRouter, Route } from 'react-router-dom'
import { Slide, Snackbar } from '@material-ui/core'
import { EditPost } from './EditPost'

export const App = () => {
  const [snackbarState, setSnackbarState] = React.useState({ open: false, text: '' })
  const [posts, setPosts] = React.useState([])

  const fetchPosts = () => fetch('http://localhost:8080/api/posts')
    .then(response => response.json())
    .then(json => {
      setPosts(json)
      console.log(json)
    })
    .catch(console.log)

  React.useEffect(() => {
    console.log('componentDidMount, fetching')
    fetchPosts().then(console.log('posts fetched'))
  }, [])

  return (
    <BrowserRouter>
      <div>
        <Banner title={'Pöhinää ja pastellivärejä'}/>
        <TopBar posts={posts}/>
        <Route
          exact={true}
          path={'/'}
          render={() => <Posts setSnackbarState={setSnackbarState} posts={posts} setPosts={setPosts}/>}/>

        <Route
          path={'/createpost'}
          component={EditPost}/>

        <Route
          path='/editpost/:postId'
          component={EditPost}/>

        <Snackbar
          open={snackbarState.open}
          onClose={() => setSnackbarState({ ...snackbarState, open: false })}
          TransitionComponent={Slide}
          message={snackbarState.text}
          autoHideDuration={2000}/>
      </div>
    </BrowserRouter>
  )
}
