import axios from 'axios'
import { useState, useEffect } from 'react'
import { BACKEND_URL } from '../globals'

const Usages = ({ user, filter }) => {
  const [usages, setUsages] = useState([])
  const [totals, setTotals] = useState({ onetime: 0, recurring: 0 })
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

  useEffect(() => {
    const onetimeTotal = usages
      .filter((usage) => !usage.recurring)
      .reduce((acc, usage) => acc + Number(usage.carbonGrams), 0)
    const recurringTotal = usages
      .filter((usage) => usage.recurring)
      .reduce((acc, usage) => acc + Number(usage.carbonGrams), 0)
    setTotals({ onetime: onetimeTotal, recurring: recurringTotal })
  }, [usages])

  const handleDelete = async (e) => {
    await axios.delete(`${BACKEND_URL}/usages/${e.target.id}`)
    setReload(!reload)
  }

  const formatQuantity = (quantity) => {
    return quantity > 1000000
      ? `${(quantity / 1000000).toFixed(2)} metric tonnes`
      : quantity > 1000
      ? `${(quantity / 1000).toFixed(2)} kilograms`
      : `${quantity} grams`
  }

  if (!user) {
    return <h1>Log in to access this page.</h1>
  } else {
    return (
      <div className="Usages">
        <h1>Electronic Usage</h1>
        {totals.onetime > 0 && (
          <h3>One-time: {formatQuantity(totals.onetime)}</h3>
        )}
        {totals.recurring > 0 && (
          <h3>Recurring: {formatQuantity(totals.recurring)} per day</h3>
        )}
        {usages &&
          usages.map((usage) => (
            <div key={usage._id} className="card usage-card">
              <div>
                <h3>
                  {usage.applianceName} for {usage.hours} hour
                  {usage.hours !== '1' && <span>s</span>} in{' '}
                  {usage.state && <span>{usage.state.toUpperCase()},</span>}{' '}
                  {usage.country.toUpperCase()}
                </h3>
                <h2>
                  {formatQuantity(usage.carbonGrams)} of carbon
                  {usage.recurring && <span> per day</span>}
                </h2>
              </div>
              <div>
                <button
                  id={usage._id}
                  onClick={handleDelete}
                  style={{ opacity: '60%' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    )
  }
}

export default Usages
