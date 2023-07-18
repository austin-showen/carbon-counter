import axios from 'axios'
import { useState, useEffect } from 'react'
import { BACKEND_URL } from '../globals'

const Trips = ({ user, filter, footprint, setFootprint, formatQuantity }) => {
  const [trips, setTrips] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const getTrips = async () => {
      const response = await axios.get(`${BACKEND_URL}/trips/${user.username}`)
      switch (filter) {
        case 'all':
          setTrips(response.data)
          break
        case 'recurring':
          setTrips(response.data.filter((trip) => trip.weeklyFrequency))
          break
        case 'onetime':
          setTrips(response.data.filter((trip) => !trip.weeklyFrequency))
          break
      }
    }
    if (user) {
      getTrips()
    }
  }, [reload, filter])

  useEffect(() => {
    const onetimeTotal = trips
      .filter((trip) => !trip.weeklyFrequency)
      .reduce((acc, trip) => acc + Number(trip.carbonGrams), 0)
    const recurringTotal = trips
      .filter((trip) => trip.weeklyFrequency)
      .reduce(
        (acc, trip) =>
          acc + Number(trip.carbonGrams) * Number(trip.weeklyFrequency),
        0
      )
    setFootprint({
      ...footprint,
      trips: { onetime: onetimeTotal, annual: (recurringTotal / 7) * 365.25 }
    })
  }, [trips])

  const handleDelete = async (e) => {
    await axios.delete(`${BACKEND_URL}/trips/${e.target.id}`)
    setReload(!reload)
  }

  if (!user) {
    return <h1>Log in to access this page.</h1>
  } else {
    return (
      <div className="Trips">
        <h1>Trips</h1>
        <br />
        {footprint.trips.onetime > 0 && (
          <h3>
            One-time: {formatQuantity(footprint.trips.onetime)}
            <br />
            <br />
          </h3>
        )}
        {footprint.trips.annual > 0 && (
          <div style={{ textAlign: 'center' }}>
            <h3>
              Recurring: {formatQuantity(footprint.trips.annual)} per year
            </h3>
            <br />
          </div>
        )}
        {trips && trips.length > 0 ? (
          trips.map((trip) => (
            <div key={trip._id} className="card trip-card">
              <div>
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
              </div>
              <div>
                <button
                  id={trip._id}
                  onClick={handleDelete}
                  style={{ opacity: '60%' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2>No trips registered yet!</h2>
        )}
      </div>
    )
  }
}

export default Trips
