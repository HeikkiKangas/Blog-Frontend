import React from 'react'
import './App.css'
import { Banner } from './Banner'
import { TopBar } from './TopBar'
import {SideBar} from "./SideBar";

export const App = () => {
  return (
    <div>
      <Banner title={'BMB Blogi'}/>
      <TopBar />
      <SideBar />
    </div>
  )
}
