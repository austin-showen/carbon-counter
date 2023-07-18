import Usages from '../components/Usages'
import Trips from '../components/Trips'

const Footprint = ({ user }) => {
  if (!user) {
    return <h1>Log in to access this page.</h1>
  } else {
    return (
      <div className="Footprint">
        <Usages user={user} />
        <Trips user={user} />
      </div>
    )
  }
}

export default Footprint
