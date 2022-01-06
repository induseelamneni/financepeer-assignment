import {Component} from 'react'

import Navbar from '../Navbar'

import './index.css'

class Home extends Component {
  handleFiles = files => {
    const reader = new FileReader()
    reader.onload = function (e) {
      console.log(reader.result)
    }
    reader.readAsText(files[0])
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="home-container">
          <div className="home-content">
            <h1 className="home-heading">
              Upload a file and save data in the database
            </h1>

            <button
              type="button"
              className="shop-now-button"
              onClick={this.handleFiles}
            >
              Upload A File
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default Home
