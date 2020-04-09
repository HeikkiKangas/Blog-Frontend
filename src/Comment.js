import React from 'react'

// Form for user to fill in name and comment -- works perfectly fine
const CommentForm = (props) => {
  let author
  let comment

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(author + ' : ' + comment)
    props.addComment(author, comment)
  }

  const handleNameInput = e => {
    author = e.target.value
  }

  const handleCommentInput = e => {
    comment = e.target.value
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="comment-form-fields">
        <input placeholder="Name" required value={author} onChange={handleNameInput}></input><br />
        <textarea placeholder="Comment" rows="4" required value={comment} onChange={handleCommentInput} ></textarea>
      </div>
      <div className="comment-form-actions">
        <button type="submit">Post Comment</button>
      </div>
    </form>
  )
}

// Individual comment
const Comment = (props) => (
  <div className="comment">
    <p className="comment-header">{props.author}</p>
    <p className="comment-body">{props.body}</p>
  </div>
)

// The whole comment section
export const CommentBox = (props) => {
  let comments = [{ id: 1, author: 'landiggity', body: "This is my first comment on this forum so don't be a dick" }]

  const getComments = () => {
    return comments.map((comment) => {
      return (
        <Comment
          author={comment.author}
          body={comment.body}
          key={comment.id}
        />
      )
    })
  }

  const allComments = getComments()

  const addComment = (author, body) => {
    const comment = {
      id: comments.length + 1,
      author,
      body
    }
    comments = comments.concat([comment])

    console.log(comments.length)
    for (const comment of comments) {
      console.log(comment)
    }
  }

  return (
    <div className="comment-box">
      <h3>Comments</h3>
      <CommentForm addComment={addComment}/>
      <div>{comments.map((comment) => { // Doesn't update
        return (
          <Comment
            author={comment.author}
            body={comment.body}
            key={comment.id}
          />
        )
      })}</div>
    </div>
  )
}
