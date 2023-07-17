import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../globals'

const Vehicles = ({ user }) => {
  const [vehicles, setVehicles] = useState([])
  const [trips, setTrips] = useState([])
  // const [tripStats, setTripStats] = useState(null)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const getVehicles = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/vehicles/${user.username}`
      )
      setVehicles(response.data)
    }
    const getTrips = async () => {
      const response = await axios.get(`${BACKEND_URL}/trips/${user.username}`)
      setTrips(response.data)
    }
    if (user) {
      getVehicles()
      getTrips()
    }
  }, [reload])

  const handleDelete = async (e) => {
    await axios
      .delete(`${BACKEND_URL}/vehicles/${e.target.id}`)
      .then(setReload(!reload))
  }

  const countTrips = (vehicle) => {
    return trips.filter((trip) => trip.vehicle === vehicle._id).length
  }

  return (
    <div className="Vehicles">
      <h1>{user.username}'s Vehicles</h1>
      <h3>
        <Link to="/vehicles/add">Add a Vehicle</Link>
      </h3>
      <br></br>
      {vehicles &&
        vehicles.map((vehicle) => (
          <div key={vehicle._id} className="card">
            <h2>
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h2>
            <h3>{countTrips(vehicle)} trip(s) registered</h3>
            <Link to="/trips/add" state={{ vehicle: vehicle }}>
              Add a Trip
            </Link>
            <br></br>
            <button id={vehicle._id} onClick={handleDelete}>
              Delete
            </button>
          </div>
        ))}
    </div>
  )
}

export default Vehicles
