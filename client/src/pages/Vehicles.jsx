import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AddVehicle from './AddVehicle'

const Vehicles = ({ user }) => {
  useEffect(() => {}, [])

  return (
    <div>
      <Link to="/vehicles/add">Add a Vehicle</Link>
      <p>this is the list of vehicles</p>
    </div>
  )
}

export default Vehicles
