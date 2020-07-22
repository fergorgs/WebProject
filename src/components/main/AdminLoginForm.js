import React, { useState, useContext } from 'react'
import '../style.css'
import { Link, Redirect } from 'react-router-dom'
import { PermissionContext } from '../contexts/PermissionContext'

export default function AdminLoginForm(props) {
  const [state, setState] = useState({ email: '', password: '', redirect:'/login/admin' })
  const { savePermission } = useContext(PermissionContext)

  const emailHandler = (event) => {
    setState({ ...state, email: event.target.value })
  }
  const passwordHandler = (event) => {
    setState({ ...state, password: event.target.value })
  }
  const submitHandler = () => {
    fetch('/auth/authenticate_admin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: state.email,
        password: state.password,
      }),
    }).then((res) => {
      if (res.ok) {
        savePermission('Admin')
        setState({...state, redirect:'/admin'})
      } else {
        alert('Email ou senha incorretos!')
      }
    })
  }

  return (
    <main>
      <Redirect to={state.redirect} />
      <div class='formAgendarHolder'>
        <div class='formAgendar  shadow'>
          <h1>Login Admin </h1>
          <input
            type='email'
            name='email'
            placeholder='Email'
            class='nameInput'
            value={state.email}
            onChange={emailHandler}
          />
          <input
            type='password'
            placeholder='Senha'
            class='nameInput'
            value={state.password}
            onChange={passwordHandler}
          />

          <button type='submit' onClick={submitHandler}>
            Confirmar
          </button>
        </div>
      </div>

      <div class='formAgendarHolder'>
        <div class='formAgendar  shadow'>
          <Link to='/'>
            <button type='submit'>Logar como Cliente</button>
          </Link>
        </div>
      </div>
    </main>
  )
}
