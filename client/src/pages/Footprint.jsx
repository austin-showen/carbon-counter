import Usages from '../components/Usages'
import Trips from '../components/Trips'
import { useState } from 'react'

const Footprint = ({ user }) => {
  const [filter, setFilter] = useState('all')

  const handleClick = (e) => {
    setFilter(e.target.name)
  }

  if (!user) {
    return <h1>Log in to access this page.</h1>
  } else {
    return (
      <div className="Footprint">
        <div className="footprint-header">
          <h1>
            <span className="darkgreen-text">{user.username}</span>'s Carbon
            Footprint
          </h1>
          <br></br>
          <div className="footprint-buttons">
            <button
              id="filter-recurring"
              name="recurring"
              onClick={handleClick}
              disabled={filter === 'recurring'}
            >
              Recurring Events
            </button>
            <button
              id="filter-onetime"
              name="onetime"
              onClick={handleClick}
              disabled={filter === 'onetime'}
            >
              One-Time Events
            </button>
            <button
              id="filter-all"
              name="all"
              onClick={handleClick}
              disabled={filter === 'all'}
            >
              All Events
            </button>
          </div>
        </div>
        <div className="footprint-container">
          <Usages user={user} filter={filter} />
          <Trips user={user} filter={filter} />
        </div>
      </div>
    )
  }
}

export default Footprint
