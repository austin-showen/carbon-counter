import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_KEY } from '../globals'

const SelectMake = ({ makes, setMakes, selectedMake, setSelectedMake }) => {
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

  return (
    <div>
      {selectedMake && <h1>{selectedMake.name}</h1>}
      <form>
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleChange}
        ></input>
      </form>
      <div>
        {makes.filteredMakes &&
          makes.filteredMakes.map((make) => (
            <div key={make} onClick={handleClick}>
              {make}
            </div>
          ))}
      </div>
    </div>
  )
}

export default SelectMake
