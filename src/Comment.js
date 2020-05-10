/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, TextField } from '@material-ui/core'
import API_URL from './API_URL'
import './comment.css'

// Individual comment
// Format timestamp
const Comment = (props) => {
  console.log('adding comment')
  console.log(props.comment)
  const { postId, comment, updatePost, user } = props
  return (
    <div className="comment">
      <p className="comment-header">{comment.author}</p>
      <p className='comment-timestamp'>{new Date(comment.timestamp).toLocaleString()}</p>
      <p className="comment-body">{comment.text}</p>
      <Button onClick={() =>
        fetch(`${API_URL}/posts/${postId}/comment/${comment.id}/like`, { method: 'POST' })
          .then(response => response.json())
          .then(json => updatePost(json))
          .catch(console.log)
      }>
        {`${comment.likes} likes`}
      </Button>
      {user.admin ? <DeleteButton {...props}/> : null}
    </div>
  )
}

const DeleteButton = (props) => {
  console.log('DeleteButton', props)
  const [open, setOpen] = React.useState(false)
  const handleCloseDialog = () => setOpen(false)
  const { comment, showSnackbarMessage, user, updatePost } = props

  const deleteComment = () => {
    // if (comment === undefined) return
    console.log('Deleting comment', comment)
    let snackbarMessage = 'Could not delete comment.'

    fetch(`${API_URL}/posts/${props.postId}/comment/${comment.id}`, {
      method: 'DELETE',
      headers: new Headers({
        Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`
      })
    })
      .then(response => {
        if (response.ok) snackbarMessage = 'Comment deleted.'
        showSnackbarMessage(snackbarMessage)
        handleCloseDialog()
        const json = response.json()
        console.log(json)
        return json
      })
      .then(updatePost)
      .catch(console.log)
  }

  return (
    <>
      <Button
        className='deleteButton'
        onClick={() => setOpen(true)}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle id='delete-dialog-title'>{'Delete comment?'}</DialogTitle>
        <DialogActions>
          <Button variant='contained' color='secondary' onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant='contained' color='secondary' onClick={() => deleteComment()}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const Comments = ({ comments, postId, setComments, ...props }) => {
  console.log(comments)
  return (
    <div className='comments' id={`comments-${postId}`}>
      {comments.map((comment, index) => <Comment comment={comment} key={comment.id} postId={postId}
        comments={comments} {...props}/>)}
    </div>
  )
}
const Form = ({ addComment }) => {
  const [newComment, setNewComment] = useState({ author: '', text: '' })
  return (
    <form className='commentForm' autoComplete='off' onSubmit={(e) => {
      e.preventDefault()
      addComment(newComment, setNewComment)
    }}>
      <TextField name='authorField' required value={newComment.author} onChange={e => setNewComment({ author: e.target.value, text: newComment.text }) } variant='outlined' label='Author' />
      <div className='formStyle'>
        <TextField
          name='textField'
          required value={newComment.text} onChange={e => setNewComment({ text: e.target.value, author: newComment.author })}
          variant='outlined' label='Comment' rows={4} multiline fullWidth/>
      </div>
      <Button type='submit' color='secondary' variant='contained'>Post Comment</Button>
    </form>
  )
}

// The whole comment section
export const CommentBox = (props) => {
  const { comments } = props
  const [visible, setVisible] = useState(false)

  const addComment = (newComment, setNewComment) => {
    console.log('post id ' + props.postID)
    fetch(
      `${API_URL}/posts/${props.postID}/comment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
      })
      .then(response => response.json())
      .then(props.updatePost)
      .catch(console.log)

    setNewComment({ author: '', text: '' })
  }

  return (
    <div className="comment-box">
      <a id='comments' href="#" onClick={(e) => {
        e.preventDefault()
        setVisible(!visible)
      }}>
        {visible ? 'Hide comments' : `Show ${comments.length} comments`}
      </a>
      { visible
        ? <>
          <h3>Comments</h3>
          <Comments comments={comments} postId={props.postID} {...props}/>
          <Form addComment={addComment}/>
        </>
        : null }
    </div>
  )
}
