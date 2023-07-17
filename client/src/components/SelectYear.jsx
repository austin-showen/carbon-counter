import { useState, useEffect } from 'react'

const SelectYear = ({
  selectedModel,
  models,
  years,
  setYears,
  selectedYear,
  setSelectedYear
}) => {
  useEffect(() => {
    const modelInstances = models.data.filter(
      (model) => model.data.attributes.name === selectedModel.name
    )
    const modelIds = {}
    modelInstances.forEach((modelInstance) => {
      const modelYear = modelInstance.data.attributes.year
      if (!modelIds[modelYear]) modelIds[modelYear] = modelInstance.data.id
    })
    setYears(modelIds)
    setSelectedYear('')
  }, [selectedModel])

  const handleChange = (e) => {
    setSelectedYear(e.target.value)
  }

  if (selectedModel.name) {
    return (
      <div>
        {!selectedYear && <h1>Select the Year:</h1>}
        {selectedYear && <h2>Year: {selectedYear}</h2>}
        <form>
          <select value={selectedYear} onChange={handleChange}>
            <option value="" disabled>
              Select Year
            </option>
            {Object.keys(years).length > 0 &&
              Object.keys(years).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </form>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default SelectYear
