import React from 'react'
import './App.css'
import { Banner } from './Banner'
import { TopBar } from './TopBar'
import { Posts } from './Posts'
import { CreatePost } from './CreatePost'
import { BrowserRouter, Route } from 'react-router-dom'
import { Slide, Snackbar } from '@material-ui/core'
import { EditPost } from './EditPost'

export const App = () => {
  const [snackbarState, setSnackbarState] = React.useState({ open: false, text: '' })

  return (
    <BrowserRouter>
      <div>
        <Banner title={'Pöhinää ja pastellivärejä'}/>
        <TopBar />
        <Route
          exact={true}
          path={'/'}
          render={() => <Posts setSnackbarState={setSnackbarState}/>}/>

        <Route
          path={'/createpost'}
          component={CreatePost}/>

        <Route
          path='/editpost/:postId'
          component={EditPost}/>

        <Snackbar
          open={snackbarState.open}
          onClose={() => setSnackbarState({ ...snackbarState, open: false })}
          TransitionComponent={Slide}
          message={snackbarState.text}
          autoHideDuration={2000}/>
      </div>
    </BrowserRouter>
  )
}
