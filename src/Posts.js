/* eslint-disable react/prop-types */
import React from 'react'
import './posts.css'
import { SideBar } from './SideBar'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { Post } from './Post'

export const Posts = ({ snackbarState, setSnackbarState }) => {
  const [posts, setPosts] = React.useState([])
  const storedRecentlyViewed = window.localStorage.getItem('recentlyViewed')
  const [recentlyViewed, setRecentlyViewed] = React.useState(storedRecentlyViewed || [])

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
    <div>
      <div id='generatePostsButtonDiv'>
        <Button
          id='generatePostsButton'
          variant='contained'
          fullWidth={false}
          color={'secondary'}
          onClick={() => fetch('http://localhost:8080/api/generateposts').then(fetchPosts)}
          component={Link} to='/'>
          Generate Random Posts
        </Button>
      </div>
      <div id='posts'>
        { posts === null ? <p id='loadingMsg'>Loading posts.</p>
          : posts.map(post =>
            <Post
              post={post}
              posts={posts}
              setPosts={setPosts}
              key={post.id}
              snackbarState={snackbarState}
              setSnackbarState={setSnackbarState}
              recentlyViewed={recentlyViewed}
              setRecentlyViewed={setRecentlyViewed}/>
          )}
      </div>
      <SideBar
        recentlyViewed={recentlyViewed}/>
    </div>
  )
}
