import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <header>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/vehicles">Vehicles</NavLink>
      <NavLink to="/appliances">Appliances</NavLink>
      <NavLink to="/trips">Trips</NavLink>
      <NavLink to="/activities">Electronic Usage</NavLink>
      <NavLink to="/login">Log In</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
    </header>
  )
}

export default NavBar
