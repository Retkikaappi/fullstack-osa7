import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import PopUp from './components/PopUp'
import LoginPanel from './components/LoginPanel'
import TogglePanel from './components/TogglePanel'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogPanel from './components/BlogPanel'

import { displayMessage } from './reducers/popupReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const loginRef = useRef()
  const blogRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const activeUser = window.localStorage.getItem('activeUser')
    if (activeUser) {
      const parsedUser = JSON.parse(activeUser)
      setUser(parsedUser)
      blogService.setUserToken(parsedUser.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      console.log(user)

      window.localStorage.setItem('activeUser', JSON.stringify(user))
      blogService.setUserToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      dispatch(displayMessage(`login succesful with ${user.username}`, 'ok'))
    } catch (e) {
      setUsername('')
      setPassword('')
      const parsedMsg = JSON.stringify(e.response.data.error).replaceAll(
        '"',
        ''
      )
      dispatch(displayMessage(`${parsedMsg}`, 'error'))
      console.log('loginerror', e)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('activeUser')
    setUser(null)
    dispatch(displayMessage(`logout succesful from ${user.username}`, 'ok'))

    console.log('removed')
  }

  const handleBlog = async (blogObj) => {
    try {
      const resp = await blogService.addBlog(blogObj)
      setBlogs(blogs.concat(resp))
      dispatch(
        displayMessage(
          `blog created with title: ${resp.title}, author: ${resp.author}`,
          'ok'
        )
      )
      blogRef.current.toggleVisible()
    } catch (e) {
      const parsedMsg = JSON.stringify(e.response.data.error).replaceAll(
        '"',
        ''
      )
      dispatch(
        displayMessage(`error while creating a blog: ${parsedMsg}`, 'error')
      )
      console.log('blogcreate error', parsedMsg)
    }
  }

  const handleLike = async (blogObj) => {
    try {
      const resp = await blogService.editBlog(blogObj)
      const mappedblogs = blogs.map((blog) => {
        if (blog.id === blogObj.id) {
          return {
            ...blog,
            likes: resp.likes,
          }
        }
        return blog
      })
      mappedblogs.sort((a, b) => b.likes - a.likes)
      setBlogs(mappedblogs)
      dispatch(
        displayMessage(`You liked ${blogObj.title} by ${blogObj.author}`, 'ok')
      )
    } catch (e) {
      const parsedMsg = JSON.stringify(e.response.data.error).replaceAll(
        '"',
        ''
      )
      dispatch(
        displayMessage(`error while liking a blog: ${parsedMsg}`, 'error')
      )
      console.log('like error', e)
    }
  }

  const handleDelete = async ({ title, author, id }) => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      try {
        await blogService.deleteBlog(id)
        const filteredBlogs = blogs.filter((blog) => blog.id !== id)
        dispatch(displayMessage(`you deleted ${title}!`, 'ok'))
        setBlogs(filteredBlogs)
      } catch (e) {
        const parsedMsg = JSON.stringify(e.response.data.error)
        dispatch(
          displayMessage(`error while deleting a blog: ${parsedMsg}`, 'error')
        )
        console.log('delete error', e)
      }
    }
  }

  return (
    <div>
      <PopUp />
      {user ? (
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
          <LoginPanel
            handleLogin={handleLogin}
            username={username}
            userInput={({ target }) => setUsername(target.value)}
            password={password}
            passInput={({ target }) => setPassword(target.value)}
          ></LoginPanel>
        </TogglePanel>
      )}
    </div>
  )
}

export default App
