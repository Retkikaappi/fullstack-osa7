import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'

const BlogSingleView = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { username, token } = useSelector((state) => state.user)
  const blog = useSelector((state) => state.blogs.find((e) => e.id === id))

  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
    width: '25%',
    lineHeight: 0.1,
  }

  const handleLike = (blogObj) => {
    dispatch(likeBlog(blogObj))
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      navigate('/blogs')
    }
  }

  const handleComment = (e) => {
    e.preventDefault()
    dispatch(commentBlog(blog, e.target.comment.value))
    e.target.comment.value = ''
  }

  if (!blog) {
    return <div>No blog to be found...</div>
  }
  if (!token) {
    return <div>Not logged in... Single Blog View</div>
  }

  return (
    <>
      <div style={blogStyle} className="blogCard">
        <p>title: {blog.title}</p>
        <p>
          url: <a href="#">{blog.url}</a>
        </p>
        <p>
          likes: {blog.likes}
          <button onClick={() => handleLike(blog)}>like</button>
        </p>
        <p>author: {blog.author}</p>
        <p>user: {blog.user.username}</p>
        {username === blog.user.username && (
          <button
            style={{ backgroundColor: 'lightblue' }}
            onClick={() => handleDelete(blog)}
          >
            remove
          </button>
        )}
      </div>
      <div>
        <h4>Comments</h4>
        <form onSubmit={handleComment}>
          <input name="comment" type="text" />
          <button>add comment</button>
        </form>
        <ul>
          {blog.comments.map((ele, index) => (
            <li key={`commment_${index}`}>{ele.comment}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default BlogSingleView
