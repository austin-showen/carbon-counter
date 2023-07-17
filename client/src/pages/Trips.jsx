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
            <h2>{trip.carbonGrams} grams of carbon</h2>
            {trip.weeklyFrequency && (
              <h3>
                {trip.carbonGrams * trip.weeklyFrequency} grams of carbon per
                week
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

export default Trips
