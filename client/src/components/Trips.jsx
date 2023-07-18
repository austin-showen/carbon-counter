import axios from 'axios'
import { useState, useEffect } from 'react'
import { BACKEND_URL } from '../globals'

const Trips = ({ user, filter }) => {
  const [trips, setTrips] = useState([])
  const [totals, setTotals] = useState({ onetime: 0, recurring: 0 })
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
    if (user) getTrips()
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
    setTotals({ onetime: onetimeTotal, recurring: recurringTotal })
  }, [trips])

  const handleDelete = async (e) => {
    await axios.delete(`${BACKEND_URL}/trips/${e.target.id}`)
    setReload(!reload)
  }

  const formatQuantity = (quantity) => {
    return quantity > 1000000
      ? `${(quantity / 1000000).toFixed(2)} metric tons`
      : quantity > 1000
      ? `${(quantity / 1000).toFixed(2)} kilograms`
      : `${quantity} grams`
  }

  if (!user) {
    return <h1>Log in to access this page.</h1>
  } else {
    return (
      <div className="Trips">
        <h1>Trips</h1>
        <br></br>
        {totals.onetime > 0 && (
          <h3>
            One-time: {formatQuantity(totals.onetime)}
            <br></br>
            <br></br>
          </h3>
        )}
        {totals.recurring > 0 && (
          <div style={{ textAlign: 'center' }}>
            <h3>
              Recurring: {formatQuantity(totals.recurring)} per week
              <br />({formatQuantity((totals.recurring / 7) * 365.25)} per year)
            </h3>
            <br></br>
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
