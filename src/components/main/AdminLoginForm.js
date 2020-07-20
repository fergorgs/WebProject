import React from 'react'
import '../style.css'
import { Link } from 'react-router-dom'

class AdminLoginForm extends React.Component {
  componentWillMount() {
    this.setState({ email: '', password: '', logedin: false })
  }

  emailHandler = (event) => {
    this.setState({ email: event.target.value })
  }
  passwordHandler = (event) => {
    this.setState({ password: event.target.value })
  }
  submitHandler = () => {
    fetch('/auth/authenticate_admin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    }).then((res) => {
      if (res.ok) {
        this.props.history.push('/admin')
      } else {
        alert('Email ou senha incorretos!')
      }
    })
  }

  render() {
    return (
      <main>
        <div class='formAgendarHolder'>
          <div class='formAgendar  shadow'>
            <h1>Login Admin </h1>
            <input
              type='text'
              placeholder='Email'
              class='nameInput'
              value={this.state.email}
              onChange={this.emailHandler}
            />
            <input
              type='password'
              placeholder='Senha'
              class='nameInput'
              value={this.state.password}
              onChange={this.passwordHandler}
            />

            <button type='submit' onClick={this.submitHandler}>
              Confirmar
            </button>
          </div>
        </div>

        <div class='formAgendarHolder'>
          <div class='formAgendar  shadow'>
            <Link to='/login'>
              <button type='submit'>Logar como Cliente</button>
            </Link>
          </div>
        </div>
      </main>
    )
  }
}

export default AdminLoginForm
