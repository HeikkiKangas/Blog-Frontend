/* eslint-disable react/prop-types */
import React from 'react'
import './posts.css'
import { SideBar } from './SideBar'
import { Link } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogTitle} from '@material-ui/core'

export const Posts = ({ snackbarState, setSnackbarState }) => {
  const [posts, setPosts] = React.useState(null)

  const fetchPosts = () => fetch('http://localhost:8080/api/posts')
    .then(response => response.json())
    .then(json => {
      setPosts(json)
      console.log(json)
    })
    .catch(console.log)

  React.useEffect(() => {
    console.log('componentDidMount, fetching')
    fetchPosts().then(console.log('posts fetched'))
  }, [])

  return (
    <div>
      <div id='generatePostsButton'>
        <Button
          id='generatePostsButton'
          variant='contained'
          fullWidth={false}
          color={'secondary'}
          onClick={() => fetch('http://localhost:8080/api/generateposts').then(fetchPosts)}
          component={Link} to='/'>
          Generate Random Posts
        </Button>
      </div>
      <div id='posts'>
        { posts == null ? <p id='loadingMsg'>Loading posts.</p>
          : posts.map(post =>
            <Post
              post={post}
              posts={posts}
              setPosts={setPosts}
              key={post.id}
              snackbarState={snackbarState}
              setSnackbarState={setSnackbarState}/>
          )}
      </div>
      <SideBar />
    </div>
  )
}

const Post = (props) => {
  const { post } = props
  return (
    <div className='post'>
      <EditButton id={post.id}/>
      <DeleteButton {...props} />
      <h1 className='title'>{post.title}</h1>
      <h3 className='author'>{post.author.userName}</h3>
      {post.author.admin ? <p className='authorIsAdmin'>Admin user</p> : null}
      <p className='timestamp'>{post.timestamp}</p>
      <p className='text'>{post.text}</p>
      <Comments count={post.comments.length}/>
      <Likes count={post.likes.length}/>
      <Tags tags={post.tags}/>
    </div>
  )
}

const Comments = ({ count }) => <a id='commentCount' href='localhost:3000'>{count} Comments</a>
const Likes = ({ count }) => <a id='likeCount' href='localhost:3000'>{count} Likes</a>
const Tags = ({ tags }) => <div id='tags'>{tags.map(tag => <a href='localhost:3000' key={tag}>{tag}</a>)}</div>

const EditButton = (props) => (
  <Button
    id={'editButton'}
    variant={'contained'}
    fullWidth={false}
    color={'secondary'}
    component={Link} to={'/editpost/' + props.id}>
    Edit
  </Button>
)

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
      <Button
        id={'deleteButton'}
        variant={'contained'}
        fullWidth={false}
        color={'secondary'}
        onClick={() => setOpen(true)}>
            Delete
      </Button>
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
