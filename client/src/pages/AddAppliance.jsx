import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { BACKEND_URL } from '../globals'

const AddAppliance = ({ user }) => {
  const navigate = useNavigate()
  const [appliance, setAppliance] = useState({ name: '', watts: '' })

  const handleChangeName = (e) => {
    setAppliance({ ...appliance, name: e.target.value })
  }

  const handleChangeWatts = (e) => {
    if (Number(e.target.value) || e.target.value === '')
      setAppliance({ ...appliance, watts: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${BACKEND_URL}/appliances`, {
      name: appliance.name,
      watts: appliance.watts,
      username: user.username
    })
    setAppliance({ name: '', watts: '' })
    navigate('/appliances')
  }

  if (!user) {
    return <h1>Log in to access this page.</h1>
  } else {
    return (
      <div className="AddAppliance card">
        <form onSubmit={handleSubmit}>
          <h3>
            <label htmlFor="name">Name of Appliance: </label>
          </h3>
          <input
            type="text"
            id="name"
            placeholder="Desktop PC"
            autoComplete="off"
            value={appliance.name}
            onChange={handleChangeName}
          />
          <br />
          <br />
          <h3>
            <label htmlFor="name">Watts: </label>
          </h3>
          <input
            type="text"
            id="watts"
            placeholder="200"
            autoComplete="off"
            value={appliance.watts}
            onChange={handleChangeWatts}
          />
          <br />
          <br />
          <button type="submit">Add Appliance</button>
        </form>
        <div>
          Common wattages:
          <ul>
            <li>Laptops: 50-75 W</li>
            <li>Gaming computers: 300-500 W</li>
            <li>Monitors: 100-200 W</li>
            <li>Ovens: 1000-3000 W</li>
            <li>Refrigerators: 500-1000 W</li>
            <li>Washing machines: 350-500 W</li>
            <li>Dryers: 1500-5000 W</li>
            <li>Central AC: 3000-4000 W</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default AddAppliance
