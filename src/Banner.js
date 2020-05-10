/* eslint-disable react/prop-types */
import React from 'react'
import './banner.css'
import { Link } from 'react-router-dom'

export const Banner = (props) => {
  return (
    <div id={'banner'}>
      <h1>
        <Link id="bannerLink" to={'/'} onClick={props.fetchPosts}>{props.title}</Link>
      </h1>
    </div>
  )
}
