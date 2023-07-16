import axios from 'axios'
import { useState } from 'react'
import { BACKEND_URL } from '../globals'

const AddAppliance = ({ user, reload, setReload }) => {
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
    setReload(!reload)
    setAppliance({ name: '', watts: '' })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name of Appliance: </label>
        <input
          type="text"
          id="name"
          placeholder="Desktop PC"
          value={appliance.name}
          onChange={handleChangeName}
        />
        <label htmlFor="name">Watts: </label>
        <input
          type="text"
          id="watts"
          placeholder="200"
          value={appliance.watts}
          onChange={handleChangeWatts}
        />
        <button type="submit">Add Appliance</button>
      </form>
    </div>
  )
}

export default AddAppliance
