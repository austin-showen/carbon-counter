import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password
    })
    setFormValues({
      name: '',
      email: '',
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
        <label htmlFor="name">Username</label>
        <input
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="Username"
          value={formValues.name}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="email@website.com"
          value={formValues.email}
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
          !formValues.email ||
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
