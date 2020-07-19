import React from 'react'
import '../style.css'
import AdminLoginForm from './AdminLoginForm'

class AdminLoginScreen extends React.Component {
  render() {
    return <AdminLoginForm history={this.props.history} />
  }
}

export default AdminLoginScreen
