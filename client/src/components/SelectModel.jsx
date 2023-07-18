import axios from 'axios'
import { useState, useEffect } from 'react'
import { API_KEY } from '../globals'

const SelectModel = ({
  makeId,
  models,
  setModels,
  selectedModel,
  setSelectedModel,
  setSelectedYear
}) => {
  const [search, setSearch] = useState('')

  useEffect(() => {
    const getModels = async () => {
      const response = await axios.get(
        `https://www.carboninterface.com/api/v1/vehicle_makes/${makeId}/vehicle_models`,
        { headers: { Authorization: `Bearer ${API_KEY}` } }
      )

      const modelsList = []
      response.data.forEach((model) => {
        const modelName = model.data.attributes.name
        if (!modelsList.includes(modelName)) modelsList.push(modelName)
      })

      modelsList.sort()

      setModels({
        data: response.data,
        modelsList: modelsList,
        filteredModels: modelsList
      })
    }
    if (makeId) getModels()
    setSelectedModel({})
    setSearch('')
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
    setSearch('')
  }

  const handleReset = (e) => {
    setSelectedModel({})
    setSelectedYear('')
    setSearch('')
  }

  if (makeId) {
    return (
      <div className="SelectModel">
        <div>
          {!selectedModel.name && <h1>Select the Model:</h1>}
          {selectedModel.name && (
            <div>
              <h2>Model: {selectedModel.name}</h2>
              <button className="reset" onClick={handleReset}>
                Reset
              </button>
            </div>
          )}
          {!selectedModel.name && (
            <div>
              <form>
                <input
                  type="text"
                  name="search"
                  placeholder="Search for a Model"
                  value={search}
                  onChange={handleChange}
                ></input>
              </form>
              <div>
                {models.filteredModels &&
                  models.filteredModels.slice(0, 8).map((model) => (
                    <div
                      key={model}
                      className="card hover-green"
                      onClick={handleClick}
                    >
                      {model}
                    </div>
                  ))}
                {models.filteredModels && models.filteredModels.length > 8 && (
                  <div className="card green">
                    <i>{models.filteredModels.length - 8} more...</i>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default SelectModel
