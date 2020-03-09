import React from 'react'
import './App.css'
import { Banner } from './Banner'
import { TopBar } from './TopBar'
import { SideBar } from './SideBar'
import { Posts } from './Posts'
import { CreatePost } from './CreatePost'
import { BrowserRouter, Route } from 'react-router-dom'

export const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Banner title={'Pöhinää ja pastellivärejä'}/>
        <TopBar />
        <SideBar />
        <Route exact={true} path={'/'} component={Posts}/>
        <Route path={'/createpost'} component={CreatePost}/>
      </div>
    </BrowserRouter>
  )
}
