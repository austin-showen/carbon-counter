import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      username: formValues.username,
      password: formValues.password
    })
    setFormValues({
      username: '',
      password: '',
      confirmPassword: ''
    })
    navigate('/login')
  }

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          onChange={handleChange}
          name="username"
          type="text"
          placeholder="Username"
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
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          onChange={handleChange}
          type="password"
          name="confirmPassword"
          value={formValues.confirmPassword}
          required
        />
      </div>
      <button
        disabled={
          !formValues.username ||
          (!formValues.password &&
            formValues.confirmPassword === formValues.password)
        }
      >
        Register
      </button>
    </form>
  )
}

export default SignUp
