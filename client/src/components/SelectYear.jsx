import { useState, useEffect } from 'react'

const SelectYear = ({ selectedModel, models }) => {
  const [years, setYears] = useState([])
  const [selectedYear, setSelectedYear] = useState('')

  useEffect(() => {
    const modelInstances = models.data.filter(
      (model) => model.data.attributes.name === selectedModel.name
    )
    const modelYears = []
    modelInstances.forEach((modelInstance) => {
      const modelYear = modelInstance.data.attributes.year
      if (!modelYears.includes(modelYear)) modelYears.push(modelYear)
    })
    const sortedYears = modelYears.sort((a, b) => a - b)
    setYears(sortedYears)
  }, [selectedModel])

  const handleChange = (e) => {
    setSelectedYear(e.target.value)
  }

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
}

export default SelectYear
