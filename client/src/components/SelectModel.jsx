import axios from 'axios'
import { useState, useEffect } from 'react'

const SelectModel = ({ makeId }) => {
  const [search, setSearch] = useState('')
  const [models, setModels] = useState({})
  const [selectedModel, setSelectedModel] = useState({})

  useEffect(() => {
    const getModels = async () => {
      const response = await axios.get(
        `https://www.carboninterface.com/api/v1/vehicle_makes/${makeId}/vehicle_models`,
        { headers: { Authorization: 'Bearer FQK1g6XNUEPFtJvf55wnw' } }
      )

      const modelsList = []
      response.data.forEach((model) => {
        const modelName = model.data.attributes.name
        if (!modelsList.includes(modelName)) modelsList.push(modelName)
      })

      setModels({
        data: response.data,
        modelsList: modelsList,
        filteredModels: modelsList
      })
    }
    if (makeId) getModels()
  }, [makeId])

  const handleChange = (e) => {
    setSearch(e.target.value)
    const filteredModels = models.modelsList.filter((model) =>
      model.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setModels({ ...models, filteredModels: filteredModels })
  }

  const handleClick = (e) => {
    setSelectedModel({ name: e.target.innerText })
  }

  return (
    <div>
      {selectedModel && <h1>{selectedModel.name}</h1>}
      <form>
        <input type="text" value={search} onChange={handleChange}></input>
      </form>
      <div>
        {models.filteredModels &&
          models.filteredModels.map((model) => (
            <div key={model} onClick={handleClick}>
              {model}
            </div>
          ))}
      </div>
    </div>
  )
}

export default SelectModel
