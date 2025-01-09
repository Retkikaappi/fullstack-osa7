import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import PopUp from './components/PopUp'
import LoginPanel from './components/LoginPanel'
import TogglePanel from './components/TogglePanel'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogPanel from './components/BlogPanel'

import { displayMessage } from './reducers/popupReducer'
import {
  getAllBlogs,
  addOneBlog,
  deleteBlog,
  likeBlog,
} from './reducers/blogReducer'
import { storageLogin, login, logout } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const loginRef = useRef()
  const blogRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [])

  useEffect(() => {
    const activeUser = window.localStorage.getItem('activeUser')
    if (activeUser) {
      const parsedUser = JSON.parse(activeUser)
      dispatch(storageLogin(parsedUser))
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(login(e.target.username.value, e.target.password.value))
    e.target.username.value = ''
    e.target.password.value = ''
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('activeUser')
    dispatch(logout())

    console.log('logged out')
  }

  const handleBlog = (blogObj) => {
    dispatch(addOneBlog(blogObj))
    blogRef.current.toggleVisible()
  }

  const handleLike = async (blogObj) => {
    dispatch(likeBlog(blogObj))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <div>
      <PopUp />
      {user.token ? (
        <>
          <h2>blogs</h2>
          <p>
            logged in as <strong>{user.name}</strong>{' '}
            <button onClick={handleLogout}>logout</button>
          </p>

          <TogglePanel btnLabel="click here to add a new blog" ref={blogRef}>
            <BlogPanel handleBlog={handleBlog}></BlogPanel>
          </TogglePanel>

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
              username={user.username}
            />
          ))}
        </>
      ) : (
        <TogglePanel btnLabel="click here to login" ref={loginRef}>
          <LoginPanel handleLogin={handleLogin}></LoginPanel>
        </TogglePanel>
      )}
    </div>
  )
}

export default App
