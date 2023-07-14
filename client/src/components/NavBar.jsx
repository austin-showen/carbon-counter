import { NavLink } from 'react-router-dom'

const NavBar = ({ user, handleLogOut }) => {
  if (user) {
    return (
      <header>
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/vehicles">Vehicles</NavLink>
          <NavLink to="/appliances">Appliances</NavLink>
          <NavLink to="/trips">Trips</NavLink>
          <NavLink to="/activities">Electronic Usage</NavLink>
        </div>
        <div>
          <NavLink to="/" onClick={handleLogOut}>
            Log Out
          </NavLink>
        </div>
      </header>
    )
  } else {
    return (
      <header>
        <div>
          <NavLink to="/">Home</NavLink>
        </div>
        <div>
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </header>
    )
  }
}

export default NavBar
