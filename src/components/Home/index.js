import {Link} from 'react-router-dom'
import Navbar from '../Navbar'

import './index.css'

const Home = () => (
  <>
    <Navbar />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">
          Upload a file and save data in the database
        </h1>

        <Link to="/products">
          <button type="button" className="shop-now-button">
            Upload A File
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
