import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import Home from './pages/Home'
import Vehicles from './pages/Vehicles'
import Appliances from './pages/Appliances'
import Footprint from './pages/Footprint'
import LogIn from './auth/LogIn'
import SignUp from './auth/SignUp'
import NavBar from './components/NavBar'
import AddVehicle from './pages/AddVehicle'
import AddAppliance from './pages/AddAppliance'
import AddTrip from './pages/AddTrip'
import AddUsage from './pages/AddUsage'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  return (
    <div className="App">
      <NavBar user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/vehicles" element={<Vehicles user={user} />} />
          <Route path="/vehicles/add" element={<AddVehicle user={user} />} />
          <Route path="/appliances" element={<Appliances user={user} />} />
          <Route
            path="/appliances/add"
            element={<AddAppliance user={user} />}
          />
          <Route path="/trips/add" element={<AddTrip user={user} />} />
          <Route path="/usages/add" element={<AddUsage user={user} />} />
          <Route path="/footprint" element={<Footprint user={user} />} />
          <Route path="/login" element={<LogIn setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
      <footer>
        <p>© 2023 Carbon Counter</p>
      </footer>
    </div>
  )
}

export default App
