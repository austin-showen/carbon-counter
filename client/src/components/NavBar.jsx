import { NavLink } from 'react-router-dom'

const NavBar = ({ user, handleLogOut }) => {
  return (
    <header>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/vehicles">Vehicles</NavLink>
      <NavLink to="/appliances">Appliances</NavLink>
      <NavLink to="/trips">Trips</NavLink>
      <NavLink to="/activities">Electronic Usage</NavLink>
      {user && (
        <NavLink to="/" onClick={handleLogOut}>
          Log Out
        </NavLink>
      )}
      {!user && <NavLink to="/login">Log In</NavLink>}
      {!user && <NavLink to="/signup">Sign Up</NavLink>}
    </header>
  )
}

export default NavBar
