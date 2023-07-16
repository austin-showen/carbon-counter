import AddAppliance from '../components/AddAppliance'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../globals'

const Appliances = ({ user }) => {
  const [appliances, setAppliances] = useState(null)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const getAppliances = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/appliances/${user.username}`
      )
      setAppliances(response.data)
    }
    if (user) getAppliances()
  }, [reload])

  return (
    <div>
      {appliances &&
        appliances.map((appliance) => (
          <div key={appliance._id} className="card">
            <h2>{appliance.name}</h2>
            <h3>{appliance.watts} watts</h3>
          </div>
        ))}
      <AddAppliance user={user} reload={reload} setReload={setReload} />
    </div>
  )
}

export default Appliances
