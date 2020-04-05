/* eslint-disable react/prop-types */
import React from 'react'
import { Button, Dialog, DialogActions, DialogTitle, Icon, IconButton, Tooltip } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { CommentBox } from './Comment'

export const Post = (props) => {
  const { post } = props
  return (
    <div className='post' id='post'>
      <EditButton id={post.id}/>
      <DeleteButton {...props} />
      <h1 className='title'>{post.title}</h1>
      <h3 className='author'>{post.author.userName}</h3>
      <p className='timestamp'>{post.timestamp}</p>
      <div className='text' dangerouslySetInnerHTML={{ __html: post.text }} />
      <Comments count={post.comments.length}/>
      <Likes count={post.likes.length}/>
      <Tags tags={post.tags}/>
      <CommentBox/>
    </div>
  )
}

const Comments = ({ count }) => <a id='commentCount' href='localhost:3000'>{count} Comments</a>
const Likes = ({ count }) => <a id='likeCount' href='localhost:3000'>{count} Likes</a>
const Tags = ({ tags }) => <div id='tags'>{tags.map(tag => <a href='localhost:3000' key={tag}>{tag}</a>)}</div>

const DeleteButton = (props) => {
  const [open, setOpen] = React.useState(false)
  const handleCloseDialog = () => setOpen(false)

  const deletePost = async ({ post, posts, setPosts, setSnackbarState }) => {
    console.log('Deleting post id:' + post.id)
    const response = await fetch('http://localhost:8080/api/posts/' + post.id, { method: 'delete' })
      .catch(console.log)

    const newState = { open: true, text: `Could not delete ${post.title}.` }
    if (response.ok) {
      setPosts(posts.filter(p => p.id !== post.id))
      newState.text = `${post.title} deleted.`
    }
    setSnackbarState(newState)
  }

  console.log(props)
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
      <Tooltip title='Delete post'>
        <IconButton
          className='deleteIcon'
          color='secondary'>
          <Icon>delete</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip title='Edit post'>
        <IconButton
          className='editIcon'
          color='secondary'>
          <Icon>edit</Icon>
        </IconButton>
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
