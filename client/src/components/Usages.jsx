import axios from 'axios'
import { useState, useEffect } from 'react'
import { BACKEND_URL } from '../globals'

const Usages = ({ user, filter }) => {
  const [usages, setUsages] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const getUsages = async () => {
      const response = await axios.get(`${BACKEND_URL}/usages/${user.username}`)
      switch (filter) {
        case 'all':
          setUsages(response.data)
          break
        case 'recurring':
          setUsages(response.data.filter((usage) => usage.recurring))
          break
        case 'onetime':
          setUsages(response.data.filter((usage) => !usage.recurring))
          break
      }
    }
    if (user) getUsages()
  }, [reload, filter])

  const handleDelete = async (e) => {
    await axios
      .delete(`${BACKEND_URL}/usages/${e.target.id}`)
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
      <div className="Usages">
        <h1>Electronic Usage</h1>
        {usages &&
          usages.map((usage) => (
            <div key={usage._id} className="card usage-card">
              <div>
                <h2>
                  {usage.applianceName} for {usage.hours} hour
                  {usage.hours !== '1' && <span>s</span>} in{' '}
                  {usage.state && <span>{usage.state.toUpperCase()},</span>}{' '}
                  {usage.country.toUpperCase()}
                </h2>
                <h3>
                  {formatQuantity(usage.carbonGrams)} of carbon released
                  {usage.recurring && <span> per day</span>}
                </h3>
              </div>
              <div>
                <button
                  id={usage._id}
                  onClick={handleDelete}
                  style={{ opacity: '60%' }}
                >
                  <i>Delete</i>
                </button>
              </div>
            </div>
          ))}
      </div>
    )
  }
}

export default Usages
