import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const LogIn = ({ setUser }) => {
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ username: '', password: '' })
    setUser(payload)
    navigate('/')
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          onChange={handleChange}
          name="username"
          type="text"
          placeholder="Enter your username"
          value={formValues.username}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={formValues.password}
          required
        />
      </div>
      <button disabled={!formValues.username || !formValues.password}>
        Log In
      </button>
    </form>
  )
}

export default LogIn
