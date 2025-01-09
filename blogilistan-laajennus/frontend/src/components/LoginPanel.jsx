import PropTypes from 'prop-types'

const LoginPanel = ({
  handleLogin,
  username,
  password,
  userInput,
  passInput,
}) => {
  return (
    <div>
      <h2>log in</h2>
      <form onSubmit={handleLogin}>
        <label>
          username{' '}
          <input
            name="username"
            type="text"
            value={username}
            onChange={userInput}
          />
        </label>
        <br />
        <label>
          password{' '}
          <input
            name="password"
            type="password"
            value={password}
            onChange={passInput}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

LoginPanel.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  userInput: PropTypes.func.isRequired,
  passInput: PropTypes.func.isRequired,
}

export default LoginPanel
