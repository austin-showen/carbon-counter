import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import Home from './pages/Home'
import Vehicles from './pages/Vehicles'
import Appliances from './pages/Appliances'
import Trips from './pages/Trips'
import Activities from './pages/Activities'
import LogIn from './auth/LogIn'
import SignUp from './auth/SignUp'
import NavBar from './components/NavBar'
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
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/appliances" element={<Appliances />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/login" element={<LogIn setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
