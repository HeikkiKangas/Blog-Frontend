/* eslint-disable react/prop-types */
import React from 'react'
import './posts.css'
import { SideBar } from './SideBar'
import { Post } from './Post'

export const Posts = (props) => {
  const {
    posts,
    user,
    showSnackbarMessage,
    recentlyViewed,
    addRecentlyViewed,
    updatePost,
    deletePost
  } = props
  return (
    <div>
      <div id='posts'>
        { posts == null ? <p id='loadingMsg'>Loading posts.</p>
          : posts.map((post, index) =>
            <Post
              post={post}
              user={user}
              key={post.id}
              showSnackbarMessage={showSnackbarMessage}
              addRecentlyViewed={addRecentlyViewed}
              deletePost={deletePost}
              updatePost={updatePost}/>
          )}
      </div>
      <SideBar
        recentlyViewed={recentlyViewed}
        posts={posts}
      />
    </div>
  )
}
