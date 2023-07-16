import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../globals'

const Vehicles = ({ user }) => {
  const [vehicles, setVehicles] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const getVehicles = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/vehicles/${user.username}`
      )
      setVehicles(response.data)
    }
    if (user) getVehicles()
  }, [reload])

  const handleDelete = async (e) => {
    await axios
      .delete(`${BACKEND_URL}/vehicles/${e.target.id}`)
      .then(setReload(!reload))
  }

  return (
    <div>
      <Link to="/vehicles/add">Add a Vehicle</Link>
      <div>
        {vehicles &&
          vehicles.map((vehicle) => (
            <div key={vehicle._id} className="card">
              <h1>
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <Link to="/trips/add" state={{ vehicle: vehicle }}>
                Add a Trip
              </Link>
              <button id={vehicle._id} onClick={handleDelete}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Vehicles
