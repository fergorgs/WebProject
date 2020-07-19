import React from 'react'
import '../style.css'
import { Link } from 'react-router-dom'

class ClientLoginForm extends React.Component {
  componentWillMount() {
    this.setState({
      email: '',
      password: '',
      logedin: false,
      redirect: '/login/client',
    })
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  submitHandler = () => {
    const data = { email: this.state.email, password: this.state.password }
    fetch('/auth/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.ok) {
        const response = await res.json()
        sessionStorage.setItem('client', JSON.stringify({client:response.client}))
        this.props.history.push('/client')
      } else {
        alert('Usuário ou senha incorretos!')
      }
    })
  }

  render() {
    return (
      <main>
        
        <div class='formAgendarHolder'>
          <div class='formAgendar  shadow'>
            <h1>Login Cliente </h1>
            <input
              type='email'
              name='email'
              placeholder='Email'
              class='nameInput'
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              type='password'
              name='password'
              placeholder='Senha'
              class='nameInput'
              value={this.state.password}
              onChange={this.handleChange}
            />

            <button type='submit' onClick={this.submitHandler}>
              Confirmar
            </button>
          </div>
        </div>

        <div class='formAgendarHolder'>
          <div class='formAgendar  shadow'>
            <Link to='/login/create'>
              <button type='submit'>Novo cliente</button>
            </Link>
            <Link to='/login/admin'>
              <button type='submit'>Logar como Admin</button>
            </Link>
          </div>
        </div>
      </main>
    )
  }
}

export default ClientLoginForm
