import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import React from 'react'
import Button from '@material-ui/core/Button'
import { Link, Redirect, useParams } from 'react-router-dom'
import './editPost.css'

export const EditPost = (props) => {
  const [post, setPost] = React.useState(undefined)
  const [redirect, setRedirect] = React.useState(false)
  const { postId } = useParams()

  console.log(setPost)
  React.useEffect(() => {
    if (postId) {
      fetch(`http://localhost:8080/api/posts/${postId}`)
        .then(response => response.json())
        .then(postDownloaded)
    } else {
      fetch('http://localhost:8080/api/users/1')
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
    return <Editor post={post} setRedirect={setRedirect}/>
  }
}

const updatePost = (post) => (
  fetch(
    `http://localhost:8080/api/posts/${post.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .then(console.log)
    .catch(console.log)
)

const createPost = (post) => (
  fetch(
    'http://localhost:8080/api/posts/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .then(console.log)
    .catch(console.log)
)

const SubmitButton = ({ post, setRedirect }) => (
  <Button
    id={'submitButton'}
    variant={'contained'}
    fullWidth={false}
    color={'secondary'}
    component={Link} to='/'
    onClick={() => {
      console.log(post)
      post.id === undefined
        ? createPost(post).then(setRedirect(true))
        : updatePost(post).then(setRedirect(true))
    }}>
    {
      post.id === undefined
        ? 'Create Post'
        : 'Edit Post'
    }
  </Button>
)

const Editor = ({ post, setRedirect }) => (
  <div id={'editor'}>
    <input type="text" placeholder="Title" id="titleInput"
      defaultValue={post.title ? post.title : ''}
      onChange={event => post.title = event.target.value}/>

    <br/>

    <CKEditor
      editor={ClassicEditor}
      onInit={editor => {
        editor.data.processor = new GFMDataProcessor(editor.editing.view.document)
        editor.setData(post.text ? post.text : 'Dear Diary, ')
        if (!post.id) {
          post.likes = []
          post.comments = []
        }
        console.log('Editor is ready to use!')
      }}
      onChange={(event, editor) => {
        post.text = editor.getData()
      }}
      /*
      onBlur={(event, editor) => {
        console.log('Blur.', editor)
      }}
      onFocus={(event, editor) => {
        console.log('Focus.', editor)
      }}
      */
    />
    <input type="text" placeholder="Tags" id="tagInput" defaultValue={post.tags}/>
    <br/>
    <SubmitButton post={post} setRedirect={setRedirect}/>
  </div>
)
