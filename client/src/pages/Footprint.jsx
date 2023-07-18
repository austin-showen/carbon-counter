import Usages from '../components/Usages'
import Trips from '../components/Trips'
import { useState } from 'react'
import weightArray from '../data/weights'

const Footprint = ({ user }) => {
  const [filter, setFilter] = useState('all')
  const [footprint, setFootprint] = useState({
    trips: { onetime: 0, annual: 0 },
    usages: { onetime: 0, annual: 0 }
  })

  const handleClick = (e) => {
    setFilter(e.target.name)
  }

  const formatQuantity = (quantity) => {
    return quantity > 1000000
      ? `${(quantity / 1000000).toFixed(2)} metric tons`
      : quantity > 1000
      ? `${(quantity / 1000).toFixed(2)} kilograms`
      : `${quantity} grams`
  }

  const randomAnimal = (weight) => {
    const animal = weightArray[Math.floor(Math.random() * weightArray.length)]
    return `${(weight / animal.weight).toFixed(2)} ${animal.name}`
  }

  if (!user) {
    return <h1>Log in to access this page.</h1>
  } else {
    return (
      <div className="Footprint">
        <div className="footprint-header">
          <h1>
            <span className="darkgreen-text">{user.username}</span>'s Carbon
            Footprint
          </h1>
          <br />
          <div className="footprint-buttons">
            <button
              id="filter-recurring"
              name="recurring"
              onClick={handleClick}
              disabled={filter === 'recurring'}
            >
              Recurring Events
            </button>
            <button
              id="filter-onetime"
              name="onetime"
              onClick={handleClick}
              disabled={filter === 'onetime'}
            >
              One-Time Events
            </button>
            <button
              id="filter-all"
              name="all"
              onClick={handleClick}
              disabled={filter === 'all'}
            >
              All Events
            </button>
          </div>
        </div>
        <div className="footprint-container">
          <Usages
            user={user}
            filter={filter}
            footprint={footprint}
            setFootprint={setFootprint}
            formatQuantity={formatQuantity}
          />
          <Trips
            user={user}
            filter={filter}
            footprint={footprint}
            setFootprint={setFootprint}
            formatQuantity={formatQuantity}
          />
        </div>
        <div className="card totals">
          <h1>Totals:</h1>
          <br />
          {footprint.trips.onetime + footprint.usages.onetime > 0 && (
            <div>
              <h2>
                One-time events:{' '}
                {formatQuantity(
                  footprint.trips.onetime + footprint.usages.onetime
                )}{' '}
                of carbon
              </h2>
              <h3>
                That's the same weight as{' '}
                {randomAnimal(
                  footprint.trips.onetime + footprint.usages.onetime
                )}
                !
              </h3>
              <br />
            </div>
          )}
          {footprint.trips.annual + footprint.usages.annual > 0 && (
            <div>
              <h2>
                Recurring events:{' '}
                {formatQuantity(
                  footprint.trips.annual + footprint.usages.annual
                )}{' '}
                of carbon per year
              </h2>
              <h3>
                That's the same weight as{' '}
                {randomAnimal(footprint.trips.annual + footprint.usages.annual)}
                !
              </h3>
              <br />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Footprint
