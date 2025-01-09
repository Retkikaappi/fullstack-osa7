import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserView = () => {
  const { id } = useParams()
  const user = useSelector((state) => state.users.find((e) => e.id === id))

  console.log('rams', id)
  console.log('users', user)

  if (!user) {
    return <div>Cannot find user</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs:</h3>
      <ul>
        {user.blogs.map((ele) => (
          <li key={ele.index}>{ele.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserView
