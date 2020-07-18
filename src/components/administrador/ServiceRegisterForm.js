import React from 'react'
import InputMask from 'react-input-mask'
import '../style.css'
import { Redirect } from 'react-router-dom'

class ServiceRegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      service: 'Tosa',
      date: null,
      time: null,
      animalName: '',
      cpf: '',
      pets: [<option>Digite o CPF do cliente</option>],
      petsDisabled: true,
      redirect:'/admin/registro/servicos'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  submitHandler = () => {
    const date = new Date(`${this.state.date}:${this.state.time}`)
    if (date > Date.now()) {
      const data = {
        date,
        serviceType: this.state.service,
        clientCpf: this.state.cpf,
        clientPetName: this.state.animalName,
      }
      fetch('/service/add', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(async (res) => {
        if (res.ok) {
          alert('Serviço registrado com sucesso!')
          this.setState({ redirect: '/admin/servicos' })
        } else {
          const error = await res.json()
          alert(error.error)
        }
      })
    } else {
      alert('Tempo ou data inválidos!')
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  getPets(event) {
    const cpf = event.target.value
    //Regex teste cpf
    if (/(^\d{3}\x2E\d{3}\x2E\d{3}\x2D\d{2}$)/g.test(cpf)) {
      fetch('/service/clientPet', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ cpf }),
      }).then(async (res) => {
        if (res.ok) {
          let names = await res.json()
          this.setState({ animalName: names[0] })
          names = names.map((name) => {
            return <option>{name}</option>
          })
          this.setState({ pets: names, petsDisabled: false })
        } else {
          const error = await res.json()
          alert(error.error)
          this.setState({
            pets: [<option>Digite o CPF do cliente</option>],
            petsDisabled: true,
          })
        }
      })
    }
  }

  render() {
    return (
      <main>
          <Redirect to={this.state.redirect}/>
        <div class='formAgendarHolder'>
          <div class='formAgendar  shadow'>
            <h1>Novo Serviço</h1>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <select
                onChange={this.handleChange}
                value={this.state.service}
                name='service'
              >
                <option>Tosa</option>
                <option>Banho</option>
                <option>Consulta</option>
              </select>
            </div>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <input
                type='date'
                name='date'
                class='timeInput'
                onChange={this.handleChange}
              />
              <input
                type='time'
                name='time'
                class='timeInput'
                onChange={this.handleChange}
              />
            </div>
            <InputMask
              mask='999.999.999-99'
              type='text'
              name='cpf'
              onBlur={this.getPets.bind(this)}
              placeholder='CPF'
              class='nameInput'
              onChange={this.handleChange}
            />
            <div style={{ display: 'flex' }}>
              <select
                name='animalName'
                placeholder='Nome do animal'
                disabled={this.state.petsDisabled}
                value={this.state.animalName}
                onChange={this.handleChange}
              >
                {this.state.pets}
              </select>
            </div>
            <button type='submit' onClick={this.submitHandler}>
              Confirmar
            </button>
          </div>
        </div>
      </main>
    )
  }
}

export default ServiceRegisterForm
