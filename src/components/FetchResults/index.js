import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Navbar from '../Navbar'

import './index.css'

const fetchedDataStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class FetchedResults extends Component {
  state = {
    dataStatus: fetchedDataStatus.initial,
    userData: [],
  }

  componentDidMount() {
    this.getUserDetails()
  }

  // Fetching Data

  getUserDetails = async () => {
    this.setState({dataStatus: fetchedDataStatus.inProgress})
    const response = await fetch(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
    )
    if (response.ok) {
      const data = await response.json()

      const formattedData = data.map(each => ({
        id: each.id,
        name: each.name,
        email: each.email,
        role: each.role,
      }))

      this.setState({
        userData: formattedData,
        dataStatus: fetchedDataStatus.success,
      })
    } else {
      this.setState({
        dataStatus: fetchedDataStatus.failure,
      })
    }
  }

  successDataView = () => {
    const {userData} = this.state
    console.log(userData)

    return <div>p</div>
  }

  // Loader View

  LoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  // Data Fetching Failure View

  failureDataView = () => (
    <div className="loader-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
        alt="not found"
        className="not-found-img"
      />
      <button
        type="button"
        onClick={this.retryRenderData}
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  // According to fetched Data Switch to that View

  renderData = () => {
    const {dataStatus} = this.state
    switch (dataStatus) {
      case fetchedDataStatus.success:
        return this.successDataView()
      case fetchedDataStatus.failure:
        return this.failureDataView()
      case fetchedDataStatus.inProgress:
        return this.LoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="cart-container">
          <div className="cart-content-container">
            <h1 className="cart-heading">My Cart</h1>
            {this.renderData()}
          </div>
        </div>
      </>
    )
  }
}

export default FetchedResults
