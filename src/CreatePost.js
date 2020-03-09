import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Button from '@material-ui/core/Button'

let editor2 = null

export const CreatePost = () => {
  return (
    <div>
      <p>This is where you create a new post</p>
      <CKEditor
        editor={ ClassicEditor }
        data="<p>Hello from CKEditor 5!</p>"
        onInit={ editor => {
          // You can store the "editor" and use when it is needed.
          editor2 = editor
          console.log('Editor is ready to use!', editor)
        } }
        onChange={ (event, editor) => {
          const data = editor.getData()
          console.log({ event, editor, data })
        } }
        onBlur={ (event, editor) => {
          console.log('Blur.', editor)
        } }
        onFocus={ (event, editor) => {
          console.log('Focus.', editor)
        } }
      />
      <SubmitButton/>
    </div>
  )
}

const SubmitButton = (props) => (
  <Button
    variant={'contained'}
    fullWidth={false}
    color={'secondary'}
    onClick={getData}>
    Submit
  </Button>
)

function getData () {
  console.log(editor2.getData())
}
