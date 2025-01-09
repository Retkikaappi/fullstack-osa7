import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleLike, handleDelete, username }) => {
  const [view, setView] = useState(false)
  const blogStyle = {
    padding: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
    width: '25%',
  }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} - {blog.author}
      </Link>
    </div>
  )
}

export default Blog
