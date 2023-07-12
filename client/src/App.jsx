import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Vehicles from './pages/Vehicles'
import Appliances from './pages/Appliances'
import Trips from './pages/Trips'
import Activities from './pages/Activities'
import LogIn from './auth/LogIn'
import SignUp from './auth/SignUp'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/appliances" element={<Appliances />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
