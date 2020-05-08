/* eslint-disable react/prop-types */
import React from 'react'
import './posts.css'
import { SideBar } from './SideBar'
import { Post } from './Post'

export const Posts = ({ snackbarState, setSnackbarState, posts, setPosts, user, setUser }) => {
  const [recentlyViewed, setRecentlyViewed] = React.useState([])

  return (
    <div>
      <div id='posts'>
        { posts == null ? <p id='loadingMsg'>Loading posts.</p>
          : posts.map(post =>
            <Post
              post={post}
              posts={posts}
              user={user}
              setUser={setUser}
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
