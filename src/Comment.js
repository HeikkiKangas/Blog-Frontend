/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import API_URL from './API_URL'
import './comment.css'

// Individual comment
// Format timestamp
const Comment = ({ comment, admin, postId, comments, setComments }) => {
  // const [comment, setComment] = React.useState(props.comment)
  return (
    <div className="comment">
      <p className="comment-header">{comment.author}</p>
      <p className='comment-timestamp'>{new Date(comment.timestamp).toLocaleString()}</p>
      <p className="comment-body">{comment.text}</p>
      <Button>
      Like
      </Button>
      <Button onClick={async () => {
        const response = await fetch(`${API_URL}/posts/${postId}/comment/${comment.id}`, { method: 'DELETE' })
        if (response.ok) {
          setComments = comments.filter(x => {
            return x.id !== postId
          })
        }
      }}>
      Delete
      </Button>
    </div>
  )
}

const Comments = ({ comments, postId, setComments }) =>
  <div className='comments'>
    {comments.map((comment, index) => <Comment comment={comment} key={comment.id} postId={postId} comments={comments} setComments={setComments}/>)}
  </div>

const Form = ({ addComment }) => {
  const [newComment, setNewComment] = useState({ author: '', text: '' })
  return (
    <form className='commentForm' autoComplete='off' onSubmit={(e) => {
      e.preventDefault()
      addComment(newComment, setNewComment)
    }}>
      <TextField name='authorField' required value={newComment.author} onChange={e => setNewComment({ author: e.target.value, text: newComment.text }) } variant='outlined' label='Author' />
      <div>
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
          <Comments comments={comments} postId={props.postID} setComments={setComments}/>
          <Form addComment={addComment}/>
        </>
        : null }
      {/* <CommentForm addComment={addComment}/> */}
    </div>
  )
}
