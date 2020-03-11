import React from 'react'
import './posts.css'
import { SideBar } from './SideBar'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

export const Posts = () => {
  const [posts, setPosts] = React.useState(null)

  React.useEffect(() => {
    console.log('fetching')
    fetch('http://localhost:8080/api/posts')
      .then(response => response.json())
      .then(json => {
        setPosts(json)
        console.log(json)
      })
      .catch(console.log)
  }, [])

  return (
    <div>
      <div id='posts'>
        { posts == null ? <p id='loadingMsg'>Loading posts.</p>
          : posts.map(post => <Post post={post} key={post.id}/>) }
      </div>
      <SideBar />
    </div>
  )
}

const Post = ({ post }) => (
  <div className='post'>
    <EditButton id={post.id}/>
    <DeleteButton id={post.id}/>
    <h1 className='title'>{post.title}</h1>
    <h3 className='author'>{post.author.userName}</h3>
    {post.author.admin ? <p className='authorIsAdmin'>Admin user</p> : null}
    <p className='timestamp'>{post.timestamp}</p>
    <p className='text'>{post.text}</p>
    <Comments count={post.comments.length} />
    <Likes count={post.likes.length} />
    <Tags tags={post.tags} />
  </div>
)

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

const deletePost = (id) => {
  console.log('Do you want to delete post ' + id)
  fetch('http://localhost:8080/api/posts/' + id, { method: 'delete' })
    .then(console.log)
    .catch(console.log)
}

const DeleteButton = (props) => (
  <Button
    id={'deleteButton'}
    variant={'contained'}
    fullWidth={false}
    color={'secondary'}
    onClick={() => deletePost(props.id)}>
    Delete
  </Button>
)
