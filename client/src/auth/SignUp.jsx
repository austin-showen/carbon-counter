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
    <form className="signup card" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">
          <h3>Username</h3>
        </label>
        <input
          onChange={handleChange}
          name="username"
          type="text"
          placeholder="Enter a username"
          autoComplete="off"
          value={formValues.username}
          required
        />
      </div>
      <br></br>
      <div>
        <label htmlFor="password">
          <h3>Password</h3>
        </label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Enter a password"
          autoComplete="off"
          value={formValues.password}
          required
        />
      </div>
      <br></br>
      <div>
        <label htmlFor="confirmPassword">
          <h3>Confirm Password</h3>
        </label>
        <input
          onChange={handleChange}
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          autoComplete="off"
          value={formValues.confirmPassword}
          required
        />
      </div>
      <br></br>
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
