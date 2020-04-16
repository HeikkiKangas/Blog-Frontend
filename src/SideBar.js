/* eslint-disable react/prop-types */
import React from 'react'
import './sidebar.css'

export const SideBar = (props) => (
  <div id={'sideBar'}>
    <p>Recently Viewed</p>
    <ul>
      {props.recentlyViewed.length === 0
        ? <li>You haven&apos;t viewed anything yet.</li>
        : props.recentlyViewed.map((post) => <li>{post}</li>)}
    </ul>
  </div>
)
