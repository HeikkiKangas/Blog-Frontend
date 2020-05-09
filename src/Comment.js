/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, Icon, TextField, Tooltip } from '@material-ui/core'
import API_URL from './API_URL'
import './comment.css'

// Individual comment
// Format timestamp
const Comment = ({ postId, admin, comments, setComments, ...props }) => {
  const [comment, setComment] = React.useState(props.comment)
  return (
    <div className="comment">
      <p className="comment-header">{comment.author}</p>
      <p className='comment-timestamp'>{new Date(comment.timestamp).toLocaleString()}</p>
      <p className="comment-body">{comment.text}</p>
      <Button onClick={() =>
        fetch(`${API_URL}/posts/${postId}/comment/${comment.id}/like`, { method: 'POST' })
          .then(response => response.json())
          .then(json => setComment({ ...comment, likes: json.likes }))
      }>
        {`${comment.likes} people like this`}
      </Button>
      {props.user.admin ? <DeleteButton postId={postId} comment={comment} comments={comments} setComments={setComments} {...props}/> : null}
    </div>
  )
}

const DeleteButton = (props) => {
  const [open, setOpen] = React.useState(false)
  const handleCloseDialog = () => setOpen(false)

  const deleteComment = async ({ comment, comments, setComments, setSnackbarState }) => {
    console.log('Deleting comment id:' + comment.id)
    const response = await fetch(`${API_URL}/posts/${props.postId}/comment/${comment.id}`, {
      method: 'DELETE',
      headers: new Headers({
        Authorization: `Basic ${btoa(`${props.user.username}:${props.user.password}`)}`
      })
    })
      .catch(console.log)

    const newState = { open: true, text: 'Could not delete comment.' }
    if (response.ok) {
      setComments(comments.filter(x => x.id !== comment.id))
      newState.text = 'Comment deleted.'
    }
    setSnackbarState(newState)
  }

  return (
    <>
      <Button
        className='deleteButton'
        onClick={() => setOpen(true)}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle id='delete-dialog-title'>{'Delete comment"?'}</DialogTitle>
        <DialogActions>
          <Button variant='contained' color='secondary' onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant='contained' color='secondary' onClick={() => deleteComment(props)}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

/*
        onClick={async () => {
        const response = await fetch(`${API_URL}/posts/${postId}/comment/${comment.id}`, { method: 'DELETE' })
        if (response.ok) setComments(comments.filter(x => x.id !== comment.id))
        }}>
        Delete
*/

const Comments = ({ comments, postId, setComments, ...props }) =>
  <div className='comments'>
    {comments.map((comment, index) => <Comment comment={comment} key={comment.id} postId={postId} comments={comments} setComments={setComments} {...props}/>)}
  </div>

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
  const [comments, setComments] = useState(props.comments)
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
      .then(c => setComments(comments.concat(c)))

    setNewComment({ author: '', text: '' })
    console.log(comments.length)
    comments.forEach(console.log)
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
          <Comments comments={comments} postId={props.postID} setComments={setComments} {...props}/>
          <Form addComment={addComment}/>
        </>
        : null }
      {/* <CommentForm addComment={addComment}/> */}
    </div>
  )
}
