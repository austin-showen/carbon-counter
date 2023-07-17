import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_KEY } from '../globals'

const SelectMake = ({
  makes,
  setMakes,
  selectedMake,
  setSelectedMake,
  setSelectedModel,
  setSelectedYear
}) => {
  const [search, setSearch] = useState('')

  useEffect(() => {
    const getMakes = async () => {
      const response = await axios.get(
        'https://www.carboninterface.com/api/v1/vehicle_makes',
        { headers: { Authorization: `Bearer ${API_KEY}` } }
      )
      const makesList = response.data
        .map((make) => make.data.attributes.name)
        .sort()
      setMakes({
        data: response.data,
        makesList: makesList,
        filteredMakes: makesList
      })
    }
    getMakes()
    setSearch('')
    setSelectedMake({})
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
    const filteredMakes = makes.makesList.filter((make) =>
      make.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setMakes({ ...makes, filteredMakes: filteredMakes })
  }

  const handleClick = (e) => {
    const selectedMakeData = makes.data.find(
      (make) => make.data.attributes.name === e.target.innerText
    )
    const selectedMakeId = selectedMakeData.data.id
    setSelectedMake({ name: e.target.innerText, id: selectedMakeId })
    setSearch('')
  }

  const handleReset = (e) => {
    setSelectedMake({})
    setSelectedModel({})
    setSelectedYear('')
    setSearch('')
  }

  return (
    <div>
      {!selectedMake.name && <h1>Select the Make:</h1>}
      {selectedMake.name && (
        <div>
          <h1>Make: {selectedMake.name}</h1>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
      {!selectedMake.name && (
        <div>
          <form>
            <input
              type="text"
              name="search"
              placeholder="Search for a Make"
              value={search}
              onChange={handleChange}
            ></input>
          </form>
          <div>
            {makes.filteredMakes &&
              makes.filteredMakes.slice(0, 10).map((make) => (
                <div key={make} className="card" onClick={handleClick}>
                  {make}
                </div>
              ))}
            {makes.filteredMakes && makes.filteredMakes.length > 10 && (
              <div className="card">...</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectMake
