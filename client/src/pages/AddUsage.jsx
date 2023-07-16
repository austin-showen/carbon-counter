import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { API_KEY, BACKEND_URL } from '../globals'
import countryArray from '../data/countries'
import provinceArray from '../data/caProvinces'
import stateArray from '../data/usStates'

const AddUsage = ({ user }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { appliance } = location.state

  const [region, setRegion] = useState({ country: '', state: '' })
  const [hours, setHours] = useState('')
  const [estimate, setEstimate] = useState(null)

  const handleChange = (e) => {
    if (Number(e.target.value) || e.target.value === '')
      setHours(e.target.value)
  }

  const handleSelect = (e) => {
    if (e.target.id === 'country') {
      setRegion({ ...region, country: e.target.value, state: '' })
    } else {
      setRegion({ ...region, state: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const usageKwh = (appliance.watts * hours) / 1000
    const payload = {
      type: 'electricity',
      electricity_unit: 'kwh',
      electricity_value: usageKwh,
      country: region.country
    }
    if (region.state) payload.state = region.state
    const response = await axios.post(
      'https://www.carboninterface.com/api/v1/estimates',
      payload,
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    )
    setEstimate(response.data.data.attributes)
  }

  return (
    <div>
      <h1>How much carbon does your {appliance.name} use?</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Number of hours used"
          value={hours}
          onChange={handleChange}
        />
        <select id="country" value={region.country} onChange={handleSelect}>
          <option value="" disabled>
            Select Country
          </option>
          {countryArray.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        {region.country === 'us' && (
          <select id="state" value={region.state} onChange={handleSelect}>
            <option value="" disabled>
              Select State
            </option>
            {stateArray.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        )}
        {region.country === 'ca' && (
          <select id="state" value={region.state} onChange={handleSelect}>
            <option value="" disabled>
              Select Province or Territory
            </option>
            {provinceArray.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
        )}
        <button type="submit" disabled={!hours || !region.country}>
          Estimate Usage
        </button>
      </form>
      {estimate && (
        <div>
          <h2>
            Your electricity usage released {estimate.carbon_g} grams of carbon.
          </h2>
          <button>Save this Usage</button>
        </div>
      )}
    </div>
  )
}

export default AddUsage
