import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { API_KEY, BACKEND_URL } from '../globals'

const AddTrip = ({ user }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { vehicle } = location.state

  const [trip, setTrip] = useState({ distance: '', frequency: '' })
  const [recurring, setRecurring] = useState(false)
  const [estimate, setEstimate] = useState(null)

  const handleChange = (e) => {
    if (Number(e.target.value) || e.target.value === '')
      setTrip({ ...trip, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      type: 'vehicle',
      distance_unit: 'mi',
      distance_value: Number(trip.distance),
      vehicle_model_id: vehicle.apiId
    }
    const response = await axios.post(
      'https://www.carboninterface.com/api/v1/estimates',
      payload,
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    )
    setEstimate(response.data.data.attributes)
  }

  const handleSave = async (e) => {
    await axios.post(`${BACKEND_URL}/trips/`, {
      username: user.username,
      miles: trip.distance,
      carbonGrams: estimate.carbon_g,
      vehicleId: vehicle.apiId,
      weeklyFrequency: trip.frequency
    })
    navigate('/trips')
  }

  const handleRecurring = () => {
    setRecurring(!recurring)
    setTrip({ distance: '', frequency: '' })
    setEstimate(null)
  }

  const formatQuantity = (quantity) => {
    return quantity > 1000
      ? `${(quantity / 1000).toFixed(2)} kilograms`
      : `${quantity} grams`
  }

  return (
    <div>
      <h1>
        Taking your {vehicle.year} {vehicle.make} {vehicle.model} for a trip?
      </h1>
      <button disabled={!recurring} onClick={handleRecurring}>
        One-Time Trip
      </button>
      <button disabled={recurring} onClick={handleRecurring}>
        Recurring Trip
      </button>
      <h2>Enter the distance in miles.</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="distance"
          value={trip.distance}
          onChange={handleChange}
        />
        {recurring && (
          <div>
            <h3>How many times per week do you make this trip?</h3>
            <input
              type="text"
              id="frequency"
              value={trip.frequency}
              onChange={handleChange}
            />
          </div>
        )}
        <button type="submit">Calculate</button>
      </form>
      {estimate && (
        <div>
          {trip.frequency ? (
            <h2>
              Your trip releases an average of{' '}
              {formatQuantity(estimate.carbon_g * trip.frequency)} of carbon per
              week.
            </h2>
          ) : (
            <h2>
              Your trip released {formatQuantity(estimate.carbon_g)} of carbon.
            </h2>
          )}
          <button onClick={handleSave}>Save this Trip</button>
        </div>
      )}
    </div>
  )
}

export default AddTrip
