import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../globals'

const Vehicles = ({ user }) => {
  const [vehicles, setVehicles] = useState([])
  const [trips, setTrips] = useState([])
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
    await axios.delete(`${BACKEND_URL}/vehicles/${e.target.id}`)
    setReload(!reload)
  }

  const countTrips = (vehicle) => {
    return trips.filter((trip) => trip.vehicle === vehicle._id).length
  }

  const calculateAverage = (vehicle) => {
    const vehicleTrip = trips.find((trip) => trip.vehicle === vehicle._id)
    return (vehicleTrip.carbonGrams / vehicleTrip.miles).toFixed(0)
  }

  if (!user) {
    return <h1>Log in to access this page.</h1>
  } else {
    return (
      <div className="Vehicles">
        <h1>
          <span className="darkgreen-text">{user.username}</span>'s Vehicles
        </h1>
        <h3>
          <Link to="/vehicles/add">Add a Vehicle</Link>
        </h3>
        <br></br>
        {vehicles && vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <div key={vehicle._id} className="card vehicle-card">
              <div>
                <h2>
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h2>
                <h3>{countTrips(vehicle)} trip(s) registered</h3>
                {countTrips(vehicle) > 0 && (
                  <h3>{calculateAverage(vehicle)} grams of carbon / mile</h3>
                )}
                <Link to="/trips/add" state={{ vehicle: vehicle }}>
                  Add a Trip
                </Link>
              </div>
              <div>
                <button
                  id={vehicle._id}
                  onClick={handleDelete}
                  style={{ opacity: '60%' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1>No vehicles added yet!</h1>
        )}
      </div>
    )
  }
}

export default Vehicles
