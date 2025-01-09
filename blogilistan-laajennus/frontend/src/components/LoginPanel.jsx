import PropTypes from 'prop-types'

const LoginPanel = ({ handleLogin }) => {
  return (
    <div>
      <h2>log in</h2>
      <form onSubmit={handleLogin}>
        <label>
          username <input name="username" type="text" />
        </label>
        <br />
        <label>
          password <input name="password" type="password" />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

LoginPanel.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginPanel
