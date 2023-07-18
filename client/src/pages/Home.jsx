import { Link } from 'react-router-dom'

const Home = ({ user }) => {
  return (
    <div className="Home">
      <h1>
        <span className="darkgreen-text">Carbon Counter</span> allows you to
        estimate your contribution to global carbon emissions through your
        vehicle and electricity usage.
      </h1>
      <br></br>
      <h1>
        To get started,&nbsp;
        {user ? (
          <span>
            <Link to="/vehicles/add">Add a Vehicle</Link> or{' '}
            <Link to="/appliances/add">an Appliance</Link>.
          </span>
        ) : (
          <span>
            <Link to="/login">Log In</Link> or <Link to="/signup">Sign Up</Link>
            .
          </span>
        )}
      </h1>
      <br></br>
      <br></br>
      <div
        className="card"
        style={{ textAlign: 'center', width: '60%', marginTop: '50px' }}
      >
        <h2>Why carbon?</h2>
        <br></br>
        <h3>
          More than{' '}
          <span className="darkgreen-text">6 billion metric tons</span> of
          greenhouse gases enter the atmosphere every year from global human
          activity.
        </h3>
        <br></br>
        <h3>
          Per-capita carbon usage is highest in wealthy countries, where
          high-energy electronics and large, inefficient vehicles are in
          constant use.
        </h3>
        <br></br>
        <h3>
          Carbon emissions are easy to estimate, and if you compare your
          options, you can begin to make simple changes to reduce or offset your
          carbon footprint.
        </h3>
      </div>
    </div>
  )
}

export default Home
