import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Vehicles = ({ user }) => {
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    const getVehicles = async () => {
      const response = await axios.get('http://localhost:3001/vehicles/', {
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
            <div>
              <h1 key={vehicle.id}>
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
