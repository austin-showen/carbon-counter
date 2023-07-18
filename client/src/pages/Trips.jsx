import axios from 'axios'
import { useState, useEffect } from 'react'
import { BACKEND_URL } from '../globals'

const Trips = ({ user }) => {
  const [trips, setTrips] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const getTrips = async () => {
      const response = await axios.get(`${BACKEND_URL}/trips/${user.username}`)
      setTrips(response.data)
    }
    if (user) getTrips()
  }, [reload])

  const handleDelete = async (e) => {
    await axios
      .delete(`${BACKEND_URL}/trips/${e.target.id}`)
      .then(setReload(!reload))
  }

  const formatQuantity = (quantity) => {
    return quantity > 1000
      ? `${(quantity / 1000).toFixed(2)} kilograms`
      : `${quantity} grams`
  }

  if (!user) {
    return <h1>Log in to access this page.</h1>
  } else {
    return (
      <div>
        {trips &&
          trips.map((trip) => (
            <div key={trip._id} className="card">
              <h3>
                {trip.year} {trip.make} {trip.model} - {trip.miles} miles
              </h3>
              {trip.weeklyFrequency && (
                <h3>{trip.weeklyFrequency} times per week</h3>
              )}
              <h2>{formatQuantity(trip.carbonGrams)} of carbon</h2>
              {trip.weeklyFrequency && (
                <h3>
                  {formatQuantity(trip.carbonGrams * trip.weeklyFrequency)} of
                  carbon per week
                </h3>
              )}
              <button id={trip._id} onClick={handleDelete}>
                Delete
              </button>
            </div>
          ))}
      </div>
    )
  }
}

export default Trips
