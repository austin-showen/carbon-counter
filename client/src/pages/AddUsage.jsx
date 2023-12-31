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
  const [recurring, setRecurring] = useState(false)
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

  const handleSave = async (e) => {
    await axios.post(`${BACKEND_URL}/usages`, {
      username: user.username,
      region: region,
      hours: hours,
      carbonGrams: estimate.carbon_g,
      applianceId: appliance._id,
      recurring: recurring
    })
    navigate('/footprint')
  }

  const handleRecurring = () => {
    setRecurring(!recurring)
    setRegion({ country: '', state: '' })
    setHours('')
    setEstimate(null)
  }

  if (!user) {
    return <h1>Log in to access this page.</h1>
  } else {
    return (
      <div className="AddUsage">
        <h1>
          How much carbon does your{' '}
          <span className="darkgreen-text">{appliance.name}</span> use?
        </h1>
        <br />
        <div className="card">
          <div className="recurring-selector">
            <button
              id="usage-onetime"
              disabled={!recurring}
              onClick={handleRecurring}
            >
              One-Time Usage
            </button>
            <button
              id="usage-recurring"
              disabled={recurring}
              onClick={handleRecurring}
            >
              Recurring Usage
            </button>
          </div>
          <br />
          <br />
          {recurring ? (
            <h3>
              Enter the average number of hours you use the{' '}
              <span className="darkgreen-text">{appliance.name}</span> per day.
            </h3>
          ) : (
            <h3>
              Enter the number of hours you used the{' '}
              <span className="darkgreen-text">{appliance.name}</span>.
            </h3>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Number of hours"
              autoComplete="off"
              value={hours}
              onChange={handleChange}
            />
            <br />
            <br />
            <h3>Select your country.</h3>
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
            <br />
            <br />
            {region.country === 'us' && (
              <div>
                <h3>Select your state.</h3>
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
                <br />
                <br />
              </div>
            )}
            {region.country === 'ca' && (
              <div>
                <h3>Select your Province/Territory.</h3>
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
                <br />
                <br />
              </div>
            )}
            <button
              type="submit"
              disabled={!hours || !region.country || estimate}
            >
              Estimate Usage
            </button>
            <br />
            <br />
          </form>
          {estimate && (
            <div>
              {recurring ? (
                <h2>
                  Your electricity usage releases an average of{' '}
                  {estimate.carbon_g} grams of carbon per day.
                </h2>
              ) : (
                <h2>
                  Your electricity usage released {estimate.carbon_g} grams of
                  carbon.
                </h2>
              )}
              <br />
              <button onClick={handleSave}>Save this Usage</button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default AddUsage
