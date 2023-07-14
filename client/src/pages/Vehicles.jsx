import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../globals'

const Vehicles = ({ user }) => {
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    const getVehicles = async () => {
      const response = await axios.get(`${BACKEND_URL}/vehicles/`, {
        username: user.username
      })
      setVehicles(response.data)
    }
    if (user) getVehicles()
  }, [])

  return (
    <div>
      <Link to="/vehicles/add">Add a Vehicle</Link>
      <div>
        {vehicles &&
          vehicles.map((vehicle) => (
            <div key={vehicle.id} className="card">
              <h1>
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <Link to="/trips/add" state={{ vehicle: vehicle }}>
                Add a Trip
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Vehicles
