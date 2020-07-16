import React from 'react'
import '../style.css'
import { Router } from 'react-router-dom'
import axios from 'axios'
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
    for (let val in fd.values()) console.log(val)
    axios
      .post('http://localhost:5000/upload/client', fd, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${fd._boundary}`,
        },
      })
      .then((res) => {
        alert('Cliente registrado com sucesso!')
      })
  }

  submitHandler = () => {
    let data = this.state
    delete data.photoName
    delete data.newId
    console.log(JSON.stringify(data))
    fetch('http://localhost:5000/auth/registerClient', {
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
            <input
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
