import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogPanel = ({ handleBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (e) => {
    e.preventDefault()
    handleBlog({ title: title, author: author, url: url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={createBlog}>
        <label>
          title{' '}
          <input
            name="title"
            placeholder="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
        </label>
        <label>
          author{' '}
          <input
            name="author"
            placeholder="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
        </label>
        <label>
          url{' '}
          <input
            name="url"
            placeholder="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
        <br />

        <button type="submit">add blog</button>
      </form>
    </div>
  )
}

BlogPanel.propTypes = {
  handleBlog: PropTypes.func.isRequired,
}

export default BlogPanel
