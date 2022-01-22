import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

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

    const apiUrl = 'https://indu-financepeer-assignment.herokuapp.com/usersdata'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const formattedData = data.map(each => ({
        userId: each.user_id,
        id: each.id,
        name: each.name,
        body: each.body,
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

    return (
      <ul className="ul-list">
        <li className="list-item">
          <p>name</p>
          <p>userId</p>
          <p>body</p>
        </li>
        {userData.map(each => (
          <li key={each.id} className="list-item">
            <p>UserId: {each.userId}</p>
            <p>Name: {each.name}</p>

            <p>Body: {each.body}</p>
          </li>
        ))}
      </ul>
    )
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
            <h1 className="cart-heading">Displaying the list of posts</h1>

            {this.renderData()}
          </div>
        </div>
      </>
    )
  }
}

export default FetchedResults
