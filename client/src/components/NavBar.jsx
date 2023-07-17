import { NavLink } from 'react-router-dom'

const NavBar = ({ user, handleLogOut }) => {
  if (user) {
    return (
      <header>
        <div>
          <NavLink to="/">Carbon Counter</NavLink>
          <NavLink to="/vehicles">Vehicles</NavLink>
          <NavLink to="/appliances">Appliances</NavLink>
          <NavLink to="/trips">Trips</NavLink>
          <NavLink to="/usages">Electronic Usage</NavLink>
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
          <NavLink to="/">Carbon Counter</NavLink>
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
