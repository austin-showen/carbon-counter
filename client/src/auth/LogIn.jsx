import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const LogIn = ({ setUser }) => {
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ username: '', password: '' })
    setUser(payload)
    navigate('/')
  }

  return (
    <form className="login card" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">
          <h3>Username</h3>
        </label>
        <input
          onChange={handleChange}
          id="username"
          type="text"
          placeholder="Enter your username"
          autoComplete="off"
          value={formValues.username}
          required
        />
      </div>
      <br />
      <div>
        <label htmlFor="password">
          <h3>Password</h3>
        </label>
        <input
          onChange={handleChange}
          type="password"
          id="password"
          placeholder="Enter your password"
          autoComplete="off"
          value={formValues.password}
          required
        />
      </div>
      <br />
      <button disabled={!formValues.username || !formValues.password}>
        Log In
      </button>
    </form>
  )
}

export default LogIn
