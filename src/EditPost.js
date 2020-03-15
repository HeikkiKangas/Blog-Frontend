import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import React from 'react'
import Button from '@material-ui/core/Button'
import { Link, useParams } from 'react-router-dom'

export const EditPost = (props) => {
  const [post, setPost] = React.useState(undefined)
  const { postId } = useParams()
  console.log(setPost)
  React.useEffect(() => {
    fetch(`http://localhost:8080/api/posts/${postId}`)
      .then(response => response.json())
      .then(postDownloaded)
  }, [])

  const postDownloaded = (json) => {
    console.log(json)
    setPost(json)
  }

  if (post === undefined) {
    return <h1 className='loadingMessage'>Loading editor</h1>
  } else {
    console.log(post)
    return <Editor post={post}/>
  }
}

const Editor = ({ post }) => {
  console.log(post)

  return (
    <div id={'editor'}>
      <input type="text" placeholder="Title" id="titleInput" defaultValue={post.title}/>
      <br/>
      <input type="text" placeholder="Author" id="authorInput" defaultValue={post.author.userName}/>
      <CKEditor
        editor={ ClassicEditor }
        onInit={ editor => {
          // You can store the "editor" and use when it is needed.
          editor.setData(post.text)
          console.log('Editor is ready to use!', editor)
        } }
        onChange={ (event, editor) => {
          // const data = editor.getData()
          // console.log({ event, editor, data })
          post.text = editor.getData()
        } }
        onBlur={ (event, editor) => {
          console.log('Blur.', editor)
        } }
        onFocus={ (event, editor) => {
          console.log('Focus.', editor)
        } }
      />
      <input type="text" placeholder="Tags" id="tagInput" defaultValue={post.tags}/>
      <br/>
      <Button
        id={'submitButton'}
        variant={'contained'}
        fullWidth={false}
        color={'secondary'}
        component={Link} to='/'
        onClick={() => {
          console.log(post)
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
        }}>
      Submit
      </Button>
    </div>
  )
}
