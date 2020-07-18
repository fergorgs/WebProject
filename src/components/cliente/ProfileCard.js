import React from 'react'
import '../style.css'
import profilePlaceHolder from './images/coffinGuy.jpg'

class ProfileCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      name: '',
      id: '',
      address: '',
      phone: '',
      email: '',
      cpf: '',
      imgSrc:''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    const client = JSON.parse(sessionStorage.getItem('client')).client
    this.setState({
      id: client._id,
      name: client.name,
      address: client.address,
      phone: client.phone,
      email: client.email,
      cpf: client.cpf,
      imgSrc: `http://localhost:5000/${client.photo}`
    })
  }
  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  editModeHandler = () => {
    this.setState({ editMode: !this.state.editMode })
  }

  render() {
    if (this.state.editMode) {
      return (
        <div class='perfilInfoBox'>
          <img
            src={this.state.pic}
            class='edit'
            onClick={this.editModeHandler}
          />
          <h3>Dados do cliente</h3>
          <div id='photoAndName'>
            <img class='image' src={profilePlaceHolder} />
            <input
              type='text'
              value={this.state.name}
              onChange={this.changeNameHandler}
              style={{ height: '2em', marginLeft: '1em', marginTop: '2em' }}
            />
          </div>
          <div id='perfilInfo'>
            <div id='perfilInfoLabels'>
              <p>ID</p>
              <p>Endereço</p>
              <p>Telefone</p>
              <p>Email</p>
              <p>CPF</p>
            </div>
            <div id='perfilInfoContent'>
              <input
                type='text'
                name='id'
                value={this.state.id}
                onChange={this.handleChange}
                style={{ height: '2em', marginLeft: '0.5em', marginTop: '1em' }}
              />
              <input
                type='text'
                name='address'
                value={this.state.address}
                onChange={this.handleChange}
                style={{ height: '2em', marginLeft: '0.5em', marginTop: '1em' }}
              />
              <input
                type='text'
                name='phone'
                value={this.state.phone}
                onChange={this.handleChange}
                style={{ height: '2em', marginLeft: '0.5em', marginTop: '1em' }}
              />
              <input
                type='text'
                name='email'
                value={this.state.email}
                onChange={this.handleChange}
                style={{ height: '2em', marginLeft: '0.5em', marginTop: '1em' }}
              />
              <input
                type='text'
                name='cpf'
                value={this.state.cpf}
                onChange={this.handleChange}
                style={{ height: '2em', marginLeft: '0.5em', marginTop: '1em' }}
              />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div class='perfilInfoBox'>
        <img
          src={require('../images/mode_edit.png')}
          class='edit'
          onClick={this.editModeHandler}
        />
        <h3>Dados do cliente</h3>
        <div id='photoAndName'>
          <img class='image' src={this.state.imgSrc} />
          <p>{this.state.name}</p>
        </div>
        <div id='perfilInfo'>
          <div id='perfilInfoLabels'>
            <p>ID</p>
            <p>Endereço</p>
            <p>Telefone</p>
            <p>Email</p>
            <p>CPF</p>
          </div>
          <div id='perfilInfoContent'>
            <p id='ID'>{this.state.id}</p>
            <p id='endereco'>{this.state.address}</p>
            <p id='telefone'>{this.state.phone}</p>
            <p id='email'>{this.state.email}</p>
            <p id='cpf'>{this.state.cpf}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileCard
