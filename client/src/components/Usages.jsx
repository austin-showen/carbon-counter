import axios from 'axios'
import { useState, useEffect } from 'react'
import { BACKEND_URL } from '../globals'

const Usages = ({ user, filter, footprint, setFootprint, formatQuantity }) => {
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

  useEffect(() => {
    const onetimeTotal = usages
      .filter((usage) => !usage.recurring)
      .reduce((acc, usage) => acc + Number(usage.carbonGrams), 0)
    const recurringTotal = usages
      .filter((usage) => usage.recurring)
      .reduce((acc, usage) => acc + Number(usage.carbonGrams), 0)
    setFootprint({
      ...footprint,
      usages: { onetime: onetimeTotal, annual: recurringTotal * 365.25 }
    })
  }, [usages])

  const handleDelete = async (e) => {
    await axios.delete(`${BACKEND_URL}/usages/${e.target.id}`)
    setReload(!reload)
  }

  if (!user) {
    return <h1>Log in to access this page.</h1>
  } else {
    return (
      <div className="Usages">
        <h1>Electronic Usage</h1>
        <br />
        {footprint.usages.onetime > 0 && (
          <h3>
            One-time: {formatQuantity(footprint.usages.onetime)}
            <br />
            <br />
          </h3>
        )}
        {footprint.usages.annual > 0 && (
          <div style={{ textAlign: 'center' }}>
            <h3>
              Recurring: {formatQuantity(footprint.usages.annual)} per year
            </h3>
            <br />
          </div>
        )}
        {usages && usages.length > 0 ? (
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
          ))
        ) : (
          <h2>No usage registered yet!</h2>
        )}
      </div>
    )
  }
}

export default Usages
