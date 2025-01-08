import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setUserToken = (userToken) => {
  token = `Bearer ${userToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const addBlog = async (blog) => {
  const userConfig = {
    headers: { Authorization: token },
  }
  const resp = await axios.post(baseUrl, blog, userConfig)
  return resp.data
}

const editBlog = async ({ user, likes, author, title, url, id }) => {
  const obj = {
    user: user.id,
    likes: likes + 1,
    author: author,
    title: title,
    url: url,
  }

  const resp = await axios.put(`${baseUrl}/${id}`, obj)
  return resp.data
}

const deleteBlog = async (id) => {
  const userConfig = {
    headers: { Authorization: token },
  }

  const resp = await axios.delete(`${baseUrl}/${id}`, userConfig)
  return resp.data
}

export default { getAll, setUserToken, addBlog, editBlog, deleteBlog }
