import React from 'react'
import '../style.css'
import { Link } from 'react-router-dom'
import ReactInputMask from 'react-input-mask'

class AdminLoginForm extends React.Component {
  componentWillMount() {
    this.setState({ cpf: '', password: '', logedin: false })
  }

  cpfHandler = (event) => {
    this.setState({ cpf: event.target.value })
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
        cpf: this.state.cpf,
        password: this.state.password,
      }),
    }).then((res) => {
      if (res.ok) {
        this.props.history.push('/admin')
      } else {
        alert('CPF ou senha incorretos!')
      }
    })
  }

  render() {
    return (
      <main>
        <div class='formAgendarHolder'>
          <div class='formAgendar  shadow'>
            <h1>Login Admin </h1>
            <ReactInputMask
              mask='999.999.999-99'
              type='text'
              placeholder='CPF'
              class='nameInput'
              value={this.state.cpf}
              onChange={this.cpfHandler}
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
