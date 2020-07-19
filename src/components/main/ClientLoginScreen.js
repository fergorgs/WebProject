import React from 'react'
import '../style.css'
import ClientLoginForm from './ClientLoginForm'

class ClientLoginScreen extends React.Component {
  render() {
    return <ClientLoginForm history={this.props.history} />
  }
}

export default ClientLoginScreen
