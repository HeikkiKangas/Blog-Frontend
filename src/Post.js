/* eslint-disable react/prop-types */
import React from 'react'
import { Button, Dialog, DialogActions, DialogTitle, Icon, Tooltip } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { CommentBox } from './Comment'
import API_URL from './API_URL'
import './post.css'

export const Post = (props) => {
  const post = props.post
  const [open, setOpen] = React.useState(false)
  const comments = post.comments
  const text = open ? post.text : post.text.substring(0, 350) + '...'
  const admin = props.user.admin
  const { addRecentlyViewed } = props
  return (
    <div className='post' id={'post' + post.id}>
      {admin ? <EditButton id={post.id}/> : null}
      {admin ? <DeleteButton {...props} /> : null}
      <h1 className='title'>{post.title}</h1>
      <h3 className='author'>{post.author.userName}</h3>
      <p className='timestamp'>{new Date(post.timestamp).toLocaleString()}</p>
      <div className='text' dangerouslySetInnerHTML={{ __html: text }} />
      <Button onClick={() => {
        setOpen(!open)
        addRecentlyViewed(post)
      }}>{ open ? 'Close post' : 'Read post'}</Button>
      <div>
        <Likes post={post} updatePost={props.updatePost}/>
        <CommentBox postID={post.id} comments={comments} {...props}/>
      </div>
    </div>
  )
}

const Likes = ({ post, updatePost }) =>
  <a
    id='likeCount'
    href='#'
    onClick={(e) => {
      e.preventDefault()
      fetch(`${API_URL}/posts/${post.id}/like`, { method: 'POST' })
        .then(response => response.json())
        .then(updatePost)
    }}>
    {post.likes} likes
  </a>

const DeleteButton = (props) => {
  const [open, setOpen] = React.useState(false)
  const handleCloseDialog = () => setOpen(false)

  const deletePost = async ({ post }) => {
    console.log('Deleting post id:' + post.id)
    const response = await fetch(
      `${API_URL}/posts/${post.id}`, {
        method: 'DELETE',
        headers: new Headers({
          Authorization: `Basic ${btoa(`${props.user.username}:${props.user.password}`)}`
        })
      })
      .catch(console.log)

    let snackbarMessage = `Could not delete ${post.title}.`
    if (response.ok) {
      setOpen(false)
      props.deletePost(post.id)
      snackbarMessage = `${post.title} deleted.`
    }
    props.showSnackbarMessage(snackbarMessage)
  }

  return (
    <>
      <Tooltip title='Delete post'>
        <Button
          className='deleteButton'
          variant='contained'
          fullWidth={false}
          color='secondary'
          startIcon={<Icon>delete</Icon>}
          onClick={() => setOpen(true)}>
          Delete
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle id='delete-dialog-title'>{`Delete post "${props.post.title}"?`}</DialogTitle>
        <DialogActions>
          <Button variant='contained' color='secondary' onClick={handleCloseDialog}>
                        Cancel
          </Button>
          <Button variant='contained' color='secondary' onClick={() => deletePost(props)}>
                        Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const EditButton = (props) => (
  <Button
    id={'editButton'}
    variant={'contained'}
    fullWidth={false}
    color={'secondary'}
    startIcon={<Icon>edit</Icon>}
    component={Link} to={'/editpost/' + props.id}>
    Edit
  </Button>
)
