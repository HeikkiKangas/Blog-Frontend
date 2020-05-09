/* eslint-disable react/prop-types */
import React from 'react'
import { Button, Dialog, DialogActions, DialogTitle, Icon, Tooltip } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { CommentBox } from './Comment'
import API_URL from './API_URL'
import './post.css'

export const Post = (props) => {
  const [post, setPost] = React.useState(props.post)
  const [open, setOpen] = React.useState(false)
  const text = open ? post.text : post.text.substring(0, 350) + '...'
  const admin = props.user.admin
  const { recentlyViewed, setRecentlyViewed } = props
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
        if (!recentlyViewed.includes(post)) {
          const newList = recentlyViewed.length > 4
            ? [post, ...recentlyViewed.slice(0, 4)]
            : [post, ...recentlyViewed]
          setRecentlyViewed(newList)
          localStorage.setItem('recentlyViewed', JSON.stringify(newList))
        }
      }}>{ open ? 'Close post' : 'Read post'}</Button>
      <div>
        <Likes post={post} setPost={setPost}/>
        <CommentBox postID={post.id} comments={post.comments} {...props}/>
      </div>
    </div>
  )
}

const Likes = ({ post, setPost }) =>
  <a
    id='likeCount'
    href='#'
    onClick={(e) => {
      e.preventDefault()
      fetch(`${API_URL}/posts/${post.id}/like`, { method: 'POST' })
        .then(response => response.json())
        .then(json => setPost({ ...post, likes: json.likes }))
    }}>
    {post.likes} people like this
  </a>

const DeleteButton = (props) => {
  const [open, setOpen] = React.useState(false)
  const handleCloseDialog = () => setOpen(false)

  const deletePost = async ({ post, posts, setPosts, setSnackbarState }) => {
    console.log('Deleting post id:' + post.id)
    const response = await fetch(
      `${API_URL}/posts/${post.id}`, {
        method: 'DELETE',
        headers: new Headers({
          Authorization: `Basic ${btoa(`${props.user.username}:${props.user.password}`)}`
        })
      })
      .catch(console.log)

    const newState = { open: true, text: `Could not delete ${post.title}.` }
    if (response.ok) {
      setPosts(posts.filter(p => p.id !== post.id))
      newState.text = `${post.title} deleted.`
    }
    setSnackbarState(newState)
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
