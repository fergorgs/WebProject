import React from 'react'
import '../style.css'
import InputMask from 'react-input-mask'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class AdminRegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      password: '',
      photo: null,
      newId: '',
      redirect:'/admin/registro/admins'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }
  photoHandler = (event) => {
    this.setState({ photo: event.target.files[0] })
  }

  uploadImage() {
    const fd = new FormData()
    fd.set('id', this.state.newId)
    fd.append('image', this.state.photo)
    axios
      .post('http://localhost:5000/upload/admin', fd, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${fd._boundary}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert('Administrador registrado com sucesso!')
          this.setState({ redirect: '/admin/servicos' })
        } else {
          alert('Falha no upload de foto!')
        }
      })
  }

  submitHandler = () => {
    const data = {
      name: this.state.name,
      cpf: this.state.cpf,
      password: this.state.password,
      address: this.state.address,
      email: this.state.email,
      phone: this.state.phone,
    }
    console.log(JSON.stringify(data))
    fetch('/admin/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.ok) {
        const id = await res.json()
        this.setState({ newId: id.id }, () => {
          this.uploadImage()
        })
      } else {
        const err = await res.json()
        alert(err.error)
      }
    })
  }

  render() {
    return (
      <main>
          <Redirect to={this.state.redirect} />
        <div class='formAgendarHolder'>
          <div class='formAgendar  shadow'>
            <h1>Novo Administrador </h1>
            <input
              type='text'
              name='name'
              placeholder='Nome do admin'
              class='nameInput'
              value={this.state.name}
              onChange={this.handleChange}
            />
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
              className='nameInput'
              placeholder='Senha'
              onChange={this.handleChange}
              value={this.state.password}
            />
            <InputMask
              mask='999.999.999-99'
              type='text'
              name='cpf'
              placeholder='CPF'
              class='nameInput'
              value={this.state.cpf}
              onChange={this.handleChange}
            />
            <input
              type='tel'
              name='phone'
              placeholder='Telefone'
              class='nameInput'
              value={this.state.phone}
              onChange={this.handleChange}
            />
            <input type='file' class='fileInput' onChange={this.photoHandler} />

            <button type='submit' onClick={this.submitHandler}>
              Confirmar
            </button>
          </div>
        </div>
      </main>
    )
  }
}

export default AdminRegisterForm
