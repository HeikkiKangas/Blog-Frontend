/* eslint-disable react/prop-types */
import React from 'react'
import './sidebar.css'

export const SideBar = (props) => {
  console.log(props.posts)
  return (
    <div id={'sideBar'}>
      <p>Recently Viewed</p>
      <ul>
        {props.recentlyViewed.length === 0
          ? <li>You haven&apos;t viewed anything yet.</li>
          : props.recentlyViewed.map((post, index) =>
            <li key={index}>
              <a id='sideLink' href={'/#post' + post.id}>
                {post.title}
              </a>
            </li>
          )}
      </ul>
    </div>
  )
}
