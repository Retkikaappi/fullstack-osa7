import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const UsersView = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const { token } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  if (!users) {
    return <div>No users...</div>
  }

  if (!token) {
    return <div>Not logged in...</div>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UsersView
