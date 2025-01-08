import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, username }) => {
  const [view, setView] = useState(false)
  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
    width: '25%',
    lineHeight: 0.1,
  }

  if (view) {
    return (
      <div style={blogStyle} className="blogCard">
        <p>
          title: {blog.title}
          <button onClick={() => setView(!view)}>close</button>
        </p>
        <p>url: {blog.url}</p>
        <p>
          likes: {blog.likes}{' '}
          <button onClick={() => handleLike(blog)}>like</button>
        </p>
        <p>author: {blog.author}</p>
        <p>user: {blog.user.username}</p>
        {username === blog.user.username ? (
          <button
            style={{ backgroundColor: 'lightblue' }}
            onClick={() => handleDelete(blog)}
          >
            remove
          </button>
        ) : null}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}{' '}
      <button onClick={() => setView(!view)}>view</button>
    </div>
  )
}

export default Blog
