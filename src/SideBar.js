import React from 'react'
import './sidebar.css'

export const SideBar = (props) => (
  <div id={'sideBar'}>
    <p>Recently Viewed</p>
    <ul>
      <li>Post you viewed</li>
      <li>Post you viewed before that</li>
      <li>Post you viewed first</li>
    </ul>
    <p>Archive</p>
    <ul>
      <li>2020</li>
      <li>2019</li>
    </ul>
  </div>
)
