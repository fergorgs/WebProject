import React from 'react'
import '../style.css'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
class AddPetScreen extends React.Component {
  componentWillMount() {
    this.setState({
      petName: '',
      petSex: '',
      petRace: '',
      petAge: '',
      petImage: null,
      newId: '',
      redirect: '/client/perfil/novo_pet',
    })
    this.handleChange = this.handleChange.bind(this)
  }

  imageHandler = (event) => {
    this.setState({ petImage: event.target.files[0] })
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  uploadImage() {
    const fd = new FormData()
    fd.set('id', this.state.newId)
    fd.append('image', this.state.petImage)
    axios
      .post('http://localhost:5000/upload/clientPet', fd, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${fd._boundary}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert('Pet registrado com sucesso!')
          const client = { client: res.data }
          localStorage.setItem('client', JSON.stringify(client))
          this.setState({ redirect: '/client/perfil' })
        } else {
          alert('Falha no upload de foto!')
        }
      })
  }

  submitHandler = () => {
    const data = {
      petName: this.state.petName,
      sex: this.state.petSex,
      breed: this.state.petRace,
      age: this.state.petAge,
      ownerId: JSON.parse(localStorage.getItem('client')).client._id,
    }
    fetch('http://localhost:5000/pet/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.ok) {
        const id = await res.json()
        this.setState({ newId: id._id }, () => {
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
            <h1>Novo Pet </h1>
            <input
              type='text'
              name='petName'
              placeholder='Nome do do Pet'
              class='nameInput'
              value={this.state.petName}
              onChange={this.handleChange}
            />
            <input
              type='text'
              name='petSex'
              placeholder='Sex'
              class='nameInput'
              value={this.state.petSex}
              onChange={this.handleChange}
            />
            <input
              type='text'
              placeholder='Raça'
              name='petRace'
              class='nameInput'
              value={this.state.petRace}
              onChange={this.handleChange}
            />
            <input
              type='text'
              placeholder='Idade'
              class='nameInput'
              name='petAge'
              value={this.state.petAge}
              onChange={this.handleChange}
            />
            <input
              type='file'
              class='fileInput'
              accept='image/*'
              onChange={this.imageHandler}
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

export default AddPetScreen
