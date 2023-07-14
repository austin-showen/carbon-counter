import { useState } from 'react'
import SelectModel from '../components/SelectModel'
import SelectMake from '../components/SelectMake'
import SelectYear from '../components/SelectYear'

const AddVehicle = ({ user }) => {
  const [makes, setMakes] = useState({})
  const [selectedMake, setSelectedMake] = useState({})
  const [models, setModels] = useState({})
  const [selectedModel, setSelectedModel] = useState({})
  const [years, setYears] = useState([])
  const [selectedYear, setSelectedYear] = useState('')

  return (
    <div className="AddVehicle">
      <div>
        <SelectMake
          makes={makes}
          setMakes={setMakes}
          selectedMake={selectedMake}
          setSelectedMake={setSelectedMake}
        />
      </div>
      <div>
        {selectedMake.id && (
          <SelectModel
            makeId={selectedMake.id}
            models={models}
            setModels={setModels}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
        )}
      </div>
      <div>
        {selectedModel.name && (
          <SelectYear
            selectedModel={selectedModel}
            models={models}
            years={years}
            setYears={setYears}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        )}
      </div>
    </div>
  )
}

export default AddVehicle
