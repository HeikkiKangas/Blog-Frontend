import React from 'react'

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
    <div id='posts'>
      { posts == null ? <p id='loadingMsg'>Loading posts.</p>
        : posts.map(post => <Post post={post} key={post.id}/>) }
    </div>
  )
}

const Post = (props) => (
  <div className='post'>
    <h1 className='title'>{props.post.title}</h1>
    <h3 className='author'>{props.post.author.userName}</h3>
    {props.post.author.admin ? <p className='authorIsAdmin'>Admin user</p> : null}
    <p className='timestamp'>{props.post.timestamp}</p>
    <p className='text'>{props.post.text}</p>
    <Comments count={props.post.comments.length} />
    <Likes count={props.post.likes.length} />
    <Tags post={props.post} />
  </div>
)

const Comments = (props) => <a id='commentCount' href='localhost:3000'>{props.count} Comments</a>
const Likes = (props) => <a id='likeCount' href='localhost:3000'>{props.count} Likes</a>
const Tags = (props) => <div id='tags'>{props.post.tags.map(tag => <a href='localhost:3000' key={props.post.id}>{tag}</a>)}</div>
