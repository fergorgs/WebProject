import React, { useState, useContext } from 'react'
import '../style.css'
import { Link } from 'react-router-dom'
import { PermissionContext } from '../contexts/PermissionContext'

export default function ClientLoginForm(props) {
  const [state, setState] = useState({
    email: '',
    password: '',
    logedin: false,
    redirect: '/login/client',
  })
  const {savePermission} = useContext(PermissionContext)

  const handleChange = (event) => {
    const { name, value } = event.target
    setState({
      ...state,
      [name]: value,
    })
  }

  const submitHandler = () => {
    const data = { email: state.email, password: state.password }
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
        const client = {
          cpf: response.client.cpf,
          _id: response.client._id,
          name: response.client.name,
          address: response.client.address,
          email: response.client.email,
          phone: response.client.phone,
          photo: response.client.photo,
        }
        sessionStorage.setItem('client', JSON.stringify({ client: client }))
        savePermission('Client')
        props.history.push('/client')
      } else {
        alert('Email ou senha incorretos!')
      }
    })
  }

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
            value={state.email}
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            placeholder='Senha'
            class='nameInput'
            value={state.password}
            onChange={handleChange}
          />

          <button type='submit' onClick={submitHandler}>
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
