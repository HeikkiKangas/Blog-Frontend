/* eslint-disable react/prop-types */
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import React from 'react'
import Button from '@material-ui/core/Button'
import { Link, Redirect, useParams } from 'react-router-dom'
import './editPost.css'
import API_URL from './API_URL'

export const EditPost = (props) => {
  const [post, setPost] = React.useState(undefined)
  const [redirect, setRedirect] = React.useState(false)
  const { postId } = useParams()

  console.log(setPost)
  React.useEffect(() => {
    if (postId) {
      fetch(`${API_URL}/posts/${postId}`)
        .then(response => response.json())
        .then(postDownloaded)
    } else {
      fetch(`${API_URL}/users/${props.user.id}`)
        .then(response => response.json())
        .then(json => setPost({ text: '', author: json, title: '' }))
    }
  }, [])

  const postDownloaded = (json) => {
    console.log(json)
    setPost(json)
  }

  if (redirect) {
    console.log('Submit button pressed, redirecting to frontpage')
    return <Redirect to='/'/>
  } else if (post === undefined) {
    return <h1 className='loadingMessage'>Loading</h1>
  } else {
    console.log(post)
    return <Editor post={post} setRedirect={setRedirect} {...props}/>
  }
}

const updatePost = (post, user) => (
  fetch(
    `${API_URL}/posts/${post.id}`,
    {
      method: 'PATCH',
      headers: new Headers({
        Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(post)
    }).then(r => r.json())
    .catch(console.log)
)

const createPost = (post, user) => (
  fetch(
    API_URL + '/posts/',
    {
      method: 'POST',
      headers: new Headers({
        Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(post)
    }).then(r => r.json())
    .catch(console.log)
)

const SubmitButton = ({ post, setRedirect, ...props }) => (
  <Button
    id={'submitButton'}
    variant={'contained'}
    fullWidth={false}
    color={'secondary'}
    component={Link} to='/'
    onClick={() => {
      console.log(post)
      post.id === undefined
        ? createPost(post, props.user).then(setRedirect(true)).then(props.addPost)
        : updatePost(post, props.user).then(setRedirect(true)).then(props.updatePost)
    }}>
    {
      post.id === undefined
        ? 'Create Post'
        : 'Edit Post'
    }
  </Button>
)

const Editor = ({ post, setRedirect, ...props }) => (
  <div id={'editor'}>
    <input className='titleStyle' type="text" placeholder="Title" id="titleInput"
      defaultValue={post.title ? post.title : ''}
      onChange={event => { post.title = event.target.value }}/>

    <br/>

    <CKEditor
      editor={ClassicEditor}
      onInit={editor => {
        editor.setData(post.text ? post.text : 'Dear Diary, ')
        if (!post.id) {
          post.likes = 0
          post.comments = []
        }
        console.log('Editor is ready to use!')
      }}
      onChange={(event, editor) => {
        post.text = editor.getData()
      }}
    />
    <br/>
    <SubmitButton post={post} setRedirect={setRedirect} {...props}/>
  </div>
)
