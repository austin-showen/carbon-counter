import AddAppliance from './AddAppliance'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../globals'

const Appliances = ({ user }) => {
  const [appliances, setAppliances] = useState(null)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const getAppliances = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/appliances/${user.username}`
      )
      setAppliances(response.data)
    }
    if (user) getAppliances()
  }, [reload])

  const handleDelete = async (e) => {
    await axios
      .delete(`${BACKEND_URL}/appliances/${e.target.id}`)
      .then(setReload(!reload))
  }

  return (
    <div className="Appliances">
      <h1>
        <span className="darkgreen-text">{user.username}</span>'s Appliances
      </h1>
      <h3>
        <Link to="/appliances/add">Add an Appliance</Link>
      </h3>
      <br></br>
      {appliances &&
        appliances.map((appliance) => (
          <div key={appliance._id} className="card">
            <h2>{appliance.name}</h2>
            <h3>{appliance.watts} watts</h3>
            <Link to="/usages/add" state={{ appliance: appliance }}>
              Add Usage
            </Link>
            <br></br>
            <button id={appliance._id} onClick={handleDelete}>
              Delete
            </button>
          </div>
        ))}
    </div>
  )
}

export default Appliances
