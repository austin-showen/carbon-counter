import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { API_KEY, BACKEND_URL } from '../globals'

const AddTrip = ({ user }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { vehicle } = location.state

  const [distance, setDistance] = useState('')
  const [estimate, setEstimate] = useState(null)

  const handleChange = (e) => {
    if (Number(e.target.value) || e.target.value === '')
      setDistance(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      type: 'vehicle',
      distance_unit: 'mi',
      distance_value: Number(distance),
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
      miles: distance,
      carbonGrams: estimate.carbon_g,
      vehicleId: vehicle.apiId
    })
    navigate('/trips')
  }

  return (
    <div>
      <h1>
        Taking your {vehicle.year} {vehicle.make} {vehicle.model} for a trip?
      </h1>
      <h2>Enter the distance in miles.</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={distance} onChange={handleChange}></input>
        <button type="submit">Calculate</button>
      </form>
      {estimate && (
        <div>
          <h2>Your trip released {estimate.carbon_g} grams of carbon.</h2>
          <button onClick={handleSave}>Save this Trip</button>
        </div>
      )}
    </div>
  )
}

export default AddTrip
