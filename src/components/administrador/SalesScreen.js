import React from 'react'
import '../style.css'
import SalesTable from './SalesTable'

class SalesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      salesData: [],
    }
  }

  fetchSalesFromServer() {
    fetch('/earning/get', { method: 'GET' }).then(async (res) => {
      if (res.ok) {
        const result = await res.json()
        this.setState({ salesData: result.earnings })
      }
    })
  }

  componentDidMount() {
    this.fetchSalesFromServer()
  }

  render() {
    return (
      <div className='formAgendarHolder'>
        <SalesTable salesData={this.state.salesData} />
      </div>
    )
  }
}

export default SalesScreen
