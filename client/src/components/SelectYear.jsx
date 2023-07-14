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
    const modelYears = []
    modelInstances.forEach((modelInstance) => {
      const modelYear = modelInstance.data.attributes.year
      if (!modelYears.includes(modelYear)) modelYears.push(modelYear)
    })
    modelYears.sort()
    setYears(modelYears)
  }, [selectedModel])

  const handleChange = (e) => {
    setSelectedYear(e.target.value)
  }

  if (selectedModel.name) {
    return (
      <div>
        <form>
          <select value={selectedYear} onChange={handleChange}>
            <option value="" disabled>
              Select Year
            </option>
            {years &&
              years.map((year) => (
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
