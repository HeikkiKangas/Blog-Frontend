import React from 'react'
import './App.css'
import { Banner } from './Banner'
import { TopBar } from './TopBar'
import { Posts } from './Posts'
import { Login } from './Login'
import { Logout } from './Logout'
import { BrowserRouter, Route } from 'react-router-dom'
import { Slide, Snackbar } from '@material-ui/core'
import { EditPost } from './EditPost'
import API_URL from './API_URL'

export const App = () => {
  const [snackbarState, setSnackbarState] =
    React.useState({ open: false, text: '' })
  const showSnackbarMessage = message => setSnackbarState({ open: true, text: message })

  const [posts, setPosts] = React.useState([])

  const [user, setUser] =
    React.useState(JSON.parse(localStorage.getItem('user') || '{}'))
  React.useEffect(() => localStorage.setItem('user', JSON.stringify(user)), [user])
  const logout = () => setUser({})
  const login = user => setUser(user)

  const [recentlyViewed, setRecentlyViewed] =
    React.useState(JSON.parse(localStorage.getItem('recentlyViewed') || '[]'))
  React.useEffect(() => localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed)), [recentlyViewed])
  const addRecentlyViewed = post => {
    if (!recentlyViewed.find(p => p.id === post.id)) {
      setRecentlyViewed([
        post,
        ...recentlyViewed.splice(
          0,
          recentlyViewed.length < 5
            ? recentlyViewed.length
            : 4)
      ])
    }
  }

  const fetchPosts = () =>
    fetch(`${API_URL}/posts`)
      .then(response => response.json())
      .then(json => {
        setPosts(json)
        return json
      })
      .then(json => {
        console.log('fetchPosts(), posts fetched, JSON:')
        console.log(json)
      })
      .catch(console.log)

  React.useEffect(() => {
    console.log('componentDidMount, fetching')
    fetchPosts().then(() => {
      console.log('first fetch posts ran, posts:')
      console.log(posts)
    })
  }, [])

  const updatePost = (post) => {
    console.log('updatePost()')
    console.log(post)
    const index = posts.findIndex((p) => post.id === p.id)
    if (index !== -1) {
      const newPosts = [
        ...posts.slice(0, index),
        post,
        ...posts.slice(index + 1, posts.length)
      ]
      console.log(newPosts)
      setPosts(newPosts)
    }
  }

  const addPost = (post) => setPosts([post, ...posts])

  const deletePost = (postId) => {
    setPosts(posts.filter(p => p.id !== postId))
  }

  return (
    <BrowserRouter>
      <div>
        <Banner title={'Pöhinää ja pastellivärejä'} fetchPosts={fetchPosts}/>
        <TopBar posts={posts} user={user} setUser={setUser}/>
        <Route
          exact={true}
          path={'/'}
          render={() =>
            <Posts
              showSnackbarMessage={showSnackbarMessage}
              posts={posts}
              updatePost={updatePost}
              deletePost={deletePost}
              user={user}
              recentlyViewed={recentlyViewed}
              addRecentlyViewed={addRecentlyViewed}
            />}
        />

        <Route
          path={'/createpost'}
          render={() => <EditPost user={user} updatePost={updatePost} addPost={addPost} />}/>
        <Route
          path='/editpost/:postId'
          render={() => <EditPost user={user} updatePost={updatePost} addPost={addPost} />} />
        <Route
          path={'/login'}
          render={() => <Login login={login}/>} />

        <Route
          path={'/logout'}
          render={() => <Logout logout={logout}/>} />

        <Snackbar
          open={snackbarState.open}
          onClose={() => setSnackbarState({ open: false, text: '' })}
          TransitionComponent={Slide}
          message={snackbarState.text}
          autoHideDuration={2000} />
      </div>
    </BrowserRouter>
  )
}
