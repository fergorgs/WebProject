import React from 'react'
import '../style.css'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import InputMask from 'react-input-mask'

class ClientRegisterForm extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      name: '',
      cpf: '',
      password: '',
      address: '',
      email: '',
      phone: '',
      photo: null,
      newId: '',
      redirect: this.props.match !== undefined
              ? this.props.match.path
              : '/login/create',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleImgUpload = this.handleImgUpload.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleImgUpload(event) {
    this.setState({
      photo: event.target.files[0],
    })
  }

  uploadImage() {
    const fd = new FormData()
    fd.set('id', this.state.newId)
    fd.append('image', this.state.photo)
    axios
      .post('http://localhost:5000/upload/client', fd, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${fd._boundary}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert('Cliente registrado com sucesso!')
          this.setState({
            redirect: this.props.match !== undefined
              ? '/admin/servicos'
              : '/login/client',
          })
        } else {
          alert('Falha no upload de foto!')
        }
      })
  }

  submitHandler = () => {
    let data = {
      name: this.state.name,
      cpf: this.state.cpf,
      password: this.state.password,
      address: this.state.address,
      email: this.state.email,
      phone: this.state.phone,
    }
    console.log(JSON.stringify(data))
    fetch('/auth/registerClient', {
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
            <h1>Novo Cliente </h1>
            <input
              name='name'
              type='text'
              placeholder='Nome do cliente'
              class='nameInput'
              value={this.state.name}
              onChange={this.handleChange}
            />
            <InputMask
              mask='999.999.999-99'
              name='cpf'
              type='text'
              placeholder='CPF'
              class='nameInput'
              value={this.state.cpf}
              onChange={this.handleChange}
            />
            <input
              name='password'
              type='password'
              placeholder='Senha'
              className='nameInput'
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input
              name='address'
              type='text'
              placeholder='Endereço'
              class='nameInput'
              value={this.state.address}
              onChange={this.handleChange}
            />
            <input
              name='email'
              type='email'
              placeholder='Email'
              class='nameInput'
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              name='phone'
              type='tel'
              placeholder='Telefone'
              class='nameInput'
              value={this.state.phone}
              onChange={this.handleChange}
            />
            <input
              name='photo'
              type='file'
              accept='image/x-png,image/gif,image/jpeg'
              class='fileInput'
              //value={this.state.photo}
              onChange={this.handleImgUpload}
            />

            <button type='submit' onClick={this.submitHandler}>
              Confirmar
            </button>
          </div>
        </div>
      </main>
    )
  }
}

export default ClientRegisterForm
